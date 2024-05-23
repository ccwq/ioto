<template lang="pug">
.FormCreateVue(:form-options="formBinder")
	FormCreate(v-bind="formBinder")
	.footer(v-if="!disabled")
		slot(name="footer" :submit="handlerSubmit" :reset="handlerReset")
			template(v-if="!noFooter")
				slot(name="before-footer")
				ElButton(@click="handlerSubmit()" type="success").ph20 提交
				ElButton(type="warning" @click="handlerReset()") 重置
				slot(name="after-footer")
</template>
<script lang="ts" setup>
import {computed, nextTick, ref, shallowRef, useAttrs, watchEffect} from "vue"
import type {FCAPI, FCRule, IPlainObject, OptionAttrs} from "./helper.d";
import {set, get, merge} from "lodash"

import formCreate from '@form-create/element-ui'
const FormCreate = formCreate.$form()

const props = withDefaults(defineProps<{
	disabled?: boolean;

	compact?:"ex-small"|"small"|"normal"

		// 自定义
	labelWidth?: string

	noSubmitBtn?: boolean

	// 在提交之前自动验证，如果否直接触发submit时间
	autoValidate?: boolean

	noFooter?:boolean

	// 在提交需要处理的事情
	beforeSubmit?: (formData: any, ...addi:any[]) => (Promise<false|any>)|false|any

	// 表单的rule需要切换，比如上一步下一步时候，
	// 需要保持所有值的情况下使用
	mergedValue?: any

	formBinder:{
		option: OptionAttrs
		rule: FCRule[]
		[key:string]: any
	},


    // 表单值
    modelValue:Record<string, any>
}>(),{
	disabled: false,
	autoValidate: true,
	noSubmitBtn: true,
	modelValue: (()=>({}) as IPlainObject),
	mergedValue: (()=>({}) as IPlainObject),
	compact:"normal",
	noFooter:false,
})
const emits = defineEmits<{
	(e:"update:api", api:FCAPI):void
	(e:"ready", api:FCAPI):void
	(e:"submit", api:FCAPI, formData:any, ...addiRest:any[]):void
	(e:"reset", api: FCAPI, ...addiRest: any[]): void;
	(e:"update:modelValue", value:any):void
	(e:"update:mergedValue", value:any):void
}>()

// const value = defineModel('value', {default: () => ({} as IPlainObject), type: Object});




const option = computed(()=>{
	const option: OptionAttrs = merge({}, props.formBinder.option.value) || {};

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

// 合并的数据
let mergedValue = {}
watchEffect(()=>{
	mergedValue = {
		...props.mergedValue,
		...props.modelValue,
	}
})

// 获取api引用
const fcInst = shallowRef<FCAPI>();
const onFormCreateReady = (api: FCAPI) => {
	fcInst.value = api
	props.formBinder.onMounted(api);
};

// 获取attrs
const attrs = useAttrs()

/**
 * 对formbinder进行转换
 */
const formBinder = computed(()=>{
	const binder = props.formBinder;
	const object = {
		...attrs,
		...props.formBinder,
		disabled: binder.disabled.value,
		rule: binder.rule.value,
		option: option.value,
		onMounted:onFormCreateReady,
	};
	return object;
})

// 在提交之前，此项会变更,
// 用来通知子组件，准备好，我要提交了
const beforeButmitSeed = ref(0);

/**
 * 执行提交
 * @param addiRest
 */
const handlerSubmit = async (...addiRest:any[]) => {
	let beforeSubmitReturn
	beforeButmitSeed.value++;

	// 提交之前等待,给需要提交数据的子组件提交数留出时间
	await nextTick();

	// 处理提交之前
	if (props.beforeSubmit) {
		const ret = await props.beforeSubmit({...fcInst.value!.formData()}, ...addiRest);

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

	const formData = {...fcInst.value!.formData(), ...beforeSubmitReturn};
	if (props.autoValidate) {
		await fcInst.value!.validate().catch(err => {throw ""});
	}
	formBinder.value!.onSubmit(formData, fcInst, ...addiRest);
	emits("submit", formData, fcInst, ...addiRest)
}

const handlerReset = (...addiRest:any[])=>{
	fcInst.value!.resetFields()
	emits("reset", fcInst.value!, ...addiRest);
}

defineExpose({
	handlerSubmit,
	handlerReset,
})

//
const uuid = crypto.randomUUID();

console.log(uuid, "多个表单")

</script>
<style lang="less">
.FormCreateVue{
	.footer{
		display: flex;
		justify-content: flex-end;
		margin-top: 20px;
	}

	&.compact-ex-small{
		.el-form-item{
			margin-bottom: 0;
		}
	}

	.row-text-component{
		color: var(--el-text-color-secondary);
	}

	&.item-compact{
		.el-form-item{
			margin-bottom: 16px;
		}
	}
}
</style>
