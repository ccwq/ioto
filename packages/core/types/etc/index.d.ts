export { columnParseFactory } from "./view-design-utils";
/**
 * 急促的连续请求，只执行最后一次，然后
 * @param asyncFunction
 * @param delay
 */
export declare const debouncePromiseFunc: (asyncFunction: (...rest: any[]) => any, delay?: number) => (this: any, ...args: any[]) => Promise<any>;
