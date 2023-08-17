<script setup>
const { title, setModule, setAction, setEdit, setDynamicTitle, setItem, auth } = useCommon()
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
                <a v-on:click="setModuleAndAction('businesses', 'list', false)">Businesses</a>
                <ul>
                    <li><a v-on:click="setModuleAndAction('businesses', 'list', false)">List</a></li>
                    <li v-if="auth.role != 'QC'"><a v-on:click="setModuleAndAction('businesses', 'add-edit', true)">Add</a>
                    </li>
                </ul>
            </li>

        </ul>
    </aside>
</template>

