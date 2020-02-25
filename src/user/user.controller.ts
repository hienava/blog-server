import { Body, Controller, HttpException, HttpStatus, Post, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiTags, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { User } from './models/user.model';
import { LoginResponseViewModel } from './view-models/login-response-view-model';
import { LoginViewModel } from './view-models/login-view-model';
import { RegisterViewModel } from './view-models/register-view-model';
import { UserViewModel } from './view-models/user-view-model';
import { UserService } from './user.service';
import { MapperUser } from './mapper/mapperUser';
import { ProfileUserViewModel } from './view-models/profile-user-view-model';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserRole } from './models/user-role.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../shared/guards/roles.guard';

@Controller('user')
@ApiTags('users')
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

    @ApiBearerAuth()
    @Roles(UserRole.User, UserRole.Admin)
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get()
    @ApiResponse({ status: HttpStatus.OK, type: ProfileUserViewModel, isArray: true })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException })
    @ApiOperation(GetOperationId(User.modelName, 'GetAll'))
    @ApiQuery({ name: 'id', required: false })
    async get(@Query('id') id?: string): Promise<ProfileUserViewModel[]> {
  
      let filter;
  
      if (id) {
        filter = { _id: id };
      }
 
      try {
        const users: User[] = await this._userService.findAll(filter);
        return MapperUser.mapUserCollection(users);
      }
      catch (e) {
        throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }
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