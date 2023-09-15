<script setup>
const { pages, setPage, page } = useCommon()

const changePage = (pageSlug) => {
    setPage(pageSlug)

    localStorage.page = JSON.stringify(page.value)
}

</script>
<template>
    <footer class="footer">
        <div class="container">

            <div class="row margin-header-footer" data-nosnippet="">
                <div class="col-xs-12">

                    <div> About US: Welcome to Easetrail, your go-to destination for all your daily needs! Whether you're
                        searching for the daily need services, we've got you covered with a vast array of services from
                        beauty and wellness to home repairs, travel & accommodations, educational institutions, and beyond,
                        you'll find a wide range of services to cater to your specific requirements. Each service category
                        comes with detailed listings, providing you with all the essential information you need. Discover
                        contact details, operating hours, service descriptions, customer reviews, and more, all at your
                        fingertips. </div>
                    <br>

                    <div>
                        <nav class="breadcrumb has-dot-separator" aria-label="breadcrumbs">
                            <ul>
                                <li v-for="pageName in pages" :key="pageName.slug">
                                    <nuxt-link :to="pageName.slug" @click="changePage(pageName.slug)" v-if="!city">{{ pageName.title }}</nuxt-link>
                                    <!-- <nuxt-link :to="'http://192.168.101.61:3000/'+pageName.slug" @click="changePage(pageName.slug)" v-else>{{ pageName.title }}</nuxt-link> -->
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <br>
                    <div>
                        ©2023 Obelcon All Rights Reserved
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>