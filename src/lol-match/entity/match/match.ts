import { ObjectType,Field,ID, Int, Float } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { IsEmail } from "class-validator";
import UserEntity from "../user/user";

@Entity()
@ObjectType()
export default class MatchEntity{
    constructor(user:User){
        this.user = user;
    }

    @OneToOne(type => UserEntity, user => user.match)
    @JoinColumn()
    @Field(type => [UserEntity])
    user!:User
    
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    idx!:number
}