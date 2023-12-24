// route.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { RouteService } from './route.service';
import { Route, RouteReferences } from 'src/entity';

@Controller('routes')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Get()
  getAllRoutes(): Promise<Route[]> {
    return this.routeService.getAllRoutes();
  }

  @Get('references')
  getAllRouteReferences(): Promise<RouteReferences[]> {
    return this.routeService.getAllRouteReferences();
  }

  @Get(':id')
  getRouteById(@Param('id', ParseIntPipe) id: number): Promise<Route> {
    return this.routeService.getRouteById(id);
  }

  @Get('references/:id')
  getRouteReferenceById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<RouteReferences> {
    return this.routeService.getRouteReferenceById(id);
  }

  @Post()
  createRoute(
    @Body() createRouteDto: { name: string; referenceIds: string[] },
  ): Promise<Route> {
    const { name, referenceIds } = createRouteDto;
    return this.routeService.createRoute(name, referenceIds);
  }

  @Post('references')
  createRouteReference(
    @Body() createRouteReferenceDto: { name: string; image: string },
  ): Promise<RouteReferences> {
    const { name, image } = createRouteReferenceDto;
    return this.routeService.createRouteReference(name, image);
  }
}
