import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import { Observable } from 'rxjs';

@Injectable()
export class CounterInterceptor implements NestInterceptor {
  constructor(@InjectMetric('request_count') public counter: Counter<string>) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    if (context.getType() === 'http') {
      return this.countRequest(context, next);
    }
    return next.handle();
  }

  private async countRequest(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const { path: url } = request.route;

    this.counter.inc({
      environment: process.env.NODE_ENV || 'development',
      identifier: `${request.method} ${url}`,
    });

    return next.handle();
  }
}
