import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Route, RouteReferences } from 'src/entity';
import { CreateRouteDto } from './dto/create-route.dto';
import { CreateReferencesDTO } from './dto/create-references.dto';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,

    @InjectRepository(RouteReferences)
    private readonly routeReferenceRepository: Repository<RouteReferences>,
  ) {}

  async findAll(): Promise<Route[]> {
    return this.routeRepository.find();
  }
  async create(routeDto: CreateRouteDto) {
    const { name, references } = routeDto;

    const route = this.routeRepository.create({ name: name });

    route.references = await Promise.all(
      references.map(async (referenceItem) => {
        let reference = await this.routeReferenceRepository.findOneBy({
          referenceName: referenceItem.name,
        });

        if (!reference) {
          // If reference doesn't exist, create it
          reference = await this.createReferences(referenceItem);
        }

        return reference;
      }),
    );

    return this.routeRepository.save(route);
  }
  async createReferences(referenceDto: CreateReferencesDTO) {
    const reference = this.routeReferenceRepository.create({
      referenceName: referenceDto.name,
      image: referenceDto.image,
    });
    return this.routeReferenceRepository.save(reference);
  }
}
