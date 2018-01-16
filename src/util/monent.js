const Regx = {
    oreg: /^(\d{4})(\d{2})(\d{2})$/,    //匹配19920714
    treg: /^(\d{4})[\.|\:|\-|\/]{1}(\d{1,2})[\.|\:|\-|\/]{1}(\d{1,2})$/,   //匹配1992:07:14
    trreg: /^(\d{4})[\.|\:|\-|\/]{1}(\d{1,2})[\.|\:|\-|\/]{1}(\d{1,2})\s{1}(\d{2})[\.|\:|\-|\/]{1}(\d{2})[\.|\:|\-|\/]{1}(\d{2})$/, //匹配1992-07-14 11:25:36
}

class Monent {
    constructor(timer) {
        const self = this;
        this.NowTime = timer || new Date;
        this.defftime = 0;
        this.regData = /^(((\d{4})(\d{2})(\d{2})|((\d{4})(\.|\:|\-|\/){1}(\d{1,2})(\.|\:|\-|\/){1}(\d{1,2}))))$/;
        this.timeformt = {
            y: 31536000,
            M: 2678400,
            d: 86400,
            H: 3600,
            m: 60,
            s: 1
        };
        return function(obj) {
            if(obj) {
                self.NowTime = self.isNumber(obj) ? self.timestamp(obj) : obj;
            } else {
                self.NowTime = new Date    
            }
            return self
        }
    }
        
    each(obj, cb) {
        if(!obj) return [];
        const length = obj.length;
        let keys = Object.keys(obj);
        if(Object.prototype.toString.call(obj) === '[object Array]') {
            for(let i = 0; i < length; i++) {
                //在callback方法中返回三个参数 
                cb(obj[i], keys[i], i ,obj);
            }
        } else  {
            let resole= [];
            for(let i = 0; i < length; i++) {
                cb(obj[i], keys[i], i ,obj);
            }
        }
        return obj
    }
    
    //根据传入的type,返回时间的各值
    //FullYear(年),Month(月),Date(天),Hours(时),Minutes(分),Seconds(秒),Milliseconds(毫秒),Day(星期)
    getoftype(type, timer) {
        if(!type) return ''
        const t = timer ? timer : this;
        return new Date(t)['get' + type]()
    }

    isDate(d) {
        return d instanceof Date || Object.prototype.toString.call(d) === '[object Date]'
    }

    isNumber(v) {
        return Object.prototype.toString.call(v) === '[objcet Number]'
    }

    //日期加法
    //t 需要添加多少时间
    //p 需要添加的类型，必须严格遵守this.timeformat的规则
    //d 2017年11月1日完善了 可以支持多重的写法 比如moment().add({'H': 3, 'd': 2}), 可以接受对象
    add(p, t) {
        const self = this, len = arguments.length;
        if(len < 2) {
            if(typeof p !== 'object') return this
            //此处先用es6
            let keys = Object.keys(p);
            keys.forEach(function(n) {
                self.NowTime = self.timestamp(self.cfordate(self.NowTime) + Number(self.timeformt[n] * p[n]));
            })
            return this
        } else {
            if(!!this.timeformt[p]) {
                this.NowTime = this.timestamp(this.cfordate(this.NowTime) + Number(this.timeformt[p] * t));
            }
            return this
        }
    }

    //日期减法
    subtract(p, t) {
        const self = this, len = arguments.length;
        if(len < 2) {
            if(typeof p !== 'object') return this
            let keys = Object.keys(p);
            keys.forEach(function(n) {
                self.NowTime = self.timestamp(self.cfordate(self.NowTime) - Number(self.timeformt[n] * p[n]));
            })
            return this
        } else {
            if(!!this.timeformt[p]) {
                this.NowTime = this.timestamp(this.cfordate(this.NowTime) - Number(this.timeformt[p] * t));
            }
            return this
        }
    }

    //二者时间差
    tiemrdeff(st, et) {
        let self = this;
        const length = arguments.length;
        let fv = Object.values(this.timeformt);
        let deff =  length === 1 ? Math.abs(this.cfordate(st) - this.cfordate(this.NowTime)) : this.cfordate(et) - this.cfordate(st),
              o = ['y', 'M', 'd', 'H', 'm', 's'],
              ts = ['年', '月', '日', '时', '分', '秒'];
        // let g = get.length > 0 ? o.indexOf(get[0]) : '';
        // self.each(ts, (v, k, n ,obj) => {
        //     if(g !== '' && g !== null) {
        //         if(n <= g) {
        //             s = Math.floor(deff / fv[g]) + obj[g];
        //         }
        //     } else {
        //         s += Math.floor(deff / fv[n]) + v;
        //         deff = deff - Math.floor(deff / fv[n]) *  fv[n];
        //     }
        // })
        // ts.forEach((v, n) => {
        //     s += Math.floor(deff / fv[n]) + v;
        //     deff = deff - Math.floor(deff / fv[n]) *  fv[n];
        //     if(g !== null && n === g) {
        //         return false
        //     }
        // })
        this.defftime = deff
        return this
    }

    //格式化时间戳
    deffmart(fmt) {
        let dt = this.defftime;
        let fv = this.timeformt;
        let s = fmt;
        if(!dt) return
        const ts = ['年', '月', '日', '时', '分', '秒'],
            o = {
                "y" : Math.floor(dt / fv['y']),
                "M" : Math.floor(dt / fv['M']),
                "d" : Math.floor(dt / fv['d']),
                "H" : Math.floor(dt / fv['H']),
                "h" : Math.floor(dt / fv['h']),
                "m" : Math.floor(dt / fv['m']),
                "s" : Math.floor(dt / fv['s']),
            }
        if(!fmt) {
            ts.forEach((v, n) => {
                let timevlaue = Object.values(fv);
                s += Math.floor(dt / timevlaue[n]) + ts[n];
                dt = dt - (Number(timevlaue[n]) * Math.floor(dt / timevlaue[n]));
            })
        } else {
            for(var k in o) {
                if(fmt.length > 1) {
                    let timevlaue = Object.values(fv);
                    if(new RegExp("("+ k +")").test(fmt)) {
                        s = s.replace(RegExp.$1, Math.floor(dt / fv[k]));
                        dt = dt - (Number(fv[k]) * Math.floor(dt / fv[k]));
                    }
                    // s += Math.floor(dt / fv[k]);
                } else {
                    if(new RegExp("("+ k +")").test(fmt)) {
                        // s += Math.floor(dt / fv[k]);
                        s = s.replace(RegExp.$1, Math.floor(dt / fv[k]));
                    }
                }
            }
        }
        return s
    }

    //时间格式转换成时间戳格式
    //2017.11.6 新加判断，if没有传入参数，就以默认的this.nowtime做为参数进行转化
    cfordate(c) {
        //  Number(Date.parse(c || this.NowTime) / 1000);
        return Math.round(new Date(c || this.NowTime).getTime() / 1000);
    }

    //时间戳格式转换成Date格式
    timestamp(timer, type) {
        if(!timer) return this;
        return type ? new Date(parseInt(timer) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ') : new Date(parseInt(timer) * 1000);
    }

    begin() {
        let start = [this.getFullYear(), this.getMonth() + 1, this.getDate()].join('-');
        return new Date(start);
    }

    end() {
        return new Date([this.getFullYear(), this.getMonth() + 1, this.getDate()].join('-') + ' 23:59:59.999');
    }
    //在这边是获得时间的起始时间跟结束时间(比如要用到开始时间跟结束时间时)。 把this指定指给了this.nowtime。 发现this只能指给function() 对象。
    //获取一个时间的最起始的时间
    beginning() {
        this.NowTime = this.begin.call(this.isDate(this.NowTime) ? this.NowTime : new Date(this.NowTime));
        return this
    }
    //获取一个时间最迟的一个时间
    ending() {
        this.NowTime = this.end.call(this.isDate(this.NowTime) ? this.NowTime : new Date(this.NowTime));
        return this
    }

    //yyyy:MM:dd HH:mm:ss  转换时间格式
    // /^((\d{8}|(\d{4}(\.|\:|\-|\/){1}\d{1,2}(\.|\:|\-|\/){1}\d{1,2})))$/.test('1992/17/14')
    //2018-1-10 new Date(Date.UTC(year, month - 1, day, hour, minute, second)) 使用utc可以根据不同时间段生成一个时间格式 
    formart(fmt, timer) {
        //如果没有传入fmt则直接返回默认的格式
        fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
        //如果没有传入时间格式，则把this中的时间赋值  :ps 2017-11-27修改
        timer = timer || this.NowTime;
        //2018-1-9新增：如果传入的参数是一个类似20170714/2017-07-14这样的格式,如果有传入fmt就把这些字段进行格式化，如果没有传入则返回原数据，不进行处理
        //了解了 正则中 RegExp.$xx 的参数，是判断正则的以括号为标识进行分隔  例如： /^(\d{4})(\d{2})(\d{2}))$/.test('19920714');   RegExp.$1: 1992 
        if(this.regData.test(timer)) {
            if(/^(\d{4})(\d{2})(\d{2})$/.test(timer)) {
                return this.formart(fmt, new Date(Date.UTC(RegExp.$1 || '0000', Number(RegExp.$2) - 1 || '00', RegExp.$3 || '00')));
            } else if (/^(\d{4})[\.|\:|\-|\/]{1}(\d{1,2})[\.|\:|\-|\/]{1}(\d{1,2})$/.test(timer)) {
                return this.formart(fmt, new Date(Date.UTC(RegExp.$1 || '0000', Number(RegExp.$2) - 1 || '00', RegExp.$3 || '00')));
            }
        }
        //判断传出的timer是否为时间戳格式
        const atimer = !this.isDate(new Date(timer)) ? this.timestamp(timer) : timer;
        //如果传入了timer，则把this指向传入的时间，否则就指向monent.NowTime.
        const a = timer ? this.getoftype.bind(atimer) : this.getoftype.bind(this.NowTime);
        const o = {
            "M+" : a('Month') + 1, //月份
            "d+" : a('Date'), //日
            "h+" : a('Hours') % 12 == 0 ? 12 : a('Hours') % 12, //小时
            "H+" : a('Hours'), //小时
            "m+" : a('Minutes'), //分
            "s+" : a('Seconds'), //秒
            "q+" : Math.floor((a('Month') + 3) / 3), //季度
            "S"  : a('Milliseconds') //毫秒
        };
        const week = {
            "0" : "\u65e5",
            "1" : "\u4e00",
            "2" : "\u4e8c",
            "3" : "\u4e09",
            "4" : "\u56db",
            "5" : "\u4e94",
            "6" : "\u516d"
        };
        //表示正则表达式中的括号匹配项的结果
        if(/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (a('FullYear') + "").substr(4 - RegExp.$1.length));
        }
        if(/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[a('Day') + ""]);
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00"+ o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }

}

const moment = new Monent();
export default moment;