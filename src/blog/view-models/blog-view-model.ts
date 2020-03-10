import { BaseViewModel } from '../../shared/base.model';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BlogViewModel extends BaseViewModel {
    @ApiProperty() title: string;
    @ApiProperty() body: string;
    @ApiProperty() country: string;
    @ApiProperty() city: string;
    @ApiProperty() createdBy: string;
    //big dependence with id of mongo and front (Need to check and modify in a future)
    @ApiPropertyOptional() _id?: string;
    @ApiPropertyOptional() travelDate?: string;
    @ApiPropertyOptional() urlPicture?: string;
    @ApiPropertyOptional() urlPhotoAlbum?: string;



}