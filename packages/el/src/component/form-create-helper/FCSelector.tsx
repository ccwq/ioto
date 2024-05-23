import {defineComponent, ref, watch, PropType} from "vue";
import {ASelect} from "../a-select";
import {get, set} from "lodash";

/**
 * 根据从API方法获取的参数生成下拉选择框的组件
 *
 * @props apiParams - 传递给API方法的参数，默认为空字符串
 * @props requestWhenApiParamsBlank - 当apiParams为空时，是否发起请求，默认为true
 * @props api - 必需，类型为函数，用于根据参数获取数据的API方法
 * @props dataPath - 从API响应中提取选项列表的路径，默认为"data"
 * @returns 返回一个封装了ASelect组件的模板函数，将options绑定为从API请求得到的数据
 * @example
 * <SelectFromRequest
 * 	api={()=>([["1", "专家"], ["52", "教授"]])
 * 	model-value="52"
 * />
 */
export const SelectFromRequest = defineComponent({
	components: {
		ASelect,
	},
	props: {
		apiParams: {
			default: ""
		},

		// 当apiParams为空的时候，是否请求，默认true
		requestWhenApiParamsBlank: {
			type: Boolean,
			default: true
		},

		api: {
			required: true,
			type: Function as PropType<(params: any) => Promise<any[]>|any[]>,
		},

		dataPath: {
			type: String,
			default: "",
		}
	},
	setup(props, ctx) {
		const options = ref<Promise<any> | []>([]);
		watch(() => props.apiParams, async (params) => {
			if (!params && !props.requestWhenApiParamsBlank) {
				options.value = [];
			} else {
				options.value = Promise.resolve(props.api(params)).then(res => {
					if (props.dataPath) {
						return get(res, props.dataPath, []);
					}else{
						return res;
					}
				});

			}
		}, {immediate: true});
		return () => <ASelect{...ctx.attrs} options={options.value}/>;
	}
})


/**
 * 生成一个特定元素的下拉选择组件
 * @param api
 * @param dataPath - 从API响应中提取选项列表的路径，默认为"data"
 * @param labelField - 从选项中提取label字段的名称，默认为"name"
 * @param valueField- 从选项中提取value字段的名称，默认为"id"
 */
export const generateSelect = (
	api: (params?: any) => Promise<any[]>|any[],
	dataPath: string = "",
	labelField = "name",
	valueField = "id"
) => {
	return defineComponent({
		components: {
			SelectFromRequest,
		},
		setup(props, ctx) {
			return () => <SelectFromRequest
				api={api}
				dataPath={dataPath}
				//@ts-ignore

				// 来自ASelect的属性
				labelField={labelField}
				keyField={valueField}
				{...ctx.attrs}
			/>;
		}
	})
}


