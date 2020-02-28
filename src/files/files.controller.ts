import { Controller, Post, UseInterceptors, UploadedFiles  } from '@nestjs/common';
import {FilesInterceptor} from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@Controller('files')
@ApiTags('files')
export class FilesController {

    @Post()
    @UseInterceptors(FilesInterceptor('photo'))
    uploadFile(@UploadedFiles() file ) {
        console.log(file);
    }
}
