import { prop, ModelType } from '@hasezoey/typegoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';
import { UserRole } from './user-role.enum';
import {AutoMap } from '@nartc/automapper';


export class User extends BaseModel {
    @prop({
        required: [true, 'Username is required'],
        unique: true,
        minlength: [6, 'Must be at least 6 characters'],
    })
    username: string;

    
    @prop({
        required: [true, 'Password is required'],
        minlength: [6, 'Must be at least 6 characters'],
    })
    password: string;

    @prop()
    @AutoMap()
    firstName?: string;

    @prop()
    @AutoMap()
    lastName?: string;

    @prop({ enum: UserRole, default: UserRole.User })
    role?: UserRole;

    @prop()
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    static get model(): ModelType<User> {
        return new User().getModelForClass(User, { schemaOptions });
    }

    static get modelName(): string {
        return this.model.modelName;
    }


}