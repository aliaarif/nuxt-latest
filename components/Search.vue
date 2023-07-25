
<script setup>
const { city, setCity } = useCommon()
const { data: cities } = await useAsyncData('cities',
    () => {
        return $fetch(`/api/cities`, {
            method: 'get'
        })
    },

)

const router = useRouter()

// const city = ref('')
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
    setCity(newCity)
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
    <div class="field">
        <p class="control">
            <input v-model="city" class="input is-primary mt-1 mr-2" type="text" placeholder="Select Location"
                autocomplete="off" @input="filterCities" />
        </p>
        <div v-if="filteredCities && cityDropBox" class="navbar-dropdown">

            <a v-for="item in filteredCities" :key="item._id" class="navbar-item mr-2" @click="setcity(item.name)">
                {{ item.name }}
            </a>
        </div>
    </div>
</template>