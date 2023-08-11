<script setup>
const { title, module, auth, setAuth, setModule, setAction, setEdit, dynamicTitle, setDynamicTitle, setItem } = useCommon()
definePageMeta({
    // layout: 'auth',
    // pageTransition: {
    //     name: "rotate",
    // },
})
useHead({
    title: `Obelcon | Register Panel`,
    meta: [
        { name: 'description', content: 'Obelcon Login Page' }
    ]
})

onMounted(() => {
    if (localStorage.auth) {
        navigateTo('/dashboard')
    }
})

const registerFormData = ref({
    name: '',
    username: '',
    password: ''
})

const message = ref('')

const register = async () => {

    useFetch('/api/register', {
        method: 'post',
        body: registerFormData
    }).then((res) => {

        if (res.data.value !== '') {
            setAuth(res.data.value)
            console.log(res.data.value)
            localStorage.auth = JSON.stringify(auth.value)
            navigateTo('/dashboard')
        } else {
            message.value = 'Invalid Login Credentials'
        }


    })
}
</script>

<template>
    <section class="hero ">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-5-widescreen">
                        <h1 class="is-size-3">Register Panel</h1>
                        <form class="box" @submit.prevent="register">
                            <div class="field">
                                <label for="" class="label">Name</label>
                                <div class="control has-icons-left">
                                    <input type="text" placeholder="Full Name" class="input" v-model="registerFormData.name"
                                        required>
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label for="" class="label">Username</label>
                                <div class="control has-icons-left">
                                    <input type="text" placeholder="e.g. bobsmith@gmail.com" class="input"
                                        v-model="registerFormData.username" required>
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label for="" class="label">Password</label>
                                <div class="control has-icons-left">
                                    <input type="password" placeholder="*******" class="input"
                                        v-model="registerFormData.password" required>
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-lock"></i>
                                    </span>
                                </div>
                            </div>

                            <div class="field">
                                <button type="submit" class="button is-success">
                                    Register
                                </button>
                                {{ message }}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
