/**
 * 支持直接定义错误码的Error对象
 * @type {RegExp}
 */
import {tryGet} from "../object";

//分隔符
const CODE_SPLITE = "::";

// ^
// | 上下关联需要同时修改
// v

//用来解析code的正则
const errorCodeRG = /\:\:([-\d\.]+)$/;

// todo: get code, toString设置全部无效

/**
 * 错误对象
 */
export default class AError {

    // 用来增加猜测的字段
    static addNameFieldList(key:string){
        this.nameFieldList.push(key)
    }
    //猜测错误对象名称的字段
    static nameFieldList: string[] = ["error", "message", "msg", "errMsg", "reason", "errorText"]

    _name?:string
    _code?:string|number
    _silent?:boolean


    /**
     * @param name 错误名
     * @param code 错误码
     * @param silent 是否静默
     * @param resp 错误其他信息<a href=https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error>参考原生文档</a>
     */
    constructor (name:string, code:string|number, silent:boolean=false, resp:any=null) {
        const m = this
        m._name = name
        m._code = code
        m._silent = silent
    }

    /**
     * 设置安静状态
     * @param silent
     */
    // setSilent(silent){
    //     const m = this;
    //     m._silent = silent;
    // }

    /**
     * 错误信息
     * @returns {*}
     */
    get name () { return this._name }

    /**
     * 错误信息
     * @returns {*}
     */
    get message () { return this._name }

    /**
     * 错误信息
     * @returns {*}
     */
    get msg () { return this._name }

    /**
     * 错误码
     * @returns {*}
     */
    get code () { return this._code }
    get cod () { return this._code }

    /**
     * 错误码
     * @returns {*}
     */
    get errorCode () { return this._code }

    /**
     * 是否静默
     * @returns {*}
     */
    get silent () { return this._silent }

    /**
     * 是否静默
     * @returns {*}
     */
    get silence () { return this._silent }

    toString2 () {
        const m = this
        return `AError:${m.code}-${m.name}`
    }

    /**
     * 从字符串创建其他对象
     * @param errText 字符串
     */
    static fromErrorText (errText:string, silent = false) {
        const m = this
        const key = `${errText}-${silent ? '0' : '1'}`;
        let ins = fromErrorTextCache[key]
        if (!ins) {
            let code, name
            if (errorCodeRG.test(errText)) {
                code = RegExp['$1']
                name = errText.replace(`::${code}`, '')
            } else {
                code = 0
                name = errText
            }
            ins = new AError(name, code, silent)
            fromErrorTextCache[key] = ins
        }
        return ins
    }

    /**
     * 从潜在的错误信息对象创建/兼容fromErrorText
     * @param errorObj
     * @param silent
     * @returns {*}
     */
    static fromObject:(errObj:any, silent?:boolean)=>AError =
        (errorObj:any, silent = false)=> {
            const m = this
            if (!errorObj) {
                return new AError('未知错误', -9999)
            }

            let message;

            //是错误对象
            if (errorObj instanceof Error) {
                return m.fromErrorText(errorObj.message, silent);
            }


            //字符串
            if (typeof errorObj == "string") {
                //可能是JSON
                if (/^(\[|\{)/.test(errorObj)) {

                    //尝试解析JSON
                    try {
                        errorObj = JSON.parse(errorObj)
                    } catch (e) {
                        message = errorObj;
                    }
                }else{
                    message = errorObj;
                }
            }else{
                message = tryGet(errorObj, AError.nameFieldList);

                //是否安静
                if (!silent) {
                    silent = errorObj.silence || errorObj.silent;
                }
            }


            if (!message && errorObj.data) {
                return m.fromObject(errorObj.data);
            }

            return m.fromErrorText(message, silent);
        }


    /**
     * 第一个参数可以取所有支持的值
     * @param errObject
     * @param slient
     * @returns {AError}
     */
    static create(errObject:any, slient=false){
        return this.fromObject(errObject, slient);
    }

    /**
     * 从字符串/潜在包含错误信息对象中获取错误码
     * @param errorText_errorObject
     */
    static getErrorCode (errorText_errorObject:AError|Error|Object) {
        if (!errorText_errorObject) {
            return 0
        }

        if (errorText_errorObject.constructor == AError) {
            return errorText_errorObject._code
        }

        return this.fromObject(errorText_errorObject)._code
    }
}

const fromErrorTextCache:{ [key:string]:AError} = {}
