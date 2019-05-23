import { ClassType } from "type-graphql";
import { DescriptionOptions } from "type-graphql/dist/decorators/types";
import { Interface } from "readline";
import Container from "../container";

const Service = (beanName:string):Function => {
    
    return (target:any) => {
        console.log(target);
        // console.log(propertyKey);
        // console.log(descriptor);
        // target[propertyKey] = new injectionClass();

        // descriptor.ㄷ
    }
}

export {Service}