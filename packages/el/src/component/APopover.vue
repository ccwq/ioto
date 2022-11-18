<template lang="pug">
ElPopover.APopover(v-if="!props.virtual" v-bind="vBind")
    slot(v-if="contnetReady")
    template(#reference)
        slot(name="reference" :hasReady="hasReady")
template(v-else)
    slot(name="content")



</template>
<script lang="ts" setup>
import {computed, ref, useAttrs} from "vue";
const props = withDefaults(defineProps<{
    renderWhenReady?: boolean

    // 虚拟的弹出
    virtual?: boolean

}>(),{
    virtual:false,
    renderWhenReady: true
})
const emits = defineEmits<{}>()
const attrs = useAttrs()

const contnetReady = computed(()=>{
    if(props.renderWhenReady){
        return hasReady.value
    }else{
        return true
    }
})

// 是否已经进行了首次渲染
const hasReady = ref(false)
const vBind = computed(()=>{
    return {
        ...attrs,
        "onShow"(){
            hasReady.value = true
            //@ts-ignore
            attrs?.["onShow"]?.()
        }

    }
})
</script>
<style scoped lang="less">
.APopover{

}
</style>
