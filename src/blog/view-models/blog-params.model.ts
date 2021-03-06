import { ApiProperty } from '@nestjs/swagger';

export class BlogParams {
    @ApiProperty({ example: 'El mejor título del siglo' }) title: string;
    @ApiProperty({ example: 'Einstein' }) body: string;
    @ApiProperty({ example: 'Denmark' }) country: string;
    @ApiProperty({ example: 'Copenague' }) city: string;
    @ApiProperty({ example: 'Peter' }) createdBy: string;

}