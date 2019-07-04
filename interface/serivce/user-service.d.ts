interface UserService<T extends User>{
    /**
    * 이메일 기준으로 유저를 찾는다.
    * 
    * @param email  user email
    * 
    */
    findByEmail(email:string):Promise<User|undefined>;

    /**
    * 유저를 데이터베이스에 삽입 한다.
    * 기존 데이터가 있을 시 업데이트 한다
    * 
    * @param entity  User를 상속한 모든 객체
    * 
    */
    save(entity:T):Promise<T>;


    /**
    * 유저를 데이터베이스에 삽입 한다.
    * 중복 된 값이 있을 시 실패한다.
    * 
    * @param entity  User를 상속한 모든 객체
    * 
    */
    insert(entity:T):Promise<T>;
}
