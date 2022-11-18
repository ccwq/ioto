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
/**
 * 获取日期所在周的周一和最周天(同时设定时间为00:00:00:0000和23:59:59:9999)
 * @param date
 * @param isMondayFirst {boolean}=true 是否周一为一周的第一天
 */
export declare const getWeekRangeByDay: (date: Date | string, isMondayFirst?: boolean) => {
    startYYYYMMDD: string;
    start: Date;
    end: Date;
    thInYear: number;
};
export { default as Date2 } from "./Date2";
