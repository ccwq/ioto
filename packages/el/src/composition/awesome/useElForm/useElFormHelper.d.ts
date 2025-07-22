// UFItem.d.ts

import type { DefineComponent, PropType, Component, VNode } from 'vue'


const IObject = Record<string, any>()

// 假设 IModel 是一个在应用程序中定义的接口。
// 在本组件的类型定义中，我们只需知道 `prop` 的运行时类型是 string 或 number。
// 如果需要更严格的 `keyof IModel` 约束，可能需要将 UFItem 定义为一个泛型组件：
// export const UFItem: DefineComponent<Props<T>, ...> where T extends IModel.
// 但从给定的代码来看， UFItem 并非泛型组件，所以 `prop` 的类型将是 `string | number`。

/**
 * UFItem 组件的 Props 类型定义。
 */
export interface UFItemProps {
  /**
   * 模型中要收集和更新的属性名。
   * 类型为字符串或数字，通常对应某个数据模型 (IModel) 的键。
   * 该属性是必需的。
   */
  prop: string | number

  /**
   * 用于收集用户输入的组件，例如 `ElInput`, `ElSelect` 等。
   * 如果提供了默认 slot，此属性是可选的。
   */
  itemComponent?: Component

  /**
   * 传递给 `itemComponent` 的额外选项或属性。
   * 默认为一个空对象 `{}`。
   */
  itemComponentOptions?: Record<string, any>
}

/**
 * UFItem 组件的 Emits 类型定义。
 */
export interface UFItemEmits {
  /**
   * 当与 `prop` 关联的模型值更新时触发。
   * @param value 更新后的值。
   */
  (event: 'update:modelValue', value: any): void
}

/**
 * UFItem 组件的 Slots 类型定义。
 */
export interface UFItemSlots {
  /**
   * 默认插槽，允许渲染自定义的输入组件。
   * 当使用此插槽时，`itemComponent` 属性将被忽略。
   * @param props 传递给插槽的绑定属性对象。
   * - `modelValue`: 当前与 `prop` 关联的模型值。
   * - `onUpdate:modelValue`: 一个回调函数，用于更新 `modelValue`。
   */
  default(props: {
    modelValue: any // 类型取决于 `model.value[prop]` 的实际类型，这里泛化为 `any`
    'onUpdate:modelValue': (value: any) => void
  }): VNode[] // 可以是 VNode 或 VNodeChild[], 取决于插槽的渲染结果
}

/**
 * UFItem 是一个 Vue 3 组件，用于在表单中封装用户输入组件，
 * 并自动处理数据绑定和模型更新。
 */
export type IUFItem =  DefineComponent<
  UFItemProps, // Props
  IObject, // RawBindings (setup 返回渲染函数，不暴露 setup 状态)
  any, // Data (没有使用 data 选项)
  any, // Computed (没有直接暴露 computed)
  any, // Methods (没有使用 methods 选项)
  any, // Mixins (没有使用 mixins 选项)
  any, // Extends (没有使用 extends 选项)
  UFItemEmits, // Emits
  Readonly<UFItemProps>, // PublicProps (通过 defineComponent 自动处理 required 和 default)
  IObject, // Callbacks (例如 expose)
  UFItemSlots // Slots
>
