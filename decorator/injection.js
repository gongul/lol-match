"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Injection = () => {
    return (target, propertyKey, descriptor) => {
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);
        // target[propertyKey] = new injectionClass();
        // descriptor.ㄷ
    };
};
exports.Injection = Injection;
