import ErrorCode from "./error-code";

class ErrorFrame extends Error {
    public statusCode:number;

    constructor(message:string,status:number) {
        if (new.target === ErrorFrame)
            throw new TypeError('Abstract class "ExtendableError" cannot be instantiated directly.');
    
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = status;
    }

    setMessage(message:string){
        this.message = message;
    }
}

class ValidationError extends ErrorFrame{
    constructor(message?:string){
        super(message || ErrorCode.VALIDATION.MESSAGE,ErrorCode.VALIDATION.CODE);
        this.name = "ValidationError";
    }
}

class QueryError extends ErrorFrame{
    constructor(message?:string){
        super(message || ErrorCode.QUERY_ERROR.MESSAGE,ErrorCode.QUERY_ERROR.CODE);
    }
}

class NotFoundError extends ErrorFrame{
    constructor(message?:string){
        super(message || ErrorCode.NOT_FOUND.MESSAGE,ErrorCode.NOT_FOUND.CODE);
    }
}

class InternalServerError extends ErrorFrame{
    constructor(message?:string){
        super(message || ErrorCode.SERVER_ERROR.MESSAGE,ErrorCode.SERVER_ERROR.CODE);
    }
}

class UnauthrizedError extends ErrorFrame{
    constructor(message?:string){
        super(message || ErrorCode.UNAUTHRIZED.MESSAGE,ErrorCode.UNAUTHRIZED.CODE);
    }
}


class NoDataError extends ErrorFrame{
    constructor(message?:string){
        super(message || ErrorCode.UNAUTHRIZED.MESSAGE,ErrorCode.UNAUTHRIZED.CODE);
    }
}

export {NoDataError,QueryError,NotFoundError,ValidationError,UnauthrizedError,InternalServerError,ErrorFrame};