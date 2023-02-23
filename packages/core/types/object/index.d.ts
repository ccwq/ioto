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
export declare const tryGet: (object: any, keyLs: ObjectPath, defaultValue?: any, isUseNil?: boolean) => any;
export declare const isPlainObject: (obj: any) => boolean;
export { travelTree, makeTreeDataHelper } from "./treeDataHelper";
/**
 * 拍平树形数据
 * @param list
 * @param {string} childKey - 子节点的key
 * @param {boolean} onlyLeafNode - 只保留叶子节点
 * @return {*[]}
 */
export declare const treeListToFlatList: (list: any[], childKey?: string, onlyLeafNode?: boolean) => any[];
export type { INode, INodeList, INodeDic, IInputData, ITravelCallback, ITravelAllCallback, ITravelTreeCallback, IFilterFunction, } from "./treeDataHelper";
