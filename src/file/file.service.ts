import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { v4 as uuidv4 } from 'uuid';
import { UploadTypeEntity } from './enum/file.enum';
import { DeleteFileDto } from './dto/file.dto';
import { BusinessService } from 'src/business/business.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class FileService {
  private readonly s3: S3Client;
  private readonly s3Bucket: string;
  private readonly expiresIn: string;
  private readonly appEnv: string;

  constructor(
    private readonly configService: ConfigService<
      {
        AWS_S3_BUCKET: string;
        AWS_S3_REGION: string;
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_S3_IMAGE_EXPIRES_IN: string;
        APP_ENV: string;
      },
      true
    >,
    private readonly userServie: UserService,
    private readonly businessService: BusinessService,
    private readonly productService: ProductService,
  ) {
    this.s3 = new S3Client({
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
      region: this.configService.get('AWS_S3_REGION'),
    });
    this.s3Bucket = this.configService.get('AWS_S3_BUCKET');
    this.expiresIn = this.configService.get('AWS_S3_IMAGE_EXPIRES_IN');
    this.appEnv = this.configService.get('APP_ENV');
  }

  async upload(
    id: number,
    uploadType: UploadTypeEntity,
    fileName: string,
    file: Buffer,
  ): Promise<string | null> {
    const Key = `${this.appEnv}/${uploadType}-${id}/${uuidv4()}-${fileName}`;
    const uploaed = await this.s3.send(
      new PutObjectCommand({
        Bucket: this.s3Bucket,
        Key,
        Body: file,
      }),
    );

    if (uploaed.$metadata.httpStatusCode === 200) {
      switch (uploadType) {
        case UploadTypeEntity.USER:
          await this.userServie.updateImage(id, Key);
          break;
        case UploadTypeEntity.BUSINESS:
          await this.businessService.updateImage(id, Key);
          break;
        case UploadTypeEntity.PRODUCT:
          await this.productService.updateImage(id, Key);
          break;
        default:
          break;
      }

      return Key;
    }

    return null;
  }

  async getUserImage(Key: string): Promise<string | null> {
    try {
      const getObjectCommand = new GetObjectCommand({
        Bucket: this.s3Bucket,
        Key,
      });

      const imgObj = await this.s3.send(getObjectCommand);

      if (imgObj && imgObj.$metadata.httpStatusCode === HttpStatus.OK) {
        return await this.getSignedUrl(getObjectCommand);
      }
    } catch (error) {
      return null;
    }
  }

  async deleteImage({
    id,
    uploadType,
    image,
  }: DeleteFileDto): Promise<boolean> {
    try {
      const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: this.s3Bucket,
        Key: image,
      });

      const imageObj = await this.s3.send(deleteObjectCommand);

      if (
        imageObj &&
        imageObj.$metadata.httpStatusCode === HttpStatus.NO_CONTENT
      ) {
        switch (uploadType) {
          case UploadTypeEntity.USER:
            await this.userServie.updateImage(id);
            break;
          case UploadTypeEntity.BUSINESS:
            await this.businessService.updateImage(id);
            break;
          case UploadTypeEntity.PRODUCT:
            await this.productService.updateImage(id);
            break;
          default:
            break;
        }
        return true;
      }
    } catch (error) {
      return false;
    }
  }

  private async getSignedUrl(command: GetObjectCommand) {
    return getSignedUrl(this.s3, command, {
      expiresIn: parseInt(this.expiresIn),
    });
  }
}
