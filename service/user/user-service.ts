import fakeDatabase from '../../database/fakedatabase';

export default class UserSerivce{
    constructor(){

    }

    findById(id:number):object | undefined{
         const data: object|undefined = fakeDatabase.find((elem:any) => {
            return elem.id == id;
        });

        return data;
    }
}