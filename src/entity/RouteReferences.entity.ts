import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Route } from './Route.entity';

@Entity()
export class RouteReferences extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Route, (route) => route.references)
  route: Route;

  @Column()
  image: string;
}
