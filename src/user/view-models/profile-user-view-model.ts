import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../models/user-role.enum';
import { EnumToArray } from 'src/shared/utilities/enum-to-array';

export class ProfileUserViewModel {
    @ApiProperty()
    firstName?: string;

    @ApiProperty()
    lastName?: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    username: string;

    @ApiProperty({ enum: EnumToArray(UserRole) })
    role?: UserRole

    @ApiProperty()
    id: string
}