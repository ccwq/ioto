import {getWeekRangeByDay, getWeekStartDateFromYYYYMMThInMonth, getWeekThInMonth} from "./index";
import {dayjs2} from "./dayjs-setup";
/**
 * 通过日期创建日期所在周的对象，包含周的关键信息
 * 比如周的第一天和最后一天，周在年中的次序，周在月中的次序
 */
export default class DateWeek {
    private _start: Date;
    public get start(){return this._start}
    public get startStr(){
        return dayjs2(this.start).format("YYYY-MM-DD");
    }
    public get end(){return this._end}
    private _end: Date;
    public get endStr(){
        return dayjs2(this.end).format("YYYY-MM-DD");
    }
    private _thInYear: number;
    public get thInYear(){return this._thInYear}

    private _thInMonth: number;
    public get thInMonth(){return this._thInMonth}

    public get YYYYMMth(){
        return `${this.start.getFullYear()}-${this.start.getMonth()+1}-[${this.thInMonth}]`;
    }

    //类似 2022-11/5周的形式
    public get YYYYMMthStr(){
        return `${this.start.getFullYear()}-${this.start.getMonth()+1}/第${this.thInMonth}周`;
    }

    //从2021-11/5这种格式中解析出年份和周次
    static fromYYYYMMThStr(string:string){
        const [yyyy, mm, th] = string.split(/[^\d]+/).filter(el=>el);
        const start = getWeekStartDateFromYYYYMMThInMonth(parseInt(yyyy), parseInt(mm), parseInt(th));
        return new DateWeek(start);
    }

    public get YYYYMM(){
        return `${this.start.getFullYear()}-${this.start.getMonth()+1}`;
    }
    public get YYYY(){
        return this.start.getFullYear();
    }
    constructor(date:Date|string) {
        const {start, end, thInYear} = getWeekRangeByDay(date);
        this._start = start;
        this._end = end;
        this._thInYear = thInYear;
        this._thInMonth = getWeekThInMonth(start);
        // this._thInMonth = getWeekThInMonth(date);
    }

    // 检查某个日期是否包含在这个周中
    contains(date:Date){
        return date >= this.start && date <= this.end;
    }

    // 获取上周的信息
    nextDateWeek(){
        const next = new Date(this.end.getFullYear(), this.end.getMonth(), this.end.getDate()+1);
        return new DateWeek(next);
    }

    // 获取下周的信息
    prevDateWeek(){
        const prev = new Date(this.start.getFullYear(), this.start.getMonth(), this.start.getDate()-1);
        return new DateWeek(prev);
    }

    // 根据开始日期和结束日期,生成日期范围内，所有的自然周的列表
    static getListfromRange(from:string, to:string):DateWeek[]
    static getListfromRange(from:Date, to:Date):DateWeek[]
    static getListfromRange(from:Date|string, to:Date|string):DateWeek[]{
        if(typeof from === "string"){
            from = dayjs2(from).toDate();
        }
        if(typeof to === "string"){
            to = dayjs2(to).toDate();
        }

        // 允许交换
        if(from>to){
            [from, to] = [to, from];
        }

        const result:DateWeek[] = [];
        let current = new DateWeek(from);
        while(!current.contains(to)){
            result.push(current);
            current = current.nextDateWeek();
        }
        result.push(current);
        return result;
    }

    static from_yyyy_th(yyyy: string | number, week: string | number) {
        const start = dayjs2(`${yyyy}-01-01`).week(parseInt(week + ""));
        return new DateWeek(start.toDate());
    }

    toString(){
        return `\n[${this.thInYear}] ${this.startStr} - ${this.endStr}`;
    }
}
