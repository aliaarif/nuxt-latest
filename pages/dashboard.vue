<script setup>
const { dynamicTitle, auth, setAuth } = useCommon()
definePageMeta({
    layout: 'dashboard'
})

useHead({
    title: `Obelcon | Dashboard`,
    meta: [
        { name: 'description', content: 'Obelcon Dashboard Page' }
    ]
})

onMounted(() => {
    setAuth(JSON.parse(localStorage.auth ?? {}))
})



</script>

<template>
    <section>
        <div class="columns mt-4">
            <div class="column is-one-fifth" id="111">
                <AdminAside v-if="auth?.role === 'Admin'" />
                <StaffQcAside v-if="auth?.role === 'Staff' || auth?.role === 'QC'" />
            </div>
            <div class=" column is-four-fifths" id="222">
                <h1>{{ dynamicTitle }}</h1>
                {{ auth?.role }}
                <Default />
            </div>
        </div>
    </section>
</template>

<style scoped></style>