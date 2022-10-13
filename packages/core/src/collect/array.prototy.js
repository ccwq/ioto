import merge from "lodash/merge";
import {safeBindToObject} from "../baseUtil";

const p = Array.prototype;




//克隆
let _clone = function(deep){
    if (deep) {
        return merge([], this);
    }else{
        return [...this];
    }
}
safeBindToObject(p, "clone", _clone);



/**
 * splite保护版本
 * @private
 */

/**
 * 类似于splite,但是不会改变原数组
 * @param position  开始位置
 * @param number    截取数量
 * @param scale     比率。如果scale为1，position为1，则会从1*2的位置截取 number * scale个元素
 * @private
 */
const _sub = function(position=0, number, scale=1){
    const m = this;

    position = position * scale;

    if(position<0){
        position = m.length + position;
    }

    if (position >= m.length) {
        return [];
    }

    if (typeof number == "undefined") {
        number = m.length;
    }


    let end = position + number * scale;
    return m.slice(position, end);
}

safeBindToObject(p, "sub", _sub);
