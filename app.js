"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const index_1 = __importDefault(require("./router/index"));
const type_graphql_1 = require("type-graphql");
const app = express_1.default();
app.listen(4000);
app.graph = function (url, schemaClass, option) {
    return __awaiter(this, void 0, void 0, function* () {
        const schema = yield type_graphql_1.buildSchema({
            resolvers: [schemaClass],
        });
        option['schema'] = schema;
        this.use(url, express_graphql_1.default(option));
    });
};
index_1.default(app);
console.log("Running a GraphQL server");
