<template lang="pug">
.v-box-comp( :class="[`overflowType_${overflowType}`]" )
    slot(name="header")
    ._container_wp
        SizeMonitor(
            v-if="!disableSizeCalc"
            @input="sizeHandler"
            :offsetHeight="offsetX"
            :offsetWidth="offsetY"
        )
        ._container(v-if="!raiseSlot")
            slot( :size="size" :width="size[0]" :height="size[1]")
        template( v-else)
            span.__slot_anchor(ref="slotAnchor")
            slot( :size="size" :width="size[0]" :height="size[1]" className="_container")
    slot(name="footer")
</template>
<script lang="ts" setup>
    import SizeMonitor from "./SizeMonitor.vue"
    import {onMounted, ref, watch} from "vue";
    const size = ref<[number|string, number|string]>([0, 0])

    interface Prop {
        /**
         * 设置_container的overflow值
         */
        overflowType?: "auto" | "hidden" | "x" | "y",

        //提升slot，以替换container的位置
        //需要slot为单节点
        raiseSlot?: boolean,
        offsetX?: number,
        offsetY?: number,

        // 停止更新
        disableSizeCalc?: boolean,
        unit?: string,
    }
    const props = withDefaults(defineProps<Prop>(), {
        overflowType:"y",
        raiseSlot:false,
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
        watch(()=>props.raiseSlot, (v)=>{
            const nextEl = slotAnchor.value?.nextElementSibling;
            if (nextEl) {
                nextEl.classList.add("_container");
            }
        }, {immediate:true})
    })
</script>
<style lang="less">
    .v-box-comp {
        display:flex;
        flex-direction: column;
        align-items: stretch;

        >._container_wp{
            position: relative;
            flex: 1;
            >._container{
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 100%;
                overflow-y: auto;
            }
        }

        &.overflowType_hide{
            >._container_wp>._container{
                overflow: hidden;
            }
        }

        &.overflowType_auto{
            >._container_wp>._container{
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
