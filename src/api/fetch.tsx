import axios from 'axios';
import {stringify, parse} from 'qs';



declare global {
    interface Window { decodeURIComponent: any; }
}

const setUrlPrmt = (obj: any)=> {
    let _rs = [];
    for (let p in obj) {
        if (obj[p] != null && obj[p] !== '') {
            _rs.push(p + '=' + obj[p])
        }
    }
    return _rs.join('&');
}

const getUrlPrmt = (url: string)=> {
    url = url ? url : window.location.href;
    let _pa = url.substring(url.indexOf('?') + 1), _arrS = _pa.split('&'), _rs: any = {};
    for (let i = 0, _len = _arrS.length; i < _len; i++) {
        let pos = _arrS[i].indexOf('=');
        if (pos == -1) {
            continue;
        }
        let name = _arrS[i].substring(0, pos), value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
    }
    return _rs;
}

const pardata = (data: any, type: string) => {
    let d = type === 'GET' ? { method: type, headers: { "Content-type": 'application/json' }} :
        { method: type, data: data, headers: { "Content-type": 'application/json' }}
    return d;
}

const instance = axios.create({
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    timeout: 30000,
    baseURL: process.env.NODE_ENV === "development" ? '/api' : '',
})

instance.interceptors.request.use((config: any) => {
    return config
})

instance.interceptors.response.use((response: any) => {
    return response
})


const fetchAjax = (url: string, method: string, params?: any) => {
    let par = method === 'GET' ? setUrlPrmt(params) : '',
        prmt = method === 'GET' ? getUrlPrmt(url) : '';
    if(Object.keys(prmt).length > 0) {
        url += `&${par}`
    } else {
        url += !par ? '' :`?${par}`
    }
    return instance(url, pardata(params, method)).then((res: any) => res.data)
}

export default fetchAjax