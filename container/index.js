"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Container {
    constructor() { }
    static getInstance() {
        if (this.container == null || this.container == undefined)
            this.container = new Container();
        return this.container;
    }
    ;
}
exports.default = Container;
