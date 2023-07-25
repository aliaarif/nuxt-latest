<script setup>
const { title, slug, pageTitle, pageType, meta } = useCommon()
const router = useRouter()
const city = router.currentRoute.value.params.city
const data = router.currentRoute.value.params.query
definePageMeta({
    middleware: "query"
})


const loading = ref(false)

const page = ref(1)

const contents = ref('')

const metaContent = ref('')

// const initMap = () => {
//     var c = [{ "status": true, "data": { "pid": 5, "bussinessName": "Xavier Tailoring shop", "services": "All kind of stitching works", "inventory": [], "workHr": "Monday :9:00AM to 20:0PM,Thuesday :9:00AM to 20:0PM,Wednesday :9:00AM to 20:0PM,Tuesday : 9:00AM to 20:0PM,Friday :9:00AM to 20:0PM,Saturday :9:00AM to 20:0PM,Sunday :9:00AM to 20:0PM", "description": "All kind of stitching works", "category": 11, "sub_category": ["Veg Hotel"], "lat": 9.52436859, "lon": 76.82810117, "contactName": "xavier", "contactEmail": "harisxavier@gmail.com", "contactOfficeAddress": "koovapally perubara road", "contactNumber": "8592808201", "contactOfficeNumber": "8592808201", "state": "Kerala", "city": "Koovappally", "place": "Kanjirapally - Erumely Road", "pincode": 686518, "referer": 24, "link": 31, "views": 0, "package": 1, "listing_pic": "default", "website": "example.com" } }];
//     var myLatLng = { lat: c[0].data.lat, lng: c[0].data.lon };

//     var map = new google.maps.Map(document.getElementById('mapName'), {
//         zoom: 4,
//         center: myLatLng
//     });

//     var marker = new google.maps.Marker({
//         position: myLatLng,
//         map: map,
//         title: 'Hello World!'
//     });
// }

if (pageType.value == 'Subcategories') {
    const { data: res } = await useAsyncData('res',
        () => {
            return $fetch(`/api/query?category=${title(data)}`, {
                method: 'get'
            })
        },
    )
    contents.value = res.value
    pageTitle.value = `${meta.value.page_title}`
    metaContent.value = `${meta.value.page_content}`
} else if (pageType.value == 'Businesses') {
    const { data: res, refresh } = await useAsyncData('res',
        () => {
            return $fetch(`/api/query?city=${title(city)}&subcategory=${title(data.split('-in-')[0])}`, {
                method: 'get'
            })
        },
    )
    contents.value = res.value
    pageTitle.value = `${meta.value.page_title}`
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
            return $fetch(`/api/query?title_slug=${data.split('-biz-')[0]}`, {
                method: 'get'
            })
        },
    )
    contents.value = res.value
    pageTitle.value = `${meta.value.page_title}`
    metaContent.value = `${meta.value.page_content}`
    // pageTitle.value = title(data)
    // metaContent.value = title(data)
    console.log(pageTitle.value)
}

const images = ref(
    ['https://fastly.picsum.photos/id/631/200/300.jpg?hmac=fgDzRjKee8EpUbckbz7kp1S1ssIqedrw2oOk5mBYQvk', 'https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI', 'https://fastly.picsum.photos/id/91/200/300.jpg?grayscale&hmac=4p0cGVnAgh9bW5M-gQ-prW_TkBJsF3Y0dP-ptgFKY_M']
)
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
        <h1 class="title is-1">{{ meta.page_title }}</h1>
        <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
            <div class=" column is-6-mobile is-4-tablet is-4-desktop is-3-widescreen" v-for="s in contents" :key="s._id">
                <a :href="`/${slug(city)}/${slug(s?.name)}-in-${slug(city)}`" class="grid-item box">
                    <p><b>{{ s.name }}</b></p>
                </a>
            </div>
        </div>
    </template>

    <template v-else-if="pageType == 'Businesses'">
        <span class="is-left">
            <nav class="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li><nuxt-link to="/">Home</nuxt-link></li>
                    <li><a to="javascript:;">{{ title(city) }}</a></li>
                    <li><a href="javascript:;">{{ meta.page_title }} </a>
                    </li>
                    <li class="is-active"><a href="javascript:;" aria-current="page">{{ contents.length }}</a></li>
                </ul>
            </nav>

            <h1 class="title is-1">{{ meta.page_title }}</h1>
        </span>

        <div class="blog-section mt-6 mb-6">
            <div class="blog-content">
                <nuxt-link class="media" v-for="b in contents" :key="b._id"
                    :to="`/${slug(city)}/${b.business_slug}-biz-${b._id.substr(16)}`">
                    <div class="media-left">
                        <figure class="image custom-image">
                            <img src="https://demo.themesberg.com/spaces/assets/img/meeting-office.jpg" alt="Blog Image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <h1 class="title is-4">{{ b.business_name }}</h1>
                        <p>{{ b.business_address.substr(9) }}</p>
                        <p>{{ b.business_phone }}</p>
                    </div>
                </nuxt-link>
            </div>
            <!-- Scrollable container -->
            <!-- <div v-infinite-scroll="loadMoreItems" infinite-scroll-disabled="loading" infinite-scroll-distance="200">
                <div v-if="loading">Loading...</div>
            </div> -->
            <aside class="sidebar">
                <h2 class="title is-5">Sidebar</h2>
                <p>.</p>
                <p>.</p>
                <p>.</p>
            </aside>
        </div>
    </template>

    <template v-else>
        <span class="is-left">
            <nav class="breadcrumb" aria-label="breadcrumbs">
                <ul>
                    <li><nuxt-link to="/">Home</nuxt-link></li>
                    <li><a to="javascript:;">{{ title(city) }}</a></li>
                    <li><nuxt-link @click="$router.go(-1)" to="javascript:;">{{
                        meta.page_title }} </nuxt-link></li>
                    <li><a href="javascript:;">{{ contents?.business_name }} </a></li>
                </ul>
            </nav>

            <h1 class="title is-1">{{ contents?.business_name }}</h1>
        </span>
        <div class="columns mt-4">
            <div class="column">
                <div class="content-section">
                    <div class="custom-container">
                        <p>Name</p>
                        <p>{{ contents?.business_name }}</p>
                    </div>
                    <div class="custom-container">
                        <p>Address</p>
                        <p>{{ contents?.business_address }}</p>
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="content-section">
                    <!-- <div id="mapName" style="width:267px; height: 270px" /> -->
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3507.5911061173924!2d77.04983299999999!3d28.46174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDI3JzQyLjMiTiA3N8KwMDInNTkuNCJF!5e0!3m2!1sen!2sin!4v1689698992701!5m2!1sen!2sin"
                        width="500" height="230" style="border:0;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>


                </div>
            </div>

            <div class="column">
                <div class="image-section" style="border: 1px solid black;">
                    <img :src="images[sliderCurrentIndex ?? 0]" alt="Image" />

                    <span class="icon" style="position: absolute; top:215px">
                        <a class="has-text-white" @click="reduceImageIndex(sliderCurrentIndex)" href="javascript:;">
                            <i class="fas fa-angle-double-left"></i>
                        </a>
                    </span>

                    <span class="icon" style="position: relative; top:215px; left:300px">


                        <a class="has-text-white" @click="increaseImageIndex(sliderCurrentIndex)" href="javascript:;">
                            <i class="fas fa-angle-double-right"></i>
                        </a>
                    </span>

                </div>
            </div>

        </div>
        <div class="container inner">
            <div class="columns three-layout">
                <div class="column">
                    <div class="custom-container">
                        <p>Name</p>
                        <p>{{ contents?.business_name }}</p>
                    </div>
                    <div class="custom-container">
                        <p>Address</p>
                        <p>{{ contents?.business_address }}</p>
                    </div>
                </div>
                <div class="column">
                    <div class="custom-container">
                        <p>City</p>
                        <p>{{ contents?.business_city }}, {{ contents?.business_state }}</p>
                    </div>
                    <div class="custom-container">
                        <p>Category</p>
                        <p>{{ contents?.business_category }}</p>
                    </div>
                </div>
                <div class="column">
                    <div class="custom-container">
                        <p>Contact</p>
                        <p>{{ contents?.business_phone }}</p>
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

    </template>
</template>