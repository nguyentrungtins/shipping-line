import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Route, RouteReferences } from 'src/entity';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
    @InjectRepository(RouteReferences)
    private readonly routeReferencesRepository: Repository<RouteReferences>,
  ) {}

  async getAllRoutes(): Promise<Route[]> {
    return this.routeRepository.find();
  }

  async getRouteById(id: number): Promise<Route> {
    const route = await this.routeRepository.findOneBy({ id: id });
    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }
    return route;
  }

  async createRoute(name: string, referenceNames: string[]): Promise<Route> {
    const references = await this.routeReferencesRepository.findBy({
      name: In(referenceNames),
    });
    const route = this.routeRepository.create({
      name: name,
      references: references,
    });
    return await this.routeRepository.save(route);
  }

  async getAllRouteReferences(): Promise<RouteReferences[]> {
    return this.routeReferencesRepository.find({});
  }

  async getRouteReferenceById(id: number): Promise<RouteReferences> {
    const reference = await this.routeReferencesRepository.findOneBy({
      id: id,
    });
    if (!reference) {
      throw new NotFoundException(`RouteReference with ID ${id} not found`);
    }
    return reference;
  }

  async createRouteReference(
    name: string,
    image: string,
  ): Promise<RouteReferences> {
    const reference = this.routeReferencesRepository.create({ name, image });
    return this.routeReferencesRepository.save(reference);
  }
}
