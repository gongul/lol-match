import { ConnectionOptions } from "typeorm";
import AppRootPath from "app-root-path";

export const productionOptions: ConnectionOptions = {
    "type": "sqlite",
    "database": "database.sqlite",
    "synchronize": true,
    "logging": false,
    "entities": [
        AppRootPath.path+"/build/lol-match/entity/**/*.js"
    ]
};

export const developmentOptions: ConnectionOptions = {
    "type": "sqlite",
    "database": "database.sqlite",
    "synchronize": true,
    "logging": false,
    "entities": [
        AppRootPath.path+"/src/lol-match/entity/**/*.ts"
    ]
};

