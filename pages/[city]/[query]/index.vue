<script setup>
const { title, slug, pageTitle, pageType, meta } = useCommon()
const router = useRouter()
const city = router.currentRoute.value.params.city
const data = router.currentRoute.value.params.query
definePageMeta({
    middleware: "query"
})



const message = ref('')

const loading = ref(false)

const page = ref(1)

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
    pageTitle.value = pageTitle.value.business_name

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
    "mobile": "",
    "email": "",
    "full_path": router.currentRoute.fullPath
})

const gernerateLead = async () => {
    useFetch("/api/save/lead", {
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


    <template v-else-if="pageType == 'Subcategories'">
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

    <template v-else-if="pageType == 'Businesses'">
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
                {{ meta.page_content }}
            </span>

            <div class="blog-section mt-6 mb-6">
                <div class="blog-content">
                    <nuxt-link class="media" v-for="b in    contents   " :key="b._id"
                        :to="`/${slug(city)}/${b.business_slug}-biz-${b._id.substr(16)}`">
                        <div class="media-left">
                            <figure class="image custom-image">
                                <img :src="`${b.business_image}`" alt=" Blog Image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <h1 class="title is-4">{{ b.business_name }}</h1>
                            <p>{{ b.business_address.substr(9) }}</p>
                            <p>{{ b.business_phone }}</p>
                            <p>{{ b.business_timing }}</p>



                        </div>
                    </nuxt-link>
                </div>
                <!-- Scrollable container -->
                <!-- <div v-infinite-scroll="loadMoreItems" infinite-scroll-disabled="loading" infinite-scroll-distance="200">
                <div v-if="loading">Loading...</div>
            </div> -->

                <aside class="sidebar">
                    <div class="form-box">
                        <form>

                            <input type="text" class="form-field" placeholder="Name" v-model="leadsFormData.name" required>
                            <input type="text" class="form-field" placeholder="Mobile Number" v-model="leadsFormData.mobile"
                                required>
                            <input type="text" class="form-field" placeholder="Email ID (optional)"
                                v-model="leadsFormData.email">
                            <button type="button" @click="gernerateLead" class="form-button">Get Best Deal
                            </button> {{
                                message }}
                        </form>
                    </div>




                    <h2 class="title is-5">Recent Post</h2>

                    <div class="recent-post">
                        <ul>
                            <li>Coffee</li>
                            <li>Tea</li>
                            <li>Milk</li>
                        </ul>
                    </div>


                </aside>


            </div>
        </section>
    </template>



    <template v-else>


        <section>

            <span class="is-left">
                <nav class="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><nuxt-link to="/">Home</nuxt-link></li>
                        <li><nuxt-link to="/">{{ title(city) }}</nuxt-link></li>
                        <li><nuxt-link @click="$router.go(-1)" :to="data">{{
                            meta.page_title }} in {{ title(city) }} </nuxt-link></li>
                        <li><nuxt-link :to="data">{{ contents?.business_name }} </nuxt-link></li>
                    </ul>
                </nav>
                <h1 class="title is-1">{{ contents?.business_name }}</h1>
            </span>
            <div class="columns mt-4">

                <div class="column" v-if="images.length > 0">
                    <div class="image-section" style="border: 1px solid black;">
                        <img :src="images[sliderCurrentIndex ?? 0]" alt="Image" />

                        <span class="icon" style="position: absolute; top:215px">
                            <a class="has-text-white" @click="reduceImageIndex(sliderCurrentIndex)" href="javascript:;">
                                <i class="fas fa-angle-double-left"></i>
                            </a>
                        </span>

                        <span class="icon" style="position: absolute; top:215px; left:300px">


                            <a class="has-text-white" @click="increaseImageIndex(sliderCurrentIndex)" href="javascript:;">
                                <i class="fas fa-angle-double-right"></i>
                            </a>
                        </span>

                    </div>
                </div>
                <div class="column">
                    <div class="content-section">

                        <div class="custom-container">
                            <p>Address</p>
                            <p>{{ contents?.business_address }}</p>
                        </div>
                        <div class="custom-container">
                            <p>Phone</p>
                            <p>{{ contents?.business_phone }}</p>
                        </div>
                    </div>
                </div>

                <div class="column">
                    <div class="content-section">

                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3507.5911061173924!2d77.04983299999999!3d28.46174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDI3JzQyLjMiTiA3N8KwMDInNTkuNCJF!5e0!3m2!1sen!2sin!4v1689698992701!5m2!1sen!2sin"
                            width="500" height="230" style="border:0;" allowfullscreen="" loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"></iframe>


                    </div>
                </div>





            </div>
            <div class="container inner">
                <div class="columns three-layout">
                    <div class="column">
                        <div class="custom-container">
                            <p>Business Timing</p>
                            <p>{{ contents?.business_timing }}</p>
                        </div>
                        <div class="custom-container">
                            <p>Category</p>
                            <p>{{ contents?.business_category }}</p>
                        </div>
                    </div>
                    <div class="column">
                        <div class="custom-container">
                            <p>Website</p>
                            <p>{{ contents?.business_website }}</p>
                        </div>
                        <div class="custom-container">
                            <p>Services</p>
                            <p>{{ contents?.business_services }}</p>
                        </div>
                    </div>
                    <div class="column">
                        <div class="custom-container">
                            <p>City</p>
                            <p>{{ contents?.business_city }}, {{ contents?.business_state }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="inner">
                <h4 class="title"> About</h4>
                <p>{{ contents?.business_description }}</p>

            </div>

            <div class="inner mt-4 mb-6">
                <h4 class="title"> FAQs</h4>
                <p>{{ contents?.business_faqs }}</p>
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
</style>