import { prop, ModelType } from '@hasezoey/typegoose';
import { BaseModel, schemaOptions } from '../../shared/base.model';
import { UserRole } from './user-role.enum';


export class User extends BaseModel<User> {
    @prop({
        required: [true, 'Username is required'],
        unique: true,
        minlength: [6, 'Must be at least 6 characters'],
    })
    username: string;

    @prop({
        required: [true, 'email is required'],
        unique: true,
        minlength: [5, 'E-mail Must be at least 5 characters'],
        maxlength: [30, 'E-mail Must be no more than 30 characters']

    })
    email: string;
    
    @prop({
        required: [true, 'Password is required'],
        minlength: [6, 'Must be at least 6 characters'],
    })
    password: string;

    @prop()
    firstName?: string;

    @prop()
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