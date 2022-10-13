import crawl from "tree-crawl";
import { tryGet } from "./object";
import { stringNumber, treeData } from "./types";
/**
 * 给对象上赋值,如果键已经存在,则在前面加上prefix
 * @param object
 * @param key
 * @param value
 */
export declare const safeBindToObject: (object: any, key: string, value: any, prefix?: string, counter?: number) => void;
/**
 *
 * 遍历树
 * @param treedata
 * @param childrenField
 * @param stepCallback
 */
export declare const treeEach: (treedata: treeData, childrenField: string, stepCallback: Parameters<typeof crawl>[1]) => any;
interface elFormatter {
    (el: any, options: {
        nameField: string | string[];
        valueField: string | string[];
    }, getFunction: typeof tryGet): [stringNumber, stringNumber];
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
export declare const all2valueName: (options: any, stringElSplit?: RegExp, defaultLs?: any, elFormatter?: elFormatter | null, stringValueNameSplit?: string, nameField?: string | string[], valueField?: string | string[], isDebug?: boolean) => any;
export {};
