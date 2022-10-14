import {IObject} from "@ioto/core/types/types";

const {

} = options;


export declare interface IVueEchartOption {
    echarts:any,
    name : string
    defaultTheme:string
    baseOption: IObject
    optionHook:Function
}
