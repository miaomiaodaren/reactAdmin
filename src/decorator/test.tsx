export const aa = function(target: any, property: string, descriptor: any) {
    console.info('aa')
    let oleval = descriptor.value;
    descriptor.value = function() {
        console.info('i am is aa', oleval.title)
        oleval.call(this, 'aa');
    }
    return descriptor
}

export const bb = function(target: any, property: string, descriptor: any) {
    console.info('bb');
    let oleval = descriptor.value;
    descriptor.value = function(res: any) {console.info('new value', res)}
    oleval.call(this, 'bb');
    return descriptor
}

export const cc = (data: string) => (arget: any, property: string, descriptor: any) => {
    console.info(data, 'is data', 'cc');
    let oleval = descriptor.value;
    descriptor.value = function(res: any) {console.info('new value', res, data, '我是后面执行的')}
    oleval.call(this, 'cc');
    return descriptor
}

export const dd = (data: string) => (arget: any, property: string, descriptor: any) => {
    console.info(data, 'is data', 'dd');
    let oleval = descriptor.value;
    descriptor.value = function(res: any) {console.info('new value', res, data, '我是前面执行的')}
    oleval.call(this, 'dd');
    return descriptor
}


//解惑 如何叫先进入后执行   后面那个带三个参数的方法是 从内到外执行的。
//向上面的这种是都只会从里面执行

export const ee = (data: string) => {
    console.info('我是先进入的')
    return (arget: any, property: string, descriptor: any) => {
        console.info('我是后执行的')
    }
}