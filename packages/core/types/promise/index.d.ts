interface PromiseMapItem {
    (): Promise<any>;
}
/**
 * Promise.all的map版本
 * 传入数组或者数组的展开
 * @return {*}
 */
declare function promiseMap(tasks: PromiseMapItem[]): Promise<any>;
declare function promiseMap(...rest: PromiseMapItem[]): Promise<any>;
interface PromoseExec {
    (resolve: Function, reject: Function): void;
}
declare class BPromise<T> extends Promise<T> {
    static map(promiseLs: PromiseMapItem[]): Promise<any>;
    static all(ls: Promise<any>[]): Promise<any[]>;
    private __resolve;
    resolve(value: any): void;
    _resolve(value: any): void;
    private __reject;
    reject(error: any): void;
    _reject(error: any): void;
    constructor(executor?: PromoseExec | undefined);
}
interface AccFunction {
    (acc: any, currentValue: any, list: any[]): any;
}
/**
 * Array.prototype.reduct的异步版本,需要在第一个参数传入数组本身
 * @param list 数组本身
 * @param accFunction
 * @param acc
 */
export declare const asyncReduce: (list: any[], accFunction: AccFunction, acc: any) => Promise<unknown>;
export { BPromise, promiseMap, };
