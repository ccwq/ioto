<!--
 * @Author: ccwq
 * @Date: 2025/7/18 17:25:43
 * @Description: 二次封装el-popover
 * 解决痛点 原生的el-popover在点击外部时，会自动关闭，但是某些场景下不需要此特性, 比如需要进行验证, 所以产生了此组件

 * @props {String} title=窗口标题 弹窗标题文本
 * @props {String} width=200px 弹窗宽度
 * @props {Boolean} modelValue 控制显示/隐藏（v-model绑定）
 * @props {Object} virtualRef 关联元素（点击该元素不触发关闭）
 * @props {Function} beforeClose 关闭前回调（返回false可阻止关闭）
 *
 * @events close(来源) 关闭时触发，update:modelValue 状态更新，confirm 确定事件
 * @slot header 标题区，default 主体内容，footer 底部区
 *
 * @example 基础使用
 * APopover(title="编辑" :modelValue="visible" @update:modelValue="visible=$event")
 *   p 内容区域
 *   template(#footer): el-button(@click="save") 保存
 *
 * @example 关联触发元素
 * el-button(ref="btn" @click="visible=true") 打开
 * APopover(:virtualRef="btn" :modelValue="visible")
 *   p 点击按钮区域不会关闭
 *
 * @example 表单验证
 * APopover(:beforeClose="validate")
 *   el-form: el-input(v-model="name" required)
 -->
<template lang="pug">
el-popover(
  :hide-after=9999999
  :visible="true"
  v-if="modelValue"
  :virtualRef
  popper-class="APopover"
)
  .content(v-click-outside="e=>handleClose(e, 'outclick')"  ref="contentRef")
    slot(name="header"): .APopover-header {{title}}
    slot
      span some content in APopover
    slot(name="footer")
      .APopover-footer
        el-button(type="primary" @click="handlerConfirm()") 确定
        el-button(type="default" @click="handleClose('button')") 取消


</template>
<script setup>
import { ClickOutside as vClickOutside, ElPopover } from 'element-plus'
import { onErrorCaptured, onMounted, ref, toRef, watch, watchEffect } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '窗口标题'
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  virtualRef: {
    type: Object,
    default: null
  },

  beforeClose: {
    type: Function,
    default: null
  },

  /**
   * 在显示后,自动获取焦点
   */
  autoFocusSelector: {
    type: String
  }
})
const emits = defineEmits(['update:modelValue', 'close', 'confirm'])
onErrorCaptured((err) => console.error('组件APopover内部错误:', err))

const virtualRef = toRef(props, 'virtualRef')
/**
 * 点击外部关闭
 * @param from {'button' | 'outclick'}
 * @param event {MouseEvent}
 * @returns {Promise<void>}
 */
const handleClose = async (from, event) => {
  // 如果单击触发元素, 不要执行close
  if (from === 'outclick' && event.target === virtualRef.value) return

  const beforeCloseReturn = await props?.beforeClose?.()
  if (beforeCloseReturn === false) {
    console.warn('自动关闭被beforeClose取消')
    return
  }
  emits('update:modelValue', false)
  emits('close', from)
  visible.value = false
}

const handlerConfirm = () => {
  emits('confirm')
}

const visible = ref(false)

const contentRef = ref(null)

onMounted(() => {
  watch(
    () => props.modelValue,
    async (visible) => {
      if (!visible) return
      if (!props.autoFocusSelector) return
      const inputEl = await runUntil(
        () => contentRef.value.querySelector(props.autoFocusSelector),
        300
      )
      if (inputEl) {
        inputEl.focus()
        // inputEl.select()
        selectInputContent(inputEl, /^[^.]+/)
      }
    },
    { immediate: true }
  )
})

const runUntil = (fun, timeout = 300, interval = 50) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId)
      resolve(null) // 超时返回false
    }, timeout)

    const intervalId = setInterval(() => {
      const ret = fun()
      if (ret) {
        clearInterval(intervalId)
        clearTimeout(timeoutId)
        resolve(ret) // 成功返回true
      }
    }, interval)
  })
}

const selectInputContent = (input, yourRegex) => {
  const match = input.value.match(yourRegex);
  if (match) {
    const start = input.value.search(yourRegex);
    const end = start + match[0].length;
    input.setSelectionRange(start, end);
    input.focus()
  } else {
    // 未匹配，按需处理
    input.focus();
  }
}
</script>
<style lang="less">
.APopover {
  --padding: var(--el-popover-padding);
  padding: var(--padding);
  &-header {
    margin-bottom: var(--padding);
    //font-size: 1em;
  }
  &-footer {
    margin-top: var(--padding);
    justify-content: flex-end;
    display: flex;
    gap: var(--padding);
  }
}
</style>
