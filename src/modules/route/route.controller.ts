import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoutesService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { Route } from 'src/entity';
import { CreateReferencesDTO } from './dto/create-references.dto';

@Controller('routes')
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Get()
  async findAll(): Promise<Route[]> {
    return this.routesService.findAll();
  }

  @Post('create')
  async create(@Body() routeInput: CreateRouteDto) {
    return this.routesService.create(routeInput);
  }
  @Post('/references/create')
  async createReferences(@Body() routeInput: CreateReferencesDTO) {
    return this.routesService.createReferences(routeInput);
  }
}
