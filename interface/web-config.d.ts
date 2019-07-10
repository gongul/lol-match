import { ConnectionOptions } from "typeorm";

interface WebConfig{
    ormConfig:ConnectionOptions;
    serverPort:number;
}