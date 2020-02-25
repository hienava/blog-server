import { User } from "../models/user.model";
import { UserViewModel } from "../view-models/user-view-model";
import { ProfileUserViewModel } from "../view-models/profile-user-view-model";


export class MapperUser {
    static mapUser(user: User): UserViewModel {
        const userVM: UserViewModel = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            fullName: user.firstName + ' ' + user.lastName,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            email: user.email,
            id: user.id,
            role: user.role

        };
        return userVM;

        }

        static mapUserCollection(users: User[]): ProfileUserViewModel[] {
            const usersMapped: ProfileUserViewModel[] = [];

            users.forEach(element => {
                const user:ProfileUserViewModel = new ProfileUserViewModel();
                user.username = element.username;
                user.firstName = element.firstName,
                user.lastName = element.lastName,
                user.email = element.email,
                user.role = element.role,
                user.id = element.id
                usersMapped.push(user);
                
            });

            return usersMapped;
      
    
            }


}