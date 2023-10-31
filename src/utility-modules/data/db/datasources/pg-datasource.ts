import { DataSource } from 'typeorm';
import base from './base-datasource';
import * as dotenv from 'dotenv';

dotenv.config();

const pgDataSource = new DataSource({
  ...base,
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
});

export default pgDataSource;
