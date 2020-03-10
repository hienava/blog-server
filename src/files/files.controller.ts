import { Controller, Post, UseInterceptors, UploadedFiles, HttpException, HttpStatus } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ApiException } from 'src/shared/api-exception.model';
import { FilesService } from './files.service';
import { FileViewModel } from './view-models/file-view-model';

@Controller('files')
@ApiTags('files')
export class FilesController {
    constructor(private _fileService: FilesService){ }

    @Post()
    @UseInterceptors(FilesInterceptor('photo'))
    @ApiBadRequestResponse({ type: ApiException })
    @ApiCreatedResponse({ type: FileViewModel })
    async uploadFile(@UploadedFiles() file): Promise<FileViewModel> {

        if (!file) {
            throw new HttpException('file is required', HttpStatus.BAD_REQUEST);
        }

        try {
            const filesResult = await this._fileService.uploadFile(file);
            return filesResult;

        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }
}
