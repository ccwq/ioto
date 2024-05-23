/**
 * @Creator: Albus
 * @Date: 2024/09/132 09:40:36
 * @Description: form-create 一些辅助的组件
 */
import { defineComponent, shallowRef } from 'vue'
import { IPlainObject } from './helper.d'

/**
 * 纯文本组件
 */
export const rowTextComponent = defineComponent({
	props: {
		modelValue: [String, Number],
		multi: Boolean
	},
	setup(props) {
		const classes = ['row-text-component']
		if (props.multi) {
			classes.push('multi')
		}

		return () => <div class="{classes.join(' ')}">{props.modelValue || '-'}</div>
	}
})

/**
 * html文本组件
 */
export const textNodeComponent = defineComponent({
	props: {
		text: String,
		classList: [Array, String]
	},
	setup(props) {
		const classString = Array.isArray(props.classList) ? props.classList.join(' ') : props.classList
		return () => <div class={'fx1 ph05 cl-grey500 lh12 text-node ' + classString} v-html={props.text} />
	}
})


/**
 * 纯文本字段
 * @param title
 * @param value
 * @param options
 */
export const textRule = (title: string, value?: any, options?: IPlainObject) => {
	if (!options) {
		options = {}
	}

	if (!options.field) {
		options.field = new Date().getTime() + ''
	}

	return {
		native: false,
		...(options || {}),
		component: shallowRef(rowTextComponent),
		title,
		value
	}
}
