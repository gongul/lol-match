"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Injection = (injectionClass) => {
    return (target, propertyKey, descriptor) => {
        target[propertyKey] = new injectionClass();
    };
};
exports.Injection = Injection;
