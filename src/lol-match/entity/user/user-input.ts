import { InputType, Field, Int } from "type-graphql";
import { IsEmail } from "class-validator";

@InputType()
export default class UserInput implements User{
    @Field(type => Int)
    id!:number

    @Field()
    name!:string

    @Field({ nullable: true })
    lolName?:string

    @Field()
    @IsEmail()
    email!:string
  
    @Field({ nullable: true })
    sex?:string

    @Field()
    isAddInfo!:boolean
    
     /* graphql에서 request input type으로 밖에 사용 되기 때문에 구현부에 에러 발생 */
    setData(data: object|User): this{
        throw new Error("dont use this");
    }
}