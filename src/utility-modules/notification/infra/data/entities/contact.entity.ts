import { Column, Entity, PrimaryColumn } from 'typeorm';
import { UUID } from 'crypto';

@Entity({ name: 'contact' })
export class ContactEntity {
  @PrimaryColumn()
  email: string;

  @Column()
  active: boolean;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  userId?: UUID;
}
