/**
 *
// 项目中不包含ecahrt的引入，需要传入echart的实例
// 之类设置全局默认配置
import * as echarts from "echarts";
import {initEchart} from "@ioto/vue"
initEchart(echarts, {
    legend: {
        type:"scroll",
        // selectedMode:false,
    }
})

//在组建中使用
import {EChart} from "@ioto/vue"
<template>
     <EChart :option="option" />
</template>
 */
export declare const colorLs: string[];
export declare const getColor: (index: number) => string;
export declare const initEchart: (echarts: any, baseOptions?: any) => void;
export declare const getEcharts: () => any;
export declare const getEchartBaseOption: () => any;
export { default as EChart } from "./EChart.vue";
