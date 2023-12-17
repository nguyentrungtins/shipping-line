import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  JoinTable,
} from 'typeorm';
import { RouteReferences } from './RouteReferences.entity';

@Entity()
export class Route extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @OneToMany(() => RouteReferences, (reference) => reference.route)
  @JoinTable()
  references: RouteReferences[];
}
