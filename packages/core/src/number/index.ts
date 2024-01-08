
/**
 * 数字前面补0，凑够特定长度
 * @param totalLength 要凑够的长度
 * @param value 数字可以是数字，也可以是字符串。如果是字符串可能是非10进制数字，请使用第三方个参数来处理
 */
export function preppendZero(totalLength:number, value:string|number) {
    let pad = totalLength - (value + "").length;
    if (pad <= 0) {
        return value + "";
    }
    return Array(pad).fill("0").join("") + (value + "")
}


/**
 * 截取js小数计算出现无限循环之外的部分
 * strip(0.2+0.1)==0.3
 * @param number
 * @param precision
 * @returns {number}
 */
export function strip(number:number, precision = 12) {
    if (typeof number != "number") {
        number = 0;
    }
    return +parseFloat(number.toPrecision(precision));
}

/**
 *
 * @param number
 * @param fixed
 */
export function stripAndFix(number:number, fixedNum=2){
    if (typeof number != "number") {
        number = 0;
    }
    const resultStr = strip(number).toFixed(fixedNum);
    return parseFloat(resultStr);
}

import Math2 from "./Math2";





/**
 * 数字范围安全安全值
 * safeValueInRange(value, 0, 100) // 0-100
 * 如果value小于0，返回0，如果value大于100，返回100, 否则返回value
 * @param value 要处理的数字,如果是字符串,认为是hex字符串
 * @param min
 * @param max
 * @returns {number}
 */
export const safeValueInRange = function (value:number|string, max = Number.MAX_SAFE_INTEGER, min = 0) {
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


/**
 * 解析数字
 * @param input
 * @param backupValue
 */
export const safeParseNumber = (input: any, backupValue: number = 0) => {
    if (typeof input == "number") {
        return input;
    }
    let _input = input + "";
    const parse = _input.includes(".") ? parseFloat : parseInt;
    const value = parse(input);
    if (isNaN(value)) {
        return backupValue
    }
    return value
}


/**
 * 将给定的值分割成指定数量的随机段，满足约束条件。
 *
 * @param {number} value - 要分割的值。
 * @param {number} n - 分割成的段数。
 * @param {number} minValue - 每个返回值的最小值。
 * @returns {Array} - 返回一个整数数组，满足约束条件，如果无法满足条件，返回空数组。
 */
export function randomSegmentation(value:number, n:number, minValue:number) {
    function getRandomInt(min:number, max:number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateRandomArray() {
        const result = [];
        let remainingValue = value;

        for (let i = 0; i < n - 1; i++) {
            const randomValue = getRandomInt(minValue, remainingValue - (minValue * (n - 1 - i)));
            result.push(randomValue);
            remainingValue -= randomValue;
        }

        result.push(remainingValue);

        return result;
    }

    let attempts = 0;
    while (attempts < 5) {
        const randomArray = generateRandomArray();

        if (randomArray.every(num => num >= minValue)) {
            return randomArray;
        }

        attempts++;
    }

    // 如果无法满足条件，返回空数组或者其他你认为合适的值
    return [];
}

export {
    default as Math2
} from "./Math2"



