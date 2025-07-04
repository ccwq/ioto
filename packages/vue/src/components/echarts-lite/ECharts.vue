<!--
 * @Author: ccwq
 * @Date: 2025/7/4 11:20:41
 * @Description: vue组件的封装
 -->
<template lang="pug">
.ECharts(ref="rootEl" :style="styles")
    .echarts-header: slot(name="header")
    .echarts-body
        .chart-node

        // 可以放一些覆盖物在图表上
        slot
    .echarts-footer: slot(name="footer")

</template>
<script lang="ts">
import {defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch, computed} from "vue";
import * as Echarts from "echarts";
import 'echarts-liquidfill'
import "echarts-gl"


/**
 * @typedef {import('echarts').EChartsOption} EChartsOption
 */


export default defineComponent({
    name: 'ECharts',

    props:{

        throttleDelay:{
            type:Number,
            default: 16,
        },

        /**
         * @property {EChartsOption | [EChartsOption, boolean?, boolean?]} options - ECharts 配置项。
         *
         * 该 prop 支持两种形式：
         *
         * 1.  **对象（全局更新）：** 一个标准的 ECharts 配置对象。用于定义或更新整个图表配置。
         *
         * @example
         * // 示例 1: 设置基本柱状图配置
         * {
         *   title: { text: '月销售额' },
         *   xAxis: { data: ['一月', '二月', '三月'] },
         *   yAxis: {},
         *   series: [{
         *     name: '销售额',
         *     type: 'bar',
         *     data: [5, 20, 36]
         *   }]
         * }
         *
         * @example
         * // 示例 2: 更新现有图表的数据
         * {
         *   series: [{
         *     data: [12, 18, 25] // 新数据
         *   }]
         * }
         *
         * 2.  **数组（精确更新）：** 一个参数数组，会直接展开并作为 `echartsInstance.setOption()` 方法的参数。
         * 这允许对 ECharts 更新方式进行更精细的控制，包括追加数据或控制动画。数组通常包含：
         * - 第一个元素：一个 EChartsOption 对象。
         * - 第二个元素（可选）：一个布尔值，表示是否 `notMerge`（不合并）。
         * - 第三个元素（可选）：一个布尔值，表示是否 `lazyUpdate`（延迟更新）。
         *
         * @example
         * // 示例 3: 向现有系列追加新数据
         * [
         *   {
         *     series: [{
         *       data: [50, 60, 70], // 要追加的数据点
         *       type: 'line'
         *     }]
         *   },
         *   false, // 不合并
         *   true   // 延迟更新
         * ]
         *
         * @example
         * // 示例 4: 不合并地更新图表的特定系列
         * [
         *   {
         *     series: [{
         *       type: 'bar',
         *       data: [100, 150, 200]
         *     }]
         *   },
         *   true // 不合并
         * ]
         */
        options:{
            type:[Object, Array],
            default:()=>({})
        },
        on:{
            type:Object,
            default:()=>({}),
        }
    },
    setup(props, {emit}){
        const m = getCurrentInstance()?.proxy;
        const rootEl = ref<HTMLDivElement|null>(null)

        const headerHeight = ref(0);
        const footerHeight = ref(0);

        const styles = computed(() => `--header-height:${headerHeight.value}px;--footer-height:${footerHeight.value}px;`);

        onMounted(async () => {

            // 初始化
            const dom = rootEl.value.querySelector(".chart-node");
            const inst = Echarts.init(dom, "dark",{
                // renderer:"svg",
            });
            //-----------------

            // 赋值
            watch(() => props.options, (options) => {

                // 精确更新
                if (Array.isArray(options)) {
                    const setOptionsPrams = options
                    inst.setOption(...setOptionsPrams);
                }

                // 全局更新
                else {
                    inst.setOption({
                        ...options,
                        darkMode:true,
                    });
                }

            }, {immediate: true});
            //-----------------

            // 尺寸变化
            const deInstResize = throttle((wh) => inst.resize(wh), props.throttleDelay);
            const resizeObserver = new ResizeObserver(entries => {
                for (let entry of entries) {
                    const {width, height} = entry.contentRect
                    const classes = entry.target.classList;
                    if (classes.contains("echarts-header")) {
                        headerHeight.value = height;
                    } else if (classes.contains("echarts-footer")) {
                        footerHeight.value = height;
                    } else if (classes.contains("echarts-body")) {
                        deInstResize({width, height})
                    }
                }
            });
            //-- 尺寸变化

            // await new Promise(r => setTimeout(r, 0));

            const header = rootEl.value.querySelector(".echarts-header");
            const footer = rootEl.value.querySelector(".echarts-footer");
            const body = rootEl.value.querySelector(".echarts-body");
            headerHeight.value = header?.clientHeight || 0;
            footerHeight.value = footer?.clientHeight || 0;

            resizeObserver.observe(body)
            resizeObserver.observe(header)
            resizeObserver.observe(footer)

            inst.resize({width: body.clientWidth, height: body.clientHeight})

            // 外部绑定事件
            if (props.on) {
                Object.keys(props.on).forEach(eventName => {
                    inst.on(eventName, props.on[eventName])
                });
            }

            emit("ready", inst, Echarts);

            onBeforeUnmount(() => {
                resizeObserver.disconnect()
                inst.dispose();
            })
            //-----------------
        })


        return {
            styles,
            rootEl,
            footerHeight,
            headerHeight,
        }
    }
})

/**
 * 创建一个节流函数，在指定时间内最多执行一次 `func`。
 * 节流函数会取消在 `wait` 毫秒内触发的后续调用，直到 `wait` 毫秒过去。
 *
 * @param {Function} func 要节流的函数。
 * @param {number} [wait=0] 需要等待的毫秒数。
 * @param {Object} [options={}] 选项对象。
 * @param {boolean} [options.leading=true] 指定是否在 `wait` 的开始前缘调用 `func`。
 * @param {boolean} [options.trailing=true] 指定是否在 `wait` 的结束时后缘调用 `func`。
 * @returns {Function} 返回节流后的函数。
 */
function throttle(func, wait = 0, options = {}) {
    let inThrottle, lastFn, lastTime;
    const { leading = true, trailing = true } = options;

    if (leading === false && trailing === false) {
        // 如果 leading 和 trailing 都为 false，则函数永远不会执行，直接返回一个空函数。
        return () => {};
    }

    return function(...args) {
        const context = this;
        if (!inThrottle) {
            if (leading) {
                func.apply(context, args);
            }
            lastTime = Date.now();
            inThrottle = true;
        } else {
            if (trailing) {
                clearTimeout(lastFn);
                lastFn = setTimeout(function() {
                    if (Date.now() - lastTime >= wait) {
                        func.apply(context, args);
                        lastTime = Date.now();
                    }
                }, Math.max(wait - (Date.now() - lastTime), 0));
            }
        }
    };
}

</script>
<style lang="less">
.ECharts{
    position: relative;
    min-height: calc(160px * var(--design-scale, 1));

    .echarts-body{
        position: absolute;
        width: 100%;
        height: calc(100% - var(--header-height) - var(--footer-height));
        left: 0;
        right: 0;
        top: var(--header-height);
        z-index: 2;
    }
    .chart-node{
        position: absolute;
        inset: 0;
    }

    .echarts-header{
        overflow: hidden;
    }
    .echarts-footer{
        overflow: hidden;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    &.__with_effect_element{
        position: relative;
        .__chart_effect{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            z-index: -1;
        }
    }
}
</style>
