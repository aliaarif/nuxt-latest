
<script setup>

</script>
<template>
    <section>
        <nav class="navbar">
            <div class="navbar-brand">
                <nuxt-link to="/" class="navbar-item">
                    <img src="https://www.licious.in/image/rebranding/svg/licious-logo.svg" alt="Logo" width="112"
                        height="28">
                </nuxt-link>



                <nuxt-link to="/mobile/menu" role="button" class="navbar-burger burger" aria-label="menu"
                    aria-expanded="false" data-target="navbarMenu">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </nuxt-link>

                <nuxt-link to="/mobile/search" aria-label="menu" aria-expanded="false"
                    class="navbar-item is-hidden-desktop is-hidden-tablet">
                    <span class="icon">
                        <i class="fas fa-search"></i>
                    </span>
                </nuxt-link>
            </div>
            <div class="navbar-menu" id="navbarMenu">
                <div class="navbar-end">
                    <button v-if="$route.name != 'index'" class="mt-2   navbar-item button is-black mr-1"
                        @click="$router.go(-1)">Back</button>

                    <a href="/" class="navbar-item">Home</a>
                    <nuxt-link to="/dashboard" class="navbar-item">Dashboard</nuxt-link>
                    <nuxt-link to="/about" class="navbar-item">About</nuxt-link>
                    <nuxt-link to="/contact" class="navbar-item">Contact</nuxt-link>


                    <div class="mt-1 navbar-item has-dropdown is-hoverable is-hidden-touch">
                        <Search />
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
    </section>
</template>