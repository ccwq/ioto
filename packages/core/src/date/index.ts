//@ts-ignore
import * as $D from "./date-prototype";

/*
 * 转换各种类型的数据到日期
 * @param input {Date|Number|String}
 * @returns {Date|*}
 */
export const all2date:(input:any)=>Date|undefined = function(input:any){
    const now = new Date();

    //空对象
    if (!input) {
        return new Date();

    //日期对象
    }else if (input instanceof Date) {
        return input;

    //数字
    }else if (typeof input == "number") {

        const str = (input + "");

        const strArr = str.split("");
        const _year = parseInt(strArr.splice(0, 4).join(""));
        const _month = parseInt(strArr.splice(0, 2).join("")) - 1;
        const _day = parseInt(strArr.splice(0, 2).join(""))

        //年份
        if (str.length == 4) {
            now.setFullYear(_year);
            return now;
        //年月
        }else if (str.length == 6) {
            now.setFullYear(_year);
            now.setMonth(_month);
            return now;

        //年月日
        }else if (str.length == 8) {
            now.setFullYear(_year);
            now.setMonth(_month);
            now.setDate(_day);
            return now;
        }else{
            return new Date(input);
        }

        //字符串时间戳
    }else if (typeof input == "string") {
        input = input.trim();

        //纯数字
        if (/^\d+$/.test(input)) {
            return all2date(parseInt(input));

        //带有其他字符串
        }else{

            //日期分割
            const parts = input.split(/[-:\sTZ\+年月日时分秒]/);
            const [
                y  = now.getFullYear(),
                m  = now.getMonth() + 1,
                d  = now.getDate(),
                h  = now.getHours(),
                mm = now.getMinutes(),
                s  = now.getSeconds()
            ] = parts;

            const num = parseInt([
                y,
                (m + "").padStart(2, "0"),
                (d + "").padStart(2, "0"),
            ].join(""));

            //只有年月日的情况
            if (parts.length <= 3) {
                return all2date(num)

            //包含时间
            }else{
                const date = all2date(num);
                if (!date) {
                    throw new Error("无法解析的日期格式");
                }
                date.setHours(h, mm, s);
                return date;
            }
        }
    }
}

export const parse2date = all2date;


/**
 * 根据年月获取当月的天数
 * @param month "2015-06"
 */
export function getDayMountByMonth(month:string|number){
    var dateStr = "";

    if (typeof month == "string") {
        let splited = month.split("-");
        if (splited.length == 1) {
            month = parseInt(month)
        }else if(splited.length==2){
            dateStr = month + "-01"
        }else{
            dateStr = month
        }
        const d = $D(dateStr);
        return getDayLengthInMonth(d);
    }else if(typeof month =="number"){
        const d = new Date;
        d.setMonth(month - 1);
        return getDayLengthInMonth(d);
    } else{
        throw new Error("请传入有效类型")
    }
}

/**
 * 获取当前月份的的天数
 * @param date 各种日期类型的数据
 * @returns {number}
 */
export function getDayLengthInMonth(date:any) {
    date = new Date(parse2date(date)!.getTime())
    date.add(1,"month");
    date.setDate(0);
    return date.getDate();
}


export {
    default as Date2
} from "./Date2";
