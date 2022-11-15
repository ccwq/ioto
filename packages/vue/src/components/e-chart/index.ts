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

//@ts-ignore
import darkThemeRunner from "./dark.theme"
export const colorLs = [
    "#feb64d",
    "#ff7c7c",
    "#5bc49f",
    '#29b84c',
    '#a5b924',
    '#1564c0',
    "#60acfc",
    "#32d3eb",
];

export const getColor = function(index:number){
    return colorLs[index % colorLs.length];
}

let Echarts:any = null;
let echartBaseOption:any = {
    // color: colorLs,
};

export const initEchart = function (echarts:any, baseOptions?:any) {
    Echarts = echarts;

    if (baseOptions) {
        echartBaseOption = baseOptions;
    }
    darkThemeRunner(echarts);
}

export const getEcharts = () => Echarts;
export const getEchartBaseOption =  ()=> echartBaseOption;
export {default as EChart} from "./EChart.vue";
