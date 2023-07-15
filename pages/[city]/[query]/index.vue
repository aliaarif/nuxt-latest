<script setup>
const { city, slug, title, setCity } = useCommon()
const router = useRouter()
const data = router.currentRoute.value.params.query
const id = router.currentRoute.value.params.id
// const data2 = data.includes('-in-') ? data.split('-in-') : data
const bflag = ref(false)
const dflag = ref(false)

const pageTitle = ref('')
const metaContent = ref('')


if (!bflag && !dflag) {
    pageTitle.value = 'Obelcon  | Subcategories'
    metaContent.value = 'Obelcon Subcategories Page'
} else {
    pageTitle.value = 'Obelcon  | Subcategories'
    metaContent.value = 'Obelcon Subcategories Page'
}

const { data: query } = await useAsyncData('query',
    () => {
        return $fetch(`/api/query?query1=${title(data)}`, {
            method: 'get'
        })
    },
)

if (data.includes('-in-') && !id) {
    pageTitle.value = 'Obelcon  | Businesses List'
    metaContent.value = 'Obelcon Businesses List Page'

    const query2 = data.split('-in-')[0]
    const query3 = data.split('-in-')[1]
    bflag.value = true
    const { data: query } = await useAsyncData('query',
        () => {
            return $fetch(`/api/query?query2=${title(query2)}&query3=${title(query3)}`, {
                method: 'get'
            })
        },
    )
}



if (query.value.length == 0) {
    console.log(data);
    dflag.value = true

    const { data: query } = await useAsyncData('query',
        () => {
            return $fetch(`/api/query?query4=${data}`, {
                method: 'get'
            })
        },
    )


    pageTitle.value = 'Obelcon  | Business Detail'
    metaContent.value = 'Obelcon Business Detail Page'
}


useHead({
    title: pageTitle,
    meta: [
        { name: 'description', content: metaContent }
    ]
})
</script>

<template>
    <section>
        <h3 class="title"> {{ title(data) }}</h3>



        <template v-if="!bflag">
            <!-- <div class="columns is-multiline is-mobile is-variable is-2-tablet">
                <div class="column is-6-mobile is-4-tablet is-4-desktop is-3-widescreen" v-for="s in query" :key="s._id">
                    <nuxt-link :to="`/${slug(city)}/${slug(s.name)}-in-${slug(city)}`" class="grid-item box">
                        <img src="https://www.svgrepo.com/show/501814/microphone1-broadcasting.svg"
                            style="width: 100px; height: 100px;" alt="Your Image">
                        <p><b>{{ s.name }}</b></p>
                    </nuxt-link>
                </div>
            </div> -->


            <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
                <div class=" column is-6-mobile is-4-tablet is-4-desktop is-3-widescreen" v-for="s in query" :key="s._id">
                    <nuxt-link :to="`/${slug(city)}/${slug(s.name)}-in-${slug(city)}`" class="grid-item box">
                        <p><b>{{ s.name }}</b></p>
                    </nuxt-link>
                </div>

            </div>
        </template>

        <template v-else-if="bflag && data.includes('-in-') && !id">

            <div class="blog-section mt-6 mb-6">

                <div class="blog-content">
                    <nuxt-link class="media" v-for="b in query" :to="`/${slug(city)}/${slug(b.name)}`">
                        <div class="media-left">
                            <figure class="image custom-image">
                                <img src="https://demo.themesberg.com/spaces/assets/img/meeting-office.jpg"
                                    alt="Blog Image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <h1 class="title is-4">{{ b.name }}</h1>
                            <p>.</p>
                        </div>
                    </nuxt-link>
                </div>

                <aside class="sidebar">
                    <h2 class="title is-5">Sidebar</h2>
                    <p>.</p>
                    <p>.</p>
                    <p>.</p>
                </aside>
            </div>
        </template>
        <template v-if="dflag">


            <div class="columns mt-4">
                <div class="column">
                    <div class="image-section">
                        <img src="https://lh5.googleusercontent.com/p/AF1QipOCtHjM9wTkQlFpC9_RudZm00a4PWGNmCNY8UrM=w548-h318-n-k-no"
                            alt="Image">
                    </div>
                </div>
                <div class="column">
                    <div class="content-section">
                        <p>Content 1</p>
                        <p>Content 2</p>
                    </div>
                </div>
                <div class="column">
                    <div class="content-section">
                        <p>Content 3</p>
                        <p>Content 4</p>
                    </div>
                </div>
            </div>

            <br>
            <br>
            <div class="container inner">
                <div class="columns three-layout">
                    <div class="column">
                        <div class="custom-container">
                            <p>Name</p>
                            <p>Hello</p>
                        </div>
                        <div class="custom-container">
                            <p>Address</p>
                            <p>Plot</p>
                        </div>
                    </div>
                    <div class="column">
                        <div class="custom-container">
                            <p>City</p>
                            <p>Google</p>
                        </div>
                        <div class="custom-container">
                            <p>Category</p>
                            <p>Hotel</p>
                        </div>
                    </div>
                    <div class="column">
                        <div class="custom-container">
                            <p>Contact</p>
                            <p>8000</p>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <br>
            <div class="inner">
                <h4 class="title"> About</h4>
                <p>Creating an undisputed space for small and medium enterprises (SMEs) online, Justdial is India’s
                    leading online B2B market place, seamlessly connecting buyers to dealers and suppliers. Simplifying
                    the entire process of business, Justdial presents SMEs, large enterprises as well as individuals an
                    unparalleled platform to showcase their products and services.</p>
                <p>In today’s digital day and age, Justdial enables businesses with B2B marketing, B2B lead generation,
                    promoting and selling B2B products and services and thereby reaching larger audiences. Among the
                    most crucial B2B marketing strategies today is to go digital and that’s exactly what the company
                    does. Be it for manufacturers, dealers, suppliers, vendors, wholesalers, etc. the processes are
                    convenient and beneficial for one and all in the B2B market space.</p>
                <br>
                <h4 class="title">Test</h4>
                <p>Creating an undisputed space for small and medium enterprises (SMEs) online, Justdial is India’s
                    leading online B2B market place, seamlessly connecting buyers to dealers and suppliers. Simplifying
                    the entire process of business, Justdial presents SMEs, large enterprises as well as individuals an
                    unparalleled platform to showcase their products and services.</p>
                <p>In today’s digital day and age, Justdial enables businesses with B2B marketing, B2B lead generation,
                    promoting and selling B2B products and services and thereby reaching larger audiences. Among the
                    most crucial B2B marketing strategies today is to go digital and that’s exactly what the company
                    does. Be it for manufacturers, dealers, suppliers, vendors, wholesalers, etc. the processes are
                    convenient and beneficial for one and all in the B2B market space.</p>
            </div>
            <br>
            <br>
            <div class="inner mt-4 mb-6">
                <h4 class="title"> FAQs</h4>
                <p>Creating an undisputed space for small and medium enterprises (SMEs) online, Justdial is India’s
                    leading online B2B market place, seamlessly connecting buyers to dealers and suppliers. Simplifying
                    the entire process of business, Justdial presents SMEs, large enterprises as well as individuals an
                    unparalleled platform to showcase their products and services.</p>
                <p>In today’s digital day and age, Justdial enables businesses with B2B marketing, B2B lead generation,
                    promoting and selling B2B products and services and thereby reaching larger audiences. Among the
                    most crucial B2B marketing strategies today is to go digital and that’s exactly what the company
                    does. Be it for manufacturers, dealers, suppliers, vendors, wholesalers, etc. the processes are
                    convenient and beneficial for one and all in the B2B market space.</p>
                <br>
            </div>

        </template>







    </section>
</template>