<!--
 * @Creator: ccwq
 * @Date: 2024/09/15 09:33:07
 * @Description:
 *   FiltersBar 是一个功能丰富的筛选栏组件，支持单选和多选模式，
 *   常用于在列表数据上方提供快速筛选功能，类似于电商网站的商品筛选条件。
 *   用户可以从预设选项中选择一项或多项进行筛选，也可以选择"所有"选项来清除筛选条件。
 *
 * ## 核心功能
 *   - **单选多选**: 通过 `multiple` 属性切换单选/多选模式
 *   - **标题显示**: 可配置筛选栏标题，支持隐藏 (`noTitle`)
 *   - **选项管理**: 显示选项列表，数据格式为 `{id, name}[]`
 *   - **全选功能**: 内置"所有"选项，支持自定义文本和行为模式
 *   - **交互控制**: 支持重复点击取消选择 (`unselectable`)
 *   - **事件系统**: 发出 `update:modelValue` 和 `clear` 事件
 *   - **空状态处理**: 数据为空时显示默认提示或自定义内容
 *   - **样式定制**: 支持自定义主题色 (`primaryColor`)
 *
 * ## 数据类型
 *   ```
 *   interface IOptions {
 *     id: string | number
 *     name: string
 *   }
 *
 *   // 单选模式: modelValue 为 id | null
 *   // 多选模式: modelValue 为 id[] | null
 *   ```
 *
 * ## Props 配置
 *   - `title`: 筛选栏标题文本
 *   - `data`: 选项数据数组
 *   - `modelValue`: 当前选中值(单选为id，多选为id数组，null表示选中所有)
 *   - `multiple`: 启用多选模式
 *   - `noTitle`: 隐藏标题
 *   - `noAllOption`: 隐藏"所有"选项
 *   - `allOptionText`: "所有"选项的显示文本
 *   - `allOptionLightWhenNull`: 当modelValue为null时是否高亮"所有"选项
 *   - `allOptionBtnMode`: 多选模式下"所有"按钮的行为('[]' | 'null')
 *   - `unselectable`: 允许重复点击已选项来取消选择
 *   - `primaryColor`: 主题高亮颜色
 *
 * @example
 *
 * // 1. 基本单选用法
 * <FiltersBar
 *   v-model:modelValue="selectedType"
 *   title="文件类型"
 *   :data="fileTypes"
 * />
 *
 * // 2. 多选模式
 * <FiltersBar
 *   v-model:modelValue="selectedCategories"
 *   title="分类"
 *   :data="categories"
 *   multiple
 *   allOptionText="全部分类"
 * />
 *
 * // 3. 无标题模式
 * <FiltersBar
 *   v-model:modelValue="selected"
 *   :data="options"
 *   noTitle
 * />
 *
 * // 4. 不显示"所有"选项
 * <FiltersBar
 *   v-model:modelValue="selectedBrand"
 *   title="品牌"
 *   :data="brands"
 *   noAllOption
 * />
 *
 * // 5. 支持取消选择的单选模式
 * <FiltersBar
 *   v-model:modelValue="selectedStatus"
 *   title="状态"
 *   :data="statusList"
 *   unselectable
 * />
 *
 * // 6. 自定义主题色
 * <FiltersBar
 *   v-model:modelValue="selected"
 *   :data="options"
 *   primaryColor="#ff6b35"
 * />
 *
 * // 7. 监听事件
 * <FiltersBar
 *   v-model:modelValue="currentFilter"
 *   :data="filterOptions"
 *   @clear="handleFilterClear"
 * />
 *
 * // 8. 空数据状态 - 默认提示
 * <FiltersBar title="暂无选项" :data="[]" />
 *
 * // 9. 空数据状态 - 自定义内容
 * <FiltersBar title="产品线" :data="[]">
 *   <div class="custom-empty">
 *     <Icon name="empty" />
 *     <span>暂无产品线数据</span>
 *   </div>
 * </FiltersBar>
 *
 * // 10. 多选模式的"所有"按钮行为配置
 * <FiltersBar
 *   v-model:modelValue="multiSelected"
 *   :data="options"
 *   multiple
 *   allOptionBtnMode="[]"  // 点击"所有"返回空数组而非null
 * />
 -->

<template lang="pug">
.FiltersBar(:class="{noTitle}")

    //
    .title(ref="titleEl") {{title}}

    slot(v-if="!data.length" name="empty")
        .cl-gray300.empty-text.mb075 无数据

    // 所有标签
    a.item( @click="handlerClear" v-if="!noAllOption" :class="allOptionsClasses" ): span {{allOptionText}}

    // 选项列表
    a.item(
        v-for="item in data"
        :class="itemClassFunc(modelValue, item)"
        @click="handlerItemClick(item)"
    ): span {{item.name}}

    slot(name="after-items")
</template>
<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'

interface IOptions {
	id: string | number
	name: string
}

type IId = IOptions['id'] | IOptions['id'][]

const props = withDefaults(
	defineProps<{
		// 标题文本
		title?: string

		// 选项列表
		data?: IOptions[]

		/**
		 * 当前选中的值
		 * null 表示选中所有
		 * string|number标识选中对应的标签
		 *
		 * multiple模式下, null表示忽略此选项 []表示选中了0项或所有, 区别在于[]all需要高亮
		 */
		modelValue?: IId | null

		// 不显示标题
		noTitle?: boolean

		/**
		 * 选中状态再次选择以取消
		 */
		unselectable?: boolean

		// 是否显示所有选项
		noAllOption?: boolean

		// 所有选项的配置
		allOptionText?: string

		// 在modelValue null时候,所有选项是否高亮
		allOptionLightWhenNull?: boolean

		// 高亮颜色
		primaryColor?: string

		// 开启多选之后, modelValue 将变为 string[] 类型
		multiple?: boolean

		/**
		 * 在multiple模式下, 定义点击"所有"按钮的行为
		 * null点击所有返回null,
		 */
		allOptionBtnMode?: '[]' | 'null'
	}>(),
	{
		// modelValue: null,
		title: '标题',
		data: () => [
			{ name: '三维模型', id: '3d' },
			{ name: '视频', id: 'video' },
			{ name: '图片', id: 'image' },
			{ name: '音频', id: 'audio' },
			{ name: '文档', id: 'doc' },
			{ name: '其他', id: 'other' },
		],
		noTitle: false,
		unselectable: true,
		noAllOption: false,
		allOptionText: '所有',
		primaryColor: '#4A5AE9',

		multiple: false,
		clearBtnMode: '[]',
	},
)

const emits = defineEmits<{
	(e: 'update:modelValue', value: IId | null): void
	(e: 'clear'): void
}>()

// 类型校验
watch(
	() => [props.multiple, props.modelValue],
	([multiple, modelValue]) => {
		if (multiple) {
			if (!Array.isArray(modelValue) && modelValue !== null) {
				throw new Error(
					'FiltersBar: 当 multiple 为 true 时,modelValue 应为[]或null',
				)

				// emits('update:modelValue', [modelValue as IOptions['id']])
			}
		} else {
			if (Array.isArray(modelValue)) {
				throw new Error(
					'FiltersBar: 当 multiple 为 false 时，modelValue 不应为数组类型',
				)
			}
		}
	},
	{ immediate: true },
)

const titleEl = ref<HTMLDivElement | undefined>()
const labelWidth = ref(0)
onMounted(() => {
	labelWidth.value = (titleEl.value?.offsetWidth || 0) + 42
})

/**
 * 计算每个选项的类名
 * @param modelValue 当前选中的值
 * @param item 当前选项
 * @returns 返回类名字符串
 */
const itemClassFunc = (modelValue: IId | null, item: IOptions) => {
	if (props.multiple) {
		return (modelValue as IOptions['id'][])?.includes(item.id) ? 'hilight' : ''
	} else {
		return modelValue === item.id ? 'hilight' : ''
	}
}

/**
 * 计算所有选项的类名
 */
const allOptionsClasses = computed(() => {
	if (props.multiple) {
		const hilight = props.modelValue === null && props.allOptionLightWhenNull
		return { hilight }
	} else {
		return props.modelValue === null ? 'hilight' : ''
	}
})

/**
 * 才选择某个标签时触发
 * @param row
 */
const handlerItemClick = (row: IOptions) => {
	if (props.multiple) {
		const currentValue = (props.modelValue || []) as IOptions['id'][]
		if (currentValue.includes(row.id)) {
			// 如果当前选中项已存在，则移除它
			const newValue = currentValue.filter((id) => id !== row.id)
			const nullEmitValue = props.allOptionBtnMode == '[]' ? [] : null
			emits('update:modelValue', newValue.length ? newValue : nullEmitValue)
		} else {
			// 否则添加它
			emits('update:modelValue', [...currentValue, row.id])
		}
	} else {
		if (row.id === props.modelValue) {
			if (props.unselectable) {
				handlerClear()
			}
		} else {
			emits('update:modelValue', row.id)
		}
	}
}

/**
 * 清除
 */
const handlerClear = () => {
	let emitVal = null
	if (props.multiple) {
		if (props.allOptionBtnMode == '[]') {
			emitVal = []
		}
	}
	emits('update:modelValue', emitVal)
	emits('clear')
}
</script>
<style lang="less">
@grey100: #f0f0f0;
.FiltersBar {
	--primary: v-bind(primaryColor);
	--col-gap: 8px;
	--row-gap: var(--col-gap);
	--bg:#f0f0f0;
	--active-bg: var(--primary, #4A5AE9);

	font-size: 14px;
	display: flex;
	flex-wrap: wrap;
	--name-width: v-bind(labelWidth);
	padding-left: calc(var(--name-width) * 1px);
	position: relative;
	column-gap: var(--col-gap, 42px);
	row-gap: var(--row-gap);
	align-items: center;

	.title {
		white-space: nowrap;
		position: absolute;
		left: 0;
		color: #7988a0;
		align-self: flex-start;
		margin-top: 0.5em;
	}

	// 无title模式
	&.noTitle {
		--name-width: 0;
		padding-left: 3px;

		.title {
			display: none;
		}
	}

	.item {
		white-space: nowrap;
		display: flex;
		justify-content: center;
		cursor: pointer;
		color: #090c12;
		position: relative;
		height: 2em;
		align-items: center;
		padding-left: 1em;
		padding-right: 1em;
		> span {
			position: relative;
			z-index: 5;
		}

		background-color: var(--bg);
		&:hover {
			color: var(--primary);
		}

		&:before {
			content: '';
			background-color: var(--primary);
			position: absolute;
			width: 100%;
			height: 100%;
			border-radius: 3px;
			opacity: 0;
			transition: all 0.18s;
			//transform: scaleX(1.4) scaleY(1.9);
		}

		&.hilight {
			color: #ffffff;
			min-width: 3em;

			&:before {
				opacity: 1;
				//transform: scaleX(1.3) scaleY(1.5);
			}
		}
	}

	&.__large {
		padding-left: 15px;

		.item {
			&:before {
				width: auto;
				height: auto;
				inset: -9px -18px;
				//transform: scale(1, 1) !important;
				opacity: 1;
				background-color: @grey100;
			}

			&.hilight {
				&:before {
					background-color: var(--primary);
				}
			}
		}
	}
}
</style>
