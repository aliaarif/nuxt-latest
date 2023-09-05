<script setup>
const { dynamicTitle, title, setItem,  auth, setAuth, module, setDynamicTitle,  edit, setModule, setAction, setEdit, } = useCommon()
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

const adminModules = ref(['businesses', 'categories', 'subcategories', 'cities', 'states', 'scripts'])
const qcModules = ref(['QC Done', 'Approoved', 'Pending', 'Rejected'])
const staffModules = ref(['Total Posted', 'Approoved', 'Pending', 'Rejected'])

const setModuleAndAction = (mod, act, edit, ) => {
    setModule(mod)
    setAction(act)
    setEdit(edit)
}



</script>

<template>
    <section>
        <div class="columns mt-4">
            <div class="column is-one-fifth">
                <AdminAside v-if="auth?.role === 'Admin'" />
                <StaffQcAside v-if="auth?.role === 'Staff' || auth?.role === 'QC'" />
            </div>
            <div class=" column is-four-fifths">
                <div class="block">
                    <div class="tag is-primary is-medium ml-1 is-pulled-left" v-if="module != 'dashboard'">
                        {{ dynamicTitle }} 
                    </div>

                    <div class="button tag is-primary is-medium ml-1 is-pulled-right" v-if="module != 'dashboard' && module != 'contacts' && module != 'leads' && module != 'profile'" 
                        @click="setModuleAndAction(module, 'add-edit', true), setDynamicTitle('Add ' + title(module)), setItem('') ">
                        Add New
                    </div>
                </div>
                <br>
                <Default />
            </div>
        </div>
    </section>
</template>

<style scoped></style>