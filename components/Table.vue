<script setup>
const { title, module, td, edit, setTd, rows, search, setSearch, setAction, setEdit, setItem } = useCommon()
const props = defineProps({
    // module: String,
    // td: Array
    // rows: Object
})



const searchTerm = () => {
    if (search.value.length) {
        rows.value = rows.value.filter(filterSearch)
    }
    else {
        rows.value = rows.value
    }
}



const filterSearch = (item) => {
    return item._id.startsWith(search.value);
}


const changeStatus = (status) => {
    const el = document.body;

    if (status == 'Active') {
        alert(status)
        el.classList.remove('is-success');
        el.classList.add('is-danger');
    }

}

const changeFormValues = (item) => {
    setItem(item)
    setAction('add-edit')
    setEdit(true)
}

</script>

<template>
    <div class="field has-addons">
        <p class="control">
            <span class="select">
                <select>
                    <option>Show 10 entries</option>
                    <option>Show 20 entries</option>
                    <option>Show 50 entries</option>
                </select>
            </span>
        </p>
        <p class="control is-expanded">
            <input type="text" placeholder="Search" class="input" v-model="search" @input="searchTerm">
        </p>
    </div>
    <div class="table-container">
        <table class="table is-bordered is-striped is-hoverable is-fullwidth">
            <thead>
                <th v-for="item in td" :key="item">
                    {{ title(item) }}
                </th>
            </thead>
            <tbody>
                <tr v-for=" item1 in    rows   " :key="item1._id">
                    <td v-for="item2 in    td   " :key="item2">


                        <div v-if="module == 'businesses'">
                            <span v-if="item2 == 'id'">{{ item1._id.substr(16) }}</span>
                            {{ item2 == 'business_name' ? item1.business_name : '' }}
                            {{ item2 == 'business_category' ? item1.business_category : '' }}
                            {{ item2 == 'business_city' ? item1.business_city : '' }}
                            {{ item2 == 'created_by' ? item1.created_by : '' }}

                        </div>


                        <div v-if="module == 'users'">
                            {{ item2 == 'role' ? item1.role : '' }}
                            {{ item2 == 'name' ? item1.name : '' }}
                            {{ item2 == 'email' ? item1.email : '' }}
                            {{ item2 == 'city' ? item1.city : '' }}
                        </div>


                        <div v-if="module == 'categories'">
                            {{ item2 == 'name' ? item1.name : '' }}
                        </div>

                        <div v-if="module == 'subcategories'">
                            {{ item2 == 'name' ? item1.name : '' }}
                            {{ item2 == 'category' ? item1.category : '' }}
                        </div>

                        <div v-if="module == 'cities'">
                            {{ item2 == 'name' ? item1.name : '' }}
                            {{ item2 == 'state' ? item1.state : '' }}
                        </div>

                        <div v-if="module == 'states'">
                            {{ item2 == 'name' ? item1.name : '' }}
                        </div>


                        <a :id="item1._id" @click="changeStatus(item1.status)"
                            v-if="item2 == 'status' && item1.status == 'Active'"
                            :class="item1.status == 'Active' ? 'is-success' : 'is-danger'">
                            {{ title(item1.status) }}
                        </a>
                        <button class=" button is-small" v-if="item2 == 'action'" @click="changeFormValues(item1)">
                            <span class=" icon is-small">
                                <i class="fas fa-edit"></i>
                            </span>
                        </button>


                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
