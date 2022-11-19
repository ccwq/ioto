/**
 * 通过日期创建日期所在周的对象，包含周的关键信息
 * 比如周的第一天和最后一天，周在年中的次序，周在月中的次序
 */
export default class DateWeek {
    private _start;
    get start(): Date;
    get startStr(): string;
    get end(): Date;
    private _end;
    get endStr(): string;
    private _thInYear;
    get thInYear(): number;
    private _thInMonth;
    get thInMonth(): number;
    get YYYYMMth(): string;
    get YYYYMMthStr(): string;
    static fromYYYYMMThStr(string: string): DateWeek;
    get YYYYMM(): string;
    get YYYY(): number;
    constructor(date: Date | string);
    contains(date: Date): boolean;
    nextDateWeek(): DateWeek;
    prevDateWeek(): DateWeek;
    static getListfromRange(from: string, to: string): DateWeek[];
    static getListfromRange(from: Date, to: Date): DateWeek[];
    static from_yyyy_th(yyyy: string | number, week: string | number): DateWeek;
    toString(): string;
}
