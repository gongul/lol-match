"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Injection = () => {
    return (target, propertyKey, descriptor) => {
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);
        console.log(target[propertyKey]);
        // target[propertyKey] = new injectionClass();
        // descriptor.ㄷ
    };
};
exports.Injection = Injection;
