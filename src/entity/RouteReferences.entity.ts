import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  JoinTable,
} from 'typeorm';
import { Route } from './Route.entity';

@Entity()
export class RouteReferences extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  referenceName: string;

  @ManyToOne(() => Route, (route) => route.references)
  @JoinTable()
  route: Route;

  @Column()
  image: string;
}
