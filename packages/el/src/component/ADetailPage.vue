<template lang="pug">
mixin innner
    AFormCreate.ADetailPage(:rule="rules" :model-value="s.row" v-bind="aFormVBind" compact="ex-small" v-if="loadStatus=='success'")
        template(#footer): i
    div(v-else-if="loadStatus=='loading'" v-loading="true" style="min-height: 100px")
    slot
ADialog(
    v-if="!props.noWrapper" :title="title"
    :modelValue="!!(props.id||props.row)"
    @closed="hanlderClose"
    style="--index-dialog-padding-primary: 10px;"
    :width="width"
)
    template(#header)
        slot(name="dialog-header")
    +innner
template(v-else)
    +innner


</template>
<script lang="ts" setup>
import {reactive, ref, watch} from "vue";
import {aMaker, maker, useFC} from "/@/utils/form-create-setup";
import {ADialog, ATagInput} from "/@/components/common";
import AFormCreate from "/@/components/common/AFormCreate.vue";
const props = withDefaults(defineProps<{
    id?: string
    row?: any

    // 如果使用id的方式，需要提供api,以获取实例
    api?: (id:string)=>Promise<any>

    rules?: any[]
    title?:string

    width?: string

    noWrapper?: boolean
}>(),{
    noWrapper:false,
})

const emits = defineEmits<{
    (event: 'update:id', id:string): void
    (event: 'update:row', id:any): void
}>()
const loadStatus = ref("empty" as LoadingStatus);
const s = reactive({row: {}})

// id方式的处理
watch(()=>props.id, async id => {
    if (props.row || !id) {
        return;
    }
    if(!props.api){
        console.error("未提供api");
        return;
    }
    try {
        loadStatus.value = "loading";
        const resp = await props.api(id);
        s.row = resp.data;
        emits("update:row", s.row);
        loadStatus.value = "success";
    } catch (e) {
        loadStatus.value = "error";
        console.error("获取任务单数据失败", e);
    }
}, {immediate: true});

// row方式的处理
watch(() => props.row, row => {
    if (row) {
        s.row = row;
        loadStatus.value = "success";
        emits("update:row", s.row);
    }
}, {immediate: true});

const hanlderClose = () => {
    emits('update:id', "")
    emits('update:row', undefined)
}

const {aFormVBind} = useFC({
    global:{
        "*":{
            col: {
                span: 12
            }
        }
    }
})
</script>
<style lang="less">
@import "src/theme/mixin";
.ADetailPage{
    .form-create{
        .index-col{
            //margin-bottom: 5px;
        }
        .index-form-item{
            //background-color: @grey50;
            border-bottom: 1px solid @grey100;
            padding: 5px 0;
        }
        .index-form-item__label{
            //margin-right: 0.5em;
            //background-color: @grey300;
            &:after{
                content: ":";
                font-weight: bolder;
                padding-left: 2px;
            }
        }
    }
}
</style>
