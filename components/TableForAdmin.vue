<script setup>

const { searchTerms, title, module, dynamicTitle, setDynamicTitle,  edit, setModule, setAction, setEdit, td, rows, search, setItem, pageNo, setPageNo, setPageLimit, pageLimit, showDateTime } = useCommon()
const filterSearch = () => {

    $fetch(`/api/modules?name=${module.value}&pageLimit=${pageLimit.value}&searchTerms=${searchTerms.value}`, {
        method: 'get'
    }).then((res) => {
        rows.value = res
    })

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
    const { data:res } =  useFetch(`/api/count?mod=${mod}&countTerm=${countTerm}`, {
        method: 'get'
    })
    return res.value
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

    <section>
    
        <div class="field has-addons">
            <p class="control">
                <span class="select">
                    <select @change="changePageLimit">
                        <option value="50">Show 50 </option>
                        <option value="200">Show 200 </option>
                        <option value="1000">Show 1000 </option>
                        <option value="5000">Show 5000 </option>
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
                                {{ item2 == 'Name' ? item1.business_name : '' }}
                                {{ item2 == 'Category' ? item1.business_category : '' }}
                                {{ item2 == 'City' ? item1.business_city : '' }}
                                {{ item2 == 'Content By' ? item1.updated_by : '' }}
                                {{ item2 == 'Approved By' ? item1.approved_by : '' }}
                                <span v-if="item2 == 'Date'">
                                    <div class="block">
                                        <span class="tag is-primary is-small ml-1">
                                            {{ showDateTime(item1.createdAt) }} 
                                        </span>
                                        <br>
                                        <span class="tag is-danger is-small ml-1">
                                            {{ showDateTime(item1.updatedAt) }} 
                                        </span>
                                    </div>
                                </span>
                            </div>

                            <div v-if="module == 'users'">
                                {{ item2 == 'Name' ? item1.name : '' }}
                                {{ item2 == 'Email' ? item1.email : '' }}
                                {{ item2 == 'Role' ? item1.role : '' }}
                                {{ item2 == 'City' ? item1.city : '' }}
                            </div>

                            <div v-if="module == 'scripts'">
                                {{ item2 == 'Name' ? item1.name : '' }}
                                {{ item2 == 'Type' ? item1.type : '' }}
                                {{ item2 == 'Positions' ? item1.positions : '' }}
                                {{ item2 == 'Body' ? item1.body : '' }}
                            </div>

                            <div v-if="module == 'leads'">
                                {{ item2 == 'City' ? item1.city : '' }}
                                {{ item2 == 'Category' ? item1.subcategory : '' }}
                                {{ item2 == 'Query' ? item1.query : '' }}
                                {{ item2 == 'Name' ? item1.name : '' }}
                                {{ item2 == 'Email' ? item1.email : '' }}
                                {{ item2 == 'Phone' ? item1.phone : '' }}
                                <span v-if="item2 == 'Date'">
                                    <div class="block">
                                        <span class="tag is-primary is-small ml-1">
                                            {{ showDateTime(item1.createdAt) }} 
                                        </span>
                                        <br>
                                        <span class="tag is-danger is-small ml-1">
                                            {{ showDateTime(item1.updatedAt) }} 
                                        </span>
                                    </div>
                                </span>
                            </div>

                            <div v-if="module == 'contacts'">
                                {{ item2 == 'Name' ? item1.name : '' }}
                                {{ item2 == 'Email' ? item1.email : '' }}
                                {{ item2 == 'Phone' ? item1.phone : '' }}
                                {{ item2 == 'Subject' ? item1.subject : '' }}
                                {{ item2 == 'Message' ? item1.message : '' }}
                                <span v-if="item2 == 'Date'">
                                    <div class="block">
                                        <span class="tag is-primary is-small ml-1">
                                            {{ showDateTime(item1.createdAt) }} 
                                        </span>
                                        <br>
                                        <span class="tag is-danger is-small ml-1">
                                            {{ showDateTime(item1.updatedAt) }} 
                                        </span>
                                    </div>
                                </span>
                            </div>

                            <div v-if="module == 'subcategories'">
                                {{ item2 == 'Category' ? item1.category : '' }}
                                {{ item2 == 'Subcategory' ? item1.name : '' }}
                                {{ item2 == 'Businesses' ? loadCount('BusinessModel', item1.name) : '' }}
                            </div>

                            <div v-if="module == 'states'">
                                {{ item2 == 'Name' ? item1.name : '' }}
                                {{ item2 == 'Cities' ? loadCount('CityModel', item1.name) : '' }}
                            </div>

                            <span v-if="item2 == 'Status'" :id="item1._id" @click="changeStatus(item1.status)">
                                <div class="block">
                                    <span class="tag is-primary is-small ml-1">
                                        {{ item1.status }} 
                                    </span>
                                </div>
                            </span>
                            <button class=" button is-small" v-if="item2 == 'Action'" @click="changeFormValues(item1), setDynamicTitle('Edit ' + title(module))">
                                <span class=" icon is-small">
                                    <i class="fas fa-edit"></i>
                                </span>
                            </button>

                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <nav class="pagination is-small" role="navigation" aria-label="pagination" v-if="rows.length > 50">
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
    </section>
</template>
