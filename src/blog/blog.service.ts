import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { BaseService } from '../shared/base.service';
import { Blog } from './models/blog.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@hasezoey/typegoose';
import { BlogParams } from './view-models/blog-params.model';

@Injectable()
export class BlogService extends BaseService<Blog>{
    
    constructor(@InjectModel(Blog.modelName) private readonly _blogModel: ModelType<Blog>) {
   super();
   this._model = _blogModel;
}

async newBlog(params: BlogParams): Promise<Blog> {

    const newBlog = new this._model();

    newBlog.title = params.title;
    newBlog.body = params.body;
    newBlog.country = params.country;
    newBlog.city = params.city;
    newBlog.createdBy = params.createdBy;

    try {
        const result = await this.create(newBlog);
        return result.toJSON() as Blog;
    }
    catch(e) {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);

    }


}




}
