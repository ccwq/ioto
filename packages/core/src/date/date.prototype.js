
//使所有的set function返回值为对象本身
import DateUtils from "./DateUtils";

var protoBeMix = {};
[
    "setDate",
    "setFullYear",
    "setHours",
    "setMilliseconds",
    "setMinutes",
    "setMonth",
    "setSeconds",
    "setTime",
    "setUTCDate",
    "setUTCFullYear",
    "setUTCHours",
    "setUTCMilliseconds",
    "setUTCMinutes",
    "setUTCMonth",
    "setUTCSeconds",
    "setYear",
].map(function(key){
    var func = Date.prototype[key];
    protoBeMix[key] = function(){
        return func.apply(this,arguments),this;
    }
});



var proto = {
    //把source对象的时间赋自身
    setTimeByDate(source){
        this.setHours(source.getHours(),source.getMinutes(),source.getSeconds(),source.getSeconds());
        return this;
    },
    /**
     * 获取本月的天数
     * @returns {number}
     */
    getDayMountInMonth(){
        let date = this.clone();
        date.setMonth(date.getMonth()+1);
        date.setDate(0);
        return date.getDate();
    },


    /**
     * 设置为一天的第0毫秒
     * @returns {*|proto}
     */
    setToDayStart(){
        return this.clearTime();
    },


    //设置为一天的最后一毫秒
    setToDayEnd(){
        return this.setHours(23,59,59,999),this;
    },


    /**
     * 设置为当月的第一毫秒
     */
    setToMonthStart(){
        return this.setDate(1), this.setToDayStart();
    },

    /**
     * 设置为当月的最后一毫秒
     */
    setToMonthEnd(){
        return this.setDate(this.getDayMountInMonth()), this.setToDayEnd();
    },


    /**
     * 设置为本年度第一天第一时刻
     */
    setToYearStart(){
        const m = this;
        m.setMonth(0, 1);
        m.setToDayStart();
        return m;
    },


    /**
     * 设置为本年度最后一刻
     */
    setToYearEnd(){
        const m = this;
        m.setMonth(12, 1);
        m.setToDayStart();
        m.setTime(m.getTime() - 1);
        return m;
    },

    /**
     * 是否是同一天
     * @param _date
     */
    isSameDay(_target){
        if(typeof _target == "number"){
            _target = new Date(_target)
        }

        let __target = _target  .clone().setToDayStart();
        let __this   = this     .clone().setToDayStart();
        return __target.getTime() == __this.getTime();
    },



    /**
     * 时间归零
     * @returns {proto}
     */
    clearTime(){
        return this.setHours(0,0,0,0),this;
    },


    clearDay(){
        return this.setDate(1),this;
    },

    /**
     * 按月格式化
     * @returns {*}
     */
    formatToMonth(){
        return this.format("%Y-%m");
    },
    formatToDay(){
        return this.format("%Y-%m-%d");
    },


    /**
     * 生成本月日历列表算法
     * @param isSundayStart 是否周日开头,默认 true
     * @returns {Array}
     */
    getCalendarDateList(isSundayStart){
        var m = this;
        if (typeof isSundayStart == "undefined") {
            isSundayStart = true;
        }

        var dic = proto.getCalendarDateList.month2listDic;

        if (!dic) {
            dic = proto.getCalendarDateList.month2listDic = [];
        }

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
    },
}


/**
 * 静态方法
 * @type {{create10: *, fromYYYY_MM(*): Date}}
 */
let statcFunctions = {
    /**
     * 从形如 2018-08 2015_06的形式创建Date
     * @param YYYY_MM
     * @returns {Date}
     */
    fromYYYY_MM(YYYY_MM){
        var str = YYYY_MM.replace(/_/g,"-") + "-01";
        return new Date(str);
    },

    /**
     * 从时间戳,date,时间戳字符串创建Date实例
     * @param date
     * @returns {*}
     */
    create10: DateUtils.parse2date,
}


Object.assign(Date.prototype,proto,protoBeMix);
Object.assign(Date.prototype, proto);
Object.assign(Date, statcFunctions);