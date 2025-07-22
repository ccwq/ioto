
# ElForm 表单范式

基于 Vue3 + Element Plus 的声明式表单处理解决方案，通过组合式函数和配置化的方式简化复杂表单开发。

## ✨ 特性

- 🚀 **声明式配置** - 通过配置数组定义表单结构，无需手写大量模板
- 🎯 **类型安全** - 完整的 TypeScript 支持，提供类型推导和智能提示
- 🧩 **组件化封装** - 提供 `<UForm>` 组件，进一步简化模板，并暴露表单数据
- 🔧 **灵活布局** - 支持自由的表单布局，兼容 Element Plus 栅格系统
- 🎨 **组件多样** - 支持所有 Element Plus 组件及自定义组件
- ⚡ **动态表单** - 运行时动态增删表单项，响应式更新
- 📝 **自动验证** - 集成表单验证，Promise 风格的验证处理
- 🎪 **多种配置方式** - 支持组件引用、JSX 语法、插槽等多种配置模式

## 🆚 对比优势

| 特性 | 本方案 | form-create | plus-pro-components |
|------|--------|-------------|---------------------|
| 学习成本 | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| 类型支持 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| 布局自由度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| 包体积 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| 扩展性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |

## 🚀 快速开始

### 基础用法

```vue
<template>
  <!-- UForm 现在通过作用域插槽暴露 model -->
  <UForm label-width="6em" v-slot="{ model }">
    <UFItem prop="nickName" />
    <UFItem prop="email" :itemComponentOptions="{type: 'email'}" />
    <UFItem prop="age" v-slot="{bind}">
      <ElSlider v-bind="bind" />
    </UFItem>

    <!-- 可以直接在模板中使用 model -->
    <pre>表单实时数据: {{ model }}</pre>
  </UForm>
</template>

<script setup>
import { ref } from 'vue'
import { useElFormConf } from './useElForm'

const formItemDef = ref([
  {
    prop: "nickName",
    label: "昵称",
    rules: [
      { required: true, message: "请输入昵称", trigger: "blur" },
      { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
    ]
  },
  {
    prop: "email",
    label: "邮箱"
  },
  {
    prop: "age",
    label: "年龄",
    value: 18
  }
])

// 解构出 UForm 和 UFItem 组件，以及验证方法
const { formValidateTo, UFItem, UForm } = useElFormConf(formItemDef)
</script>
```

### 复杂布局示例

```vue
<UForm label-width="6em">
  <!-- 栅格布局 -->
  <el-row>
    <el-col :span="12">
      <UFItem prop="nickName" />
    </el-col>
    <el-col :span="12">
      <UFItem prop="sex" />
    </el-col>
  </el-row>

  <!-- 文本域 -->
  <UFItem prop="introduction" :itemComponentOptions="{type:'textarea', rows: 2}" />

  <!-- 多列布局 -->
  <el-row>
    <el-col :span="8">
      <UFItem prop="allowFriend" />
    </el-col>
    <el-col :span="8">
      <UFItem prop="publicInfo" />
    </el-col>
    <el-col :span="8">
      <UFItem prop="themeColor" :itemComponent="ElColorPicker" />
    </el-col>
  </el-row>
</UForm>
```

## 📋 表单配置

### FormRuleItem 配置项

```typescript
interface FormRuleItem {
  prop: keyof T;              // 字段名
  label: string;              // 标签文本
  value?: any;                // 初始值
  rules?: any[];              // 验证规则
  required?: boolean;         // 是否必填
  selectOptions?: Array;      // (内置)下拉框选项
  componentProps?: Record;    // 组件属性
  component?: Component;      // 自定义组件
}
```

### 多种组件配置方式

```javascript
import { ElSwitch } from 'element-plus'

const formItems = ref([
  // 1. 基础输入框（默认）
  {
    prop: "username",
    label: "用户名"
  },

  // 2. 下拉选择（内置）
  {
    prop: "gender",
    label: "性别",
    selectOptions: [
      { label: "男", value: "male" },
      { label: "女", value: "female" }
    ]
  },

  // 3. 通过 componentProps 配置组件属性
  {
    prop: "description",
    label: "描述",
    componentProps: {
      type: "textarea",
      rows: 3
    }
  },

  // 4. 通过 component 属性直接指定组件
  {
    prop: "enabled",
    label: "启用状态",
    component: ElSwitch
  },

  // 5. JSX 语法配置 (需要构建环境支持)
  {
    prop: "notify",
    label: "通知设置",
    component: <ElSwitch active-text="开启" inactive-text="关闭"/>
  }
])
```

## 🎯 高级用法

### 动态表单

```javascript
const addFormItem = () => {
  formItemDef.value.push({
    prop: "newField",
    label: "新字段",
    value: "默认值"
  })
}

const removeFormItem = (prop) => {
  const index = formItemDef.value.findIndex(item => item.prop === prop)
  if (index > -1) {
    formItemDef.value.splice(index, 1)
  }
}
```

### 自定义组件渲染

```vue
<template>
    <!-- 方式1: 通过插槽 -->
    <UFItem prop="birthday" v-slot="{bind}">
        <ElDatePicker v-bind="bind" type="date" />
    </UFItem>

    <!-- 方式2: 通过 itemComponent -->
    <UFItem prop="color" :itemComponent="ElColorPicker" />

    <!-- 方式3: 通过 itemComponentOptions (用于内置组件的属性) -->
    <UFItem prop="content" :itemComponentOptions="{type: 'textarea', rows: 4}" />
</template>
```

### 表单验证

`formValidateTo` 在验证成功时会直接返回最新的表单数据。

```javascript
const handleSubmit = async () => {
  // 验证成功时，第二个参数直接返回表单数据
  const [error, formData] = await formValidateTo()

  if (error) {
    console.error("验证失败:", error)
    return
  }

  // 验证通过，直接使用返回的 formData 进行提交
  console.log("表单数据:", formData)
  submitForm(formData)
}

// 单字段验证
const validateField = async (fieldName) => {
  const [error] = await formValidateFiledTo(fieldName)
  return !error
}
```

## 📚 API 参考

### useElFormConf

**参数:**
- `itemList: Ref<FormRuleItem[]> | FormRuleItem[]` - 表单配置数组

**返回值:**
```typescript
{
  model: ShallowRef<IModel>,              // 表单数据模型 (注意: 是 shallowRef)
  formValidateTo: () => Promise<[Error, null] | [null, IModel]>, // 触发表单验证
  formValidateFiledTo: (field: string) => Promise, // 字段验证
  UFItem: Component,                        // 表单项组件
  UForm: Component,                         // 表单容器组件
  clearValidate: () => void,                // 清除验证状态
  formReset: () => void,                    // 重置表单
  formRef: Ref<FormInstance>,               // (可选)ElForm 实例引用
}```

### UForm 组件
`useElFormConf` 返回的表单容器组件。它是 `ElForm` 的一层封装，自动处理了 `model` 和 `rules` 的绑定。它接收所有 `ElForm` 的属性。

**插槽:**
- `default: { model: IModel }` - 默认插槽，提供响应式的表单数据 `model`。

```vue
<template>
  <UForm v-slot="{ model }">
    <p>用户名: {{ model.username }}</p>
    <UFItem prop="username" />
  </UForm>
</template>
```

### UFItem 组件

**Props:**
```typescript
{
  prop?: keyof Model,                    // 表单字段名
  itemComponent?: Component,             // 自定义组件
  itemComponentOptions?: Record         // 内置组件选项
}
```

**插槽:**
- `default: {bind: ComponentProps}` - 默认插槽，提供组件绑定属性。

## 🎨 完整示例

```vue
<template>
  <UForm class="user-form" label-width="6em" v-slot="{ model }">
    <el-row>
      <el-col :span="12">
        <UFItem prop="nickName" />
      </el-col>
      <el-col :span="12">
        <UFItem prop="sex" />
      </el-col>
    </el-row>

    <UFItem prop="introduction" :itemComponentOptions="{type:'textarea', rows: 2}" />

    <el-row>
      <el-col :span="8">
        <UFItem prop="allowFriend" />
      </el-col>
      <el-col :span="8">
        <UFItem prop="publicInfo" />
      </el-col>
      <el-col :span="8">
        <UFItem prop="themeColor" :itemComponent="ElColorPicker" />
      </el-col>
    </el-row>

    <UFItem prop="interest" />
    <UFItem prop="age" v-slot="{bind}">
      <ElSlider v-bind="bind" />
    </UFItem>

    <ElDivider>操作</ElDivider>
    <UFItem label=" ">
      <ElButton @click="handleSubmit">提交</ElButton>
      <ElButton @click="addFormItem">增加表单项</ElButton>
    </UFItem>

    <ElDivider>数据预览</ElDivider>
    <UFItem label=" ">
      <!-- 使用从插槽获取的 model -->
      <pre>{{ JSON.stringify(model, null, 2) }}</pre>
    </UFItem>
  </UForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElSwitch, ElColorPicker, ElButton, ElDivider, ElRow, ElCol, ElSlider } from 'element-plus'
import { useElFormConf, type FormRuleItem } from './useElForm'

interface IUser {
  nickName: string
  sex: string
  introduction: string
  allowFriend: boolean
  publicInfo: boolean
  themeColor: string
  interest?: string
  age?: number
}

const formItemDef = ref<FormRuleItem<IUser>[]>([
  { prop: "nickName", label: "昵称", rules: [ { required: true, message: "请输入昵称" }] },
  { prop: "introduction", label: "个人简介" },
  { prop: "publicInfo", label: "公开信息", component: ElSwitch },
  { prop: "allowFriend", label: "允许加好友", component: ElSwitch },
  { prop: "themeColor", label: "主题颜色", componentProps: { size: "small" } },
  { prop: "sex", label: "性别", value: "1", selectOptions: [{ label: "男", value: "1" }, { label: "女", value: "0" }] }
])

// 注意：model 已不需要从 useElFormConf 解构，可直接在 UForm 插槽中使用
const { formValidateTo, UFItem, UForm } = useElFormConf(formItemDef)

const handleSubmit = async () => {
  const [err, formData] = await formValidateTo()
  if (err) {
    console.error("表单验证失败", err)
    return
  }
  console.log("提交数据:", formData)
}

const addFormItem = () => {
  formItemDef.value.push(
    { prop: "interest", label: "兴趣爱好", value: "看书写字打游戏", componentProps: { type: "textarea", rows: 2 } },
    { prop: "age", label: "年龄", value: 21, componentProps: { min: 0, max: 180, step: 1 } }
  )
}
</script>

<style>
.user-form {
  padding: 1em;
  margin: auto;
  max-width: 680px;
}
.user-form pre {
  line-height: 1.2;
  font-size: 12px;
}
</style>
```

## 💡 最佳实践

1.  **优先使用 `<UForm>`**：该组件能免去手动绑定属性，让模板更简洁。
2.  **使用 `UForm` 作用域插槽**: 在模板中需要访问表单数据时，利用 `<UForm v-slot="{ model }">` 来获取，使数据流更清晰。
3.  **类型定义**: 为表单数据定义清晰的 TypeScript 接口以获得完整的类型支持。
4.  **组件复用**: 将常用的表单配置抽取为可复用的配置对象。
5.  **验证规则**: 合理使用 `required` 快捷属性和 `rules` 详细配置。
6.  **动态表单**: 利用 Vue 的响应式特性实现表单的动态变化。

这个表单范式为 Vue3 + Element Plus 项目提供了一种高效、类型安全、高度可定制的表单处理方案，大幅减少了表单开发的样板代码，提升了开发效率。
