const ReadOnly = ():Function => {  
    return (target:any, propertyKey: any, descriptor: any) => {
       console.log(target);
       console.log(propertyKey);
       console.log(descriptor)
    }   
}

export {ReadOnly}
