<script setup>
const { page, title, slug, pageTitle, pageType, meta, day } = useCommon()
const router = useRouter()
const city = router.currentRoute.value.params.city
const data = router.currentRoute.value.params.query
definePageMeta({
    middleware: "query"
})



const message = ref('')

const loading = ref(false)

const pageNo = ref(1)

const contents = ref('')

const metaContent = ref('')

const images = ref([])

if (pageType.value == 'Subcategories') {
    const { data: res } = await useAsyncData('res',
        () => {
            return $fetch(`/api/query?category=${title(data)}`, {
                method: 'get'
            })
        },
    )
    contents.value = res.value
    pageTitle.value = `${meta.value.page_title} in ${title(city)}`
    metaContent.value = `${meta.value.page_content}`
} else if (pageType.value == 'Businesses') {
    const { data: res } = await useAsyncData('res',
        () => {
            return $fetch(`/api/query?city=${title(city)}&subcategory=${title(data.split('-in-')[0])}`, {
                method: 'get'
            })
        },
    )
    contents.value = res.value
    pageTitle.value = `${meta.value.page_title} in ${title(city)}`
    metaContent.value = `${meta.value.page_content}`
    if (process.client) {
        window.addEventListener("scroll", ((event) => {
            if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
                fetchNew()
                window.scrollTo(0, 100);
            }
        }));
    }
} else if (pageType.value == 'Business Details') {
    const { data: res } = await useAsyncData('res',
        () => {
            return $fetch(`/api/query?business_slug=${data.split('-biz-')[0]}`, {
                method: 'get'
            })
        },
    )
    contents.value = res.value
    images.value = contents.value.business_images
    metaContent.value = `${meta.value.page_content}`
    pageTitle.value = `${contents.value.business_name}`
} else if (pageType.value == 'CMS') {
    metaContent.value = `dsdds`
    pageTitle.value = `ggg`
}

const sliderCurrentIndex = ref(0)
const reduceImageIndex = (index) => {
    if (index > 0) {
        sliderCurrentIndex.value = index - 1
    }
}
const increaseImageIndex = (index) => {
    if (index < images.value.length - 1) {
        sliderCurrentIndex.value = index + 1
    }
}

const leadsFormData = ref({
    "subcategory": data.split('-in-')[0],
    "city": city,
    "name": "",
    "phone": "",
    "email": "",
    "query": data,
    "status": "Pending"
})

const gernerateLead = async () => {
    useFetch("/api/save/leads", {
        method: 'post',
        body: leadsFormData
    }).then((res) => {
        console.log(res);
        message.value = res.data.value.message
    })
}

useHead({
    title: `${pageTitle.value}`,
    meta: [
        { name: 'description', content: metaContent.value }
    ]
})
</script>

<template>
    <template v-if="city == 'mobile'">
        <aside class="menu">
            <ul class="menu-list">
                <li>
                    <ul v-if="data == 'menu'">
                        <li><nuxt-link to="/">Home</nuxt-link></li>
                        <li><nuxt-link to="/about">About</nuxt-link></li>
                        <li><nuxt-link to="/contact">Contact</nuxt-link></li>
                        <li><nuxt-link to="/login">Login</nuxt-link></li>
                        <li><nuxt-link to="/register">Register</nuxt-link></li>
                    </ul>

                    <search v-else />
                </li>
            </ul>
        </aside>
    </template>

   


    <template v-else-if="pageType == 'Subcategories' && data != 'profile'">

        <section>
            <h1 class="title is-1">{{ meta.page_title }} in {{ title(city) }}</h1>
            <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
                <div class=" column is-6-mobile is-4-tablet is-4-desktop is-3-widescreen" v-for="s in contents"
                    :key="s._id">
                    <a :href="`/${slug(city)}/${slug(s?.name)}-in-${slug(city)}`" class="grid-item box">
                        <p><b>{{ s.name }}</b></p>
                    </a>
                </div>
            </div>
        </section>
    </template>


    <!-- <template v-else-if="pageType == 'Subcategories'">
        <section>
            <h1 class="title is-1">{{ meta.page_title }} in {{ title(city) }}</h1>
            <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
                <div class=" column is-6-mobile is-4-tablet is-4-desktop is-3-widescreen" v-for="s in contents" :key="s._id">
                    <aside class="menu grid-item box">
                        <ul class="menu-list">
                            <li>
                                <a class="is-active" :href="`/${slug(city)}/${slug(s?.name)}-in-${slug(city)}`">
                                    <p><b>{{ s.name }}</b></p>
                                </a>
                            </li>
                            <li v-for="s2 in s.specialities" :key="s2"> 
                                <a :href="`/${slug(city)}/${slug(s2)}-in-${slug(city)}`">
                                    <p>{{ s2 }}</p>
                                </a>
                            </li>
                        </ul>
                    </aside>
                </div>
            </div>
        </section>
    </template> -->

    <template v-else-if="pageType == 'Businesses' && data != 'profile'">
        <section>
            <span class="is-left">
                <nav class="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><nuxt-link to="/">Home</nuxt-link></li>
                        <li><nuxt-link to="/">{{ title(city) }} </nuxt-link></li>
                        <li><nuxt-link :to="data">{{ meta.page_title }} in {{ title(city) }} </nuxt-link>
                        </li>
                        <li class="is-active"><a href="javascript:;" aria-current="page">{{ contents.length }}</a></li>
                    </ul>
                </nav>

                <h1 class="title is-1">{{ meta.page_title }} in {{ title(city) }}</h1>

                <p class="mt-4">{{ meta.page_content.replace(new RegExp('cityName', 'g'), title(city)) }}</p>
            </span>

            <div class="blog-section mt-6 mb-6">
                <div class="blog-content">
                    <nuxt-link class="media" v-for="b in contents" :key="b._id"
                        :to="`/${slug(city)}/${b.business_slug}-biz-${b._id.substr(16)}`">
                        <div class="media-left">
                            <figure class="image custom-image">
                                <img :src="`${b.business_images[0] ?? '../Image_not_available.png'}`" alt=" Blog Image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <h1 class="title is-4">{{ b.business_name }}</h1>
                            <p><i class="fa fa-map-marker" aria-hidden="true"></i>
                                {{ b?.business_address }}, {{
                                    b?.business_locality }}, {{ b?.business_city }},
                                {{ b?.business_state }}, {{ b?.business_pin }}
                            </p>
                            <p><i class="fa fa-phone" aria-hidden="true"></i> {{ b.business_phone }}</p>
                            <!-- <p>{{ b.business_timing }}</p> -->
                            <p v-if="b.business_services.length > 0">
                            <div class="buttons">
                                <button class="button is-primary is-ligh is-small" v-for="service in b.business_services"
                                    :key="service">{{ service }}</button>
                            </div>
                            </p>
                        </div>
                    </nuxt-link>
                </div>
                <!-- Scrollable container -->
                <!-- <div v-infinite-scroll="loadMoreItems" infinite-scroll-disabled="loading" infinite-scroll-distance="200">
                <div v-if="loading">Loading...</div>
            </div> -->

                <aside class="sidebar">
                    <div class="form-box">
                        {{ message }}
                        <form @submit.prevent="gernerateLead">
                            <h1 class="title is-3 is-size-5">Query Form</h1>
                            <input type="text" class="form-field" placeholder="Name" v-model="leadsFormData.name" required>
                            <input type="text" class="form-field" placeholder="Phone Number" v-model="leadsFormData.phone"
                                required>
                            <input type="text" class="form-field" placeholder="Email ID (optional)"
                                v-model="leadsFormData.email" oninput="this.value = this.value.replace(/[^0-9a-zA-z.-_@]/g, '');">
                            <button type="submit" class="form-button">Get Best Deal</button>
                        </form>
                    </div>
                    <!-- <h2 class="title is-5">Recent Post</h2>
                    <div class="recent-post">
                        <ul>
                            <li>Coffee</li>
                            <li>Tea</li>
                            <li>Milk</li>
                        </ul>
                    </div> -->
                </aside>


            </div>
        </section>
    </template>



    <template v-else-if="pageType == 'Business Details' && data != 'profile'">


        <section>

            <span class="is-left">
                <nav class="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><nuxt-link to="/">Home</nuxt-link></li>
                        <li><nuxt-link to="/">{{ title(city) }}</nuxt-link></li>
                        <li><nuxt-link @click="$router.go(-1)"
                                :to="`${slug(contents?.business_category)}-in-${slug(city)}`">{{
                                    meta.page_title }} in {{ title(city) }} </nuxt-link></li>
                        <li><nuxt-link :to="data">{{ contents?.business_name }} </nuxt-link></li>
                    </ul>
                </nav>
                <h1 class="title is-1">{{ contents?.business_name }}</h1>
            </span>

            <div class="columns mt-4" v-if="images.length > 0">
                <div class="column is-two-fifths" v-if="images.length > 0">
                    <div class="image-section" style="border: 1px solid black; max-height: 350px; max-width: 90%;">
                        <img :src="images[sliderCurrentIndex ?? 0]" style="max-height: 300px; min-width: 100%;"
                            alt="Image" />
                        <span class="icon" style="position: absolute; top:260px">
                            <a class="has-text-white" @click="reduceImageIndex(sliderCurrentIndex)" href="javascript:;">
                                <i class="fas fa-angle-double-left"></i>
                            </a>
                        </span>
                        <span class="icon" style="position: absolute; top:260px; left:455px">
                            <a class="has-text-white" @click="increaseImageIndex(sliderCurrentIndex)" href="javascript:;">
                                <i class="fas fa-angle-double-right"></i>
                            </a>
                        </span>
                    </div>
                </div>
                <div class="column ">
                    <div class="content-section">

                        <div class="custom-container">
                            <p><i class="fa fa-map-marker" aria-hidden="true"></i> Address</p>
                            <p>{{ contents?.business_address }}, {{ contents?.business_locality }}, {{
                                contents?.business_city }},{{ contents?.business_state }},{{ contents?.business_pin }}</p>
                        </div>
                        <div class="custom-container">
                            <p><i class="fa fa-phone" aria-hidden="true"></i> Phone</p>
                            <a :href="'tel: ' + contents?.business_phone" target="_blank" rel="noopener">
                                {{ contents?.business_phone }}</a>
                        </div>
                        <div class="custom-container">
                            <p><i class="fa fa-list-alt" aria-hidden="true"></i> Category</p>
                            <p>{{ contents?.business_category }}</p>
                        </div>
                    </div>
                </div>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3507.5911061173924!2d77.04983299999999!3d28.46174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDI3JzQyLjMiTiA3N8KwMDInNTkuNCJF!5e0!3m2!1sen!2sin!4v1689698992701!5m2!1sen!2sin"
                    class="column is-one-quarter" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <div class="columns mt-4" v-else>
                <div class="column is-half">
                    <div class="content-section">

                        <div class="custom-container">
                            <p><i class="fa fa-map-marker" aria-hidden="true"></i> Address</p>
                            <p>{{ contents?.business_address }}, {{ contents?.business_locality }}, {{
                                contents?.business_city }},{{ contents?.business_state }},{{ contents?.business_pin }}</p>
                        </div>
                        <div class="custom-container">
                            <p><i class="fa fa-phone" aria-hidden="true"></i> Phone</p>
                            <p>
                                <a :href="'tel: ' + contents?.business_phone" target="_blank" rel="noopener">
                                    {{ contents?.business_phone }}</a>
                            </p>
                        </div>
                        <div class="custom-container">
                            <p><i class="fa fa-list-alt" aria-hidden="true"></i> Category</p>
                            <p>{{ contents?.business_category }}</p>
                        </div>
                    </div>
                </div>


                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3507.5911061173924!2d77.04983299999999!3d28.46174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDI3JzQyLjMiTiA3N8KwMDInNTkuNCJF!5e0!3m2!1sen!2sin!4v1689698992701!5m2!1sen!2sin"
                    class="column is-half" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>


            </div>
            <div class="container inner">
                <div class="columns three-layout">
                    <div class="column">
                        <div class="custom-container">
                            <p><i class="fa fa-envelope" aria-hidden="true"></i> Email</p>
                            <a :href="'mailto: ' + contents?.business_email" target="_blank" rel="noopener">
                                {{ contents?.business_email }}</a>
                        </div>
                        <div class="custom-container">
                            <p><i class="fa fa-globe" aria-hidden="true"></i> Website</p>
                            <a :href="contents?.business_website" target="_blank" rel="noopener">
                                Visit Website</a>
                        </div>

                        <div class="custom-container">
                            <p><i class="fa fa-share-alt" aria-hidden="true"></i> Social</p>
                            <p>

                                <a :href="contents?.business_social.facebook" target="_blank" rel="noopener"> Facebook <i
                                        class="fa-brands fa-facebook-f"></i></a>
                            </p>
                            <p>

                                <a :href="contents?.business_social.instagram" target="_blank" rel="noopener"> Instagram <i
                                        class="fa-brands fa-instagram" aria-hidden="true"></i></a>
                            </p>
                            <p>

                                <a :href="contents?.business_social.youtube" target="_blank" rel="noopener"> Youtube <i
                                        class="fa-brands fa-youtube" aria-hidden="true"></i></a>
                            </p>
                        </div>



                    </div>
                    <div class="column">
                        <div class="custom-container">

                            <p><i class="fa fa-clock" aria-hidden="true"></i> Business Timing</p>
                            <p>
                                Monday:
                                {{ contents?.business_timing.monday.start }}
                                -
                                {{ contents?.business_timing.monday.end }}
                                <span class="icon" v-if="day == 'Monday'"><i class="fas fa-dot-circle"></i></span>
                            </p>
                            <p>
                                Tuesday:
                                {{ contents?.business_timing.tuesday.start }}
                                -
                                {{ contents?.business_timing.tuesday.end }}
                                <span class="icon" v-if="day == 'Tuesday'"><i class="fas fa-dot-circle"></i></span>
                            </p>
                            <p>
                                Wednesday:
                                {{ contents?.business_timing.wednesday.start }}
                                -
                                {{ contents?.business_timing.wednesday.end }}
                                <span class="icon" v-if="day == 'Wednesday'"><i class="fas fa-dot-circle"></i></span>
                            </p>
                            <p>
                                Thrusday:
                                {{ contents?.business_timing.thrusday.start }}
                                -
                                {{ contents?.business_timing.thrusday.end }}
                                <span class="icon" v-if="day == 'Thrusday'"><i class="fas fa-dot-circle"></i></span>
                            </p>
                            <p>
                                Friday:
                                {{ contents?.business_timing.friday.start }}
                                -
                                {{ contents?.business_timing.friday.end }}
                                <span class="icon" v-if="day == 'Friday'"><i class="fas fa-dot-circle"></i></span>
                            </p>
                            <p>
                                Saturday:
                                {{ contents?.business_timing.saturday.start }}
                                -
                                {{ contents?.business_timing.saturday.end }}
                                <span class="icon" v-if="day == 'Saturday'"><i class="fas fa-dot-circle"></i></span>
                            </p>
                            <p>
                                Sunday: {{ contents?.business_timing.sunday.start == '' ? 'Closed' :
                                    '-' + contents?.business_timing.sunday.start }}
                                {{ contents?.business_timing.sunday.end }}

                                <span class="icon" v-if="day == 'Sunday'"><i class="fas fa-dot-circle"></i></span>
                            </p>

                        </div>

                    </div>
                    <div class="column">
                        <div class="custom-container">
                            <p><i class="fa fa-wrench" aria-hidden="true"></i> Services</p>


                            <div class="block">
                                <span class="tag is-primary is-medium ml-1 is-size-7"
                                    v-for="service in contents?.business_services">
                                    {{ service }}

                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="inner" v-if="contents.business_description != ''">
                <h4 class="title"><i class="fa fa-info-circle" aria-hidden="true"></i>

                    About</h4>
                <p>{{ contents?.business_description }}</p>

            </div>

            <div class="inner mt-4 mb-6" v-if="contents?.business_faq">
                <h4 class="title"><i class="fa fa-question-circle" aria-hidden="true"></i> FAQs</h4>
                <p>{{ contents?.business_faq }}</p>
                <br>
            </div>
        </section>
    </template>
</template>





<style scoped>
h1.title.is-1 {
    font-size: 2rem;
    margin-top: 30px;
    margin-bottom: 0px;
}

nav.breadcrumb {
    margin-top: 30px;
    margin-bottom: 0px;
}

.form-box {
    width: 300px;
    margin-bottom: 20px;
    padding: 20px;
    background-color: white;
    border: 1px solid#d6d6d6;
    border-radius: 10px;
}

.form-field {
    display: block;
    width: 100%;
    margin: 20px auto;
    padding: 11px;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
}

.form-button {
    display: block;
    width: 100%;
    margin: 10px auto;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #0479d3;
    color: white;
    font-weight: bold;
}

.recent-post ul {
    width: 300px;
    margin-bottom: 20px;
    padding: 20px;
    background-color: white;
    border: 1px solid #d6d6d6;
    border-radius: 10px;
}

.sidebar {
    flex-basis: 20%;
    background-color: #fff;
}

.blog-content {
    flex-basis: 80%;
}

.sidebar {
    padding: 0px;
}

.columns.mt-4 {
    margin: 0px 0px 17px;
    border: 1px solid #d6d6d6;
    border-radius: 10px;
}

.inner {
    margin-top: 17px;
}

.container.mt-2 section {
    margin-left: 20px;
    margin-right: 20px;
}

@media screen and (max-width: 768px) {
    h1.title.is-1 {
        font-size: 26px;
    }

    .blog-content {
        flex-basis: 100%;
    }

    .title.is-4 {
        margin-top: 14px;
    }

    .media-left {
        margin-right: 0px;
    }

    .sidebar {
        flex-basis: 100%;
    }

    .form-box,
    .recent-post ul {
        width: 100%;
    }
}

aside {
    position: -webkit-sticky;
    position: sticky;
    top: 20px;
}
</style>