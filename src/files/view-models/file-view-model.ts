
import { ApiProperty } from '@nestjs/swagger';

export class FileViewModel {
    @ApiProperty()
    originalName: string;

    @ApiProperty()
    fileName: string;

    @ApiProperty()
    size: number;


}