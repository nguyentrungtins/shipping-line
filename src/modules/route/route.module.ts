import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortRotation, Route, RouteReferences } from 'src/entity';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';

@Module({
  imports: [TypeOrmModule.forFeature([Route, RouteReferences, PortRotation])],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RoutesModule {}
