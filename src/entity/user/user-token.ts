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
    @Field()
    @IsEmail()
    email!:String

    @Column("varchar", { length: 100 })
    @Field()
    accessToken!:String
    
    @Column({type:'date'})
    @Field()
    expire!:Date

    @Column("varchar", { length: 200 })
    @Field()
    Identifier!:string
}