import { ClassType } from "type-graphql";
import { DescriptionOptions } from "type-graphql/dist/decorators/types";
import { Interface } from "readline";


const Injection = ():Function => {  
    return (target:any, propertyKey: string, descriptor: DescriptionOptions) => {
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);

        console.log(target[propertyKey]);
        // target[propertyKey] = new injectionClass();

        // descriptor.ㄷ
    }
}

export {Injection}