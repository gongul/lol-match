interface User{
    id:number
    name:string
    lolName?:string
    email:string
    sex?:string
    isAddInfo:boolean

    /* 해당 함수를 사용 시 위에 없는 필드값(property)으로 들어올 시 그 이름으로 들어간다. */
    setData(data: object|User): this
}