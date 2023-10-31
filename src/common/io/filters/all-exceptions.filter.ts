import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import DomainException from 'src/common/core/exceptions/domain-exception';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  logger: Logger;
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    this.logger = new Logger(HttpExceptionFilter.name);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    const httpStatus =
      exception instanceof HttpException || exception instanceof DomainException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException || exception instanceof DomainException
        ? exception.getResponse()
        : 'internal server error';

    this.logger.log({ level: 'error', err: exception });

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(context.getRequest()),
      message: message,
    };

    httpAdapter.reply(context.getResponse(), responseBody, httpStatus);
  }
}
