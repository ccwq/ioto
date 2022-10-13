import Index from "./StringUtils";
import {safeBindToObject} from "../baseUtil";

const p =  String.prototype;


/**
 * 首字母大写
 * @returns {string}
 * @private
 */
const _firstLetterUppercase = function () {
    return Index.firstLetterUppercase(this);
};

safeBindToObject(p, "firstLetterUppercase", _firstLetterUppercase);
safeBindToObject(p, "firstCaserUpper", _firstLetterUppercase);
safeBindToObject(p, "firstUpper", _firstLetterUppercase);


/**
 * 获取子字符串，类似substr，但是支持设置scale
 * @param position
 * @param number
 * @param scale
 * @private
 */
const _sub = function(position, number ,scale){
    const m = this;
    return m.split("").__sub(position, number, scale).join("");
}


safeBindToObject(p, "sub", _sub);
