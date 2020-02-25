import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { LoginViewModel } from './login-view-model';

export class RegisterViewModel extends LoginViewModel {
    @ApiPropertyOptional({ example: 'John' })
    firstName?: string;

    @ApiPropertyOptional({ example: 'Doe' })
    lastName?: string;

    @ApiProperty({ example: 'alguien@gmail.com' })
    email: string;
}