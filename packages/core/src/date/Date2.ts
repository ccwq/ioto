import {all2date} from "./index";
import {DateType, IObject} from "../types";
const month2listDic:IObject = {};
class Date2 extends Date{

    // 是否是当前月
    __currentMonth:boolean = false;

    /**
     * 从2022-06创建
     * @param YYYY_MM
     */
    static fromYYYY_MM(YYYY_MM:`${string}${"-"|"_"}${string}`){
        var str = YYYY_MM.replace(/_/g,"-") + "-01";
        return new Date(str);
    }

    /**
     * 从Date类型床架
     * @param date
     */
    static fromDate(date:Date){
        return new Date2(date.getTime());
    }

    /**
     * 从任意类型床架
     * @param date
     */
    static fromAny(date:any){
        return this.fromDate(all2date(date)!)
    }

    constructor(...args:any[]){
        //@ts-ignore
        super(...args);
    }


    /**
     * 获取时间差异
     * @param date
     * @param type
     */
    diff(date:Date, type:DateType="day"){
        let diff = this.getTime() - date.getTime();
        switch (type){
            case "year":
                return diff / 1000 / 60 / 60 / 24 / 365;
            case "month":
                return diff / 1000 / 60 / 60 / 24 / 30;
            case "day":
                return diff / 1000 / 60 / 60 / 24;
            case "hour":
                return diff / 1000 / 60 / 60;
            case "minute":
                return diff / 1000 / 60;
            case "second":
                return diff / 1000;
            case "millisecond":
                return diff;
        }
    }

    /**
     * 时间的增减
     * @param value
     * @param type
     */
    add(value:number, type:DateType = "day"){
        const that = this.clone();
        switch (type){
            case "year":
                that.setFullYear(this.getFullYear() + value);
                break;
            case "month":
                this.setMonth(this.getMonth() + value);
                that;
            case "day":
                this.setDate(this.getDate() + value);
                that;
            case "hour":
                that.setHours(this.getHours() + value);
                break;
            case "minute":
                that.setMinutes(this.getMinutes() + value);
                break;
            case "second":
                that.setSeconds(this.getSeconds() + value);
                break;
            case "millisecond":
                that.setMilliseconds(this.getMilliseconds() + value);
                break;
        }
        return that;
    }

    /**
     * 克隆自身
     */
    clone(){
        return new Date2(this.getTime())
    }

    /**
     * 把source对象的时间赋自身
     * @param source
     */
    setTimeByDate(source:Date){
        this.setHours(source.getHours(),source.getMinutes(),source.getSeconds(),source.getSeconds());
        return this;
    }
    /**
     * 获取本月的天数
     * @returns {number}
     */
    getDayMountInMonth(){
        let date = this.clone();
        date.setMonth(date.getMonth()+1);
        date.setDate(0);
        return date.getDate();
    }

    /**
     * 设置为一天的第0毫秒
     * @returns {*|proto}
     */
    setToDayStart(){
        return this.clearTime();
    }


    //设置为一天的最后一毫秒
    setToDayEnd(){
        return this.setHours(23,59,59,999),this;
    }


    /**
     * 设置为当月的第一毫秒
     */
    setToMonthStart(){
        return this.setDate(1), this.setToDayStart();
    }

    /**
     * 设置为当月的最后一毫秒
     */
    setToMonthEnd(){
        return this.setDate(this.getDayMountInMonth()), this.setToDayEnd();
    }

    /**
     * 设置为本年度第一天第一时刻
     */
    setToYearStart(){
        const m = this;
        m.setMonth(0, 1);
        m.setToDayStart();
        return m;
    }


    /**
     * 设置为本年度最后一刻
     */
    setToYearEnd(){
        const m = this;
        m.setMonth(12, 1);
        m.setToDayStart();
        m.setTime(m.getTime() - 1);
        return m;
    }

    /**
     * 是否是同一天
     * @param _date
     */
    isSameDay(_target:Date|number){
        let tar
        if(typeof _target == "number"){
            tar = new Date2(_target)
        }else{
            tar = Date2.prototype.clone.call(_target);
        }
        let target = tar  .clone().setToDayStart();
        let that   = this     .clone().setToDayStart();
        return target.getTime() == that.getTime();
    }



    /**
     * 时间归零
     * @returns {proto}
     */
    clearTime(){
        return this.setHours(0,0,0,0),this;
    }


    clearDay(){
        return this.setDate(1),this;
    }

    /**
     * 按月格式化
     * @returns {*}
     */
    formatToMonth(split:string = "-"){
        const year = this.getFullYear()
        const month = this.getMonth() + 1
        return `${year}${split}${month}`
    }

    formatToDay(split:string = "-"){
        const year = this.getFullYear()
        const month = this.getMonth() + 1
        const day = this.getDate()
        return `${year}${split}${month}${split}${day}`
    }

    /**
     * 生成本月日历列表算法
     * @param isSundayStart 是否周日开头,默认 true
     * @returns {Array}
     */
    getCalendarDateList(isSundayStart:boolean = false){
        var m = this;
        if (typeof isSundayStart == "undefined") {
            isSundayStart = true;
        }

        var dic = month2listDic;



        var dicKey = this.getFullYear() + "-" + (this.getMonth() + 1) + "-" + (isSundayStart?'0':"1");

        if (dic[dicKey]) {
            return dic[dicKey];
        }

        let startSign,endSign;
        if (isSundayStart) {
            startSign = 0;
            endSign = 6
        }else{
            startSign = 1;
            endSign = 7;
        }

        let list = [];
        let firstDateInMonth    =   this.clone().setToMonthStart();
        let lastDateInMonth     =   this.clone().setToMonthEnd();

        //本月第一天周几
        var firstDayWeekNumb    =   firstDateInMonth.getDay();
        var lastDayWeekNumb     =   lastDateInMonth .getDay();

        let firstDateInView    =    firstDateInMonth.clone().add(startSign  -   firstDayWeekNumb - 1, "day");
        let lastDateInView     =    lastDateInMonth.clone() .add(endSign    -   lastDayWeekNumb  + 0, "day");

        let length = lastDateInView.diff(firstDateInView,"day");
        let counter = 0;

        let _monthNum = m.getMonth();
        while (counter++<length) {
            let _date = firstDateInView.clone().add(counter,"day");

            if (_date.getMonth() == _monthNum) {
                _date.__currentMonth = true;
            }

            list.push(_date);
        }

        return dic[dicKey] = {
            list,
            firstDateInMonth,
            lastDateInMonth,
            firstDateInView,
            lastDateInView,
        };
    }
}


export default Date2

