// 导入表单创造
import { ComputedRef, InjectionKey, watch } from 'vue'
import { App, markRaw, nextTick, reactive, ref } from 'vue'
import type { Api, Options as FormOption, Rule } from '@form-create/element-ui'
import formCreate, { maker } from '@form-create/element-ui'
import {set, debounce} from 'lodash'

import type { ApiAttrs, CreatorAttrs, OptionAttrs } from '@form-create/element-ui/types/config'
import { BPromise } from '@ioto/core'
import { FCAPI, UseFormCreateOption, IPlainObject, FCRule, VNodeRule } from './helper.d'

import {aFCMaker} from "./aFCMakder";

const vueUseFormCreate = (app: App) => {
	app.use(formCreate)
}

// import AUploader from "src/components/AUploader.vue"
// import Foo from "src/components/Foo.vue"
// formCreate.component("AUploader", AUploader);
// formCreate.component("foo", Foo);

// 自定义option http://www.form-create.com/v3/guide/effect.html
// formCreate.register({
// 	name: 'customOption',
// 	init({ value }, rule, fapi) {}
// })

export const useFormCreate = (option: UseFormCreateOption) => {
	const fcPromise = new BPromise<FCAPI>()
	const fcRef = ref<FCAPI>()
	const labelWidthRef = ref<string | number>()
	const formDataRef = ref<any>()
	const disabledRef = ref<boolean>(false)
	const fcOptionRef = ref<OptionAttrs>({})

	//表单数据合并
	const getFormOption = () => {
		let _option = { ...option }
		if (!_option) {
			_option = {}
		}
		if (_option.labelWidth) {
			set(_option, 'form.labelWidth', _option.labelWidth)
			// setLabelWidth(_option.labelWidth)
			delete _option.labelWidth
		}
		delete _option.onSubmit
		return _option as OptionAttrs
	}
	fcOptionRef.value = getFormOption()

	// 用来获取fc引用
	const handlerFcReady = (api: FCAPI) => {
		fcPromise._resolve(api)
		fcRef.value = api
		option?.onReady?.(api)
	}

	// 清除验证重置数据
	const fullReset = async () => {
		const fc = await fcPromise

		// 重置表单
		fc.resetFields()
		await nextTick()

		// 清除验证规则
		fc.clearValidateState()
	}

	// 设置表单禁用和可用状态
	const disabledForm = async (disabled = true) => {
		await fcPromise
		disabledRef.value = disabled
		set(fcOptionRef.value, 'form.disabled', disabled)
		// set(fcOptionRef.value, "resetBtn.show", !disabled)
		// set(fcOptionRef.value, "submitBtn.show", !disabled)
	}

	// 设置label宽度
	const setLabelWidth = async (labelWidth: string) => {
		const fc = await fcPromise
		labelWidthRef.value = labelWidth
		set(fcOptionRef.value, 'form.labelWidth', labelWidth)
		fc.fields().forEach(fieldString => {
			fc.updateRule(fieldString, {
				wrap: {
					labelWidth
				}
			})
		})
	}

	// 设置表单值
	const setFormData = async (formData: any) => {
		const fc = await fcPromise
		formDataRef.value = formData
		fc.setValue(formData)
	}

	/**
	 * 对提交进行防抖
	 */
	const deOnsubmitHandler = debounce((formData: IPlainObject, api: FCAPI, ...rest: any[]) => {
		option?.onSubmit!(formData, api, ...rest)
	}, option?.submitDebounceDelay || 300)

	// 直接绑定到AFromCreate上的属性
	const formCreateAllBind = {
		onMounted: handlerFcReady,
		disabled: disabledRef,
		option: fcOptionRef,
		// "onSubmit":option?.onSubmit,
		onSubmit: deOnsubmitHandler,
		beforeSubmit: option?.beforeSubmit,
		onReset: option?.onReset,
		rule: ref([] as FCRule[]),

		// 事件
		"onUpdate:api": (api: FCAPI) => {
			fcPromise.resolve(api);
		}
	}

	// 监控规则的改变
	watch(
		() => option.rule!.value,
		rule => {
			if (rule?.length) {
				formCreateAllBind.rule.value = rule
			} else {
				formCreateAllBind.rule.value = []
			}
		},
		{ immediate: true }
	)

	const updateRule = async (field: string, rule: Rule) => {
		const fc = await fcPromise
		fc.updateRule(field, rule)
	}
	const mergeRule = async (field: string, rule: Rule) => {
		const fc = await fcPromise
		fc.mergeRule(field, rule)
	}

	const updateRules = async (rules: Rule[]) => {
		const fc = await fcPromise
		fc.updateRules(rules)
	}

	const mergeRules = async (rules: Rule[]) => {
		const fc = await fcPromise

		//@ts-ignore
		fc.mergeRules(rules)
	}

	return {
		updateRule,
		mergeRule,
		updateRules,
		mergeRules,
		setFormData,
		fcOptionRef,
		disabledForm,
		fullReset,
		fcPromise,
		fcRef,
		handlerFcReady,
		formDataRef,
		setLabelWidth,
		labelWidthRef,
		formCreateAllBind
	}
}


// 依赖注入
export const aFormCreateKey = Symbol() as InjectionKey<{
	disabled: ComputedRef<boolean>
}>

export {
	formCreate as createForm,
	maker,
	aFCMaker,
	vueUseFormCreate,
}
