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
    name!:string

    @Column({nullable:true})
    @Field({ nullable: true })
    lolName?:string

    @PrimaryColumn("varchar", { length: 50 })
    @Field()
    @IsEmail()
    email!:string
  
    @Column("varchar", { length: 5,nullable:true })
    @Field({ nullable: true })
    sex?:string

    @Column({ default: false })
    @Field()
    isAddInfo!:boolean

    constructor(args: object|User|void){
        if(args != undefined) this.setData(args);
    }

    /* 해당 함수를 사용 시 위에 없는 필드값으로 들어올 시 그 이름으로 들어간다. */
    setData(data: object|User): this {
        const _self = this;

        for (let [key,value] of Object.entries(data)) {
            (<any>_self)[key] = value;
        }

        return this;
    }

    

}