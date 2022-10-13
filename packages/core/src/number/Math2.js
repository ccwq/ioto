import chunk from "lodash/chunk";
import NumberUtils from "../number/NumberUtils";


const preZeroFill = NumberUtils.preZeroFill;



export default class Math2 {

    /**
     * js小数修正  0.1 + 0.2 = 0.30000000000000004 结果修正为0.3
     */
    static strip(num, precision = 12) {
        return +parseFloat(num.toPrecision(precision));
    }

    /**
     * 转换二进制字符串位十进制数组
     * @param string
     * @returns {number[]}
     */
    static hexString2DecLs(string){
        return chunk(string, 2).map(el=>parseInt(el.join(""), 16))
    }

    /**
     * 16进制转10进制数组
     * @param {*} string 
     */
    static hexString(string){
        return string.map(el=>parseInt(el, 16))
    }

    /**
     * 十进制转换成确定唱的的16进制
     * @param number
     * @param length
     * @param chunk2  使用逗号,两个一组分割
     * @returns {*}
     */
    static toHEX(number, length = 2, chunk2 = false) {

        if (/[a-zA-Z]/.test(number)) {
            console.warn("无法转换为HEX:", number);
        }

        number = parseInt(number);

        if (number >= Math.pow(2, 8)) {
            length = 4;
        }

        let ret = this.dec2HexArray(number, length)[0];

        if (chunk2) {
            ret = chunk(ret, 2).map(el => preZeroFill(2, el.join(""))).join(",");
        }
        return ret;
    };


    /**
     * 数字列表转换为hex列表，如果元素为数组，原样输出数组的第一个元素
     * @param ls
     * @param jumpTrsformArray
     * @param length
     * @param chunk2
     */
    static toHEXLs(ls, length = 2, chunk2 = false) {
        return ls.map(number =>{
            if (Array.isArray(number)) {
                return number[0];
            }
            return this.toHEX(number, length, chunk2);
        })
    };


    /**
     * 十进制转16进制数组
     * @param dec 十进制数字
     * @param itemLength 数组每个项的长度
     * 255->["FF"]
     * 1=>["01"]
     * 1, 4=>["0001"]
     */
    static dec2HexArray(dec, gpItemLength = 2) {
        let hex = parseInt(dec + "").toString(16).toUpperCase();
        let ls = chunk(hex, gpItemLength).map(el => el.join(""));
        ls.splice(0, 1, preZeroFill(gpItemLength, ls[0]));
        return ls;
    };

    /**
     * 字符串前面补0
     * @param value
     * @param length
     * @returns {*}
     */
    static fillZ(value, length=2) {
        return preZeroFill(length, value);
    }

    static fillZForLs(ls, length=2){
        const m = this;
        for (let i = 0; i < ls.length; i++) {
            let v = ls[i];
            ls.splice(i, 1, m.fillZ(v))
        }
        return ls;
    }


    /**
     * 获取数字的小数部分
     * @param floatNumber
     * @returns {number}
     */
    static pickDec(floatNumber){
        return floatNumber - Math.trunc(floatNumber);
    }

    static toDEC(str, fromBase=16){
        return parseInt(str, fromBase);
    }
}

window._Math2 = Math2;