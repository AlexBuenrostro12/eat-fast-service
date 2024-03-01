import { IsBoolean, IsString } from 'class-validator';

export class CreateComplementDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsBoolean()
  readonly required: boolean;
}
