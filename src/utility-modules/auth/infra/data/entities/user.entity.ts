import { UUID } from 'crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn('uuid')
  id: UUID;

  @Column()
  email: string;

  @Column({ nullable: true })
  confirmed?: boolean;

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
  roles?: string[];

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  taxId?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  cellPhone?: number;
}
