interface UserService<T extends User>{
    findById(id:number):Promise<User|undefined|Error>;
    save(entity:T):Promise<T|Error>;
}
