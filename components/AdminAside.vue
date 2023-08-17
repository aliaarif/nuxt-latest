<script setup>
const { title, setModule, setAction, setEdit, setDynamicTitle, setItem, module, edit } = useCommon()
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
    <aside class="menu" id="menu">
        <ul class="menu-list">
            <li>
                <a @click="setModuleAndAction('dashboard', 'grid', false)"
                    :class="module == 'dashboard' && !edit ? 'is-active' : ''"><i class="fa fa-home" aria-hidden="true"></i>
                    Dashboard</a>
            </li>
            <li>
                <a @click="setModuleAndAction('states', 'list', false)"><i class="fa-solid fa-city"></i>
                    States</a>
                <ul>
                    <li><a @click="setModuleAndAction('states', 'list', false)"
                            :class="module == 'states' && !edit ? 'is-active' : ''">List</a></li>
                    <li><a @click="setModuleAndAction('states', 'add-edit', true)"
                            :class="module == 'states' && edit ? 'is-active' : ''">Add</a></li>
                </ul>
            </li>
            <li>
                <a @click="setModuleAndAction('subcategories', 'list', false)"><i class="fa fa-list-alt"
                        aria-hidden="true"></i> Subcategories</a>
                <ul>
                    <li><a @click="setModuleAndAction('subcategories', 'list', false)"
                            :class="module == 'subcategories' && !edit ? 'is-active' : ''">List</a></li>
                    <li><a @click="setModuleAndAction('subcategories', 'add-edit', true)"
                            :class="module == 'subcategories' && edit ? 'is-active' : ''">Add</a></li>
                </ul>
            </li>
            <li>
                <a @click="setModuleAndAction('businesses', 'list', false)">
                    <i class="fa-solid fa-briefcase"></i>
                    Businesses</a>
                <ul>
                    <li><a @click="setModuleAndAction('businesses', 'list', false)"
                            :class="module == 'businesses' && !edit ? 'is-active' : ''">List</a></li>
                    <li><a @click="setModuleAndAction('businesses', 'add-edit', true)"
                            :class="module == 'businesses' && edit ? 'is-active' : ''">Add</a></li>
                </ul>
            </li>

            <li>
                <a @click="setModuleAndAction('users', 'list', false)">
                    <i class="fa fa-user" aria-hidden="true"></i>
                    Users</a>
                <ul>
                    <li><a @click="setModuleAndAction('users', 'list', false)"
                            :class="module == 'users' && !edit ? 'is-active' : ''">List</a></li>
                    <li><a @click="setModuleAndAction('users', 'add-edit', true)"
                            :class="module == 'users' && edit ? 'is-active' : ''">Add</a></li>
                </ul>
            </li>
            <li>
                <a @click="setModuleAndAction('leads', 'list', false)">
                    <i class="fa-solid fa-comments-dollar"></i> Leads</a>
                <ul>
                    <li><a @click="setModuleAndAction('leads', 'list', false)"
                            :class="module == 'leads' && !edit ? 'is-active' : ''">All</a></li>

                </ul>
            </li>
            <li>
                <a @click="setModuleAndAction('contacts', 'list', false)"
                    :class="module == 'contacts' && !edit ? 'is-active' : ''">
                    <i class="fa fa-phone" aria-hidden="true"></i> Contacts</a>
            </li>
            <li>
                <a @click="setModuleAndAction('script', 'list', false)">
                    <i class="fa fa-code" aria-hidden="true"></i> Script</a>
                <ul>
                    <li><a @click="setModuleAndAction('script', 'add-edit', false)"
                            :class="module == 'script' && !edit ? 'is-active' : ''">List</a></li>
                    <li><a @click="setModuleAndAction('script', 'add-edit', true)"
                            :class="module == 'script' && edit ? 'is-active' : ''">Add</a></li>
                </ul>
            </li>
        </ul>
    </aside>
</template>

