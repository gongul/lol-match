import fakeDatabase from '../../database/fakedatabase';
import { Service } from "typedi";
import { getManager, Repository } from "typeorm";
import Test from "../../entity/user/test";

@Service("userService")
export class UserServiceImpl implements UserService{
    async findById(id:number):Promise<any>{
        const repo:Repository<Test> = getManager().getRepository(Test);

        const a = new Test();
        a.id = 1;
        a.name = "John";

        await repo.save(a);
        const data = await repo.findOne(id);

        console.log(data);
        return data;
        //  const data: object|undefined = fakeDatabase.find((elem:any) => {
        //     return elem.id == id;
        // });

        // return data;
    }
}
