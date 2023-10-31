import { format, transports } from 'winston';

const customFormat = format.printf(
  ({ level = 'info', message, timestamp, err, ...metadata }) => {
    const json: any = {
      timestamp,
      level,
      ...metadata,
      message,
    };

    if (err) {
      json.error = err.stack || err;
    }

    return JSON.stringify(json);
  },
);

const transportsList: any[] = [new transports.Console({ level: 'info' })];

if (process.env.NODE_ENV !== 'production') {
  // transportsList.push(new DailyRotateFile({
  //   filename: 'application.%DATE%.log',
  //   zippedArchive: true,
  //   maxSize: '20m',  // Rotate after 20 megabytes
  //   maxFiles: '1',   // Keep only the last file
  //   auditFile: 'audit.json',
  //   dirname: 'logs',
  // }))
  transportsList.push(
    new transports.File({
      filename: 'logs/application.file.log',
      tailable: true,
    }),
  );
}

export const loggerConfig = {
  level: 'info', // this will print warn and above level (error also)
  format: format.combine(
    format.errors({ stack: true }),
    format.json(),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    customFormat,
  ),

  transports: transportsList,
};
