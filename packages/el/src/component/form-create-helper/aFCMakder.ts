import type { Api, Options as FormOption, Rule } from '@form-create/element-ui'
import { dayjs2 } from '@ioto/core'
import {set, debounce} from 'lodash'
import {markRaw} from "vue";
import { rowTextComponent, textNodeComponent } from './formCreateHelperEtc'
import formCreate, { maker } from '@form-create/element-ui'
import {IPlainObject, VNodeRule, OptionsList, ExRule, FItemSize} from "./helper.d"

/**
 * 宽度的常量
 */
const WidthSizeDefine = {
	default:"",
	small: '6em',
	medium: '8em',
	large: '10em',
	exLarge: '14em'
} as Record<FItemSize, string>


// 自定义的marker
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace aFCMaker {

	/**
	 * 解析扩展的字段
	 * @param option
	 * @param type
	 */
	const calcExField = (option: ExRule, type = '') => {
		if (option?.size) {
			//@ts-ignore
			const width = WidthSizeDefine[option.size || 'medium'] || option.size
			set(option, 'style.width', width)
			delete option.size
		}

		if (option?.required) {
			set(option, 'effect.required', true)
			delete option.required
		}

		if (option?.colSpan) {
			set(option, 'col.span', option.colSpan)
			set(option, 'col.xs', 24)
			delete option.colSpan
		}

		if (type == 'switch') {
			//values
			if (option?.values) {
				set(option, 'props.activeValue', option.values[0])
				set(option, 'props.inactiveValue', option.values[1])
				delete option.values
			}

			//labels
			if (option?.labels) {
				set(option, 'props.activeText', option.labels[0])
				set(option, 'props.inactiveText', option.labels[1])
				delete option.labels
			}
		}

		// if(option?.after){
		// 	set(option, "suffix", option.after);
		// 	set(option, "suffix", option.after);
		//
		// }
	}

	/**
	 * 数字项目
	 * @param field - 属性
	 * @param title - 表单项标题
	 * @param value - 默认值
	 * @param option - 表单项的设置
	 */
	export const number = (field: string, title: string, value = 0, option = {} as ExRule) => {
		calcExField(option)
		if (option?.unit) {
			set(option, 'suffix', option.unit)
			set(option, 'style.marginRight', '0.25em')
		}
		return {
			type: 'number',
			field,
			title,
			value,
			...option
		}
	}

	/**
	 * 日期输入
	 * @param field - 属性
	 * @param title - 表单项标题
	 * @param option - 表单项的设置
	 */
	export const date = (field: string, title: string, option = {} as ExRule) => {
		calcExField(option)
		if (option?.offsetDate) {
			option.value = dayjs2()
				.add(...option.offsetDate)
				.format('YYYY-MM-DD')
		}
		return {
			type: 'DatePicker',
			field,
			title,
			...option
		}
	}

	/**
	 * 文本框
	 * @param field - 属性
	 * @param title - 表单项标题
	 * @param option - 表单项的设置
	 */
	export const input = (field: string, title: string, option = {} as ExRule) => {
		calcExField(option)
		return {
			type: 'input',
			field,
			title,
			...option
		}
	}

	/**
	 * 大文本框
	 * @param field - 属性
	 * @param title - 表单项标题
	 * @param option - 表单项的设置
	 */
	export const textarea = (field: string, title: string, option = {} as ExRule) => {
		set(option, 'props.type', 'textarea')
		return input(field, title, option)
	}

	/**
	 * 自定义组件
	 * @param component 组件实体或者包裹组件的一个数组，
	 * 目的是为了避免使用shallowRef包裹组件之后，出现的 Component is missing template or render function. 的错误
	 * @param field
	 * @param title
	 * @param props
	 * @param option
	 */
	export const component = (component: any, field: string, title: string, props: any={}, option = {} as ExRule) => {
		calcExField(option)
		if (props && !option?.props) {
			set(option, 'props', props)
		}
		component = markRaw(component)
		return {
			component,
			field,
			title,
			native: false,
			...option
		}
	}

	/**
	 * 纯文本显示
	 * @param field - 属性
	 * @param title - 表单项标题
	 * @param option - 表单项的设置
	 */
	export const rawText = (field: string, title: string, option = {} as ExRule) => {
		calcExField(option)
		const component = markRaw(rowTextComponent) as any
		return {
			component,
			field,
			title,
			native: false,
			...option
		}
	}

	/**
	 * 多行纯文本显示,内容为html
	 * @param field - 属性
	 * @param title - 表单项标题
	 * @param option - 表单项的设置
	 */
	export const mutilpRawText = (field: string, title: string, option = {} as ExRule) => {
		set(option, 'props.multi', true)
		return rawText(field, title, option)
	}

	/**
	 * checkbox
	 * @param field - 属性
	 * @param title - 表单项标题
	 * @param list - 选项列表
	 * @param option - 表单项的设置
	 */
	export const checkbox = (field: string, title: string, list: OptionsList[], option = {} as ExRule) => {
		calcExField(option)
		const options = list.map(([value, label, disabled]) => {
			return {
				value,
				label,
				disabled
			}
		})
		return {
			type: 'checkbox',
			field,
			title,
			options: options,
			...option
		}
	}

	/**
	 * radio
	 * @param field - 属性
	 * @param title - 表单项标题
	 * @param list - 选项列表
	 * @param option - 表单项的设置
	 */
	export const radio = (field: string, title: string, list: OptionsList[], option = {} as ExRule) => {
		return checkbox(field, title, list, { type: 'radio', ...option })
	}

	/**
	 * switch
	 * @param field - 属性
	 * @param title - 表单项标题
	 * @param option - 表单项的设置
	 */
	export const aSwitch = (field: string, title: string, option = {} as ExRule) => {
		calcExField(option, 'switch')
		return {
			type: 'switch',
			field,
			title,
			...option
		}
	}

	/**
	 * switcher
	 */
	export const switcher = aSwitch

	/**
	 * 隐藏域
	 * @param field - 字段需要包含在model中, 但是不在表单中
	 * @param value - 默认值
	 * @param option - 表单项的设置
	 */
	export const hidden = (field: string, value?: any, option = {} as ExRule) => {
		calcExField(option)
		return {
			type: 'hidden',
			field,
			value,
			...option
		}
	}

	const componentText = markRaw(textNodeComponent) as any
	formCreate.component('TextNode', componentText)

	//
	/**
	 * 文本节点 - 在suffix和prefix中用来增加一段文字描述
	 * @param text
	 * @param classList
	 * @param option
	 */
	export const textNode = (text: string, classList: string | string[] = [], option = {} as ExRule) => {
		calcExField(option)
		set(option, 'props.text', text)
		set(option, 'props.classList', classList)
		return {
			type: 'text-node',
			...option
		} as VNodeRule
	}


	/**
	 * 在表单项后面增加单位等文本
	 * @param text
	 * @param classes - class外观
	 * @param style - 样式, 对象或者字符串都可以
	 */
	export const getTextSuffix = (text: string, classes: string="", style: string | IPlainObject=""):VNodeRule => {

		const obj = {
			type:"span",
			style,
			class:"fch-item-fix " + classes,
			children:[text]
		} as VNodeRule

		return obj
	};
}



