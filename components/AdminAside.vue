<script setup>
const { title, setModule, setAction, setEdit, setDynamicTitle, setItem, module, edit } = useCommon()
const setModuleAndAction = (mod, act, edit) => {
    setModule(mod)
    setAction(act)
    setEdit(edit)
}

</script>
<template>
    <aside class="menu" id="menu">
        <ul class="menu-list">
            <li>
                <a @click="setModuleAndAction('dashboard', 'grid', false), setDynamicTitle('All ' + title(module))" :class="module == 'dashboard' && !edit ? 'is-active' : ''">
                <i class="fa fa-home" aria-hidden="true"></i> Dashboard </a>
            </li>
            <li>
                <a @click="setModuleAndAction('states', 'list', false), setDynamicTitle('All ' + title(module))" :class="module == 'states' && !edit ? 'is-active' : ''">
                <i class="fa-solid fa-city"></i> States </a>
                <ul>
                    <li><a @click="setModuleAndAction('states', 'list', false), setDynamicTitle('All ' + title(module))" :class="module == 'states' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>
            <li>
                <a @click="setModuleAndAction('subcategories', 'list', false), setDynamicTitle('All ' + title(module))" :class="module == 'subcategories' && !edit ? 'is-active' : ''">
                <i class="fa fa-list-alt" aria-hidden="true"></i>  Subcategories </a>
                <ul>
                    <li><a @click="setModuleAndAction('subcategories', 'list', false), setDynamicTitle('All ' + title(module))" :class="module == 'subcategories' && !edit ? 'is-active' : ''"> List </a></li>
                    <li><a @click="setModuleAndAction('subcategories', 'add-edit', true), setDynamicTitle('All ' + title(module))" :class="module == 'subcategories' && !edit ? 'is-active' : ''"> Services </a></li>
                </ul>
            </li>
            <li>
                <a @click="setModuleAndAction('businesses', 'list', false), setDynamicTitle('All ' + title(module))" :class="module == 'businesses' && !edit ? 'is-active' : ''">
                <i class="fa-solid fa-briefcase"></i> Businesses </a>
                <ul>
                    <li><a @click="setModuleAndAction('businesses', 'list', false), setDynamicTitle('All ' + title(module))" :class="module == 'businesses' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>

            <li>
                <a @click="setModuleAndAction('users', 'list', false), setDynamicTitle('All ' + title(module))" :class="module == 'users' && !edit ? 'is-active' : ''">
                <i class="fa fa-user" aria-hidden="true"></i> Users </a>
                <ul>
                    <li><a @click="setModuleAndAction('users', 'list', false), setDynamicTitle('All ' + title(module))" :class="module == 'users' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>
            <li>
                <a @click="setModuleAndAction('leads', 'list', false), setDynamicTitle('All ' + title(module))" :class="module == 'leads' && !edit ? 'is-active' : ''">
                <i class="fa-solid fa-comments-dollar"></i> Leads </a>
                <ul>
                    <li><a @click="setModuleAndAction('leads', 'list', false), setDynamicTitle('All ' + title(module))" :class="module == 'leads' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>
            <li>
                <a @click="setModuleAndAction('contacts', 'list', false), setDynamicTitle('All ' + title(module))" :class="module == 'contacts' && !edit ? 'is-active' : ''">
                <i class="fa fa-phone" aria-hidden="true"></i> Contacts </a>
                <ul>
                    <li><a @click="setModuleAndAction('contacts', 'list', false), setDynamicTitle('All ' + title(module))" :class="module == 'contacts' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>
            <li>
                <a @click="setModuleAndAction('scripts', 'list', false), setDynamicTitle('All ' + title(module))" :class="module == 'scripts' && !edit ? 'is-active' : ''">
                <i class="fa fa-code" aria-hidden="true"></i> Scripts </a>
                <ul>
                    <li><a @click="setModuleAndAction('scripts', 'list', false), setDynamicTitle('All ' + title(module))" :class="module == 'scripts' && !edit ? 'is-active' : ''"> List </a></li>
                </ul>
            </li>

            <li>
                <a @click="setModuleAndAction('profile', 'add-edit', true), setDynamicTitle('Profile Page')" :class="module == 'profile' && edit ? 'is-active' : ''">
                <i class="fa fa-user" aria-hidden="true"></i> Profile </a>
            </li>
        </ul>
    </aside>
</template>

