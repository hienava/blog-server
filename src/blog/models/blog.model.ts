import { BaseModel, schemaOptions } from '../../shared/base.model';
import { prop, ModelType } from '@hasezoey/typegoose';

export class Blog extends BaseModel<Blog> {

    @prop({ required: [true, 'Title is required'] })
    title: string;

    @prop({
        required: [true, 'Body is required'],
        maxlength: [5000, 'E-mail Must be no more than 5000 characters']
    })
    body: string;

    @prop({ required: [true, 'Country is required'] })
    country: string;

    @prop({ required: [true, 'City is required'] })
    city: string;

    createdBy?: string;
    travelDate?: string;
    urlPicture?: string;
    urlPhotoAlbum?: string;

    static get model(): ModelType<Blog> {
        return new Blog().getModelForClass(Blog, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    }


}