import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route, RouteReferences } from 'src/entity';
import { RoutesController } from './route.controller';
import { RoutesService } from './route.service';

@Module({
  imports: [TypeOrmModule.forFeature([Route, RouteReferences])],
  controllers: [RoutesController],
  providers: [RoutesService],
})
export class RoutesModule {}
