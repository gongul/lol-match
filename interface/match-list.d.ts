import MatchEntity from "../src/lol-match/entity/match/match";

interface MatchList{
    // socketId:{[key:string]:string};
    // match:{[key:string]:MatchEntity&string};
    [key:string]:MatchListValue;
}

interface MatchListValue{
    match:MatchEntity;
    socketId:string;
}



interface MatchRequset{
    match:MatchEntity;
    user:User
}