const Service = ():Function => {  
    return (target:any) => {
        console.log(target);
    }
}

export {Service}