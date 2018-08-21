export const aa = function(target: any, property: string, descriptor: any) {
     console.info('aa')
     let oleval = descriptor.value;
     descriptor.value = function() {
         console.info('i am is aa', oleval.title)
         oleval.call(this, 'aa');
    }
    
}

export const bb = function(target: any, property: string, descriptor: any) {
    console.info('bb');
    let oleval = descriptor.value;
    descriptor.value = function(res: any) {console.info('new value', res)}
    oleval.call(this, 'bb');
    // return descriptor
}