<script setup>
const { title, setModule, setAction, setEdit, setDynamicTitle, setItem } = useCommon()
const setModuleAndAction = (mod, act, edit) => {
    setModule(mod)
    setAction(act)
    setEdit(edit)

    if (act == 'add-edit' && edit) {
        setDynamicTitle('Add/Edit ' + title(mod))
    } else {
        setDynamicTitle('All ' + title(mod))
    }

    if (act == 'add-edit') {
        setItem('')
    }
}
</script>
<template>
    <aside class="menu">
        <ul class="menu-list">
            <li><a v-on:click="setModuleAndAction('dashboard', 'grid', false)" class="is-active">Dashboard</a>
            </li>
            <li>
                <a v-on:click="setModuleAndAction('states', 'list', false)">States</a>
                <ul>
                    <li><a v-on:click="setModuleAndAction('states', 'list', false)">List</a></li>
                    <li><a v-on:click="setModuleAndAction('states', 'add-edit', true)">Add</a></li>
                </ul>
            </li>
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
                <a v-on:click="setModuleAndAction('users', 'list', false)">Users</a>
                <ul>
                    <li><a v-on:click="setModuleAndAction('users', 'list', false)">List</a></li>
                    <li><a v-on:click="setModuleAndAction('users', 'add-edit', true)">Add</a></li>
                </ul>
            </li>
            <li>
                <a v-on:click="setModuleAndAction('leads', 'list', false)">Leads</a>
                <ul>
                    <li><a v-on:click="setModuleAndAction('leads', 'list', false)">All</a></li>

                </ul>
            </li>
            <li>
                <a v-on:click="setModuleAndAction('pages', 'list', false)">Pages</a>
                <ul>
                    <li><a v-on:click="setModuleAndAction('pages', 'list', false)">All</a></li>

                </ul>
                <!-- <ul>
                                <li><a v-on:click="setModuleAndAction('users', 'list', false)">Home</a></li>
                                <li><a v-on:click="setModuleAndAction('users', 'add-edit', true)">About</a></li>
                                <li><a v-on:click="setModuleAndAction('users', 'add-edit', true)">Contact</a></li>
                                <li><a v-on:click="setModuleAndAction('users', 'add-edit', true)">Terms</a></li>
                                <li><a v-on:click="setModuleAndAction('users', 'add-edit', true)">Privacy</a></li>
                            </ul> -->
            </li>
            <li>
                <a v-on:click="setModuleAndAction('script', 'list', false)">Script</a>
                <ul>
                    <li><a v-on:click="setModuleAndAction('script', 'add-edit', false)">Header</a></li>
                    <li><a v-on:click="setModuleAndAction('script', 'add-edit', true)">Advert</a></li>
                </ul>
            </li>
        </ul>
    </aside>
</template>

