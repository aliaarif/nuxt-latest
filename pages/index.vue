<script setup>
const { city, slug, title } = useCommon()


useHead({
    title: 'Obelcon | Categories',
    meta: [
        { name: 'description', content: 'Obelcon Home Page' }
    ]
})

onMounted(() => {
    if (window !== 'undefined') {
        category.value = !localStorage.category ? localStorage.setItem('category', 'hire-on') : slug(localStorage.category)
        city.value = !localStorage.city ? localStorage.setItem('city', 'gurugram') : title(localStorage.city)
    }
})



const category = ref('hire-on')

const { data: categories } = await useAsyncData('categories',
    () => {
        return $fetch(`/api/categories`, {
            method: 'get'
        })
    },
)

</script>
<template>
    <section>

        <h3 class="title">Search for Business, Places and Services.</h3>
        <p class="description">Thoroughly tested and evaluated by our expert editors to help you make a more informed
            buying decision.</p>
        <br>
        <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
            <div class="column is-6-mobile is-4-tablet is-4-desktop is-3-widescreen" v-for="category in categories"
                :key="category._id">
                <nuxt-link :to="`/${slug(city)}/${slug(category.name)}`" class="grid-item box">
                    <img src="https://www.svgrepo.com/show/501814/microphone1-broadcasting.svg"
                        style="width: 100px; height: 100px;" alt="Your Image">
                    <p><b>{{ category.name }}</b></p>
                </nuxt-link>
            </div>
        </div>

    </section>
</template>