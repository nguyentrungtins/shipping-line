// route.controller.ts
import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RouteService } from './route.service';
import { PortRotation, Route, RouteReferences } from 'src/entity';
import { CreatePortRotationDTO } from './dto/create-port-rotation.dto';

@Controller('routes')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get()
  getRouteByName(@Query('name') name: string): Promise<any> {
    console.log(name);
    return this.routeService.getRouteByName(name);
  }

  @Get('metadata')
  getMetadata() {
    return this.routeService.getMetadata();
  }

  @Post('port-rotation')
  createPortRotation(
    @Body() portRotationDto: CreatePortRotationDTO,
  ): Promise<PortRotation[]> {
    return this.routeService.createPortRotation(portRotationDto);
  }
}
