import { Body, Controller, HttpException, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { User } from './models/user.model';
import { LoginResponseViewModel } from './view-models/login-response-view-model';
import { LoginViewModel } from './view-models/login-view-model';
import { RegisterViewModel } from './view-models/register-view-model';
import { UserViewModel } from './view-models/user-view-model';
import { UserService } from './user.service';
import { MapperUser } from './mapper/mapperUser';

@Controller('user')
@ApiTags(User.modelName)
export class UserController {
    constructor(private readonly _userService: UserService) {}


    @Post('register')
    @ApiCreatedResponse({ type: UserViewModel })
    @ApiBadRequestResponse({ type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'Register'))
    async register(@Body() vm: RegisterViewModel): Promise<UserViewModel> {
        const { username, password } = vm;

        if (!username) {
            throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
        }

        if (!password) {
            throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
        }

        let exist;
        try {
            exist = await this._userService.findOne({ username });
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (exist) {
            throw new HttpException(`${username} exists`, HttpStatus.BAD_REQUEST);
        }

        const newUser = await this._userService.register(vm);
        console.log(newUser);
        return MapperUser.mapUser(newUser);
    }

    @Post('login')
    @ApiCreatedResponse({ type: LoginResponseViewModel })
    @ApiBadRequestResponse({ type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'Login'))
    async login(@Body() vm: LoginViewModel): Promise<LoginResponseViewModel> {
        const fields = Object.keys(vm);
        fields.forEach(field => {
            if (!vm[field]) {
                throw new HttpException(`${field} is required`, HttpStatus.BAD_REQUEST);
            }
        });

        return this._userService.login(vm);
    }
}