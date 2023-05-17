import crawl from "./tree-crawl";
import { tryGet } from "../object";
import { IObject, stringNumber, treeData } from "../types";
/**
 * 给对象上赋值,如果键已经存在,则在前面加上prefix
 * @param object
 * @param key
 * @param value
 */
export declare const safeBindToObject: (object: any, key: string, value: any, prefix?: string, counter?: number) => void;
/**
 * 遍历树
 * @param treedata
 * @param childrenField
 * @param stepCallback
 */
export declare const treeEach: (treedata: treeData, childrenField: string, stepCallback: Parameters<typeof crawl>[1]) => any;
interface elFormatter {
    (el: any, sett: All2ValueNameOption, getFunction: typeof tryGet): [stringNumber, stringNumber];
}
interface All2ValueNameOption {
    valueGetField?: string | string[];
    nameGetField?: string | string[];
    valueSetField?: string;
    nameSetField?: string;
    spliterItemValue?: string | RegExp;
    spliterBetweenItem?: string | RegExp;
    elFormatter?: elFormatter | null;
    defaultLs?: any[] | (() => any[]);
}
declare type all2valueNameInputBase = string | Array<string> | Array<Array<string | number>> | Array<IObject>;
declare type all2valueNameInput = all2valueNameInputBase | ((sett?: All2ValueNameOption) => all2valueNameInputBase);
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
export declare const all2valueName: (options: all2valueNameInput, settings?: All2ValueNameOption) => any[];
/**
 * json转换
 * @param jsonString
 */
export declare const safeJsonParser: (jsonString: string | IObject | any[], backupValue?: {} | null) => any;
/**
 * 判断并返回值是否属于某个集合安全值
 * @param value 要检测的值
 * @param options 候选值
 * @param defaultIndexInOptions 如果不属于候选值，返回候选值的第几个值,如果设置为-1,则返回defaultValue
 * @param defaultValue 如果value不在候选值中,并且defaultIndexInOptions也不在候选值中，返回这个值
 * @returns {any}
 */
export declare const safeValueInList: (value: any, options: any[], defaultIndexInOptions?: number | -1, defaultValue?: undefined) => any;
/**
 * 根据image url或者blob获取图片的尺寸
 * @param image
 * @returns {Promise<{width: number, height: number}>}
 */
export declare function getImageSize(image: string | Blob): Promise<unknown>;
export declare const isIE: boolean;
export type { All2ValueNameOption, elFormatter, };
