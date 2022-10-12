<template>
<Button style="color:red; padding: 2em">{{props.message}} {{name}}</Button>
</template>
<script lang="ts">
import {ref} from "vue-demi";

export default {
    props:{
        message: {
            type: String,
            default: 'Hello World'
        }
    },
    setup(props:any) {

        const name = ref("World");

        if (true) {
            name.value = "World-X";
        }
        return {
            name,
            props,
        };
    }
}
</script>
