import debounce from "lodash/debounce";
export {
    columnParseFactory
} from "./view-design-utils";


/**
 * 急促的连续请求，只执行最后一次，然后
 * @param asyncFunction
 * @param delay
 */
export const debouncePromiseFunc = (
    asyncFunction: (...rest:any[]) => any,
    delay = 150
) => {
    const de = debounce(() => isExpired = true, delay);

    // 已过期？
    let isExpired = true;
    let currentPromise: Promise<any> | null = null;
    return async function (this: any, ...args: any[]) {

        // 数据过期了,刷新数据
        if (isExpired) {
            currentPromise = asyncFunction.apply(this, args);
            isExpired = false;
        }

        // 重新开始计时
        de();
        return currentPromise;
    }
};
