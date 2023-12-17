import {
  IsNotEmpty,
  IsArray,
  IsString,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { CreateReferencesDTO } from './create-references.dto';
import { Type } from 'class-transformer';

export class CreateRouteDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1) // Optionally, ensure the array has at least one element
  @ValidateNested({ each: true })
  @Type(() => CreateReferencesDTO)
  references: CreateReferencesDTO[];
}
