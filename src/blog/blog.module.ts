import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog } from './models/blog.model';


@Module({
  imports: [MongooseModule.forFeature([{ name: Blog.modelName, schema: Blog.model.schema }])],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService]
})
export class BlogModule {}
