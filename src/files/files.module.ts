import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { BlogModule } from '../blog/blog.module';

@Module({
    imports: [BlogModule],
    controllers: [FilesController],
    providers: [FilesService],
    exports: [FilesService]
  })
export class FilesModule {}
