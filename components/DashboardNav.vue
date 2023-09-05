<script setup>
const { setAuth, auth, module, setModule, setAction, setEdit, setDynamicTitle } = useCommon()

const logout = async () => {
    setAuth('{}')
    localStorage.removeItem('auth')
    window.location.href = '/login'
}

const setModuleAndAction = (mod, act, edit) => {
    setModule(mod)
    setAction(act)
    setEdit(edit)
}

const menuToggle = () => {
    // Get the element by its ID
    const leftAside = document.getElementById("111");
    leftAside.hide()
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

            <div class="navbar-item" @click="menuToggle">
                <div class="buttons">
                    <a href="javascript:;" class="button is-light">
                        <i class="fa-solid fa-bars fa-fade"></i>
                    </a>
                </div>
            </div>

            <!-- <div class="navbar-item">
                <div class="buttons">
                    <div class="block">
                        <span class="tag is-primary is-medium ml-1">
                            You are logged in as  {{ auth.role }} 
                        </span>
                    </div>
                </div>
            </div> -->

            <div class="navbar-menu" id="navbarMenu">
                <div class="navbar-end">

                    <div class="navbar-item">
                        <div class="buttons">
                            <div class="block">
                                <span class="tag is-primary is-medium ml-1">
                                    Welcome {{ auth?.name }} on Creative Dashboard,   You are logged in as  {{ auth?.role }} 
                                </span>
                            </div>
                        </div>
                    </div>
                   

                    <div class="navbar-item">
                        <div class="buttons">
                            <nuxt-link to="javascript:;" class="button is-light" @click="setModuleAndAction('dashboard', 'grid', fase), setDynamicTitle('Dashboard')" :class="module == 'dashboard' && !edit ? 'is-active' : ''">Dashboard</nuxt-link>
                        </div>
                    </div>


                    <div class="navbar-item">
                        <div class="buttons">
                            <nuxt-link to="javascript:;" class="button is-light" @click="setModuleAndAction('profile', 'add-edit', true), setDynamicTitle('Profile Page')" :class="module == 'profile' && edit ? 'is-active' : ''">Profile</nuxt-link>
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