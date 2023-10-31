const base = {
  entities: [__dirname + '/../../../../**/*.entity{.ts,.js}'],
  migrations: [
    __dirname +
      '/../../../../../dist/utility-modules/data/db/migrations/**/*.js',
  ],
};

export default base;
