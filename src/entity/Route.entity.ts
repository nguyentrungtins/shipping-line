import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { RouteReferences } from './RouteReference.entity';

@Entity()
export class Route extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => RouteReferences, (reference) => reference.route, {
    eager: true, // Set eager loading to true
  })
  references: RouteReferences[];
}
