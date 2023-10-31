import { Module } from '@nestjs/common';
import { AuthController } from './interactors/http/auth.controller';
import { AuthService } from './domain/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { SqlUserRepository } from './infra/data/repositories/sql-user-repository';
import { DbModule } from 'src/utility-modules/data/db/db.module';

@Module({
  imports: [
    DbModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, SqlUserRepository],
  exports: [AuthService, SqlUserRepository],
})
export class AuthModule {}
