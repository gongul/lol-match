import fakeDatabase from '../../database/fakedatabase';
import { Service } from "typedi";

@Service("userService")
export class UserServiceImpl implements UserService{
    findById(id:number):object | undefined{
         const data: object|undefined = fakeDatabase.find((elem:any) => {
            return elem.id == id;
        });

        return data;
    }
}
