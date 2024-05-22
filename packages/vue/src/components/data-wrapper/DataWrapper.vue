<!--
 * @Creator: Albus
 * @Date: 2024/15/141 15:11:35
 * @Description: 对DataWrapper进行vue封装,使方便在vue组件中使用
 -->

<template lang="pug">
template(v-if="status ===DWStatusEnum.READY")
    slot(name="ready")
template(v-else-if="status === DWStatusEnum.LOADING")
    slot(name="loading")
        div 加载中...
template(v-else-if="status === DWStatusEnum.EMPTY")
    slot(name="empty")
        div 数据为空
template(v-else-if="status === DWStatusEnum.ERROR")
    slot(name="error" :error="modelValue.error")
        div(:class="attrs.class") {{modelValue.error}}
template(v-else-if="status === DWStatusEnum.SUCCESS")
    slot(:attrs="attrs" :data="data")
template(v-else)
    div(:class="attrs.class") 其他状态
</template>
<script lang="ts" setup>
import {computed} from "vue"
import {DWStatusEnum, type IDataWrapper} from "./dataWrapper"

export type ILoadingStatus = "ready" | 'success' | 'loading' | 'error' | 'empty'


const props = withDefaults(defineProps<{

    // DataWrapper实例
    modelValue: IDataWrapper

    // 当存在数据不为空时,不显示loading
    // 场景1:在图表中,希望图表数据切换的时候不要出现图表闪烁
    justLoadingWhenEmpty?: boolean

}>(), {
    justLoadingWhenEmpty: false
})

const attrs = {}

/**
 * 判定数据是否为空
 * @param data
 */
const isEmptyFunc = (data:any)=>{
    let isEmpty = Array.isArray(data.value) ? !data.value.length : !data.value;
    return isEmpty
}

/**
 * 计算状态
 */
const status = computed<DWStatusEnum>(() => {
    const du = props.modelValue;

    // 当存在数据不为空时,不显示loading
    // 场景1:在图表中,希望图表数据切换的时候不要出现图表闪烁
    if (props.justLoadingWhenEmpty) {
        if (du.status === DWStatusEnum.LOADING) {
            if (isEmptyFunc(du)) {
                return DWStatusEnum.LOADING
            }else {
                return DWStatusEnum.SUCCESS
            }
        }else{
            return du.status
        }
    }else
        return props.modelValue?.status;
})


/**
 * 数据
 */
const data = computed(() => {
    return props.modelValue?.value;
})

const emits = defineEmits<{}>()
</script>
<style lang="less">
.DataWrapper {
    &:not(.__auto){
        position: relative;
        > * {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }
    &.__auto{
        //position: relative;
    }
    &.status-error, &.status-empty{
        min-height: var(--dw-min-height,  180px);
    }
    &.status-error{
        &:not(.fx1){
            width: 100%;
        }
    }
}
</style>
