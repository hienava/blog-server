import { ApiProperty } from '@nestjs/swagger';
import { UserViewModel } from './user-view-model';

export class LoginResponseViewModel {
    @ApiProperty() token: string;

    @ApiProperty({ type: UserViewModel })
    user: UserViewModel;
}