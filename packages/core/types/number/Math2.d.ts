export default class Math2 {
    /**
     * js小数修正  0.1 + 0.2 = 0.30000000000000004 结果修正为0.3
     */
    static strip(num: number, precision?: number): number;
    /**
     * 转换二进制字符串位十进制数组
     * @param string
     * @returns {number[]}
     */
    static hexString2DecLs(string: string): number[];
    /**
     * 字符串前面补0
     * @param value
     * @param length
     * @returns {*}
     */
    static preppendZero(value: number | string, length?: number): string;
    /**
     * 从一个浮点数中获取小数部分
     * @param floatNumber
     * @returns {number}
     */
    static getDec(floatNumber: number): number;
    /**
     * 从hex转换为10进制,也可以设置为其他进制
     * 如果传入hex数组,则返回10进制数组
     * @param str
     * @param fromBase 16
     */
    static toDEC(str: string, fromBase?: number): number;
    static toDEC(str: string[], fromBase?: number): number[];
    static toHEX(list: number[] | Array<any[]>, itemLength?: number, fromBase?: number): string[];
    static toHEX(number: number | string, itemLength?: number, fromBase?: number): string;
}
