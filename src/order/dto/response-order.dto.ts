import { IsBoolean } from 'class-validator';

export class ResponseOrderDto {
  @IsBoolean()
  created: boolean;

  error?: any;
}
