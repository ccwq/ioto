<template>
<Button style="color:red; padding: 2em">{{props.message}} {{name}}</Button>
</template>
<script lang="ts" setup>
import {ref} from "vue";
const props = defineProps<{ message: string }>()
const name = ref("World");
</script>
