import {isPlainObject} from "../object";

export {
    default as AError
} from "./AError"

/**
 * 从其他类型的错误对象中获取错误字符串
 */
export const getErrorString = (object: any): string => {
    if (typeof object == "undefined") {
        return ""
    }

    else if (typeof object == "string") {
        return object;
    }

    else if (object instanceof Error) {
        return object.message;
    }

    // 纯对象
    else if (isPlainObject(object)) {
        return object.error;
    } else {
        console.warn("未知错误类型", object);
        return "";
    }
}
