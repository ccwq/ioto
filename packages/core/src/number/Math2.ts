import chunk from "lodash/chunk";


import {
    preppendZero,
} from "./index"


export default class Math2 {

    /**
     * js小数修正  0.1 + 0.2 = 0.30000000000000004 结果修正为0.3
     */
    static strip(num:number, precision = 12) {
        return +parseFloat(num.toPrecision(precision));
    }

    /**
     * 转换二进制字符串位十进制数组
     * @param string
     * @returns {number[]}
     */
    static hexString2DecLs(string:string){
        return chunk(string, 2).map(el=>parseInt(el.join(""), 16))
    }

    /**
     * 字符串前面补0
     * @param value
     * @param length
     * @returns {*}
     */
    static preppendZero(value:number|string, length=2) {
        return preppendZero(length, value);
    }

    /**
     * 从一个浮点数中获取小数部分
     * @param floatNumber
     * @returns {number}
     */
    static getDec(floatNumber:number){
        return floatNumber - Math.trunc(floatNumber);
    }

    /**
     * 从hex转换为10进制,也可以设置为其他进制
     * 如果传入hex数组,则返回10进制数组
     * @param str
     * @param fromBase 16
     */
    static toDEC(str:string, fromBase?:number):number;
    static toDEC(str:string[], fromBase?:number):number[];
    static toDEC(input:string|string[], fromBase=16){
        if (Array.isArray(input)) {
            return input.map(el=>parseInt(el, fromBase))
        }else{
            return parseInt(input, fromBase);
        }
    }


    static toHEX(list:number[]|Array<any[]>, itemLength?:number, fromBase?:number):string[];
    static toHEX(number:number|string, itemLength?:number, fromBase?:number):string;
    /**
     * 十进制转换成确定唱的的16进制
     * @param number
     * 如果传入数字,则返回字符串
     * 传入数字数组,如果数组元素为数组,则直接返回子数组的第一个元素,二不进行转换
     * @param itemLength 数组每个项的长度
     * dec2HexArray(255) //["FF"]
     * dec2HexArray(1) //["01"]
     * dec2HexArray(1, 4) //["0001"]
     * @param fromBase 所传入的数字的进制
     * @returns {string[]|string}
     */
    static toHEX(input:any, itemLength = 2, fromBase=10) {
        if(Array.isArray(input)){
            return input.map(num =>{
                if (Array.isArray(num)) {
                    return num[0];
                }
                return this.toHEX(num, length, fromBase);
            })
        }else{
            if (/[a-zA-Z]/.test(input+"")) {
                throw new Error("无法转换为HEX:"+input);
            }
            input = parseInt(input+"", fromBase);
            if (input >= Math.pow(2, 8)) {
                itemLength = 4;
            }
            let ret = dec2HexArray(input, itemLength)[0];
            return ret
        }
    }


}

/**
 * 十进制转16进制数组
 * @param dec 十进制数字
 * @param itemLength 数组每个项的长度
 * dec2HexArray(255) //["FF"]
 * dec2HexArray(1) //["01"]
 * dec2HexArray(1, 4) //["0001"]
 */
function dec2HexArray(dec:number|string, itemLength = 2) {
    let hex = parseInt(dec + "").toString(16).toUpperCase();
    let ls = chunk(hex, itemLength).map(el => el.join(""));
    const val = preppendZero(itemLength, ls[0])
    ls.splice(0, 1, val);
    return ls;
};
