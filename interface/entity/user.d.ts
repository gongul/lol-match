interface User{
    id:number
    name:String
    lolName?:String
    email:String
    sex?:String
    isAddInfo:boolean

    setData(data: object): this;
}