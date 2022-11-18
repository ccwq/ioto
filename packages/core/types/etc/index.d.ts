export { columnParseFactory } from "./view-design-utils";
/**
 * 防抖请求的封装
 * @param asyncFunction
 * @param delay
 */
export declare const debouncePromiseFunc: (asyncFunction: (...any: any[]) => any, delay?: number) => (this: any, ...args: any[]) => Promise<any>;
