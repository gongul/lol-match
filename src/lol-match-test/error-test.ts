import Container from "typedi";
import UserEntity from "../lol-match/entity/user/user";


export default function throwTest(){

    throw new Error("test error");

    
}