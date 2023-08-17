<script setup>

const { searchTerms, title, module, setModule, td, rows, search, setAction, setEdit, setItem, pageNo, setPageNo, setPageLimit, pageLimit } = useCommon()
const filterSearch = () => {

    // $fetch(`/api/modules?name=${module.value}&pageLimit=${pageLimit.value}&searchTerms=${searchTerms.value}`, {
    //     method: 'get'
    // }).then((res) => {
    //     rows.value = res
    // })

    if (searchTerms.value.length > 1) {
        rows.value = rows.value.filter(searchFunction)
        setModule(module.value)
    }
    else {
        rows.value = rows.value
    }
}
const searchFunction = (item) => {
    return item.category.startsWith(searchTerms.value);
}
const changeStatus = (status) => {
    const el = document.body;
    if (status == 'Active') {
        el.classList.remove('is-success');
        el.classList.add('is-danger');
    }
}
const changeFormValues = (item) => {
    setItem(item)
    setAction('add-edit')
    setEdit(true)
}
const loadCount = (mod, countTerm) => {
    return 0
}

const pagePlus = () => {
    setPageNo(pageNo + 1)
}

const pageMinus = () => {
    setPageNo(pageNo - 1)
}

const changePageLimit = (event) => {
    setPageLimit(event.target.value)
    setModule(module.value)
}

</script>

<template>
    {{ searchTerms }}
    <div class="field has-addons">
        <p class="control">
            <span class="select">
                <select @change="changePageLimit">
                    <option value="5">Show 5 entries</option>
                    <option value="10">Show 10 entries</option>
                    <option value="20">Show 20 entries</option>
                    <option value="50">Show 50 entries</option>
                </select>
            </span>
        </p>
        <p class="control is-expanded">
            <input type="text" placeholder="Search" class="input" v-model="searchTerms" @input="filterSearch">
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
                            {{ item2 == 'content_by' ? item1.updated_by : '' }}
                        </div>

                        <div v-if="module == 'users'">
                            {{ item2 == 'role' ? item1.role : '' }}
                            {{ item2 == 'name' ? item1.name : '' }}
                            {{ item2 == 'email' ? item1.email : '' }}
                            {{ item2 == 'city' ? item1.city : '' }}
                        </div>

                        <div v-if="module == 'leads'">
                            {{ item2 == 'city' ? item1.city : '' }}
                            {{ item2 == 'category' ? item1.subcategory : '' }}
                            {{ item2 == 'query' ? item1.query : '' }}
                            {{ item2 == 'name' ? item1.name : '' }}
                            {{ item2 == 'email' ? item1.email : '' }}
                            {{ item2 == 'phone' ? item1.phone : '' }}
                            {{ item2 == 'date' ? item1.createdAt : '' }}
                        </div>

                        <div v-if="module == 'contacts'">
                            {{ item2 == 'name' ? item1.name : '' }}
                            {{ item2 == 'email' ? item1.email : '' }}
                            {{ item2 == 'phone' ? item1.phone : '' }}
                            {{ item2 == 'subject' ? item1.subject : '' }}
                            {{ item2 == 'message' ? item1.message : '' }}
                        </div>

                        <div v-if="module == 'categories'">
                            {{ item2 == 'name' ? item1.name : '' }}
                        </div>

                        <div v-if="module == 'subcategories'">
                            {{ item2 == 'category' ? item1.category : '' }}
                            {{ item2 == 'subcategory' ? item1.name : '' }}
                            {{ item2 == 'total_business' ? loadCount('BusinessModel', item1.name) : '' }}
                        </div>

                        <div v-if="module == 'cities'">
                            {{ item2 == 'name' ? item1.name : '' }}
                            {{ item2 == 'state' ? item1.state : '' }}
                        </div>

                        <div v-if="module == 'states'">
                            {{ item2 == 'name' ? item1.name : '' }}
                            {{ item2 == 'total_cities' ? loadCount('CityModel', item1.name) : '' }}
                        </div>

                        <a :id="item1._id" @click="changeStatus(item1.status)"
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
    <nav class="pagination is-small" role="navigation" aria-label="pagination">
        <a class="pagination-previous" @click="pagePlus">Previous</a>
        <a class="pagination-next" @click="pageMinus">Next page</a>
        <ul class="pagination-list">
            <li><a class="pagination-link" aria-label="Goto page 1">1</a></li>
            <li><span class="pagination-ellipsis">&hellip;</span></li>
            <li><a class="pagination-link" aria-label="Goto page 45">45</a></li>
            <li><a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a></li>
            <li><a class="pagination-link" aria-label="Goto page 47">47</a></li>
            <li><span class="pagination-ellipsis">&hellip;</span></li>
            <li><a class="pagination-link" aria-label="Goto page 86">86</a></li>
        </ul>
    </nav>
</template>
