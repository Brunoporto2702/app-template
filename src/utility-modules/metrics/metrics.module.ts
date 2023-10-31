import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {
  PrometheusModule,
  makeCounterProvider,
  makeHistogramProvider,
} from '@willsoto/nestjs-prometheus';
import { CounterInterceptor } from './interceptors/counter.interceptor';
import { ConfigModule } from '@nestjs/config';
import { ThroughputInterceptor } from './interceptors/throughput.interceptor';

const commonLabels = ['environment'];

@Module({
  imports: [PrometheusModule.register(), ConfigModule],
  providers: [
    makeCounterProvider({
      name: 'request_count',
      help: 'Just a simple count of requests. It can be used to generate requests per minute for a given endpoint',
      labelNames: [...commonLabels, 'identifier'],
    }),
    makeHistogramProvider({
      name: 'throughput',
      help: 'Stores the throughput stratified by status code',
      labelNames: [...commonLabels, 'status_code'],
      buckets: [
        0.1, 0.2, 0.5, 1, 2, 5, 10, 100, 200, 500, 1000, 2500, 5000, 10000,
      ],
    }),
    {
      provide: APP_INTERCEPTOR,
      useClass: CounterInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ThroughputInterceptor,
    },
  ],
})
export class MetricsModule {}
