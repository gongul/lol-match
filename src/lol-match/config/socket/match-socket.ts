import socketIO from 'socket.io';
import { Inject } from 'typedi';
import { MatchServiceImpl } from '../../service/match/match-service';
import MatchEntity from '../../entity/match/match';
import UserEntity from '../../entity/user/user';
import { validate } from 'class-validator';
import { MatchList, MatchListValue, MatchRequset } from 'interface/match-list';

export default class MatchSocket{
    @Inject("matchService")
    private matchService!:MatchServiceImpl;
    private matchSpace!:SocketIO.Namespace;
    private matchList:MatchList = {};

    /**
    * 매치 소켓 시작
    *  
    * @param io socketIO.Server 매치 소켓서버를 시작함
    * 
    */
    boot(io:SocketIO.Server){
        if(this.matchSpace){return false;}

        this.matchSpace = io.of('/match').on('connection',(socket) => {
            let matchInfo:MatchEntity;  // disconnect 이벤트에서 데이터 삭제를 위한 변수
            
            socket.on('disconnect', (msg) =>{
                this.disconnect(matchInfo);
            });
            
            socket.on('joinRoom', (req) => {
                socket.join(req.id,async () => { 
                    req['matchList'] = this.matchList;

                    const result = await this.match(req,socket);
                    
                    if(result != undefined) matchInfo = result;
                });
            });
        });
       
    }

    /**
    * 소켓에 접속하고 나서 매치를 시작하는 기능
    *  
    * See {@link beforeMatch}
    * @param req  MatchRequset  매치에 필요한 User,MatchEntity가 들어가 있다
    * @param scoket socketIO.Socket 
    */

    @beforeMatch()
    private async match(req:MatchRequset,socket:socketIO.Socket):Promise<MatchEntity|undefined>{
        const {match,user} = req;

        if(user.sex == undefined) return;

        try{
            const duo = await this.matchService.findMatchDuo(user.sex);
            
            if(duo){
                await this.success(duo,user,socket);
                return;
            }

            return await this.queue(match,socket);
        }catch(e){
            console.log(e);
            socket.emit('chat message', '에러가 났습니다 재접속 부탁드립니다.');
        }

    }

    /**
    * 소켓이 끊길 때 매치큐에 있다면 해당 정보를 삭제함.
    * 
    * @param match  MatchEntity 매치큐에 있던 삭제 할 정보
    * 
    */
    private disconnect(match:MatchEntity):undefined|void{    
        if(!match) return;
        
        delete this.matchList[match.user.email];
        
        try{
            this.matchService.delete(match);
        }catch(e){
            console.log("소켓 끊기전 유저 삭제 실패");
        }
    }

    /**
    * 매치가 끝나고 마무리 작업
    * 
    * @param duo  MatchEntity 듀오 정보
    * @param user User 매치에 접속한 유저 정보
    * @param socket SocketIO.Socket 매치가 끝나고 접속을 끊기위해
    * 
    */
    private async success(duo:MatchEntity,user:User,socket:SocketIO.Socket):Promise<void>{
        await this.matchService.delete(duo);

        const duoEmail = duo.user.email;
        const duoSocket:socketIO.Socket = this.matchSpace.sockets[this.matchList[duoEmail].socketId];

        socket.emit('chat message', '매치가 잡혔습니다, 상대방의 정보를 확인해주세요.');
        socket.emit('chat message', duo.user);

        duoSocket.emit("chat message","매치가 잡혔습니다, 상대방의 정보를 확인해주세요.");
        duoSocket.emit("chat message",user);

        socket.disconnect();
        duoSocket.disconnect();
    }


    /**
    * 유저를 매치큐에 넣는다.
    * 
    * @param match  MatchEntity 매치큐에 넣기 위한 매치정보
    * @param socket SocketIO.Socket 유저한테 메시지를 날리기 위해
    * 
    */
    private async queue(match:MatchEntity,socket:SocketIO.Socket):Promise<MatchEntity>{
        await this.matchService.save(match);
                        
        this.matchList[match.user.email] = {match:match,socketId:socket.id};

        socket.emit('chat message', '현재 적합한 유저가 없습니다 기다려주세요');

        return match;
    }
}

/**
* 매치 시작전에 유효성 검사랑 데이터 구조화를 시켜준다.
* 
* @param match  MatchEntity
* @param socket SocketIO.Socket 
* 
*/
function beforeMatch(){
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(... params: any[])=> Promise<any>>) => {
        const originalMethod = descriptor.value;

        if(originalMethod == undefined) return;
        
        descriptor.value = async function(...args:any[]){
            const {email,sex,matchList} = args[0];
            const socket = args[1];
            const user = new UserEntity({email:email,sex:sex});
            const match = new MatchEntity(user);
            const isValid = await validate(user);
            const validStatus:any = {msg:"",flag:true};
        
            if(isValid.length > 0 || user.sex == undefined){ // 유저 정보가 정상적이지 않을 때 
                validStatus.msg = '정상적인 데이터가 아닙니다.';
                validStatus.flag = false;
            } else if(matchList[user.email] != undefined){ // 매치에 들어가있는데 똑같은 이메일로 또 들어왔을 때 
                validStatus.msg = '이미 접속중인 계정입니다.';
                validStatus.flag = false;
            }

            if(!validStatus.flag){   //유효성 검사를 통과 못 했을때
                socket.emit("chat message",validStatus.msg);
                socket.disconnect();
                
                return;
            } 
            

            args[0] = {user:user,match:match};
            const result = await originalMethod.apply(this, args);


            return result;
        }

     
        return descriptor;
    }
}