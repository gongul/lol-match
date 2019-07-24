interface User{
    id:number
    name:string
    lolName?:string
    email:string
    sex?:string
    isAddInfo:boolean

    setData(data: object): this;
}