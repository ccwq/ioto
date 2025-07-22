/**
 * @file 基于 Element Plus 的表单组合式函数
 * @description 提供完整的表单处理方案，包括：
 * - 表单数据双向绑定
 * - 表单验证规则管理
 * - 表单重置功能
 * - 表单元素自动绑定
 * - 表单验证 Promise 封装
 */

import {
  computed,
  defineComponent,
  PropType,
  ref,
  watch,
  Component,
  unref,
  getCurrentInstance,
  KeepAlive,
  type Ref,
  nextTick, shallowRef
} from 'vue'
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption } from 'element-plus'
import type { IUFItem } from './useElFormHelper'

/**
 * 表单项配置
 * @template T - 表单数据类型
 */
export interface FormRuleItem<T = any> {
  /**
   * 表单项对应的字段名，对应表单数据模型中的属性名
   * @example
   * ```typescript
   * { prop: 'username', value: '' } // 对应 model.username
   * ```
   */
  prop: keyof T
  /** 表单项的初始值 */
  value?: any
  /** 表单项的验证规则，遵循 Element Plus 的表单验证规则 */
  rules?: any[]
  /** 表单项的标签文本 */
  label: string
  /** 是否为必填项 */
  required?: boolean

  /**
   * 选择的
   */
  selectOptions?: { label: string; value: string | number }[]

  /**
   * 自定义表单元素
   */
  component?: Component

  /**
   * 传递给内部组件的附加属性
   */
  componentProps?: Record<any, any>
}

/**
 * 创建 Element Plus 表单的配置
 * @template IModel - 表单数据模型的类型`
 */
export const useElFormConf = <IModel = any,>(
  itemList: Ref<FormRuleItem<IModel>[]> | FormRuleItem[]
) => {
  // 生成初始数据模型，使用 Partial 允许部分属性
  const defaultModel = computed(() => {
    return unref(itemList).reduce<Partial<IModel>>((acc, item) => {
      acc[item.prop] = item.value ?? ''
      return acc
    }, {})
  })

  // 表单数据模型，使用 ref 使其成为响应式
  const model = shallowRef<Partial<IModel>>({ ...defaultModel.value })

  // 当表单项改变时,进行响应
  watch(defaultModel, (defModel) => {
    model.value = {
      ...defModel,
      ...model.value
    }
  })

  /**
   * 重置表单
   * 1. 将表单数据重置为初始值
   * 2. 重置表单验证状态
   */
  const formReset = () => {
    model.value = { ...defaultModel }
    formRef.value?.resetFields()
  }

  /**
   * 表单绑定属性
   * 用于直接绑定到 el-form 组件
   */
  const formRules = computed(() => {
    const rules = unref(itemList).reduce<Record<string, any[]>>((acc, el) => {
      if (el.rules) {
        acc[el.prop as string] = el.rules
      }

      // 处理验证非空的情况
      if (el.required) {
        acc[el.prop as string] = [
          {
            required: true,
            message: `${el.label}不能为空`,
            trigger: 'blur'
          },
          ...(el.rules || [])
        ]
      }
      return acc
    }, {})

    return rules
  })

  // 表单实例引用
  const formRef = ref<InstanceType<typeof ElForm>>()

  /**
   * 表单验证方法
   * @returns {Promise<boolean>} 验证是否通过
   */
  const formValidateTo = async () => {
    if (!formRef.value) {
      return [new Error('表单实例未初始化')]
    }
    const [err] = await awaitTo(formRef.value.validate())
    if (err) {
      return [err]
    } else {
      return [null, model.value]
    }
  }

  const formValidateFiledTo = (field: keyof IModel) =>
    awaitTo(formRef.value?.validateField(field as string) ?? Promise.reject('表单实例未初始化'))
  const clearValidate = () => formRef.value.clearValidate()

  watch(
    itemList,
    (ls) => {
      setTimeout(() => {
        // debugger;
        // 重置验证状态
        clearValidate()
      }, 0)
    },
    { deep: true }
  )

  const setModelValue = async (prop: keyof IModel, value: any) => {
    model.value = {
      ...model.value,
      [prop]: value
    }

    await new Promise((r) => setTimeout(r, 0))
    clearValidate()
  }

  const UFItem = generateUFItem(model, itemList, setModelValue)

  const UForm = defineComponent({
    name: 'UForm',
    setup(props, { attrs, slots }) {
      const setFormRef = (el: any) => {
        formRef.value = el
      }
      return () => {
        return (
          <ElForm ref={setFormRef} rules={formRules.value} model={model.value}>
            {slots?.default({
              model: model.value
            })}
          </ElForm>
        )
      }
    }
  })

  return {
    model,
    formRef,
    formReset,
    formValidateTo,
    formValidateFiledTo,
    UFItem,
    UForm,
    clearValidate
  }
}

/**
 * await-to-js 工具函数接口
 */
export const awaitTo = <T, U = undefined>(promise: Promise<T>, errorExt?: object) => {
  return promise
    .then(function (data) {
      return [null, data] as [null, T]
    })
    .catch(function (err) {
      if (errorExt) {
        Object.assign(err, errorExt)
      }
      return [err, undefined] as [U, undefined]
    })
}

//
// export interface UFItemProps<Model=any> {
//     prop: keyof Model; // 表单项对应的字段名
//
//     type?: string; // 表单项类型，如 'input', 'select' 等
// }

const generateUFItem = <IModel = any,>(
  model: Ref<IModel>,
  formItemList: Ref<FormRuleItem[]>,
  setModelValue: (prop: keyof IModel, value: any) => void
): IUFItem => {
  const UFItem = defineComponent({
    name: 'UFItem',
    props: {
      prop: {
        type: String as unknown as PropType<keyof IModel>,
        required: false
      },

      /**
       * 收集用户输入的组件, 比如 ElInput, ElSelect 等
       */
      itemComponent: {
        type: Object as PropType<Component>
      },

      /**
       * 传递给 itemComponent 的选项
       */
      itemComponentOptions: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
      }
    },

    setup(props, { slots, emit }) {
      const { prop } = props

      /**
       * 原始的配置项
       */
      const formItemConf = computed(() => unref(formItemList).find((item) => item.prop === prop))

      /**
       * FormItem的配置项
       */
      const formItemBind = computed(() => {
        const rawConf = formItemConf.value

        if (!rawConf) {
          return null
        }

        return {
          label: rawConf.label,
          prop: rawConf.prop
        } as const
      })

      const handlerComponentUpdate = (value: any) => {
        setModelValue(prop, value)

        // todo: 如此如此修改model会导致 jsx反复渲染的bug
        // 尝试过v-memo和keep-alive语法,均无效
        // model.value = {...model.value, [prop]: value}
        emit('update:modelValue', value)
      }

      /**
       * 表单元素的bind
       */
      const formComponentBind = computed(() => {
        return {
          ...(formItemConf.value?.componentProps ?? {}),
          ...props.itemComponentOptions,
          modelValue: model.value[prop],
          'onUpdate:modelValue': handlerComponentUpdate
        }
      })

      return () => {
        const { prop, itemComponent } = props

        const DefaultSlot = slots.default

        // 空的formItem, 用于定位之类的需求
        if (!prop) {
          return (
            <ElFormItem {...formItemBind.value}>
              <DefaultSlot />
            </ElFormItem>
          )
        }

        // 未找到配置项,不渲染,常用来动态控制元素可见性
        if (!formItemBind.value) {
          return null
        }

        let defaultComponent: Component = ElInput

        // 下拉选择的状态
        if (formItemConf.value?.selectOptions) {
          defaultComponent = CustomElSelect
        }

        const RenderEl: Component =
          itemComponent ?? formItemConf.value.component ?? defaultComponent

        const returns = [
          <ElFormItem prop={prop} {...formItemBind.value}>
            {DefaultSlot ? (
              <DefaultSlot bind={formComponentBind.value} />
            ) : (
              <RenderEl {...formComponentBind.value} />
            )}
          </ElFormItem>
        ]

        return returns
      }
    }
  })
  return UFItem
}

const CustomElSelect = defineComponent({
  props: {
    options: {
      type: Object as PropType<{ value: string | number; label: string }[]>,
      default: () => [
        { value: '1', label: '选项1' },
        { value: '2', label: '选项2' },
        { value: '3', label: '选项3' }
      ]
    }
  },

  setup(props, ctx) {
    return () => {
      const optionElList = props.options.map((opt) => {
        return <ElOption label={opt.label} value={opt.value} />
      })
      return <ElSelect>{optionElList}</ElSelect>
    }
  }
})
