//http://taobaofed.org/blog/2016/11/17/react-components-communication/  灵感来自于淘宝前端  
// 与之前学习的vue的watch的订阅者模式是大致一样的。
const eventProxy = {
    onObj: {},
    oneObj: {},
    on: function(key: any, fn: any) {
        if(this.onObj[key] === undefined) {
            this.onObj[key] = [];
        }
        this.onObj[key].push(fn);
    },
    one: function(key: string, fn: Function) {
        if(this.oneObj[key] === undefined) {
            this.oneObj[key] = [];
        }
        this.oneObj[key].push(fn)
    },
    off: function(key: string) {
        this.onObj[key] = [];
        this.oneObj[key] = [];
    },
    trigger: function(a: any, b: any) {
        let key, args;
        if(arguments.length == 0) {
            return false;
          }
        key = arguments[0];
        args = [].concat(Array.prototype.slice.call(arguments, 1));
        if(this.onObj[key] !== undefined
            && this.onObj[key].length > 0) {
            for(let i in this.onObj[key]) {
              this.onObj[key][i].apply(null, args);
            }
        }
        if(this.oneObj[key] !== undefined && this.oneObj[key].length > 0) {
            for(let i in this.oneObj[key]) {
                this.oneObj[key][i].apply(null, args);
                this.oneObj[key][i] = undefined;
            }
            this.oneObj[key] = [];
        }
    }
}

export default eventProxy;