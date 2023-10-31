import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Histogram } from 'prom-client';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import DomainException from 'src/common/core/exceptions/domain-exception';

@Injectable()
export class ThroughputInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric('throughput') public histogram: Histogram<string>,
    private configService: ConfigService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    if (context.getType() === 'http') {
      return this.exportTrhoughput(context, next);
    }
    return next.handle();
  }

  private resolveStatusCode(err: Error): HttpStatus {
    const httpStatus =
      err instanceof HttpException || err instanceof DomainException
        ? err.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    return httpStatus;
  }

  private exportHistogram(
    context: ExecutionContext,
    url: string,
    now: number,
    forcedStatusCode?: HttpStatus,
  ) {
    const response = context.switchToHttp().getResponse();

    const statusCode = forcedStatusCode ?? response.statusCode;

    const duration = Date.now() - now;

    this.histogram.observe(
      {
        environment: this.configService.get<string>('env'),
        status_code: statusCode.toString(),
      },
      duration,
    );
  }

  private async exportTrhoughput(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { path: url } = request;

    const now = Date.now();

    return next.handle().pipe(
      tap({
        error: (err) => {
          const statusCode = this.resolveStatusCode(err);
          this.exportHistogram(context, url, now, statusCode);
        },
        complete: () => this.exportHistogram(context, url, now),
      }),
    );
  }
}
