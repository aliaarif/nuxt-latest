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
                    <nuxt-link to="/dashboard" class="navbar-item">Dashboard</nuxt-link>
                    <nuxt-link to="/about" class="navbar-item">About</nuxt-link>
                    <nuxt-link to="/contact" class="navbar-item">Contact</nuxt-link>
                    <div class="navbar-item is-hidden-touch">
                        <div class="field">
                            <p class="control">
                                <input class="input" type="text" placeholder="Select Location">
                            </p>
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