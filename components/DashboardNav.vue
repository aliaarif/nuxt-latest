<script setup>
const { setAuth } = useCommon()
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
        </nav>
    </section>
</template>