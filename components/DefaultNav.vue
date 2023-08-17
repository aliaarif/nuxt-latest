
<script setup>
const { auth, city } = useCommon()


const logout = async () => {
    setAuth('{}')
    localStorage.removeItem('auth')
    window.location.href = '/login'
}
</script>
<template>
    <section>
        <nav class="navbar">


            <div class="navbar-brand">

                <nuxt-link to="/mobile/menu" role="button" class="navbar-burger burger" aria-label="menu"
                    aria-expanded="false" data-target="navbarMenu" style="position:relative; right:170px;">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </nuxt-link>



                <nuxt-link to="/" class="navbar-item">
                    <img src="https://www.licious.in/image/rebranding/svg/licious-logo.svg" alt="Logo" width="112"
                        height="28">
                </nuxt-link>





                <nuxt-link to="/mobile/search" aria-label="menu" aria-expanded="false"
                    class="navbar-item is-hidden-desktop is-hidden-tablet">

                    <span>{{ city }}</span>
                    <span class="icon">
                        <i class="fa fa-map-marker" aria-hidden="true"></i>
                    </span>
                </nuxt-link>
            </div>
            <div class="navbar-menu" id="navbarMenu">
                <div class="navbar-end">
                    <button v-if="$route.name != 'index'" class="mt-2   navbar-item button is-black mr-1"
                        @click="$router.go(-1)">Back</button>

                    <div class="mt-1 navbar-item has-dropdown is-hoverable is-hidden-touch">
                        <Search />
                    </div>

                    <div class="navbar-item" v-if="!auth">
                        <div class="buttons">
                            <nuxt-link to="/login" class="button is-light">Login</nuxt-link>
                            <nuxt-link to="/register" class="button is-primary">Register</nuxt-link>
                        </div>
                    </div>

                    <div class="navbar-menu" id="navbarMenu" v-else>
                        <div class="navbar-end">
                            <!-- <a href="/" class="navbar-item">Home</a> -->
                            <nuxt-link to="/dashboard" class="navbar-item">Dashboard</nuxt-link>
                            <div class="navbar-item">
                                <div class="buttons">
                                    <nuxt-link to="dashboard/profile" class="button is-light">Profile</nuxt-link>
                                </div>
                            </div>

                            <div class="navbar-item">
                                <div class="buttons">
                                    <a href="javascript:;" @click="logout" class="button is-light">Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </section>
</template>