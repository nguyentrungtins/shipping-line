import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReferencesDTO {
  @IsNotEmpty()
  @IsString()
  referenceName: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}
