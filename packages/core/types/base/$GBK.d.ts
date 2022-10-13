export default class $GBK {
    static _fastGbk: any;
    static get fastGbk(): any;
    static setFaskGbk(fastGbk: any): void;
    /**
     * 编码gbk字符串
     * @param str
     */
    static encode(str: string): any;
    /**
     * 解码gbk字符串
     * @param data 可以传入 %aa%af%af%af, ["aa", "af"], [255,210], "aa,af"4种类型的字符串
     * @returns {undefined}
     */
    static decode(data: string | string[] | number[]): string;
}
