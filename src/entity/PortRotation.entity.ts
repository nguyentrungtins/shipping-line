import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { RouteReferences } from './RouteReference.entity';

@Entity()
export class PortRotation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  route: string;

  @Column()
  image: string;

  @Column()
  port: string;

  @Column()
  dock: string;

  @Column({ nullable: true })
  eta: string;

  @Column({ nullable: true })
  etaTime: number;

  @Column({ nullable: true })
  etd: string;

  @Column({ nullable: true })
  etdTime: number;

  @ManyToOne(() => RouteReferences, (reference) => reference.port_rotation)
  reference: RouteReferences;
}
