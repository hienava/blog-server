  
import { ApiProperty } from '@nestjs/swagger';

export class ProfileViewModel {
    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;
}