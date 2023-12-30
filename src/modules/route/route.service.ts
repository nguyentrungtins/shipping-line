import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PortRotation, Route, RouteReferences } from 'src/entity';
import { CreatePortRotationDTO } from './dto/create-port-rotation.dto';
import { metadata } from './metadata';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
    @InjectRepository(RouteReferences)
    private readonly routeReferencesRepository: Repository<RouteReferences>,
    @InjectRepository(PortRotation)
    private readonly portRotationRepository: Repository<PortRotation>,
  ) {}

  async getAllRoutes(): Promise<Route[]> {
    return this.routeRepository.find();
  }

  getMetadata() {
    return metadata;
  }

  async getRouteByName(name: string): Promise<any> {
    const routes = await this.portRotationRepository.findBy({ route: name });
    if (!routes || routes.length === 0) {
      throw new NotFoundException(`Route with Name ${name} not found`);
    }
    const tableData = routes.map((route) => {
      return {
        route: route.route,
        port: route.port,
        dock: route.dock,
        eta: route.eta,
        etaTime: route.etaTime,
        etd: route.etd,
        etdTime: route.etdTime,
      };
    });
    const result = {
      route_name: name,
      image: routes[0].image,
      table_data: tableData,
    };
    return result;
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
    if (!references || references.length == 0) {
      throw new NotFoundException(`Route with ID ${references} not found`);
    }

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
    portID: string,
  ): Promise<RouteReferences> {
    const portRotation = await this.portRotationRepository.findOneBy({
      id: portID,
    });
    const reference = this.routeReferencesRepository.create({
      name,
      image,
      port_rotation: portRotation,
    });
    return this.routeReferencesRepository.save(reference);
  }
  plainToEntity = (ports: CreatePortRotationDTO) => {
    const portRotations: PortRotation[] = [];

    for (const portDto of ports.ports) {
      const portRotation = new PortRotation();
      portRotation.route = ports.route;
      portRotation.image = ports.image;
      portRotation.port = portDto.callPort;
      portRotation.dock = portDto.callPortTerminal;
      portRotation.etd = portDto.callPortEtd;
      portRotation.etdTime = portDto.callPortEtdTime
        ? +portDto.callPortEtdTime
        : null;
      portRotation.eta = portDto.callPortEta;
      portRotation.etaTime = portDto.callPortEtaTime
        ? +portDto.callPortEtaTime
        : null;

      portRotations.push(portRotation);
    }
    return portRotations;
  };
  async createPortRotation(
    portRotationDTO: CreatePortRotationDTO,
  ): Promise<PortRotation[]> {
    const portRotations = this.plainToEntity(portRotationDTO);
    console.log(portRotations);
    const portRotation = this.portRotationRepository.create(portRotations);
    console.log(portRotation);
    return await this.portRotationRepository.save(portRotation);
  }
}
