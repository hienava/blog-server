import { User } from "../models/user.model";
import { UserViewModel } from "../view-models/user-view-model";


export class MapperUser {
    static mapUser(user: User): UserViewModel {
        const userVM: UserViewModel = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.firstName + ' ' + user.lastName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            id: user.id,
            role: user.role

        };
        return userVM;

        }


}