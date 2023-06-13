import {ref, watch} from "vue";

/**
 * 橡皮筋值
 * 想象一个橡皮及，在拉伸之后，松开手指，橡皮筋会回弹
 * 该hook类似，初始值为initValue,当被设置为pullValue的时候，在delay之内会回弹到initValue
 * @param initValue
 */
export const userRubberValue = (initValue = false, pullValue = true, delay = 0) => {
    const value = ref(initValue)
    watch(value, (newValue) => {
        let timeout = null as ReturnType<typeof setTimeout> | null;

        if (newValue == pullValue) {
            timeout = setTimeout(() => value.value = initValue, delay);
        }else{

            // 重新设值,取消上一次回弹的趋势
            clearTimeout(timeout as ReturnType<typeof setTimeout>);
        }
    })
    return value
};

export default userRubberValue