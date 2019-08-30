import socketIO from 'socket.io';
import Container, { Inject } from 'typedi';
import { Server } from 'http';
import { MatchServiceImpl } from '../service/match/match-service';
import MatchEntity from '../entity/match/match';
import UserEntity from '../entity/user/user';
import { validate } from 'class-validator';
import { MatchList } from 'interface/match-list';
import throwTest from '../../lol-match-test/error-test';
import MatchSocket from './socket/match-socket';

export default class Socket{
    @Inject("matchService")
    private matchService!:MatchServiceImpl;

    // @Inject("userService") private userService!:UserService<UserEntity>

    init(server:Server){
        const io = socketIO(server);

        const match = Container.get(MatchSocket);
        match.boot(io);
    }
}
