<template lang="pug">
.f9-layout(:class="[type]" :style="elStyle")
    .bg: div( v-for="(url,index) in urlLs" :key="url" v-bind="bindLs[index]" )
    slot

</template>
<script setup lang="ts">
import {getImageSize} from "@ioto/core/src/base";
import get from "lodash/get";
import compact from "lodash/compact"
import {computed, ref, watch} from "vue";
import {IObject} from "@ioto/core/types/types";
const classMap9 = {
    0:"l t",
    1:"c t",
    2:"r t",
    3:"l m",
    4:"c m",
    5:"r m",
    6:"l b",
    7:"c b",
    8:"r b",
}
const classMap3h = {0:"l", 1:"c", 2:"r"};
const classMap3v = {0:"t", 1:"m", 2:"b"};
const CLASS_MAP_LIST:IObject = {classMap9, classMap3h, classMap3v};

interface Size {width:number, height:number}

const sizeLs = ref<Size[]|[]>([]);

const props = withDefaults(defineProps<{

    // 文件序列起始
    startNum?:0|1
    urlList?:string[]

    // 形如/static/foo/bar-0[index].png
    // function(index, startNum){}
    urlPatten?: ""|`${string}${"[index]"}${string}` | ((index: number, startNum: 0 | 1) => string)

    // 9是九宫格, 3h是横向3个, 3v是纵向3个
    type?: "9" | "3h" | "3v"

    // 元素的最小尺寸,避免缩放过小
    minWidth?: number
    minHeight?: number
}>(), {
    startNum:0,
    urlList:()=>[],
    urlPatten:"",
    type:"9",
})

// 对urllist的验证
if ([0, 3, 9].includes(props.urlList.length)) {
    throw new Error("urlList length must be 0, 3 or 9");
}


const topHeight = computed(()=>{
    sizeLs.value?.[0]?.height
})

const bottomHeight = computed(()=>{
    sizeLs.value?.[6]?.height
})

const leftWidth = computed(()=>{
    sizeLs.value?.[3]?.width
})

const rightWidth = computed(()=>{
    sizeLs.value?.[5]?.width
})

const sizes = computed<{
    [key:`${"col"|"row"}_${"h"|"w"}_${number}`]:number
}>(()=>{
    return Array(3).fill(1).reduce((ret, el, index)=>{
        ret[`col_w_${index + 1}`] = get(sizeLs.value, index + ".width", 0)
        ret[`row_h_${index + 1}`] = props.type == "9"?
            get(sizeLs.value, index * 3 + ".height", 0):
            get(sizeLs.value, index + ".height", 0)
        ;
        return ret;
    }, {})
})

// 整体高度
const minWidth = computed(()=>{
    if (props.type == "3v") {
        return sizes.value.col_w_1;
    }
    return sizes.value.col_w_1 + sizes.value.col_w_3;
})

//整体宽度
const minHeight = computed(()=>{
    if (props.type == "3h") {
        return sizes.value.row_h_1;
    }
    return sizes.value.row_h_1 + sizes.value.row_h_3;
})

const elStyle = computed(()=>{
    let ret:IObject = {};
    if (props.minWidth) {
        ret["min-width"] = props.minWidth + "px";
    }
    if (props.minHeight) {
        ret["min-height"] = props.minHeight + "px";
    }
    ret["top-height"] = topHeight.value + "px";
    ret["bottom-height"] = bottomHeight.value + "px";
    ret["left-width"] = leftWidth.value + "px";
    ret["right-width"] = rightWidth.value + "px";
    return ret;
})

const urlLs = computed(()=>{
    if (props.urlList.length) {
        return props.urlList;
    }else{
        return Array(props.type=="9"?9:3).fill(1).map((el, index)=>{
            let partten:string;
            if (typeof props.urlPatten == "string") {
                partten = props.urlPatten.replace(/\[index\]/g, index + props.startNum + "");
            }else if(typeof props.urlPatten == "function"){
                partten = props.urlPatten(index + props.startNum, props.startNum);
            }else{
                throw new Error("urlPatten参数错误")
            }
            return partten.replace(/\[index\]/g, index + props.startNum + "");
        })
    }
})

const bindLs = computed(()=>{
    let classMap = CLASS_MAP_LIST["classMap" + props.type];
    return urlLs.value.map((url, index)=>{

        let className = classMap[index];

        let ret =  {
            style:{
                backgroundImage:`url(${url})`,
                left:"",
                top:"",
                right:"",
                bottom:"",
                width:"",
                height:""
            },
            class: [className],
        }

        let width = 0, height = 0;
        if (className.indexOf("l")!=-1) {
            width = sizes.value.col_w_1;
        }
        if (className.indexOf("c")!=-1) {
            //width = m.col_w_2;
            ret.style.left = sizes.value.col_w_1 + "px";
            ret.style.right = sizes.value.col_w_3 + "px";
        }
        if (className.indexOf("r")!=-1) {
            width = sizes.value.col_w_3;
        }
        if (className.indexOf("t")!=-1) {
            height = sizes.value.row_h_1;
        }
        if (className.indexOf("m")!=-1) {
            //height = m.row_h_2;
            ret.style.top = sizes.value.row_h_1 + "px";
            ret.style.bottom = sizes.value.row_h_3 + "px";
        }
        if (className.indexOf("b")!=-1) {
            height = sizes.value.row_h_3;
        }

        if (props.type == "3v") {
            height = sizes.value.col_w_1;
        }

        if (props.type == "3h") {
            height = sizes.value.row_h_1;
        }


        //
        if (width) {
            ret.style.width = width + "px";
        }
        if (height) {
            ret.style.height = height + "px";
        }

        return ret;
    })
})


watch(() => urlLs, () => {
    const m = props;
    let uLs = urlLs.value;
    uLs = compact(uLs);
    if (!uLs.length) {
        return;
    }
    Promise.all(urlLs.value.map(url=>getImageSize(url).catch(__=>{})))
        .then(ls=>{
            sizeLs.value = ls as Size[];
        })
    ;
}, {immediate: true});
</script>
<style scoped lang="less">
.f9-layout {
    position: relative;

    > .bg {
        position: absolute;
        z-index: 1;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
    }

    > * {
        position: relative;
        z-index: 5;
    }

    > .bg div {
        position: absolute;
    }

    > .bg .l {
        left: 0;
    }

    > .bg .t {
        top: 0;
    }

    > .bg .r {
        right: 0;
    }

    > .bg .b {
        bottom: 0;
    }

    > .bg .c {
        //background-repeat: repeat-x;
    }

    > .bg .m {
        //background-repeat: repeat-y;
    }

    > .bg .c.m {
        //background-repeat: repeat;
        //background-color: red;
        background-repeat: no-repeat;
    }


    .t.c{
        background-size: 100% var(--top-height);
    }
    .b.c{
        background-size: 100% var(--bottom-height);
    }
    .l.m{
        background-size: var(--left-width) 100%;
    }
    .r.m{
        background-size: var(--right-width) 100%;
    }
}
</style>
