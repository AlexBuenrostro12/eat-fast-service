import { IsEnum, IsNumber, IsString } from 'class-validator';
import { UploadTypeEntity } from '../enum/upload.enum';
import { Transform } from 'class-transformer';

export class UploadFileDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  id: number;

  @IsEnum(UploadTypeEntity)
  uploadType: UploadTypeEntity;
}

export class DeleteFileDto {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  id: number;

  @IsEnum(UploadTypeEntity)
  uploadType: UploadTypeEntity;

  @IsString()
  image: string;
}
