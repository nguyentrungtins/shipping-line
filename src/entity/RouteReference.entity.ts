import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Route } from './Route.entity';
import { PortRotation } from './PortRotation.entity';

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

  @OneToMany(() => PortRotation, (port) => port.reference, {
    eager: true, // Set eager loading to true
  })
  port_rotation: PortRotation;
}
