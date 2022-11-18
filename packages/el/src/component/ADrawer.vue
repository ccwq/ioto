<template lang="pug">
ElDrawer(v-bind="vBind" custom-class="ADrawer" ref="drawerEl")
    slot(name="default")
</template>
<script lang="ts" setup>
import {computed, onMounted, ref, useAttrs, watch} from "vue";

const props = defineProps<{

    // 使用absolute定位
    positionAbs?:boolean
}>()
const emits = defineEmits<{}>()
const attrs = useAttrs()
const vBind = computed(() => {
    return {
        ...attrs,
    }
});
const helperClass = "a-drawer-position-absolute"
const drawerEl = ref<any>();
onMounted(() => {
    watch(()=>props.positionAbs,(val)=>{
        const index = drawerEl?.value?.$refs?.drawerRef;
        const overlayEl = index?.parentElement;
        if (overlayEl) {
            if (props.positionAbs) {
                overlayEl.classList.add(helperClass);
            }else{
                overlayEl.classList.remove(helperClass);
            }
        }
    }, {immediate:true})
});
</script>
<style lang="less">
.ADrawer{
}
.a-drawer-position-absolute{
    position: absolute !important;
}
</style>
