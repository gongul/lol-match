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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
let Recipe = class Recipe {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", String)
], Recipe.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Recipe.prototype, "title", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Recipe.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], Recipe.prototype, "creationDate", void 0);
__decorate([
    type_graphql_1.Field(type => [String]),
    __metadata("design:type", Array)
], Recipe.prototype, "ingredients", void 0);
Recipe = __decorate([
    type_graphql_1.ObjectType()
], Recipe);
exports.Recipe = Recipe;
let Geo = class Geo {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Float),
    __metadata("design:type", Number)
], Geo.prototype, "lat", void 0);
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Float),
    __metadata("design:type", Number)
], Geo.prototype, "lng", void 0);
Geo = __decorate([
    type_graphql_1.ObjectType()
], Geo);
exports.Geo = Geo;
let Company = class Company {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Company.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Company.prototype, "catchPhrase", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Company.prototype, "bs", void 0);
Company = __decorate([
    type_graphql_1.ObjectType()
], Company);
exports.Company = Company;
let Address = class Address {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Address.prototype, "street", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Address.prototype, "suite", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Address.prototype, "city", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Address.prototype, "zipcode", void 0);
__decorate([
    type_graphql_1.Field(type => Geo),
    __metadata("design:type", Geo)
], Address.prototype, "geo", void 0);
Address = __decorate([
    type_graphql_1.ObjectType()
], Address);
exports.Address = Address;
let User = class User {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(type => Address),
    __metadata("design:type", Address)
], User.prototype, "address", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "website", void 0);
__decorate([
    type_graphql_1.Field(type => Company),
    __metadata("design:type", Company)
], User.prototype, "company", void 0);
User = __decorate([
    type_graphql_1.ObjectType()
], User);
exports.User = User;
