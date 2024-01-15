/**
 * 数字前面补0，凑够特定长度
 * @param totalLength 要凑够的长度
 * @param value 数字可以是数字，也可以是字符串。如果是字符串可能是非10进制数字，请使用第三方个参数来处理
 */
export declare function preppendZero(totalLength: number, value: string | number): string;
/**
 * 截取js小数计算出现无限循环之外的部分
 * strip(0.2+0.1)==0.3
 * @param number
 * @param precision
 * @returns {number}
 */
export declare function strip(number: number, precision?: number): number;
/**
 *
 * @param number
 * @param fixed
 */
export declare function stripAndFix(number: number, fixedNum?: number): number;
/**
 * 数字范围安全安全值
 * safeValueInRange(value, 0, 100) // 0-100
 * 如果value小于0，返回0，如果value大于100，返回100, 否则返回value
 * @param value 要处理的数字,如果是字符串,认为是hex字符串
 * @param min
 * @param max
 * @returns {number}
 */
export declare const safeValueInRange: (value: number | string, max?: number, min?: number) => string | number;
/**
 * 解析数字
 * @param input
 * @param backupValue
 */
export declare const safeParseNumber: (input: any, backupValue?: number) => number;
/**
 * 将给定的值分割成指定数量的随机段，满足约束条件。
 *
 * @param {number} value - 要分割的值。
 * @param {number} n - 分割成的段数。
 * @param {number} minValue - 每个返回值的最小值。
 * @returns {Array} - 返回一个整数数组，满足约束条件，如果无法满足条件，返回空数组。
 */
export declare function randomSegmentation(value: number, n: number, minValue: number): number[];
export { default as Math2 } from "./Math2";
