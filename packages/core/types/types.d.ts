export declare type ObjectPath = Array<string | number> | string;
export declare type treeData = any|[any];
export declare type IObject = { [key:string|number]:any }
export declare type stringNumber = string|number

// 用来解决TS7053错误: 说明: https://www.yuque.com/soper/vzg3wu/opeo0r#wwW2U
export interface IObject {[key: string|number]: any}

export declare type DateType = "year"| "month" | "day" | "hour" | "minute" | "second" | "millisecond";
