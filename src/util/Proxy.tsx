const eventProxy = {
    onObj: {},
    on: function(key: any, fn: any) {
        if(this.onObj[key] === undefined) {
            this.onObj[key] = [];
        }
        this.onObj[key].push(fn);
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
    }
}

export default eventProxy;