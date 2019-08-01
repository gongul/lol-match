import { GraphQLError } from 'graphql';
import Email from '../../entity/util/email';
import { validate } from 'class-validator';

export function isEmail(context:any) {// 필드 이름이 이메일이면 해당 문자열 데이터가 이메일 형식인지 체크한다
    return {
        Field(node:any){
            if(node.arguments == undefined || node.arguments.length == 0) return;

            for(const arg of node.arguments){
                const name = arg.name.value;
                const value =  arg.value.value;

                if(name == "email"){
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    
                    if(!re.test(String(value).toLowerCase())){
                        context.reportError(
                            new GraphQLError(
                                `Validation: It is not email.`,
                            ),
                        );
                    }
                }
            }
        },
    };
}