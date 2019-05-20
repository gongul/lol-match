import { ObjectType,Field,ID, Int, Float } from "type-graphql";

@ObjectType()
export class Recipe {
  @Field(type => ID)
  id!: string;

  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  creationDate!: Date;

  @Field(type => [String])
  ingredients!: string[];
}

@ObjectType()
export class Geo{
  @Field(type => Float)
  lat!: number;

  @Field(type => Float)
  lng!: number;
}
@ObjectType()
export class Company{
  @Field()
  name!:String

  @Field()
  catchPhrase!:String

  @Field()
  bs!:String
}

@ObjectType()
export class Address{
  @Field()
  street!:String
  
  @Field()
  suite!:String

  @Field()
  city!:String

  @Field()
  zipcode!:String

  @Field(type => Geo)
  geo!:Geo
}

@ObjectType()
export class User{
  @Field(type => Int)
  id!:number

  @Field()
  name!:String

  @Field()
  username!:String

  @Field()
  email!:String

  @Field(type => Address)
  address!:Address

  @Field()
  phone!:String
  
  @Field()
  website!:String

  @Field(type => Company)
  company!:Company
}