import { ObjectType,Field,ID, Int, Float } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";
import { IsEmail } from "class-validator";
import { ReadOnly } from "../../decorator/readonly";

@Entity()
@ObjectType()
export default class User implements User{
    @Column()
    @Field(type => Int)
    id!:number

    @Column()
    @Field()
    name!:String

    @Column()
    @Field()
    lolName!:String

    @PrimaryColumn("varchar", { length: 50 })
    @Field()
    @IsEmail()
    email!:String
  
    @Column("varchar", { length: 5 })
    @Field()
    sex!:String

    @Column({ default: false })
    @Field()
    isAddInfo!:boolean

    /* 해당 함수를 사용 시 위에 없는 필드값으로 들어올 시 그 이름으로 들어간다. */
    setData(data: object): void {
        const _self = this;

        for (let [key,value] of Object.entries(data)) {
            (<any>_self)[key] = value;
        }
    }

    

}