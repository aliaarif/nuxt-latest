<script setup>
const { slug, title, auth, module, edit, fields, item, subcategories, setSCat } = useCommon()
const adminModules = ref(['businesses', 'categories', 'subcategories', 'cities', 'states', 'users'])
const qcModules = ref(['QC Done', 'Approoved', 'Pending', 'Rejected'])
const staffModules = ref(['Total Posted', 'Approoved', 'Pending', 'Rejected'])
const message = ref('')
const services = ref('')
const scats = subcategories.value.map(item => item.name);

const changeServicesAdd = (event) => {
    businessFormData.value.business_services = []
    $fetch(`/api/services?name=${event.target.value}`, {
        method: 'get'
    }).then((res) => {
        services.value = res
    })
}

const changeServicesSave = (event) => {
    item.value.business_services = []
    $fetch(`/api/services?name=${event.target.value}`, {
        method: 'get'
    }).then((res) => {
        services.value = res
    })
}

const changeOwnershipAdd = (event) => {
    businessFormData.value.business_ownership = event.target.value
}

const changeOwnershipSave = (event) => {
    item.value.business_ownership = event.target.value
}

const addBusinessServices1 = (service) => {
    if (!businessFormData.value.business_services.includes(service)) {
        businessFormData.value.business_services.push(service)
    }
}

const addBusinessServices2 = (service) => {
    if (!item.value.business_services.includes(service)) {
        item.value.business_services.push(service)
    }
}

const removeBusinessServices1 = (service) => {
    businessFormData.value.business_services.pop(service)
}

const removeBusinessServices2 = (service) => {
    item.value.business_services.pop(service)
}

const removeImageFromBusinessAdd = (image) => {
    businessFormData.value.business_images.pop(image)
    if (businessFormData.value.business_images.length > 0) {
        showFilesNo.value = businessFormData.value.business_images.length + ' Files Selected'
    } else {
        showFilesNo.value = ''
    }
}

const removeImageFromBusinessSave = (image) => {
    item.value.business_images.pop(image)
    if (item.value.business_images.length > 0) {
        showFilesNo.value = businessFormData.value.business_images.length + ' Files Selected'
    } else {
        showFilesNo.value = ''
    }
}

const makeSlugForSlugOnlyAdd = (event) => {
    businessFormData.value.business_slug = event.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').trim()
}


const makeSlugForSlugOnlySave = (event) => {
    item.value.business_slug = event.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').trim()
}



// console.log(filteredPeople);

const subCategoryFormData = ref({
    // module: module,
    name: '',
    category: '',
    page_title: '',
    page_content: ''
})

const addSubCategory = async () => {
    useFetch("/api/save/subcategory", {
        method: 'post',
        body: subCategoryFormData
    }).then((res) => {
        console.log(res.data.value)
        message.value = res.data.value.payload
    })
}

const editSubCategory = async () => {
    useFetch("/api/save/subcategory", {
        method: 'post',
        body: item
    }).then((res) => {
        console.log(res.data.value)
        message.value = res.data.value.payload
    })
}


const businessFormData = ref({
    business_name: '111',
    business_slug: '111',
    business_ownership: 'Unverified',
    business_category: '',
    business_services: [],
    business_timing:
    {
        monday: {
            start: "09:00",
            end: "17:00"
        },

        tuesday: {
            start: "09:00",
            end: "17:00"
        },

        wednesday: {
            start: "09:00",
            end: "17:00"
        },

        thrusday: {
            start: "09:00",
            end: "17:00"
        },

        friday: {
            start: "09:00",
            end: "17:00"
        },

        saturday: {
            start: "",
            end: ""
        },

        sunday: {
            start: "",
            end: ""
        }
    },
    business_address: 'Shree Ram PG',
    business_locality: 'Sector 15',
    business_city: '',
    business_state: 'Haryana',
    business_pin: '122001',
    business_phone: '8005794205',
    business_email: 'test@example.com',
    business_website: 'https://easetrail.com/',
    business_social: {
        facebook: 'https://easetrail.com/',
        instagram: 'https://easetrail.com/',
        youtube: 'https://easetrail.com/'
    },
    business_latitude: '37.385687356',
    business_longitude: '71.385687356',
    business_description: 'Dummy Description',
    business_faqs: [],
    business_images: [],
    status: 'Active',
    created_by: auth.value?.email,
    updated_by: auth.value?.email
})

const addBusiness = async () => {
    try {
        const res = await useFetch('/api/save/business', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: businessFormData
        });
        console.log(res.data.value)
        message.value = res.data.value.message
    } catch (error) {
        console.error('Business add failed:', error)
    }
    selectedFiles.value = []
}


const editBusiness = async () => {
    try {
        const res = await useFetch('/api/save/business', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: item
        });
        console.log(res.data.value)
    } catch (error) {
        console.error('Business save failed:', error)
    }
}

function makeSlugAdd() {
    businessFormData.value.business_slug = slug(businessFormData.value.business_name);
}

function makeSlugSave() {
    item.value.business_slug = slug(item.value.business_name);
}

const showFilesNo = ref('')

const returnVoid = () => {
    return;
}

const selectedFiles = ref([])

const onFileChangeAdd = (event) => {
    selectedFiles.value.business_images = Array.from(event.target.files)
    showFilesNo.value = selectedFiles.value.business_images.length + ' Files Selected'
    selectedFiles.value.business_images.forEach(file => {
        businessFormData.value.business_images.push(URL.createObjectURL(file))
    });
}

const onFileChangeSave = (event) => {
    selectedFiles.value.business_images = Array.from(event.target.files)
    showFilesNo.value = selectedFiles.value.business_images.length + ' Files Selected'
    selectedFiles.value.business_images.forEach(file => {
        item.value.business_images.push(URL.createObjectURL(file))
    });
}

</script>

<template>
    <template v-if="module == 'dashboard' && auth?.role === 'Admin'">
        <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
            <div class="column is-6-mobile is-4-tablet is-3-desktop is-3-widescreen" v-for="module in adminModules"
                :key="module">
                <a @click="" href="javascript:;" class="grid-item box">
                    <img src="https://www.svgrepo.com/show/501814/microphone1-broadcasting.svg"
                        style="width: 100px; height: 100px;" alt="Your Image">
                    <p><b>{{ title(module) }}</b></p>
                    <p><b>300+ </b></p>
                </a>
            </div>
        </div>
    </template>

    <template v-if="module == 'dashboard' && auth?.role === 'QC'">
        <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
            <div class="column is-6-mobile is-4-tablet is-3-desktop is-3-widescreen" v-for="module in qcModules"
                :key="module">
                <a @click="" href="javascript:;" class="grid-item box">
                    <img src="https://www.svgrepo.com/show/501814/microphone1-broadcasting.svg"
                        style="width: 100px; height: 100px;" alt="Your Image">
                    <p><b>{{ title(module) }}</b></p>
                    <p><b>300+ </b></p>
                </a>
            </div>
        </div>
    </template>

    <template v-if="module == 'dashboard' && auth?.role === 'Staff'">
        <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
            <div class="column is-6-mobile is-4-tablet is-3-desktop is-3-widescreen" v-for="module in staffModules"
                :key="module">
                <a @click="" href="javascript:;" class="grid-item box">
                    <img src="https://www.svgrepo.com/show/501814/microphone1-broadcasting.svg"
                        style="width: 100px; height: 100px;" alt="Your Image">
                    <p><b>{{ title(module) }}</b></p>
                    <p><b>300+ </b></p>
                </a>
            </div>
        </div>
    </template>

    <template v-else-if="module != 'dashboard' && edit == false">
        <div class="table-container">
            <TableForAdmin v-if="auth.role === 'Admin'" />
            <TableForStaffAndQC v-if="auth.role === 'Staff' || auth.role === 'QC'" />

        </div>
    </template>

    <template v-else>

        <section v-if="module == ' businesses'">
            <div class="columns">
                <div class="column is-half">

                    {{ item }}

                </div>
            </div>
        </section>

        <section v-if="module == 'categories'">
            <div class="columns">
                <div class="column is-half">

                    {{ item }}

                </div>
            </div>
        </section>

        <section v-if="module == 'cities'">
            <div class="columns">
                <div class="column is-half">
                    {{ item }}
                </div>
            </div>
        </section>

        <section v-if="module == 'states'">
            <div class="columns">
                <div class="column is-half">
                    {{ item }}
                </div>
            </div>
        </section>

        <section v-if="module == 'users'">
            <div class="columns">
                <div class="column is-half">
                    {{ item }}
                </div>
            </div>
        </section>

        <section v-if="module == 'subcategories' && item">
            <div class="columns">
                <div class="column is-half">
                    <form @submit.prevent="editSubCategory">

                        <div class="field">
                            <label class="label">Category Name</label>
                            <div class="control">
                                <input class="input" type="text" v-model="item.category" placeholder="Enter category">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Sub Category Name</label>
                            <div class="control">
                                <input class="input" type="text" v-model="item.name" placeholder="Enter Subcategory">
                                {{ item }}
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Page Title</label>
                            <div class="control">
                                <input class="input" type="text" v-model="item.page_title" placeholder="Enter Page Title">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Page Content</label>
                            <div class="control">
                                <input class="input" type="text" v-model="item.page_content"
                                    placeholder="Enter Page Content">
                            </div>
                        </div>
                        <button type="submit" class="button is-primary">Save</button> {{
                            message }}
                    </form>
                </div>
            </div>

        </section>

        <section v-if="module == 'subcategories' && !item">
            <div class="columns">
                <div class="column is-half">
                    <form @submit.prevent="addSubCategory">


                        <div class="field">
                            <label class="label">Category Name</label>
                            <div class="control">
                                <input class="input" type="text" v-model="subCategoryFormData.category"
                                    placeholder="Enter category">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Sub Category Name</label>
                            <div class="control">
                                <input class="input" type="text" v-model="subCategoryFormData.name" @input="returnVoid"
                                    placeholder="Enter Subcategory">
                                {{ subCategoryFormData }}
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">Page Title</label>
                            <div class="control">
                                <input class="input" type="text" v-model="subCategoryFormData.page_title"
                                    placeholder="Enter Page Title">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Page Content</label>
                            <div class="control">
                                <input class="input" type="text" v-model="subCategoryFormData.page_content"
                                    placeholder="Enter Page Content">
                            </div>
                        </div>
                        <button type="submit" class="button is-primary">Add</button>
                        {{ message }}
                    </form>
                </div>
            </div>
        </section>

        <section v-if="module == 'businesses' && item">

            <form @submit.prevent="editBusiness()">
                <div class="columns">
                    <div class="column ">

                        <div class="field">
                            <label class="label">Business Name</label>
                            <div class="control">
                                <input class="input" type="text" v-model="item.business_name" @input="makeSlugSave"
                                    placeholder="Enter Business Name">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Business Slug</label>
                            <div class="control">
                                <input class="input" type="text" v-model="item.business_slug"
                                    @input="makeSlugForSlugOnlySave" placeholder="Enter Business Slug">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">business_category</label>
                            <div class="control">
                                <select id="scat" v-model="item.business_category" @change="changeServicesSave">
                                    <option selected value="">Select a Category</option>
                                    <option v-for="scat in scats" :key="scat">{{ scat }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="field" v-if="services">
                            <label class="label">business_services</label>
                            <div class="block">
                                <span class="tag is-secondary is-medium ml-1" v-for="service in services.services"
                                    :key="service" @click="addBusinessServices2(service)">
                                    {{ service }}
                                </span>
                            </div>
                            <div class="block">
                                <span class="tag is-primary is-medium ml-1" v-for="service in item.business_services">
                                    {{ service }}
                                    <button class="delete is-medium" @click="removeBusinessServices2(service)"></button>
                                </span>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Business timing</label>
                            <div class="columns">
                                <div class="column ">
                                    <div class="control">
                                        <label class="label"> Monday</label>
                                        Start
                                        <input class="input" type="time" v-model="item.business_timing.monday.start"
                                            placeholder="Start time">
                                        <br />
                                        End
                                        <input class="input" type="time" v-model="item.business_timing.monday.end"
                                            placeholder="Start time">
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="control">
                                        <label class="label"> Tuesday</label>
                                        Start
                                        <input class="input" type="time" v-model="item.business_timing.tuesday.start"
                                            placeholder="Start time">
                                        <br />
                                        End
                                        <input class="input" type="time" v-model="item.business_timing.tuesday.end"
                                            placeholder="End time">
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="control">

                                        <label class="label"> Wednesday</label>
                                        Start
                                        <input class="input" type="time" v-model="item.business_timing.wednesday.start"
                                            placeholder="Start time">
                                        <br />
                                        End
                                        <input class="input" type="time" v-model="item.business_timing.wednesday.end"
                                            placeholder="End time">
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="control">

                                        <label class="label"> Thrusday</label>
                                        Start
                                        <input class="input" type="time" v-model="item.business_timing.thrusday.start"
                                            placeholder="Start time">
                                        <br />
                                        End
                                        <input class="input" type="time" v-model="item.business_timing.thrusday.end"
                                            placeholder="End time">
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="control">

                                        <label class="label"> Friday</label>
                                        Start
                                        <input class="input" type="time" v-model="item.business_timing.friday.start"
                                            placeholder="Start time">
                                        <br />
                                        End
                                        <input class="input" type="time" v-model="item.business_timing.friday.end"
                                            placeholder="End time">
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="control">

                                        <label class="label"> Saturday</label>
                                        Start
                                        <input class="input" type="time" v-model="item.business_timing.saturday.start"
                                            placeholder="Start time">
                                        <br />
                                        End
                                        <input class="input" type="time" v-model="item.business_timing.saturday.end"
                                            placeholder="End time">
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="control">

                                        <label class="label"> Sunday</label>
                                        Start
                                        <input class="input" type="time" v-model="item.business_timing.sunday.start"
                                            placeholder="Start time">
                                        <br />
                                        End
                                        <input class="input" type="time" v-model="item.business_timing.sunday.end"
                                            placeholder="End time">
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Address</label>
                            <div class="columns">
                                <div class="column ">
                                    <div class="control">
                                        <label class="label">business_address</label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="item.business_address"
                                                placeholder="Enter business_address">
                                        </div>
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="control">
                                        <label class="label">business_locality</label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="item.business_locality"
                                                placeholder="Enter business_locality">
                                        </div>
                                    </div>
                                </div>

                                <div class="column ">
                                    <div class="control">
                                        <label class="label">business_city</label>
                                        <div class="control">
                                            <input class="input" type="text"
                                                :v-model="item.business_city = auth.assigned_city"
                                                placeholder="Enter business_city">
                                        </div>
                                    </div>
                                </div>


                                <div class="column ">
                                    <div class="control">
                                        <label class="label">business_state</label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="item.business_state"
                                                placeholder="Enter business_state">
                                        </div>
                                    </div>
                                </div>

                                <div class="column ">
                                    <div class="control">
                                        <label class="label">business_pin</label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="item.business_pin"
                                                placeholder="Enter business_pin">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">business_phone</label>
                            <div class="control">
                                <input class="input" type="text" maxlength="11"
                                    oninput="this.value = this.value.replace(/[^0-9]/g, '');" v-model="item.business_phone"
                                    placeholder="Enter business_phone">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">business_ownership</label>
                            <div class="control">
                                <label class="radio">
                                    <input type="radio" value="Verifiefd" v-model="item.business_ownership"
                                        @change="changeOwnershipSave">
                                    Verifiefd
                                </label>
                                <label class="radio">
                                    <input type="radio" value="Unverifiefd" checked v-model="item.business_ownership"
                                        @change="changeOwnershipSave">
                                    Unverifiefd
                                </label>
                            </div>
                        </div>



                        <div class="field">
                            <label class="label">business_email</label>
                            <div class="control">
                                <input class="input" type="email"
                                    oninput="this.value = this.value.replace(/[^0-9a-zA-z.-_@]/g, '');"
                                    v-model="item.business_email" placeholder="Enter business_email">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">business_website</label>
                            <div class="control">
                                <input class="input" type="url" v-model="item.business_website"
                                    placeholder="Enter business_website">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">business_social</label>


                            <div class="columns">
                                <div class="column ">
                                    <div class="control">
                                        <label class="label">facebook</label>
                                        <div class="control">
                                            <input class="input" type="url" v-model="item.business_social.facebook"
                                                placeholder="facebook link">
                                        </div>
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="control">
                                        <label class="label">instagram</label>
                                        <div class="control">
                                            <input class="input" type="url" v-model="item.business_social.instagram"
                                                placeholder="instgram link">
                                        </div>
                                    </div>
                                </div>

                                <div class="column ">
                                    <div class="control">
                                        <label class="label">youtube</label>
                                        <div class="control">
                                            <input class="input" type="url" v-model="item.business_social.youtube"
                                                placeholder="youtube link">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">business_latitude</label>
                            <div class="control">
                                <input class="input" type="text" maxlength="10"
                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '');"
                                    v-model="item.business_latitude" placeholder="Enter business_latitude">
                            </div>
                        </div>



                        <div class="field">
                            <label class="label">business_longitude</label>
                            <div class="control">
                                <input class="input" type="text" maxlength="10"
                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '');"
                                    v-model="item.business_longitude" placeholder="Enter business_longitude">
                            </div>
                        </div>



                        <div class="field">
                            <label class="label">business_description</label>
                            <div class="control">
                                <input class="input" type="text" v-model="item.business_description"
                                    placeholder="Enter business_description">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">business_faqs</label>
                            <div class="control">
                                <input class="input" type="text" v-model="item.business_faqs"
                                    placeholder="Enter business_faqs">
                            </div>
                        </div>


                        <div class="file has-name is-fullwidth">
                            <label class="file-label">
                                <input class="file-input" type="file" multiple @change="onFileChangeSave">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        Choose images...
                                    </span>
                                </span>
                                <span class="file-name">
                                    {{ showFilesNo }}
                                </span>
                            </label>
                        </div>
                        <div class="columns">
                            <div class="column ">
                                <div class="block mt-6">
                                    <span class="tag  is-medium ml-6" v-for="image in businessFormData.business_images">
                                        <img :src="`${image}`" width="100" height="70" />
                                        <button class="delete is-medium"
                                            @click="removeImageFromBusinessSave(image)"></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="button is-primary">Save</button>
                        {{ message }}
                    </div>
                </div>
            </form>
        </section>

        <section v-if="module == 'businesses' && !item">
            <form @submit.prevent="addBusiness()">
                <div class="columns">
                    <div class="column ">

                        <div class="field">
                            <label class="label">Business Name</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_name"
                                    @input="makeSlugAdd" placeholder="Enter Business Name">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Business Slug</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_slug"
                                    @input="makeSlugForSlugOnlyAdd" placeholder="Enter Business Slug">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">business_category</label>
                            <div class="control">
                                <select id="scat" v-model="businessFormData.business_category" @change="changeServicesAdd">
                                    <option selected value="">Select a Category</option>
                                    <option v-for="scat in scats" :key="scat">{{ scat }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="field" v-if="services">
                            <label class="label">business_services</label>
                            <div class="block">
                                <span class="tag is-secondary is-medium ml-1" v-for="service in services.services"
                                    :key="service" @click="addBusinessServices1(service)">
                                    {{ service }}
                                </span>
                            </div>
                            <div class="block">
                                <span class="tag is-primary is-medium ml-1"
                                    v-for="service in businessFormData.business_services">
                                    {{ service }}
                                    <button class="delete is-medium" @click="removeBusinessServices1(service)"></button>
                                </span>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Business timing</label>
                            <div class="columns">
                                <div class="column ">
                                    <div class="control">
                                        <label class="label"> Monday</label>
                                        Start
                                        <input class="input" type="time"
                                            v-model="businessFormData.business_timing.monday.start"
                                            placeholder="Start time">
                                        <br />
                                        End
                                        <input class="input" type="time"
                                            v-model="businessFormData.business_timing.monday.end" placeholder="Start time">
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="control">
                                        <label class="label"> Tuesday</label>
                                        Start
                                        <input class="input" type="time"
                                            v-model="businessFormData.business_timing.tuesday.start"
                                            placeholder="Start time">
                                        <br />
                                        End
                                        <input class="input" type="time"
                                            v-model="businessFormData.business_timing.tuesday.end" placeholder="End time">
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="control">

                                        <label class="label"> Wednesday</label>
                                        Start
                                        <input class="input" type="time"
                                            v-model="businessFormData.business_timing.wednesday.start"
                                            placeholder="Start time">
                                        <br />
                                        End
                                        <input class="input" type="time"
                                            v-model="businessFormData.business_timing.wednesday.end" placeholder="End time">
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="control">

                                        <label class="label"> Thrusday</label>
                                        Start
                                        <input class="input" type="time"
                                            v-model="businessFormData.business_timing.thrusday.start"
                                            placeholder="Start time">
                                        <br />
                                        End
                                        <input class="input" type="time"
                                            v-model="businessFormData.business_timing.thrusday.end" placeholder="End time">
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="control">

                                        <label class="label"> Friday</label>
                                        Start
                                        <input class="input" type="time"
                                            v-model="businessFormData.business_timing.friday.start"
                                            placeholder="Start time">
                                        <br />
                                        End
                                        <input class="input" type="time"
                                            v-model="businessFormData.business_timing.friday.end" placeholder="End time">
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="control">

                                        <label class="label"> Saturday</label>
                                        Start
                                        <input class="input" type="time"
                                            v-model="businessFormData.business_timing.saturday.start"
                                            placeholder="Start time">
                                        <br />
                                        End
                                        <input class="input" type="time"
                                            v-model="businessFormData.business_timing.saturday.end" placeholder="End time">
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="control">

                                        <label class="label"> Sunday</label>
                                        Start
                                        <input class="input" type="time"
                                            v-model="businessFormData.business_timing.sunday.start"
                                            placeholder="Start time">
                                        <br />
                                        End
                                        <input class="input" type="time"
                                            v-model="businessFormData.business_timing.sunday.end" placeholder="End time">
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Address</label>
                            <div class="columns">
                                <div class="column ">
                                    <div class="control">
                                        <label class="label">business_address</label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="businessFormData.business_address"
                                                placeholder="Enter business_address">
                                        </div>
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="control">
                                        <label class="label">business_locality</label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="businessFormData.business_locality"
                                                placeholder="Enter business_locality">
                                        </div>
                                    </div>
                                </div>

                                <div class="column ">
                                    <div class="control">
                                        <label class="label">business_city</label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="businessFormData.business_city"
                                                placeholder="Enter business_city">
                                        </div>
                                    </div>
                                </div>


                                <div class="column ">
                                    <div class="control">
                                        <label class="label">business_state</label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="businessFormData.business_state"
                                                placeholder="Enter business_state">
                                        </div>
                                    </div>
                                </div>

                                <div class="column ">
                                    <div class="control">
                                        <label class="label">business_pin</label>
                                        <div class="control">
                                            <input class="input" type="text" v-model="businessFormData.business_pin"
                                                placeholder="Enter business_pin">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">business_phone</label>
                            <div class="control">
                                <input class="input" type="text" maxlength="11"
                                    oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                                    v-model="businessFormData.business_phone" placeholder="Enter business_phone">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">business_ownership</label>
                            <div class="control">
                                <label class="radio">
                                    <input type="radio" value="Verifiefd" v-model="businessFormData.business_ownership"
                                        @change="changeOwnershipAdd">
                                    Verifiefd
                                </label>
                                <label class="radio">
                                    <input type="radio" value="Unverifiefd" checked
                                        v-model="businessFormData.business_ownership" @change="changeOwnershipAdd">
                                    Unverifiefd
                                </label>
                            </div>
                        </div>



                        <div class="field">
                            <label class="label">business_email</label>
                            <div class="control">
                                <input class="input" type="email"
                                    oninput="this.value = this.value.replace(/[^0-9a-zA-z.-_@]/g, '');"
                                    v-model="businessFormData.business_email" placeholder="Enter business_email">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">business_website</label>
                            <div class="control">
                                <input class="input" type="url" v-model="businessFormData.business_website"
                                    placeholder="Enter business_website">
                            </div>
                        </div>
                        <div class="field">
                            <label class="label">business_social</label>


                            <div class="columns">
                                <div class="column ">
                                    <div class="control">
                                        <label class="label">facebook</label>
                                        <div class="control">
                                            <input class="input" type="url"
                                                v-model="businessFormData.business_social.facebook"
                                                placeholder="facebook link">
                                        </div>
                                    </div>
                                </div>
                                <div class="column ">
                                    <div class="control">
                                        <label class="label">instagram</label>
                                        <div class="control">
                                            <input class="input" type="url"
                                                v-model="businessFormData.business_social.instagram"
                                                placeholder="instgram link">
                                        </div>
                                    </div>
                                </div>

                                <div class="column ">
                                    <div class="control">
                                        <label class="label">youtube</label>
                                        <div class="control">
                                            <input class="input" type="url"
                                                v-model="businessFormData.business_social.youtube"
                                                placeholder="youtube link">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">business_latitude</label>
                            <div class="control">
                                <input class="input" type="text" maxlength="10"
                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '');"
                                    v-model="businessFormData.business_latitude" placeholder="Enter business_latitude">
                            </div>
                        </div>



                        <div class="field">
                            <label class="label">business_longitude</label>
                            <div class="control">
                                <input class="input" type="text" maxlength="10"
                                    oninput="this.value = this.value.replace(/[^0-9.]/g, '');"
                                    v-model="businessFormData.business_longitude" placeholder="Enter business_longitude">
                            </div>
                        </div>



                        <div class="field">
                            <label class="label">business_description</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_description"
                                    placeholder="Enter business_description">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">business_faqs</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_faqs"
                                    placeholder="Enter business_faqs">
                            </div>
                        </div>


                        <div class="file has-name is-fullwidth">
                            <label class="file-label">
                                <input class="file-input" type="file" multiple @change="onFileChangeAdd">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        Choose images...
                                    </span>
                                </span>
                                <span class="file-name">
                                    {{ showFilesNo }}
                                </span>
                            </label>
                        </div>
                        <div class="columns">
                            <div class="column ">
                                <div class="block mt-6">
                                    <span class="tag  is-medium ml-6" v-for="image in businessFormData.business_images">
                                        <img :src="`${image}`" width="100" height="70" />
                                        <button class="delete is-medium"
                                            @click="removeImageFromBusinessAdd(image)"></button>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="button is-primary">Add</button>
                        {{ message }}
                    </div>
                </div>
            </form>
        </section>

    </template>
</template>

<style scoped>
.select {
    display: inline-block;
    max-width: 100%;
    position: relative;
    vertical-align: top;
}


/* <select> styles */
select {
    /* Reset */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 0;
    outline: 0;
    /* Personalize */
    width: 20em;
    height: 3em;
    padding: 0 4em 0 1em;
    /* background: url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg) no-repeat right 0.8em center/1.4em, linear-gradient(to left, rgba(255, 255, 255, 0.3) 3em, rgba(255, 255, 255, 0.2) 3em); */

    border-radius: 0.25em;
    box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    /* <option> colors */
    /* Remove focus outline */
    /* Remove IE arrow */
}

select option {
    color: black;
    background-color: white;
}

select:focus {
    outline: none;
}

select::-ms-expand {
    display: none;
}
</style>
