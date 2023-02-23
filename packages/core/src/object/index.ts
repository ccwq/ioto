import get from "lodash/get";

//是否是undefined或者null
import isNil from "lodash/isNil";
import { ObjectPath } from "../types";

/**
 * 尝试获取对象的多个属性(支持深度获取属性),直到获取到某个非null的属性值
 * 比如keylist为["a","b","c"],则会依次获取obj.a,obj.a.b,obj.a.b.c,直到获取到非null的值
 * @param object 要获尝试获取属性的对象
 * @param keyLs  要尝试获取的属性序列，可以是都好分隔的字符串
 * @param defaultValue 属性列表依次尝试仍然失败，返回的值
 * @param isUseNil 使用lodash的isNil来做空判断
 * @returns {*}
 */
export const tryGet = function (object: any, keyLs: ObjectPath, defaultValue:any=null, isUseNil:boolean=false):any{
    if (typeof keyLs === "string") {
        keyLs = keyLs.split(",")
    }
    if (!Array.isArray(keyLs)) {
        return;
    }
    for (let i = 0; i < keyLs.length; i++) {
        const key = keyLs[i];
        const value = get(object, key);
        const hit = isUseNil ? isNil(value) : !!value;
        if (hit) {
            return value
        }
    }
    return defaultValue;
}


export const isPlainObject = (obj: any) => {
    return Object.prototype.toString.call(obj) == "[object Object]";
}


export {
    travelTree,
    makeTreeDataHelper
} from "./treeDataHelper"


/**
 * 拍平树形数据
 * @param list
 * @param {string} childKey - 子节点的key
 * @return {*[]}
 */
export const treeListToFlatList = (list:any[], childKey="children")=>{
    const result = [];
    const stack = [...list];
    while (stack.length) {
        const item = stack.shift();
        result.push(item);
        const childs = item[childKey];
        if (childs?.length) {
            stack.unshift(...childs);
        }
    }
    return result;
}


export type {
    INode,
    INodeList,
    INodeDic,
    IInputData,
    ITravelCallback,
    ITravelAllCallback,
    ITravelTreeCallback,
    IFilterFunction,
} from "./treeDataHelper"
