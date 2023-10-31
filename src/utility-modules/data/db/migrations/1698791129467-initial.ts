import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1698791129467 implements MigrationInterface {
  name = 'Initial1698791129467';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL, "email" character varying NOT NULL, "confirmed" boolean, "roles" text array, "password" character varying, "taxId" character varying, "name" character varying, "cellPhone" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "event-execution" ("id" uuid NOT NULL, "payload" character varying NOT NULL, "eventClassName" character varying NOT NULL, "handlerName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "reprocessCount" integer NOT NULL, "lastReprocessAt" TIMESTAMP, "processedAt" TIMESTAMP, "errorMessage" character varying, CONSTRAINT "PK_bf27bbb6f7e78fb135940e99f19" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "contact" ("email" character varying NOT NULL, "active" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL, "userId" character varying, CONSTRAINT "PK_eff09bb429f175523787f46003b" PRIMARY KEY ("email"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "email_message" ("id" uuid NOT NULL, "status" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "from" character varying NOT NULL, "to" text array, "body" character varying NOT NULL, "cc" text array, "subject" character varying, "sentAt" TIMESTAMP, "updatedAt" TIMESTAMP, "externalId" character varying, CONSTRAINT "PK_9fe3a0a31f2ffe66dd976851792" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "email_message"`);
    await queryRunner.query(`DROP TABLE "contact"`);
    await queryRunner.query(`DROP TABLE "event-execution"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
