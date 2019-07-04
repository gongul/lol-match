import { ObjectType,Field,ID, Int, Float } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";
import { IsEmail } from "class-validator";


@Entity()
@ObjectType()
export default class UserExtends implements User{
    @Column()
    @Field(type => Int)
    id!:number

    @Column()
    @Field()
    name!:String

    @PrimaryColumn("varchar", { length: 50 })
    @Field()
    @IsEmail()
    email!:String
  

    @Column("varchar", { length: 5 })
    @Field()
    sex!:String

    @Field()
    field!:String
}