"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fakedatabase_1 = __importDefault(require("../../database/fakedatabase"));
class UserSerivce {
    constructor() {
    }
    findById(id) {
        const data = fakedatabase_1.default.find((elem) => {
            return elem.id == id;
        });
        return data;
    }
}
exports.default = UserSerivce;
