
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

console.log(props.contents);

</script>

<template>
    <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">

        <div class=" column is-6-mobile is-4-tablet is-4-desktop is-3-widescreen" v-for="s in props.contents" :key="s._id">
            <nuxt-link :to="`/${slug(city)}/${slug(s.name)}-in-${slug(city)}`" class="grid-item box">
                <p><b>{{ s.name }}</b></p>
            </nuxt-link>
        </div>

    </div>
</template>