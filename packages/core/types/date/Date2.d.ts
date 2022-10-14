import { DateType } from "../types";
declare class Date2 extends Date {
    __currentMonth: boolean;
    /**
     * 从2022-06创建
     * @param YYYY_MM
     */
    static fromYYYY_MM(YYYY_MM: `${string}${"-" | "_"}${string}`): Date;
    /**
     * 从Date类型床架
     * @param date
     */
    static fromDate(date: Date): Date2;
    /**
     * 从任意类型床架
     * @param date
     */
    static fromAny(date: any): Date2;
    constructor(...args: any[]);
    /**
     * 获取时间差异
     * @param date
     * @param type
     */
    diff(date: Date, type?: DateType): number;
    /**
     * 时间的增减
     * @param value
     * @param type
     */
    add(value: number, type?: DateType): Date2;
    /**
     * 克隆自身
     */
    clone(): Date2;
    /**
     * 把source对象的时间赋自身
     * @param source
     */
    setTimeByDate(source: Date): this;
    /**
     * 获取本月的天数
     * @returns {number}
     */
    getDayMountInMonth(): number;
    /**
     * 设置为一天的第0毫秒
     * @returns {*|proto}
     */
    setToDayStart(): this;
    setToDayEnd(): this;
    /**
     * 设置为当月的第一毫秒
     */
    setToMonthStart(): this;
    /**
     * 设置为当月的最后一毫秒
     */
    setToMonthEnd(): this;
    /**
     * 设置为本年度第一天第一时刻
     */
    setToYearStart(): this;
    /**
     * 设置为本年度最后一刻
     */
    setToYearEnd(): this;
    /**
     * 是否是同一天
     * @param _date
     */
    isSameDay(_target: Date | number): boolean;
    /**
     * 时间归零
     * @returns {proto}
     */
    clearTime(): this;
    clearDay(): this;
    /**
     * 按月格式化
     * @returns {*}
     */
    formatToMonth(split?: string): string;
    formatToDay(split?: string): string;
    /**
     * 生成本月日历列表算法
     * @param isSundayStart 是否周日开头,默认 true
     * @returns {Array}
     */
    getCalendarDateList(isSundayStart?: boolean): any;
}
export default Date2;
