export default class $GBK {
    static _fastGbk: any;
    static get fastGbk() {
        if(!this._fastGbk){
            throw new Error("请先调用setFaskGbk方法设置fastGbk::$GBK.setFaskGbk(require('fast-gbk'))");
        }
        return this._fastGbk
    }
    static setFaskGbk(fastGbk:any) {
        this._fastGbk = fastGbk;
    }

    /**
     * 编码gbk字符串
     * @param str
     */
    static encode(str:string) {
        return $GBK.fastGbk.encode(str);
    }

    /**
     * 解码gbk字符串
     * @param data 可以传入 %aa%af%af%af, ["aa", "af"], [255,210], "aa,af"4种类型的字符串
     * @returns {undefined}
     */
    static decode(data:string|string[]|number[]) {
        if (!data || !data.length) {
            return "";
        }

        if (typeof data == "string") {
            if (/^\%/.test(data)) {
                data = data.split("%").splice(1)
            }else{
                data = data.split(",");
            }
        }

        let ret:string = "";

        if(Array.isArray(data)){
            if (typeof data[0] == "number") {
                ret = this.fastGbk.decode(data);
            }else{
                const a = data.map((n:string|number) => {
                    if (typeof n == "number") {
                        console.warn("decodeGBK传入的数组中有number类型的数据，这是不允许的，会导致解码错误");
                        n=n+""
                    }
                    let ret = parseInt(n, 16);
                    if (isNaN(ret)) {
                        return 0
                    }else {
                        return ret;
                    }
                })

                ret = $GBK.decode(a);
            }
        }
        return ret
    }
}

