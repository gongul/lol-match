import { ObjectType,Field,ID, Int, Float } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";
import { IsEmail } from "class-validator";
import UserEntity from "src/lol-match/entity/user/user";


@Entity()
@ObjectType()
export default class UserExtends extends UserEntity{
    lolName!: String;
    isAddInfo!: boolean;
   
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
    field?:String
}