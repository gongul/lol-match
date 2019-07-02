const ReadOnly = ():Function => {  
    return (target:any, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.writable = false;
        return descriptor
    }   
}

export {ReadOnly}
