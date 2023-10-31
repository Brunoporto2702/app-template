import {
  Global,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import pgDataSource from './datasources/pg-datasource';
import sqliteDatasource from './datasources/sqlite-datasource';
import seedUsers from './seed/user.seed';
import { UserEntity } from 'src/utility-modules/auth/infra/data/entities/user.entity';

@Global()
@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  readonly db: DataSource;
  data: any;

  constructor() {
    this.db = process.env.NODE_ENV === 'test' ? sqliteDatasource : pgDataSource;
    this.data = {};
  }

  async seed() {
    seedUsers(this.db.getRepository(UserEntity));
  }

  async initialize() {
    await this.db.initialize();
    if (process.env.NODE_ENV !== 'test') await this.db.runMigrations();
    if (process.env.NODE_ENV !== 'test') await this.seed();
  }

  async onModuleInit() {
    await this.initialize();
  }

  async destroy() {
    await this.db.destroy();
  }

  async onModuleDestroy() {
    await this.destroy();
  }
}
