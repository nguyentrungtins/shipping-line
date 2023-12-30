import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';

export class CreatePortRotationDTO {
  @IsNotEmpty()
  @IsString()
  ports: Port[];

  @IsNotEmpty()
  @IsString()
  route: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}

export class Port {
  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'port' })
  callPort: string;

  @IsNotEmpty()
  @IsString()
  @Expose({ name: 'dock' })
  callPortTerminal: string;

  @IsOptional()
  @IsString()
  @Expose({ name: 'etd' })
  callPortEtd: string | null;

  @IsOptional()
  @IsNumber()
  @Expose({ name: 'etdTime' })
  callPortEtdTime: number | null;

  @IsOptional()
  @IsString()
  @Expose({ name: 'eta' })
  callPortEta: string;

  @IsOptional()
  @IsNumber()
  @Expose({ name: 'etaTime' })
  callPortEtaTime: number;
}
