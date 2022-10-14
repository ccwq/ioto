import crawl from "tree-crawl";
import compact from "lodash/compact";
import {tryGet} from "./object";
import {IObject, stringNumber, treeData} from "./types";
import {isPlainObject} from "./object";

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
 *
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
        options:{
            nameField:string|string[],
            valueField:string|string[],
        },
        getFunction: typeof tryGet
    ): [stringNumber, stringNumber]
}

/**
 * 解析optionsls
 * 把各种内容解析到{value, name}
 * `idvalue value,name value1,name1`->
 *      [{value: "idvalue", name: "idvalue"}, {value: "value1", name: "name1"}, {value: "value1", name: "name1"}]
 * ["value, name", "value1, name1"]->
 *      [{value: "value", name: "name"}, {value: "value1", name: "name1"}]
 * @param options 带解析的内容
 * @param stringElSplit 在使用文本形式options时item之间分割的符
 * @param defaultLs 没有提供options时使用默认options
 * @param stringValueNameSplit 使用文本item时，用来分割value和name
 * @param nameField 使用object类型itme时name的字段
 * @param valueField 使用object类型item时value的字段
 * @returns {Promise<*>}
 */
export const all2valueName = function(
    options:any,
    stringElSplit = /\s+/,
    defaultLs:any = ["0, 请提供options"],
    elFormatter:elFormatter|null=null,
    stringValueNameSplit=",",
    nameField:string|string[]="name",
    valueField:string|string[]="value",
    isDebug:boolean=false,
){
    let ls, _promise;

    //数组解析
    //是函数
    if (typeof options == "function") {
        _promise = options();


    }

    //字符串的形式
    if (typeof options == "string") {
        ls = options.split(stringElSplit).map(el=>el.trim());

        //是数组
    }else if(Array.isArray(options)){
        ls = options;

        //其他类型
    }else{
        if (Array.isArray(defaultLs)) {
            ls = defaultLs
        }else if(typeof defaultLs == "function"){
            _promise = defaultLs();
        }else{
            ls = [{
                name:"请通过optionLs传入数组或者异步函数",
                value:-1,
            }]
        }
    }

    const handler = function (ls:Array<any>) {
        //处理formater
        if (typeof elFormatter == "function") {
            ls = ls.map((el) => {
                let [value, name] = elFormatter(el, {
                    valueField: valueField,
                    nameField: nameField,
                }, tryGet);
                return {value, name};
            });
        }


        let _ls = compact(ls);

        if (_ls.length != ls.length) {
            console.warn("options中存在空选项", ls);
        }

        ls = _ls;

        //以数组为参数
        ls = ls.map(el => {

            const _el = el;

            //切割字符串
            if (typeof el == "string" || typeof el == "number") {
                el = (el + "").split(stringValueNameSplit).map(el => el.trim());
            }

            if (Array.isArray(el)) {
                let [value, name] = el;
                if (name === undefined) {
                    name = value;
                }
                return {value, name};
            } else if (!el) {
                return {
                    name: "无效options",
                    value: "-",
                }
            } else {
                return {
                    name: tryGet(el, nameField),
                    value: tryGet(el, valueField)
                }
            }
        });

        ls.forEach(el => {
            if (typeof el.value != "number" && typeof el.value != "string") {
                el.value = el.value + "";
            }
        })
        return ls;
    };

    if (ls) {
        return handler(ls);
    }else{
        return _promise.then((ls:Array<any>) => handler(ls));
    }
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
