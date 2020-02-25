import { SchemaOptions } from 'mongoose';
import {ApiPropertyOptional } from '@nestjs/swagger';
import { Typegoose, prop } from '@hasezoey/typegoose';

export class BaseModel<T> extends Typegoose {
    @prop({default: Date.now()})
    createdAt?: Date;

    @prop({default: Date.now()})
    updatedAt?: Date;

    id?: string;
}

//ViewModel because it is possible to get access through a Front Application
export class BaseViewModel {
    @ApiPropertyOptional({type: String, format: 'date-time'})
    createdAt?: Date;

    @ApiPropertyOptional({type: String, format: 'date-time'})
    updatedAt?: Date;

    @ApiPropertyOptional()
    id?: string;
}

export const schemaOptions: SchemaOptions = {

    ToJSON: {
        virtuals: true,
        getters: true,
    },

};