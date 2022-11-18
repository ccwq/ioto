<template lang="pug">
index-pagination.a-page(v-bind="vBind")
</template>
<script lang="ts">
import {computed, toRefs} from "vue";

export default {
    props:{
        total:{
            type:Number,
            default:1,
        },
        pageSize:{
            type:Number,
            default:10,
        },
        currentPage:{
            type:Number,
            default:1,
        },
    },
    setup(attrs, ctx) {

        const emits = ctx.emit
        const vBind = computed(() => {
            return {
                pagerCount: 5,
                pageSizes: [10, 20, 30],
                background: true,
                layout: "total, sizes, prev, pager, next, jumper",
                ...ctx.attrs,
                ...attrs,
                "onUpdate:currentPage": (val: number) => {
                    emits("update:currentPage", val);
                },
                "onUpdate:pageSize": (val: number) => {
                    emits("update:pageSize", val);
                },
                "onSize-change": (val: number) => {
                    emits("size-change", val);
                },
                "onCurrent-change": (val: number) => {
                    emits("current-change", val);
                },
            }
        });

        return {
            vBind,
        }
    }
}
</script>

<style lang="less">
.a-page{

}
</style>
