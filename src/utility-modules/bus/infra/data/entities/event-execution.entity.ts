import { UUID } from 'crypto';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'event-execution' })
export class EventExecutionEntity {
  @PrimaryColumn('uuid')
  id: UUID;

  @Column()
  payload: string;

  @Column()
  eventClassName: string;

  @Column()
  handlerName: string;

  @Column()
  createdAt: Date;

  @Column()
  status: string;

  @Column()
  reprocessCount: number;

  @Column({ nullable: true })
  lastReprocessAt?: Date;

  @Column({ nullable: true })
  processedAt?: Date;

  @Column({ nullable: true })
  errorMessage?: string;
}
