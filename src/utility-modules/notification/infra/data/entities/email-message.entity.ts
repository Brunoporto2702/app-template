import { IsEnum } from 'class-validator';
import { UUID } from 'crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EmailStatus } from '../../../domain/models/email-message';

@Entity({ name: 'email_message' })
export class EmailMessageEntity {
  @PrimaryColumn('uuid')
  id: UUID;

  @IsEnum(EmailStatus)
  @Column()
  status: EmailStatus;

  @Column()
  createdAt: Date;

  @Column()
  from: string;

  @Column('text', {
    nullable: true,
    array: true,
    transformer:
      process.env.NODE_ENV === 'test'
        ? {
            from: (roles: string | null) => (roles ? roles.split(',') : []),
            to: (roles: string[] | null) => (roles ? roles.join(',') : null),
          }
        : undefined,
  })
  to: string[];

  @Column()
  body: string;

  @Column('text', {
    nullable: true,
    array: true,
    transformer:
      process.env.NODE_ENV === 'test'
        ? {
            from: (roles: string | null) => (roles ? roles.split(',') : []),
            to: (roles: string[] | null) => (roles ? roles.join(',') : null),
          }
        : undefined,
  })
  cc?: string[];

  @Column({
    nullable: true,
  })
  subject: string;

  @Column({
    nullable: true,
  })
  sentAt?: Date;

  @Column({
    nullable: true,
  })
  updatedAt?: Date;

  @Column({
    nullable: true,
  })
  externalId?: UUID;
}
