<template lang="pug">
.v-box( :class="[overflowTypeString]" )
    slot(name="header")
    .v-box-container
        SizeMonitor(
            v-if="!disableSizeCalc"
            @update:modelValue="handlerSize"
            :offsetHeight="offsetX"
            :offsetWidth="offsetY"
        )
        .v-box-scroller(v-if="!noScroll")
            slot( :size="size" :width="size[0]" :height="size[1]")
        template( v-else)
            span.__slot_anchor(ref="slotAnchor")
            slot( :size="size" :width="size[0]" :height="size[1]" className="v-box-scroller")
    slot(name="footer")
</template>
<script lang="ts" setup>
    import SizeMonitor from "./SizeMonitor.vue"
    import {computed, onMounted, ref, watch} from "vue";
    const size = ref<[number|string, number|string]>([0, 0])

    interface Prop {
        /**
         * 设置_container的overflow值
         */
        overflowType?: "auto" | "hidden" | "x" | "y",

        //提升slot，以替换container的位置
        //需要slot为单节点
        noScroll?: boolean,
        offsetX?: number,
        offsetY?: number,

        // 停止更新
        disableSizeCalc?: boolean,
        unit?: string,
    }
    const props = withDefaults(defineProps<Prop>(), {
        overflowType:"y",
        noScroll:false,
        offsetX:0,
        offsetY:0,
        disableSizeCalc:false,
        unit:"",
    })

    const handlerSize = (aSize: [number, number]=[0,0]) => {
        const [w,h] = aSize;
        if (props.unit) {
            size.value = [w + props.unit, h + props.unit];
        }else{
            size.value = [w, h];
        }
    }

    const slotAnchor = ref<HTMLDivElement>();
    onMounted(()=>{
        watch(()=>props.noScroll, (v)=>{
            const nextEl = slotAnchor.value?.nextElementSibling;
            if (nextEl) {
                nextEl.classList.add("v-box-scroller");
            }
        }, {immediate:true})
    })

    const overflowTypeString = computed(()=>{
        if (props.noScroll) {
            return ""
        }else{
            return `overflowType_${props.overflowType}`;
        }
    })
</script>
<style lang="less">
    .v-box{
        display:flex;
        flex-direction: column;
        align-items: stretch;

        >.v-box-container{
            position: relative;
            flex: 1;
            >.v-box-scroller{
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 100%;
                overflow-y: auto;
            }
        }

        &.overflowType_hidden{
            >.v-box-container>.v-box-scroller{
                overflow: hidden;
            }
        }

        &.overflowType_auto{
            >.v-box-container>.v-box-scroller{
                overflow: auto;
            }
        }

        &.overflowType_y{
            overflow-y: auto;
        }

        &.overflowType_x{
            overflow-x: auto;
        }
    }
</style>
