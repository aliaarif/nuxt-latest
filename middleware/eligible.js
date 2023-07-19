export default defineNuxtRouteMiddleware((to, from) => {
    const { auth, eligible } = useAuth()
    if (!auth.value) {
        return navigateTo('/auth/login')
    }

    if (auth.value && !eligible.value) {
        return navigateTo('/projects/pricing')
    }

    if (auth.value && eligible.value) {
        alert("Download The File")
    }
})