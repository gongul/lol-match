interface UserService<T extends User>{
    /**
    * 이메일 기준으로 유저를 찾는다.
    * 
    * @param email  user email
    * 
    */
    findByEmail(email:string):Promise<User|undefined|Error>;

    /**
    * 유저 디비 저장
    * 
    * @param entity  User를 상속한 모든 객체
    * 
    */
    save(entity:T):Promise<T|Error>;
}
