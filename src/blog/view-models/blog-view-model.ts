import { BaseViewModel } from '../../shared/base.model';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BlogViewModel extends BaseViewModel {
    @ApiProperty() title: string;
    @ApiProperty() body: string;
    @ApiProperty() country: string;
    @ApiProperty() city: string;
    @ApiProperty() createdBy: string;
    @ApiPropertyOptional() travelDate?: string;
    @ApiPropertyOptional() urlPicture?: string;
    @ApiPropertyOptional() urlPhotoAlbum?: string;



}