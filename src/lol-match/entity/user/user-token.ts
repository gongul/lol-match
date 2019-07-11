import { ObjectType,Field,ID, Int, Float } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToMany } from "typeorm";
import { IsEmail } from "class-validator";
import User from "./user";


/* 현재는 sqllite 기준으로 컬럼을 잡았지만 실 서버에 들어가면 mysql 기준으로 컬럼을 변환해야 한다. */

@Entity()
@ObjectType()
export default class UserToken{
    @PrimaryColumn("varchar",{length:100})
    @Field()
    token!:String

    @OneToMany(type => User, user => user.email)
    @Field(type => [User])
    @IsEmail()
    email!:User[]

    @Column("varchar", { length: 100 })
    @Field()
    accessToken!:String
    
    @Column()
    @Field(type => Int)
    expire!:number

    @Column("varchar", { length: 200 })
    @Field()
    Identifier!:string

    constructor(args: object|UserToken|void){
        if(args != undefined) this.setData(args);
    }

     /* 해당 함수를 사용 시 위에 없는 필드값으로 들어올 시 그 이름으로 들어간다. */
     setData(data: object|UserToken): this {
        const _self = this;

        for (let [key,value] of Object.entries(data)) {
            (<any>_self)[key] = value;
        }

        return this;
    }
}