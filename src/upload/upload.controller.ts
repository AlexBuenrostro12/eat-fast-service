import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
  HttpStatus,
  Get,
  NotFoundException,
  Delete,
  Query,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Response } from 'express';
import { DeleteFileDto, UploadFileDto } from './dto/upload.dto';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Get()
  async getUserImage(@Query('image') image: string, @Res() res: Response) {
    const signedUrl = await this.uploadService.getUserImage(image);

    if (!signedUrl) throw new NotFoundException('User image does not exist');

    res.send({ signedUrl }).status(HttpStatus.OK);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|heic)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() payload: UploadFileDto,
    @Res() res: Response,
  ) {
    const image = await this.uploadService.upload(
      payload.id,
      payload.uploadType,
      file.originalname,
      file.buffer,
    );

    if (!image) throw new BadRequestException('Error at upload image');

    res.send({ image }).status(HttpStatus.CREATED);
  }

  @Delete()
  async deleteUserImage(@Query() params: DeleteFileDto, @Res() res: Response) {
    const deleted = await this.uploadService.deleteImage(params);

    if (!deleted) throw new NotFoundException('User image does not exist');

    res.send({ deleted }).status(HttpStatus.OK);
  }
}
