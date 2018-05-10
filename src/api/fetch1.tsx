declare global {
    interface Window { decodeURIComponent: any; }
}

const pardata = (data: any, type: string) => {
    let d = type === 'GET' ? { method: type, headers: { "Content-type": 'application/json' }} :
         { method: type, body: JSON.stringify(data), headers: { "Content-type": 'application/json' }}
    return d;
}

//设置url参数
//setUrlPrmt({'a':1,'b':2})
//a=1&b=2
export const setUrlPrmt = (obj: any)=> {
    let _rs = [];
    for (let p in obj) {
        //此处用!==''来强制判断一定是空，防止传入的值为false的时候会进不到逻辑
        if (obj[p] != null && obj[p] !== '') {
            _rs.push(p + '=' + obj[p])
        }
    }
    return _rs.join('&');
}

//获取url参数
//getUrlPrmt('segmentfault.com/write?draftId=122000011938')
//Object{draftId: "122000011938"}
export const getUrlPrmt = (url: string)=> {
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


const newFetch = (url: string, params: any, type= "GET") => {
    let par = type === 'GET' ? setUrlPrmt(params) : '',
        prmt = type === 'GET' ? getUrlPrmt(url) : '';
    if(Object.keys(prmt).length > 0) {
        url += `&${par}`
    } else {
        url += !par ? '' :`?${par}`
    }
    return fetch(url, pardata(params, type)).then(res => res.json())
}

export default newFetch