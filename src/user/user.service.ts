import { Injectable, HttpException, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { BaseService } from '../shared/base.service';
import { User } from './models/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@hasezoey/typegoose';
import { RegisterViewModel } from './view-models/register-view-model';
import { compare, genSalt, hash } from 'bcryptjs';
import { LoginViewModel } from './view-models/login-view-model';
import { LoginResponseViewModel } from './view-models/login-response-view-model';
import { JwtPayload } from 'src/shared/auth/jwt-payload';
import { UserViewModel } from './view-models/user-view-model';
import { AuthService } from 'src/shared/auth/auth.service';
import { MapperUser } from './mapper/mapperUser';



@Injectable()
export class UserService extends BaseService<User> {
    constructor(@InjectModel(User.modelName) private readonly _userModel: ModelType<User>,
         @Inject(forwardRef(() => AuthService))
        readonly _authService: AuthService,) {
        super();
        this._model = _userModel;
    }

    async register(vm: RegisterViewModel) {
        const { username, password, firstName, lastName, email } = vm;

        const newUser = this._model();
        newUser.username = username.trim().toLowerCase();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;

        const salt = await genSalt(10);
        newUser.password = await hash(password, salt);

        try {
            const result = await this.create(newUser);
            return result.toJSON() as User;
        } catch (e) {
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(vm: LoginViewModel): Promise<LoginResponseViewModel> {
        const { username, password } = vm;

        const user = await this.findOne({ username });

        if (!user) {
            throw new HttpException('Invalid crendentials', HttpStatus.NOT_FOUND);
        }

        const isMatch = await compare(password, user.password);

        if (!isMatch) {
            throw new HttpException('Invalid crendentials', HttpStatus.BAD_REQUEST);
        }

        const payload: JwtPayload = {
            username: user.username,
            role: user.role,
        };

        const token = await this._authService.signPayload(payload);
        
        const userVm: UserViewModel = await MapperUser.mapUser(user.toJSON());
        return {
            token,
            user: userVm,
        };
    }    

}
