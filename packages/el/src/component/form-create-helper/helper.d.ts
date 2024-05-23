import {Options as FormCreateOptions, Rule as FormRule, Api as FAPI, type Rule} from '@form-create/element-ui'
import type { OptionAttrs } from '@form-create/element-ui/types/config'

/**
 * @description 纯的js对象
 */
export type IPlainObject<T = any> = Record<string, T>

/**
 * @description 任意方法
 */
export interface IAnyFunction {
	(...args: any[]): any
}

export type FCAPI = FAPI
export type FCRule = FormRule
export type FCOptions = FormCreateOptions

export interface UseFormCreateOption extends Omit<OptionAttrs, 'submitBtn' | 'resetBtn'> {
	labelWidth?: string
	submitBtn?:
		| {
				click?: IAnyFunction
				innerText?: string
				show?: boolean
				[key: string]: any
		  }
		| false
	resetBtn?:
		| {
				click?: IAnyFunction
				innerText?: string
				show?: boolean
				[key: string]: any
		  }
		| boolean
	onReady?: (api: FCAPI) => void
	onSubmit?: (formData: IPlainObject, api: FCAPI, ...rest: any[]) => void
	onReset?: (api: FCAPI, ...rest: any[]) => void

	global?: {
		[key: string]: any
	}
	beforeSubmit?: (formData: any, api: FCAPI, ...rest: any[]) => void

	// 提交的防抖
	submitDebounceDelay?: 0

	// 规则
	rule?: Ref<FCRule[]>
}

export type VNodeRule = Rule['suffix']

// 下拉，checkbox，radio的候选项
export type OptionsList = [string, string, boolean?]

/**
 * 表单元素预设的尺寸
 */
export type FItemSize = 'default' | 'small' | "medium" | 'large' | "exLarge";



/**
 * 基于formcreate rule扩展的规则
 * @property size - 宽度
 * @property required - 是否必填
 * @property colSpan - 列数
 * @property unit - number单位
 * @property offsetDate - date偏移
 * @property values - switch的候选项
 * @property labels - switch的候选项
 */
export interface ExRule extends Rule {
	size?: FItemSize
	required?: boolean
	colSpan?: number

	//number单位
	unit?: string

	//date
	offsetDate?: [number, ('day' | 'month' | 'year' | undefined)?]

	//switch
	values?: [any, any]
	labels?: [string, string]
}


export {
	OptionAttrs,
}
