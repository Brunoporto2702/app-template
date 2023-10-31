import { INestApplication, ValidationPipe } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { AuthService } from 'src/utility-modules/auth/domain/services/auth.service';
import { SqlUserRepository } from 'src/utility-modules/auth/infra/data/repositories/sql-user-repository';
import { AuthController } from 'src/utility-modules/auth/interactors/http/auth.controller';
import { Role } from 'src/common/core/types/role';
import { DbModule } from 'src/utility-modules/data/db/db.module';

const appFixture = {
  imports: [
    DbModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, SqlUserRepository],
};

export default async function initializeTestApp(): Promise<{
  module: TestingModule;
  app: INestApplication;
  adminToken: string;
  userToken: string;
}> {
  const module: TestingModule = await Test.createTestingModule(
    appFixture,
  ).compile();

  const app = module.createNestApplication();
  app.useGlobalPipes(new ValidationPipe());
  await app.init();

  const payload = {
    userId: randomUUID(),
    email: 'email@admin.com',
    roles: [Role.Admin],
  };
  const jwtService = module.get<JwtService>(JwtService);
  const adminToken = await jwtService.signAsync(payload);

  const userPayload = {
    userId: randomUUID(),
    email: 'email@user.com',
    roles: [Role.User],
  };
  const userToken = await jwtService.signAsync(userPayload);

  return {
    app,
    module,
    adminToken,
    userToken,
  };
}
