<script setup>
const { city, slug, title } = useCommon()
useHead({
    title: 'Easetrail',
    meta: [
        { name: 'description', content: 'Easetrail, is local search engine, provides Best Deals, Shop Online, Ticket Booking for Flights, Hotels, Movies, Buses and Cabs. You can also Order Food, Book Restaurant Table, View Menu, Book Doctors’ Appointments. Justdial curates Social content, News, Videos and more from Top Publishers on all Trending Topics.' }
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
        <br>
        <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
            <div class="column is-6-mobile is-4-tablet is-4-desktop is-3-widescreen" v-for="category in categories"
                :key="category._id">
                <nuxt-link :to="`/${slug(city)}/${slug(category.name)}`" class="grid-item box">
                    <img :src="category.image" style="width: 100px; height: 100px;" alt="Your Image">
                    <p><b>{{ category.name }}</b></p>
                </nuxt-link>
            </div>
        </div>

    </section>
</template>

<style scoped>
.title {
    color: #363636;
    margin-top: 30px;
    margin-bottom: 0px;
}

@media screen and (max-width: 768px) {
    .title {
        font-size: 26px;
    }
}

.column.is-6-mobile.is-4-tablet.is-4-desktop.is-3-widescreen {
    padding: 10px;
}

.container.mt-2 section {
    margin-left: 20px;
    margin-right: 20px;
}
</style>