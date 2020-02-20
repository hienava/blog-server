import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../models/user-role.enum';
import { BaseViewModel } from '../../shared/base.model';
import { EnumToArray } from '../../shared/utilities/enum-to-array';


export class UserViewModel extends BaseViewModel {
    @ApiProperty() 
    username: string;
    @ApiPropertyOptional() 
    firstName?: string;
    @ApiPropertyOptional() 
    lastName?: string;
    @ApiPropertyOptional() 
    fullName?: string;
    @ApiPropertyOptional({ enum: EnumToArray(UserRole) })
    role?: UserRole;
}