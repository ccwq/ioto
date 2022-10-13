import Math2 from "./Math2";


/**
 * 判断并返回值是否属于某个集合安全值
 * @param value
 * @param ls
 * @param def
 * @returns {number|*}
 */
export const safeValueInLs = function (value, ls, def = 0) {

    if (ls.includes(value)) {
        return value
    } else {
        if (typeof def == "number") {
            if (def == -1) {
                def = ls.length - 1;
            }
            return ls[def];
        } else {
            return def;
        }
    }

    return ls.includes(value) || def;
};



/**
 * 数字范围安全安全值
 * @param value
 * @param min
 * @param max
 * @returns {number}
 */
export const safeValueInRange = function (value, max = Number.MAX_SAFE_INTEGER, min = 0) {
    const isHex = typeof value == "string"
    let ret = isHex ? Math2.toDEC(value) : value;
    if (typeof min == "number") {
        ret = Math.max(min, ret);
    }

    if (typeof max == "number") {
        ret = Math.min(max, ret);
    }

    return isHex ? Math2.toHEX(ret) : ret;
};