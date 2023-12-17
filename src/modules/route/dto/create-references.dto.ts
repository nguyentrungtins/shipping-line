import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReferencesDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}
