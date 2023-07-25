
<script setup>
import { ref, defineProps } from 'vue';
const router = useRouter()
const city = router.currentRoute.value.params.city

const props = defineProps({
    contents: {
        type: Object,
        default: true
    }
})

// console.log(props.contents);

</script>

<template></template>