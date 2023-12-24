import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route, RouteReferences } from 'src/entity';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';

@Module({
  imports: [TypeOrmModule.forFeature([Route, RouteReferences])],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RoutesModule {}
