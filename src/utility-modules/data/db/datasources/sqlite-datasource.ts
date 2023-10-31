import { DataSource } from 'typeorm';
import base from './base-datasource';

const sqliteDatasource = new DataSource({
  ...base,
  // database: `test-db/db-${Date.now()}.sqlite`,
  database: ':memory:',
  type: 'sqlite',
  synchronize: true,
});

export default sqliteDatasource;
