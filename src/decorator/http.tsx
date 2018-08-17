import axios from 'axios';


export const GET = (...args: any[]) => request('get', args);
export const POST = (...args: any[]) => request('post', args);

const request = function(method: string, args?: any[]) {
    return _Request(Object.assign({}, {method},  _ParamsParse(args)))
}


// @GET('/v1/topics')
// @GET('https://cnodejs.org/api/v1/topics')
// @GET({url: '/v1/topics', params: {limit: 10}})
// @GET('/v1/topic/{topicId}')
// @GET('/v1/topic/', {name: 22, age: 33})
function _ParamsParse(args: any[]) {
    if(args.length === 0) return;
    let _url = args[0], _params;
    if(args.length === 1) {
        if(typeof _url === 'object') {
            _params = _url.params || _url.data;
            _url = _url.url
        }
    } else {
        let _newargs = Array.prototype.slice.call(args, 1, 2);
        if(typeof _newargs === 'object') {
            _params = _newargs
        }
    }
    return {
        url: _url,
        params: _params
    }
}


/**
 *
 *
 * @param {*} target   原型的prototype
 * @param {*} property 修饰的属性名字
 * @param {*} descriptor 该属性的描述对象
 */
const _Request = (args:any) => (target: any, property: string, descriptor: any) => {
    console.info(target, property, descriptor, 6666, target.Create);
    if (!descriptor) {
        process.env.NODE_ENV !== 'production' && console.warn(`http options only works on methods`);
        return;
    }

    let oldVal = descriptor.value;
    descriptor.value = function() {
        let config: any = {
            method: args.method,
            url: args.url
        }
        if(args.method === 'get') {
            config.params = args.params
        } else if(args.method === 'post') {
            config.data = args.params
        }
        const req = axios(config);
        console.info(args, 777777777, req)
        req.then((res: any) => {
            oldVal.call(this, res.data)
        }).catch((err: any) => {
            oldVal.call(this, err);
        })
    }
}

export const Create = (config: any) => (target: any, property: any, descriptor: any) => {
    console.info(target, 7777, target.prototype)
    if (!descriptor) { // 避免在方法上添加
        target.prototype.axios = target.prototype.$axios = axios.create(config);
    }
}