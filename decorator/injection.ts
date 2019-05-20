import { ClassType } from "type-graphql";
import { DescriptionOptions } from "type-graphql/dist/decorators/types";


const Injection = (injectionClass:ClassType):Function => {  
    return (target:any, propertyKey: string, descriptor: DescriptionOptions) => {
        target[propertyKey] = new injectionClass();
    }
}

export {Injection}