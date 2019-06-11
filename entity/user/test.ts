import { ObjectType,Field,ID, Int, Float } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


@Entity()
@ObjectType()
export default class User{
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id!:number

    @Column()
    @Field()
    name!:String

}