import fakeDatabase from '../../database/fakedatabase';
import Container from '../../Container';
import { Service } from '../../decorator/service';

@Service()
export default class UserSerivce implements UserService{
    private container!:Container;

    constructor(){
        this.container = Container.getInstance();
    }

    findById(id:number):object | undefined{
         const data: object|undefined = fakeDatabase.find((elem:any) => {
            return elem.id == id;
        });

        return data;
    }
}