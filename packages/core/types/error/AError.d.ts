/**
 * 错误对象
 */
export default class AError {
    static addNameFieldList(key: string): void;
    static nameFieldList: string[];
    _name?: string;
    _code?: string | number;
    _silent?: boolean;
    /**
     * @param name 错误名
     * @param code 错误码
     * @param silent 是否静默
     * @param resp 错误其他信息<a href=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error>参考原生文档</a>
     */
    constructor(name: string, code: string | number, silent?: boolean, resp?: any);
    /**
     * 设置安静状态
     * @param silent
     */
    /**
     * 错误信息
     * @returns {*}
     */
    get name(): string | undefined;
    /**
     * 错误信息
     * @returns {*}
     */
    get message(): string | undefined;
    /**
     * 错误信息
     * @returns {*}
     */
    get msg(): string | undefined;
    /**
     * 错误码
     * @returns {*}
     */
    get code(): string | number | undefined;
    get cod(): string | number | undefined;
    /**
     * 错误码
     * @returns {*}
     */
    get errorCode(): string | number | undefined;
    /**
     * 是否静默
     * @returns {*}
     */
    get silent(): boolean | undefined;
    /**
     * 是否静默
     * @returns {*}
     */
    get silence(): boolean | undefined;
    toString2(): string;
    /**
     * 从字符串创建其他对象
     * @param errText 字符串
     */
    static fromErrorText(errText: string, silent?: boolean): AError;
    /**
     * 从潜在的错误信息对象创建/兼容fromErrorText
     * @param errorObj
     * @param silent
     * @returns {*}
     */
    static fromObject: (errObj: any, silent?: boolean) => AError;
    /**
     * 第一个参数可以取所有支持的值
     * @param errObject
     * @param slient
     * @returns {AError}
     */
    static create(errObject: any, slient?: boolean): AError;
    /**
     * 从字符串/潜在包含错误信息对象中获取错误码
     * @param errorText_errorObject
     */
    static getErrorCode(errorText_errorObject: AError | Error | Object): string | number | undefined;
}
