import { ObjectType, Field, InputType } from "type-graphql";
import { IsEmail } from "class-validator";

@InputType()
export default class Email{
    @Field()
    @IsEmail()
    email!:string

    constructor(email:string){
        this.email = email;
    }
}