<script setup>
import { GoogleSignInButton, CredencialResponse } from "nuxt-vue3-google-signin";
const { title, module, auth, setAuth, setModule, setAction, setEdit, dynamicTitle, setDynamicTitle, setItem } = useCommon()
definePageMeta({
    // layout: 'auth',
    // pageTransition: {
        //     name: "rotate",
        // },
    })
    useHead({
        title: `Obelcon | Login Panel`,
        meta: [
        { name: 'description', content: 'Obelcon Login Page' }
        ]
    })
    
    onMounted(() => {
        if (localStorage.auth) {
            navigateTo('/dashboard')
        }
    })
    
    const loginFormData = ref({
        username: '',
        password: ''
    })
    
    const message = ref('')
    
    const login = async () => {
        
        useFetch('/api/login', {
            method: 'post',
            body: loginFormData
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
                        <h1 class="is-size-3">Login Panel</h1>
                        <form class="box" @submit.prevent="login">
                            <div class="field">
                                <label for="" class="label">Username</label>
                                <div class="control has-icons-left">
                                    <input type="text" placeholder="e.g. bobsmith@gmail.com" class="input"
                                    v-model="loginFormData.username" required>
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label for="" class="label">Password</label>
                                <div class="control has-icons-left">
                                    <input type="password" placeholder="*******" class="input"
                                    v-model="loginFormData.password" required>
                                    <span class="icon is-small is-left">
                                        <i class="fa fa-lock"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="field">
                                <label for="" class="checkbox">
                                    <input type="checkbox">
                                    Remember me
                                </label>
                            </div>
                            <div class="field">
                                <button type="submit" class="button is-success">
                                    Login
                                </button>
                                {{ message }}
                                
                                <g-auth-button @click="login" :disabled="disabled" :is-loading="isLoading">Login with
                                    Google</g-auth-button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </template>
    