"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const User = __importStar(require("../../entity/user/user"));
const fakedatabase_1 = __importDefault(require("../../database/fakedatabase"));
let RecipeResolver = class RecipeResolver {
    constructor() { }
    user(id) {
        // const recipe =  this.recipeService.findById(id);
        // if (recipe === undefined) {
        //     throw new RecipeNotFoundError(id);
        // }
        // return recipe;
        const data = fakedatabase_1.default.find((elem) => {
            return elem.id == id;
        });
        return data;
    }
};
__decorate([
    type_graphql_1.Query(returns => User.User),
    __param(0, type_graphql_1.Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RecipeResolver.prototype, "user", null);
RecipeResolver = __decorate([
    type_graphql_1.Resolver(User.User),
    __metadata("design:paramtypes", [])
], RecipeResolver);
exports.RecipeResolver = RecipeResolver;
// const resolvers = {
//   Query: {
//       user(_, { id }) {
//           const data: string = Object.keys(fakeDatabase).find((value) => {
//               if (fakeDatabase[value].id == id) {
//                   return true;
//               }
//           });
//           return fakeDatabase[data];
//       },
//       allUser() {
//           return fakeDatabase;
//       }
//   }
// };
