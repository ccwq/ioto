<template lang="pug">
.a-form-create(:class="[`compact-${compact}`]" )
    form-create( v-bind="vBind" v-if="option" :option="option")
    .footer(v-if="!disabled")
        slot(name="footer" :submit="handlerSubmit" :reset="handlerReset")
            template(v-if="!props.noFooter")
                slot(name="before-footer")
                AButton(@click="handlerSubmit()" type="success" icon="elementCircleCheckFilled").ph20 提交
                AButton(type="warning" @click="handlerReset()" icon="elementRefreshLeft") 重置
                slot(name="after-footer")
</template>
<script lang="ts" setup>
import {computed, nextTick, provide, ref, type Ref, toRefs, useAttrs, watchEffect} from "vue";
import set from "lodash/set";
import get from "lodash/get";
import AButton from "/@/components/common/AButton.vue";
import {aFormCreateKey, aMaker} from "/@/utils/form-create-setup";
import type {OptionAttrs} from "@form-create/element-ui/types/config";
import type {Rule} from "src/utils/form-create-setup";

const props = withDefaults(defineProps<{
    disabled?: boolean;
    labelWidth?: string,
    noSubmitBtn?: boolean,
    option?: OptionAttrs | Ref<OptionAttrs>,

    // 在提交之前自动验证，如果否直接触发submit时间
    autoValidate?: boolean,

    modelValue?: any;

    // 表单的rule需要切换，比如上一步下一步时候，
    // 需要保持所有值的情况下使用
    mergedValue?: any;

    compact?:"ex-small"|"small"|"normal"

    rule?:Rule[]
    rules?:Rule[]

    noFooter?:boolean

    // 在提交需要处理的事情
    beforeSubmit?: (formData: any, ...addi:any[]) => (Promise<false|any>)|false|any

}>(), {
    disabled: false,
    autoValidate: true,
    noSubmitBtn: true,

    modelValue: {} as any,
    mergedValue: {} as any,
    compact:"normal",
    noFooter:false
});

// 合并的数据
let mergedValue = {}
watchEffect(()=>{
    mergedValue = {
        ...props.mergedValue,
        ...props.modelValue,
    }
})

const emits = defineEmits<{
    (e:"update:api", api:FC):void
    (e:"ready", api:FC):void
    (e:"submit", api:FC, formData:any, ...addiRest:any[]):void
    (e:"reset", api: FC, ...addiRest: any[]): void;
    (e:"update:modelValue", value:any):void
    (e:"update:mergedValue", value:any):void
}>()

const attrs = useAttrs()

provide(aFormCreateKey, {
    disabled: computed(()=>props.disabled),
});


// 在提交之前，此项会变更,
// 用来通知子组件，准备好，我要提交了
const beforeButmitSeed = ref(0);

// 使用字符串注入，可以避免类型的引用导致通用性降低
provide("a-form-create", {
    beforeButmitSeed
})

const option = computed(()=>{
    const option = props.option || {};

    if (props.labelWidth) {
        set(option, "form.labelWidth", props.labelWidth);
    }
    if (props.noSubmitBtn) {
        set(option, "submitBtn.show", false);
    }

    if(!get(option, "submitBtn.size")){
        // set(option, "submitBtn.size", "small");
    }

    if(!get(option, "form.size")){
        // set(option, "form.size", "small");
    }

    // resetBtn setting
    if(!get(option, "resetBtn")){
        set(option, "resetBtn.show", false);
    }


    if (props.disabled) {
        set(option, "form.disabled", true);
    }

    return option;
})


// 是否处于禁用状态
const disabled = computed(()=>{

    // @ts-ignore
    return option.value?.form?.disabled
})


let fc:FC = null;

const handlerSubmit = async (...addiRest:any[]) => {
    let beforeSubmitReturn
    beforeButmitSeed.value++;

    // 提交之前等待,给需要提交数据的子组件提交数留出时间
    await nextTick();

    // 处理提交之前
    if (props.beforeSubmit) {
        const ret = await props.beforeSubmit({...fc.formData()}, ...addiRest);

        // 取消提交
        if (ret === false) {
            return;
        }

        // 数据
        else if (ret) {
            beforeSubmitReturn = ret;
        }
        // 为空
        else{
            beforeSubmitReturn = {}
        }
    }else{
        beforeSubmitReturn = {}
    }

    const formData = {...fc.formData(), ...beforeSubmitReturn};
    if (props.autoValidate) {
        await fc.validate().catch(err => {throw ""});
    }
    emits("submit", formData, fc, ...addiRest)
}

const handlerReset = (...addiRest:any[])=>{
    fc.resetFields()
    emits("reset", fc, ...addiRest);
}

const vBind = computed(() => {
    const modelValue = Object.assign({}, props.modelValue, props.mergedValue)
    let rule = props.rule || props.rules || []
    rule = rule.map(ru=>{
        if (Array.isArray(ru)) {
            //@ts-ignore
            return aMaker.rawText(...ru);
        }else{
            return ru;
        }
    })
    return {
        ...attrs,
        rule,
        modelValue,
        "onUpdate:modelValue"(value){
            emits("update:modelValue", value)
            mergedValue = {...mergedValue, ...value}
            emits("update:mergedValue", mergedValue)
        },
        "onUpdate:api"(api){
            fc = api;
            emits("update:api", api);
            emits("ready", api);
        },
    }
});


// 某些组件在编辑状态,但是没保存,需要禁止表单提交
const disableSubmit = ref(false);

</script>

<style lang="less">
.a-form-create{
    .footer{
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
    }

    &.compact-ex-small{
        .index-form-item{
            margin-bottom: 0;
        }
    }

    .row-text-component{
        color: var(--index-text-color-secondary);
    }

    &.item-compact{
        .index-form-item{
            margin-bottom: 16px;
        }
    }

}
</style>
