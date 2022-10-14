export declare const all2date: (input: any) => Date | undefined;
export declare const parse2date: (input: any) => Date | undefined;
/**
 * 根据年月获取当月的天数
 * @param month "2015-06"
 */
export declare function getDayMountByMonth(month: string | number): any;
/**
 * 获取当前月份的的天数
 * @param date 各种日期类型的数据
 * @returns {number}
 */
export declare function getDayLengthInMonth(date: any): any;
export { default as Date2 } from "./Date2";
