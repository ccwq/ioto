<!--
 * @Author: ccwq
 * @Date: 2025/5/26 11:15:11
 * @Description: 网格容器组件，用于布局和展示内容
 * @Example
 * // 基础用法 - 2列布局
 * <GridContainer :cols="2">
 *   <div>内容1</div>
 *   <div>内容2</div>
 * </GridContainer>
 *
 * // 自定义间距和对齐方式
 * <GridContainer :cols="3" :gap="20" align="center">
 *   <div>内容1</div>
 *   <div>内容2</div>
 *   <div>内容3</div>
 * </GridContainer>
 *
 * // 响应式布局
 * <GridContainer :cols="{ sm: 1, md: 2, lg: 3 }">
 *   <div>内容1</div>
 *   <div>内容2</div>
 *   <div>内容3</div>
 * </GridContainer>
 -->

<template>
  <div class="grid-container" :class="classes">
    <slot></slot>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  /**
   * 列数，可以是数字或响应式对象
   */
  cols: {
    type: [Number, Object],
    default: 1,
  },

  /**
   * 栅格间距，单位为px
   */
  gap: {
    type: Number,
    default: 10,
  },

  /**
   * 对齐方式，可选值为 'start', 'center', 'end'
   */
  align: {
    type: String,
    default: 'start',
    validator(val) {
      return ['start', 'center', 'end'].includes(val);
    },
  },
});

const classes = computed(() => {
  return {
    [`align-${props.align}`]: true,
  };
});
</script>

<style scoped lang="less">
.grid-container {
  display: grid;
  gap: v-bind(gap + 'px');

  &.align-start {
    justify-items: start;
  }

  &.align-center {
    justify-items: center;
  }

  &.align-end {
    justify-items: end;
  }
}
</style>