<script setup>
const { title, module, setModule, setAction, setEdit, dynamicTitle, setDynamicTitle, setItem } = useCommon()
definePageMeta({
    layout: 'dashboard',
    // pageTransition: {
    //     name: "rotate",
    // },
})

useHead({
    title: `Obelcon | Dashboard`,
    meta: [
        { name: 'description', content: 'Obelcon Dashboard Page' }
    ]
})


const rows = ref({})
const setModuleAndAction = (mod, act, edit) => {
    setModule(mod)
    setAction(act)
    setEdit(edit)

    if (act == 'add-edit' && edit) {
        setDynamicTitle('Add-edit ' + title(mod))
    } else {
        setDynamicTitle('All ' + title(mod))
    }

    if (act == 'add-edit') {
        setItem('')
    }

}




</script>
<template>
    <section>




        <div class="columns mt-4">
            <div class="column is-one-fifth">
                <!-- <Aside /> -->

                <aside class="menu">


                    <ul class="menu-list">
                        <li><a v-on:click="setModuleAndAction('dashboard', 'grid', false)" class="is-active">Dashboard</a>
                        </li>
                        <!-- <li>
                            <a v-on:click="setModuleAndAction('categories', 'list', false)">Categories</a>
                            <ul>
                                <li><a v-on:click="setModuleAndAction('categories', 'list', false)">List</a></li>
                                <li><a v-on:click="setModuleAndAction('categories', 'add-edit', true)">Add</a></li>
                            </ul>
                        </li> -->
                        <li>
                            <a v-on:click="setModuleAndAction('subcategories', 'list', false)">Subcategories</a>
                            <ul>
                                <li><a v-on:click="setModuleAndAction('subcategories', 'list', false)">List</a></li>
                                <li><a v-on:click="setModuleAndAction('subcategories', 'add-edit', true)">Add</a></li>
                            </ul>
                        </li>
                        <li>
                            <a v-on:click="setModuleAndAction('businesses', 'list', false)">Businesses</a>
                            <ul>
                                <li><a v-on:click="setModuleAndAction('businesses', 'list', false)">List</a></li>
                                <li><a v-on:click="setModuleAndAction('businesses', 'add-edit', true)">Add</a></li>
                            </ul>
                        </li>
                        <li>
                            <a v-on:click="setModuleAndAction('cities', 'list', false)">Cities</a>
                            <ul>
                                <li><a v-on:click="setModuleAndAction('cities', 'list', false)">List</a></li>
                                <li><a v-on:click="setModuleAndAction('cities', 'add-edit', true)">Add</a></li>
                            </ul>
                        </li>
                        <li>
                            <a v-on:click="setModuleAndAction('states', 'list', false)">States</a>
                            <ul>
                                <li><a v-on:click="setModuleAndAction('states', 'list', false)">List</a></li>
                                <li><a v-on:click="setModuleAndAction('states', 'add-edit', true)">Add</a></li>
                            </ul>
                        </li>

                        <li>
                            <a v-on:click="setModuleAndAction('users', 'list', false)">Users</a>
                            <ul>
                                <li><a v-on:click="setModuleAndAction('users', 'list', false)">List</a></li>
                                <li><a v-on:click="setModuleAndAction('users', 'add-edit', true)">Add</a></li>
                            </ul>
                        </li>

                    </ul>


                </aside>


            </div>
            <div class="column is-four-fifths">
                <h1>{{ dynamicTitle }}</h1>
                <Default />
            </div>
        </div>

    </section>
</template>

<style scoped>
/* .rotate-entter-active,
.rotate-leave-active {
    transition: all 0.4s;
}
.rotate-entter-from,
.rotate-leave-to {
    opacity: 0;
    transform: rotate3d(1, 1, 1, 30deg);
} */
</style>