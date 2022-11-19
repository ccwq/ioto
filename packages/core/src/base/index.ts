import crawl from "./tree-crawl";
import compact from "lodash/compact";
import {tryGet} from "../object";
import {IObject, stringNumber, treeData} from "../types";
import {isPlainObject} from "../object";
import isNull from "lodash/isNull";

/**
 * 给对象上赋值,如果键已经存在,则在前面加上prefix
 * @param object
 * @param key
 * @param value
 */
export const safeBindToObject = function (object: any, key: string, value: any, prefix = "_", counter = 0) {
    if (!object[key]) {
        object[key] = value;
    }else{
        if(counter<5) {
            safeBindToObject(object, prefix + key, value, prefix, counter + 1);
        }
    }
}


/**
 * 遍历树
 * @param treedata
 * @param childrenField
 * @param stepCallback
 */
export const treeEach = function(treedata:treeData, childrenField:string, stepCallback:Parameters<typeof crawl>[1]){
    let isArray = false;
    if (Array.isArray(treedata)) {
        treedata = {[childrenField]: treedata}
        isArray = true;
    }

    crawl(
        treedata,
        stepCallback,
        {
            getChildren(node:IObject) {
                return node[childrenField];
            }
        }
    )

    if (isArray) {
        return treedata[childrenField];
    }else{
        return treedata;
    }
}


interface elFormatter {
    (
        el: any,
        sett:All2ValueNameOption,
        getFunction: typeof tryGet
    ): [stringNumber, stringNumber]
}


interface All2ValueNameOption {

    // 获取value和name的字段,支持多字段尝试
    valueGetField?: string|string[]
    nameGetField?: string|string[]

    // 设置value和name的字段
    valueSetField?: string
    nameSetField?: string

    // 项目内的分割
    spliterItemValue?: string|RegExp

    // 项目间的分割
    spliterBetweenItem?: string|RegExp

    // 格式化
    elFormatter?: elFormatter|null

    defaultLs?: any[]|(() => any[])
}


type all2valueNameInputBase = string|Array<string>|Array<Array<string|number>>|Array<IObject>
type all2valueNameInput = all2valueNameInputBase|((sett?:All2ValueNameOption)=>all2valueNameInputBase)



/**
 * 解析optionsls
 * 把各种内容解析到{value, name}
 * `idvalue value,name value1,name1`->
 *      [{value: "idvalue", name: "idvalue"}, {value: "value1", name: "name1"}, {value: "value1", name: "name1"}]
 * ["value, name", "value1, name1"]->
 *      [{value: "value", name: "name"}, {value: "value1", name: "name1"}]
 * @param options 待解析的内容
 * @returns {Array}
 */
export const all2valueName = function(options:all2valueNameInput, settings?:All2ValueNameOption){
    const sett = {
        valueGetField: "value",
        nameGetField: "name",
        valueSetField: "value",
        nameSetField: "name",
        spliterItemValue: ",",
        spliterBetweenItem: /\s+/,
        defaultLs: ["0, 请提供options"],
        ...settings || {},
    }

    let input;

    //是函数
    if (typeof options == "function") {
        input = options(sett);
    }

    //字符串的形式
    if (typeof options == "string") {
        input = options.trim().split(sett.spliterBetweenItem).map(el=>el.trim());
    }

    //是数组
    else if(Array.isArray(options)){
        input = options;
    }

    //其他类型
    else{
        if (Array.isArray(sett.defaultLs)) {
            input = sett.defaultLs
        }else if(typeof sett.defaultLs === "function"){
            input = sett.defaultLs();
        }else{
            input = [{
                name:"请通过optionLs传入数组或者函数",
                value:-1,
            }]
        }
    }

    const handler = function (input:Array<any>) {
        // 使用了formatter

        const formatter = sett.elFormatter;
        if (formatter) {
            input = input.map((el) => {
                let [value, name] = formatter(el, sett as All2ValueNameOption, tryGet);
                return {value, name};
            });
        }
        let compactInput = compact(input);
        if (compactInput.length != input.length) {
            console.warn("options中存在空选项", input);
        }
        input = compactInput;

        //以数组为参数
        input = input.map(option => {

            // 如果项目是字符串,进行切割
            if (typeof option == "string") {
                option = (option + "").split(sett.spliterItemValue).map(el => el.trim());
            }else

            // 数字,直接复制
            if (typeof option == "number") {
                option = [option, option];
            }

            let value, name;
            if (Array.isArray(option)) {
                [value, name] = option;
                if (name === undefined) {
                    name = value;
                }else if(value === undefined){
                    value = name;
                }
                if(isNull(value) || isNull(name)) {
                    throw "value和name不能同时为空";
                }
            } else

            // 空的el
            if (!option) {
                name = "无效options";
                value = "-";
            }

            // 对象形式
            else {
                value = tryGet(option, sett.valueGetField);
                name = tryGet(option, sett.nameGetField);
            }



            return {
                [sett.valueSetField]: value,
                [sett.nameSetField]: name,
            }
        });

        input.forEach(el => {
            const value = el[sett.valueSetField];

            // 不是数字或者字符串的,options 转为字符串
            if (typeof value != "number" && typeof value != "string") {
                console.warn("options中存在非法的value,需要是number或者string", el);
                el[sett.valueSetField] = el.value + "";
            }
        })
        return input;
    };
    return handler(input)
}

/**
 * json转换
 * @param jsonString
 */
export const safeJsonParser = function (jsonString: string | IObject, backupValue: {} | null = null): any {
    // 如果本来就是对象，直接返回原始对象
    if (isPlainObject(jsonString)) {
        return jsonString;
    } else if (typeof jsonString != "string") {
        console.warn("safeJsonParser error", jsonString);
        return backupValue;
    }
    try {
        return JSON.parse(jsonString)
    } catch (e) {
        console.log("json解析失败:", jsonString)
        return backupValue
    }
};


/**
 * 判断并返回值是否属于某个集合安全值
 * @param value 要检测的值
 * @param options 候选值
 * @param defaultIndexInOptions 如果不属于候选值，返回候选值的第几个值,如果设置为-1,则返回defaultValue
 * @param defaultValue 如果value不在候选值中,并且defaultIndexInOptions也不在候选值中，返回这个值
 * @returns {any}
 */
export const safeValueInList = function (
    value:any,
    options:any[],
    defaultIndexInOptions:number|-1= 0,
    defaultValue = undefined
) {
    if (options.includes(value)) {
        return value
    } else {
        let ret = options[defaultIndexInOptions];
        if (ret === undefined) {
            ret = defaultValue;
        }
        return ret;
    }
}


/**
 * 根据image url或者blob获取图片的尺寸
 * @param image
 * @returns {Promise<{width: number, height: number}>}
 */
export function getImageSize (image:string|Blob) {
    return new Promise(function (resolve, reject) {
        var url = typeof image === 'string' ? image : URL.createObjectURL(image);
        if (!url) throw new Error('Must use a valid image')
        var img = document.createElement('img')
        img.onload = ()=> {
            if (typeof image !== 'string')
                URL.revokeObjectURL(url)
            resolve({width: img.width, height: img.height})
        }

        img.onerror = (err) =>{
            if (typeof image !== 'string')
                URL.revokeObjectURL(url)
            reject(err)
        }
        img.src = url
    })
}

//用来判断是否ie
function getInternetExplorerVersion () {
    const ua = window.navigator.userAgent

    const msie = ua.indexOf('MSIE ')
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
    }

    const trident = ua.indexOf('Trident/')
    if (trident > 0) {
        // IE 11 => return version number
        const rv = ua.indexOf('rv:')
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10)
    }

    const edge = ua.indexOf('Edge/')
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10)
    }

    // other browser
    return -1
}


export const isIE = getInternetExplorerVersion() !== -1;
