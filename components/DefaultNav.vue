
<script setup>

const { data: cities } = await useAsyncData('cities',
    () => {
        return $fetch(`/api/cities`, {
            method: 'get'
        })
    },

)

const router = useRouter()

const city = ref('')
const category = ref('')
const cityDropBox = ref(false)
const filteredCities = ref([])

const slugify = (str) => {
    return str ? str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') : '';
}

const title = (str) => {
    var words = str ? str.split('-') : '';
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
    return words ? words.join(' ') : '';
}

onMounted(() => {
    if (window !== 'undefined') {
        category.value = !localStorage.category ? localStorage.setItem('category', 'hire-on') : slugify(localStorage.category)
        city.value = !localStorage.city ? localStorage.setItem('city', 'new-delhi') : title(localStorage.city)
    }
})


const logout = () => {
    localStorage.auth = false
    auth.value.isAuthenticated = false
}

const filterCities = () => {
    if (city.value.length > 1) {
        cityDropBox.value = true;
        filteredCities.value = cities.value.filter(filterCities2)
    }
}

const filterCities2 = (item) => {
    return slugify(item.name).startsWith(slugify(city.value));
}


const setcity = (newCity) => {
    category.value = ref(category);
    cityDropBox.value = false;
    city.value = newCity;
    if (typeof window !== 'undefined') {
        city.value = newCity
        localStorage.city = slugify(newCity)
        if (useRoute().params.city) {
            const city = newCity
            if (useRoute().params.query.includes('-in-')) {
                const q = useRoute().params.query
                const query = q.split('-in-')[0] + '-in-' + newCity
                localStorage.category = category
                useRouter().push('/' + slugify(city) + '/' + slugify(query))
            } else {
                useRouter().push('/')
            }

        } else {
            // useRouter().push('/')
            window.location.href = '/'
        }

    }

}
</script>
<template>
    <section>
        <nav class="navbar">
            <div class="navbar-brand">
                <nuxt-link to="/" class="navbar-item">
                    <img src="https://www.licious.in/image/rebranding/svg/licious-logo.svg" alt="Logo" width="112"
                        height="28">
                </nuxt-link>
                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
                    data-target="navbarMenu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div class="navbar-menu" id="navbarMenu">
                <div class="navbar-end">
                    <button v-if="$route.name != 'index'" class="mt-2   navbar-item button is-black mr-1"
                        @click="$router.go(-1)">Back</button>

                    <a href="/" class="navbar-item">Home</a>
                    <nuxt-link to="/about" class="navbar-item">About</nuxt-link>
                    <nuxt-link to="/contact" class="navbar-item">Contact</nuxt-link>


                    <div class="mt-1 navbar-item has-dropdown is-hoverable is-hidden-touch">
                        <div class="field">
                            <p class="control">
                                <input v-model="city" class="input is-primary mt-1 mr-2" type="text"
                                    placeholder="Select Location" autocomplete="off" @input="filterCities" />
                            </p>
                            <div v-if="filteredCities && cityDropBox" class="navbar-dropdown">

                                <a v-for="item in filteredCities" :key="item._id" class="navbar-item mr-2"
                                    @click="setcity(item.name)">
                                    {{ item.name }}
                                </a>
                            </div>
                        </div>



                    </div>

                    <div class="navbar-item">
                        <div class="buttons">
                            <nuxt-link to="/login" class="button is-light">Login</nuxt-link>
                            <nuxt-link to="/register" class="button is-primary">Register</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div class="navbar-item is-hidden-desktop is-hidden-tablet">
            <div class="field">
                <p class="control">
                    <input class="input" type="text" placeholder="Select Location">
                </p>
            </div>
        </div>
    </section>
</template>