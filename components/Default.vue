<script setup>
const { slug, title, auth, setAuth, module, edit, fields, item, subcategories, setSCat, profileTab, setProfileTab } = useCommon()
const adminModules = ref(['businesses', 'categories', 'subcategories', 'cities', 'states', 'scripts'])
const qcModules = ref(['QC Done', 'Approoved', 'Pending', 'Rejected'])
const staffModules = ref(['Total Posted', 'Approoved', 'Pending', 'Rejected'])
const message = ref('')
const services = ref('')
const scats = subcategories.value.map(item => item.name);

const cnt = ref(1)

const addNewFaq = () => {
    // cnt.value = cnt.value+1
    // let mod = businessFormData.value.business_faqs+'faq_+cnt.value+'.q'+cnt.value
    // // Create a new element
    // const newElement = document.createElement("div");
    // newElement.innerHTML = `<hr/><input class="input" type="text" v-model="mod">`;
    // const parentElement = document.getElementById("faqBoxcontrol").appendChild(newElement)
}

const changeServicesAdd = (event) => {
    businessFormData.value.business_services = []
    $fetch(`/api/services?name=${event.target.value}`, {
        method: 'get'
    }).then((res) => {
        services.value = res
    })
}


if (edit) {
    console.log(item?.value?.business_category)
    useFetch(`/api/services?name=${item?.value?.business_category}`, {
        method: 'get'
    }).then((res) => {
        services.value = res
    })
    console.log(services)
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



// States Modules
const stateFormData = ref({
    name: '',
    status: 'Active'
})

const addState = async () => {
    useFetch("/api/save/state", {
        method: 'post',
        body: stateFormData
    }).then((res) => {
        console.log(res.data.value)
        message.value = res.data.value.payload
    })
}

const editState = async () => {
    useFetch("/api/save/state", {
        method: 'post',
        body: item
    }).then((res) => {
        console.log(res.data.value)
        message.value = res.data.value.payload
    })
}




// SubCategories Modules
const subCategoryFormData = ref({
    name: '',
    slug: '',
    category: '',
    services:[],
    page_title: '',
    page_content: '',
    status: 'Active'
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


// Businesses Modules
const businessFormData = ref({
    business_name: '',
    business_slug: '',
    business_ownership: '',
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
    business_address: '',
    business_locality: '',
    business_city: '',
    business_state: '',
    business_pin: '',
    business_phone: '',
    business_email: '',
    business_website: '',
    business_social: {
        facebook: 'https://facebook.com/',
        instagram: 'https://instagram.com/',
        youtube: 'https://youtube.com/'
    },
    business_latitude: '',
    business_longitude: '',
    business_description: '',
    business_faqs: {
        faq_1:{
            q1: "",
            a1:""
        },
        faq_2:{
            q2: "",
            a2:""
        },
        faq_3:{
            q3: "",
            a3:""
        }
    },
    business_images: [],
    status: 'Pending',
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
    // console.log(item.value.business_category)
    try {
        const res = await useFetch('/api/save/business', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: item.value
        });
        console.log(res.data.value)
    } catch (error) {
        console.error('Business save failed:', error)
    }
}


// Users Modules
const userFormData = ref({
    name: '',
    status: 'Active'
})

const addUser = async () => {
    useFetch("/api/save/user", {
        method: 'post',
        body: userFormData
    }).then((res) => {
        console.log(res.data.value)
        message.value = res.data.value.payload
    })
}

const editUser = async () => {
    useFetch("/api/save/user", {
        method: 'post',
        body: item
    }).then((res) => {
        console.log(res.data.value)
        message.value = res.data.value.payload
    })
}

// Users Modules
// const profileFormData = ref({
//     id:auth?.value?._id,
//     name: auth?.value?.name,
//     email: auth?.value?.email,
//     role: auth?.value?.role,
//     gender:auth?.value?.gender,
//     phone:auth?.value?.phone,
//     address: auth?.value?.address,
//     locality: auth?.value?.locality,
//     city: auth?.value?.city,
//     state: auth?.value?.state,
//     pin: auth?.value?.pin,
// })


const editProfile = async () => {
    useFetch("/api/save/user", {
        method: 'post',
        body: auth
    }).then((res) => {
        // setAuth(res.data.value.user)
        localStorage.auth = JSON.stringify(res.data.value.user)
        console.log(res.data.value)
        message.value = res.data.value.message
    })
}

// Leads Modules
const leadFormData = ref({
    name: '',
    status: 'Active'
})

const addLead = async () => {
    useFetch("/api/save/lead", {
        method: 'post',
        body: userFormData
    }).then((res) => {
        console.log(res.data.value)
        message.value = res.data.value.payload
    })
}

const editLead = async () => {
    useFetch("/api/save/lead", {
        method: 'post',
        body: item
    }).then((res) => {
        console.log(res.data.value)
        message.value = res.data.value.payload
    })
}

// Contacts Modules
const contactFormData = ref({
    name: '',
    status: 'Active'
})

const addContact = async () => {
    useFetch("/api/save/contact", {
        method: 'post',
        body: userFormData
    }).then((res) => {
        console.log(res.data.value)
        message.value = res.data.value.payload
    })
}

const editContact = async () => {
    useFetch("/api/save/contact", {
        method: 'post',
        body: item
    }).then((res) => {
        console.log(res.data.value)
        message.value = res.data.value.message
    })
}



// Scripts Modules
const scriptFormData = ref({
    name: '',
    status: 'Active'
})

const addScript = async () => {
    useFetch("/api/save/script", {
        method: 'post',
        body: userFormData
    }).then((res) => {
        console.log(res.data.value)
        message.value = res.data.value.payload
    })
}

const editScript = async () => {
    useFetch("/api/save/script", {
        method: 'post',
        body: item
    }).then((res) => {
        console.log(res.data.value)
        message.value = res.data.value.payload
    })
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
    
    <!-- module == 'dashboard' -->
    <template v-if="module == 'dashboard'">
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
    </template>

    <!-- Not a dashboard  And For All Types of tables -->
    <template v-else-if="module != 'dashboard' && edit == false">
        <div class="table-container">
            <!-- Admin Tables -->
            <TableForAdmin v-if="auth.role === 'Admin'" />

            <!-- Staff and QC Tables -->
            <TableForStaffAndQC v-if="auth.role === 'Staff' || auth.role === 'QC'" />
        </div>
    </template>

   <!-- For Add And Edit Modules -->
    <template v-else>
        <br>
    
        <!-- States Module -->
        <template v-if="module == 'states'">

            <!-- Add State -->
            <section v-if="module == 'states' && !item">
                <div class="columns">
                    <div class="column is-half">
                        <form @submit.prevent="addState">

                            <div class="field">
                                <label class="label">State Name</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="stateFormData.state"
                                        placeholder="Enter state">
                                </div>
                            </div>

                            <button type="submit" class="button is-primary">Add</button>
                            {{ message }}
                        </form>
                    </div>
                </div>
            </section>

            <!-- Edit State -->
            <section v-if="module == 'states' && item">
                <div class="columns">
                    <div class="column is-half">
                        <form @submit.prevent="editState">

                            <div class="field">
                                <label class="label">State Name</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.name" placeholder="Enter state">
                                </div>
                            </div>

                            <button type="submit" class="button is-primary">Save</button> 
                            {{ message }}
                        </form>
                    </div>
                </div>
            </section>

        </template>


        <!-- Subcategories Module -->
        <template v-if="module == 'subcategories'">

            <!-- Add Subcategory -->
            <section v-if="module == 'subcategories' && !item">
                    <div class="columns">
                        <div class="column is-half">
                            <form @submit.prevent="addSubCategory">

                            <div class="field">
                                <label class="label">Category Name</label>
                                <div class="control">
                                    <select id="scat" v-model="subCategoryFormData.name" @change="changeServicesAdd">
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
                                    <label class="label">Category Name</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="subCategoryFormData.category"
                                            placeholder="Enter category">
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label">Sub Category Name</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="subCategoryFormData.name"
                                            placeholder="Enter Subcategory">
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label">Slug</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="subCategoryFormData.slug" placeholder="Enter Slug">
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

                <!-- Edit Subcategories -->
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
                                    </div>
                                </div>

                                <div class="field">
                                    <label class="label">Slug</label>
                                    <div class="control">
                                        <input class="input" type="text" v-model="item.slug" placeholder="Enter Slug">
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

                                <button type="submit" class="button is-primary">Save</button> 
                                {{ message }}
                            </form>
                        </div>
                    </div>
                </section> 
            </template>

        <!-- Businesses Module -->
        <template v-if="module == 'businesses'">

            <!-- Add Business -->
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
                                    <select id="scat" class="select1" v-model="businessFormData.business_category" @change="changeServicesAdd">
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

                            <div class="field" >
                           
                                <label class="label">business_faqs</label>  <button class="is-medium" @click="addNewFaq">
                                <i class="fa-solid fa-briefcase"></i> Add New </button>
                                <div class="control" id="faqBoxcontrol">
                                    {{ businessFormData.business_faqs }}
                                <br/>
                                    <input class="input " type="text" v-model="businessFormData.business_faqs.faq_1.q1"
                                        placeholder="Enter business_faqs question">
                                        <input class="input " type="text" v-model="businessFormData.business_faqs_1.a1"
                                        placeholder="Enter business_faqs answer">
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

            <!-- Edit Business -->
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
                                    <span class="tag is-secondary is-medium ml-1" v-for="service in services?.services"
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
                                    <input class="input" type="text"
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

        </template>


        <!-- Users Module -->
        <template v-if="module == 'users'">

            <!-- Add State -->
            <section v-if="module == 'users' && !item">
                <div class="columns">
                    <div class="column is-half">
                        <form @submit.prevent="addUser">

                            <div class="field">
                                <label class="label">Name</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="userFormData.name"
                                        placeholder="Enter state">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="userFormData.email"
                                        placeholder="Enter email">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">City</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="userFormData.city"
                                        placeholder="Enter City">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Role</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="userFormData.role"
                                        placeholder="Enter Role">
                                </div>
                            </div>

                            <button type="submit" class="button is-primary">Add</button>
                            {{ message }}
                        </form>
                    </div>
                </div>
            </section>

            <!-- Edit User -->
            <section v-if="module == 'users' && item">
                <div class="columns">
                    <div class="column is-half">
                        <form @submit.prevent="editUser">

                            <div class="field">
                                <label class="label">Name</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.name" placeholder="Enter Name">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.email"
                                        placeholder="Enter email">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">City</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.city"
                                        placeholder="Enter City">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Role</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.role"
                                        placeholder="Enter Role">
                                </div>
                            </div>

                            <button type="submit" class="button is-primary">Save</button> 
                            {{ message }}
                        </form>
                    </div>
                </div>
            </section>

        </template>

        <!-- Leads Module -->
        <template v-if="module == 'leads'">

            <!-- Edit Lead -->
            <section v-if="module == 'leads' && item">
                <div class="columns">
                    <div class="column is-half">
                        <form @submit.prevent="editLead">

                            <div class="field">
                                <label class="label">Name</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.name" 
                                        placeholder="Enter Name" disabled>
                                </div>
                            </div>
                            
                            <div class="field">
                                <label class="label">Phone</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.phone"
                                        placeholder="Enter Phone" disabled>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.email"
                                        placeholder="Enter email" disabled>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Subcategory</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.subcategory"
                                        placeholder="Enter Subcategory" disabled>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">City</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.city"
                                        placeholder="Enter City" disabled>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Query</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.query"
                                        placeholder="Enter Query" disabled>
                                </div>
                            </div>

                            <button type="submit" class="button is-primary">Save</button> 
                            {{ message }}
                        </form>
                    </div>
                </div>
            </section>

        </template>



        <!-- Contacts Module -->
        <template v-if="module == 'contacts'">
        
      
            <!-- Edit Contact -->
            <section v-if="module == 'contacts' && item">
                <div class="columns">
                    <div class="column is-half">
                        <form class="box" @submit.prevent="editContact">

                            <!-- <div class="field">
                                <label class="label">Name</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.name" 
                                        placeholder="Enter Name" disabled>
                                </div>
                            </div> -->


                            <div class="field">
                                <label class="label is-small">Name</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Name" v-model="item.name" disabled>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>
                            
                            <!-- <div class="field">
                                <label class="label">Phone</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.phone"
                                        placeholder="Enter Phone" disabled>
                                </div>
                            </div> -->

                            <div class="field">
                                <label class="label is-small">Phone</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Phone" v-model="item.phone" disabled>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>

                            <!-- <div class="field">
                                <label class="label">Email</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.email"
                                        placeholder="Enter email" disabled>
                                </div>
                            </div> -->

                            <div class="field">
                                <label class="label is-small">Email</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Email" v-model="item.email" disabled>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>

                            <!-- <div class="field">
                                <label class="label">Subject</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.subject"
                                        placeholder="Enter Subject" disabled>
                                </div>
                            </div> -->

                            <div class="field">
                                <label class="label is-small">Subject</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Subject" v-model="item.subject" disabled>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>

                            <!-- <div class="field">
                                <label class="label">Message</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.message"
                                        placeholder="Enter Message" disabled>
                                </div>
                            </div> -->

                            <div class="field">
                                <label class="label is-small">Message</label>
                                <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Message" v-model="item.message" disabled>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div>
                            </div>

                            {{item}}
                            <div class="field">
                                <label class="label is-small">Status</label>
                                <!-- <div class="control has-icons-left has-icons-right">
                                    <input class="input is-small" type="text" placeholder="Message" v-model="item.message" disabled>
                                    <span class="icon is-small is-left">
                                    <i class="fas fa-user"></i>
                                    </span>
                                    <span class="icon is-small is-right">
                                    <i class="fas fa-check"></i>
                                    </span>
                                </div> -->

                                <div class="select1 is-primary is-small">
                                
                                <select v-model="item.status">
                                    <option>Pending</option>
                                    <option>Read</option>
                                    <option>Junk</option>
                                    <option>Awaiting</option>
                                    <option>Replied</option>
                                </select>
                            </div>

                            </div>

                           
                            <br/>

                            <button type="submit" class="button is-primary is-small">Save</button> 
                            {{ message }}
                        </form>
                    </div>
                </div>
            </section>

        </template>



        <!-- Scripts Module -->
        <template v-if="module == 'scripts'">

            <!-- Edit Script -->
            <section v-if="module == 'scripts' && item">
                <div class="columns">
                    <div class="column is-half">
                        <form  @submit.prevent="editScript">

                            <div class="field">
                                <label class="label">Name</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.name" 
                                        placeholder="Enter Name" >
                                </div>
                            </div>
                            
                            <div class="field">
                                <label class="label">Type</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.type"
                                        placeholder="Enter Type" >
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Positions</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.positions"
                                        placeholder="Enter Positions" >
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Body</label>
                                <div class="control">
                                    <input class="input" type="text" v-model="item.body"
                                        placeholder="Enter Subcategory" >
                                </div>
                            </div>

                            <button type="submit" class="button is-primary">Save</button> 
                            {{ message }}
                        </form>
                    </div>
                </div>
            </section>

        </template>



        <!-- Scripts Module -->
        <template v-if="module == 'profile'">

                <!-- Edit Script -->
                <section v-if="module == 'profile'">
                    <div class="tabs">
                        <ul>
                            <li :class="profileTab == 'profile' ? 'is-active' : ''" @click="setProfileTab('profile')"><a>Profile</a></li>
                             <li :class="profileTab == 'billing' ? 'is-active' : ''" @click="setProfileTab('billing')"><a>Billing</a></li>
                             <li :class="profileTab == 'security' ? 'is-active' : ''" @click="setProfileTab('security')"><a>Security</a></li>
                             <li :class="profileTab == 'notifications' ? 'is-active' : ''" @click="setProfileTab('notifications')"><a>Notifications</a></li>
                        </ul>
                    </div> 
                    <div class="columns mt-2" v-if="profileTab == 'profile'">
                        <div class="column is-one-fifth">
                            Profile  Picture
                            <figure class="image is-128x128">
                                <img class="is-squre" src="https://bulma.io/images/placeholders/128x128.png">
                            </figure>
                            <br/>
                            <button class="button is-primary is-small ml-5" @change="changeImage">Change</button> 
                        </div>
                        <div class=" column is-four-fifths">
                            <div class="block">
                                Account Details
                                <form class="box" @submit.prevent="editProfile">
                                    <div class="columns">
                                        <div class=" column is-half">
                                            <div class="field">
                                                <label class="label is-small">Name</label>
                                                <div class="control has-icons-left has-icons-right">
                                                    <input class="input is-small" type="text" placeholder="Name" v-model="auth.name">
                                                    <span class="icon is-small is-left">
                                                    <i class="fas fa-user"></i>
                                                    </span>
                                                    <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                    </span>
                                                </div>
                                            </div>

                                            <div class="field">
                                                <label class="label is-small">Email</label>
                                                <div class="control has-icons-left has-icons-right">
                                                    <input class="input is-small" type="text" placeholder="Email" v-model="auth.email" disabled>
                                                    <span class="icon is-small is-left">
                                                    <i class="fas fa-envelope"></i>
                                                    </span>
                                                    <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                    </span>
                                                </div>
                                            </div>


                                            <div class="field">
                                                <label class="label is-small">Gender</label>
                                                <div class="control  select  is-small">
                                                    <select class="is-small" id="scat" v-model="auth.gender">                                                 
                                                            <option value="Male"  v-bind="auth.gender == 'Male' ? selected : ''"  >Male</option>
                                                            <option value="Female"  v-bind="auth.gender == 'Female' ? selected : ''"  >Female</option>
                                                    </select>
                                                </div>
                                            </div>


                                            <div class="field">
                                            <label class="label is-small">Phone</label>
                                            <div class="control has-icons-left has-icons-right">
                                                <input class="input is-small" type="text" placeholder="Phone" v-model="auth.phone" disabled>
                                                <span class="icon is-small is-left">
                                                <i class="fas fa-user"></i>
                                                </span>
                                                <span class="icon is-small is-right">
                                                <i class="fas fa-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label is-small">Address</label>
                                            <div class="control has-icons-left has-icons-right">
                                                <input class="input is-small" type="text" placeholder="Address" v-model="auth.address">
                                                <span class="icon is-small is-left">
                                                <i class="fas fa-user"></i>
                                                </span>
                                                <span class="icon is-small is-right">
                                                <i class="fas fa-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        </div>
                            

                             
                                    <div class=" column is-half">
                                        
                                        
                                        <div class="field">
                                            <label class="label is-small">Locality</label>
                                            <div class="control has-icons-left has-icons-right">
                                                <input class="input is-small" type="text" placeholder="Locality" v-model="auth.locality">
                                                <span class="icon is-small is-left">
                                                <i class="fas fa-user"></i>
                                                </span>
                                                <span class="icon is-small is-right">
                                                <i class="fas fa-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label is-small">City</label>
                                            <div class="control has-icons-left has-icons-right">
                                                <input class="input is-small" type="text" placeholder="City" v-model="auth.city">
                                                <span class="icon is-small is-left">
                                                <i class="fas fa-user"></i>
                                                </span>
                                                <span class="icon is-small is-right">
                                                <i class="fas fa-check"></i>
                                                </span>
                                            </div>
                                        </div>

                                        <div class="field">
                                            <label class="label is-small">State</label>
                                            <div class="control has-icons-left has-icons-right">
                                                <input class="input is-small" type="text" placeholder="State" v-model="auth.state">
                                                <span class="icon is-small is-left">
                                                <i class="fas fa-user"></i>
                                                </span>
                                                <span class="icon is-small is-right">
                                                <i class="fas fa-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label class="label is-small">PIN</label>
                                            <div class="control has-icons-left has-icons-right">
                                                <input class="input is-small" type="text" placeholder="State" v-model="auth.pin">
                                                <span class="icon is-small is-left">
                                                <i class="fas fa-user"></i>
                                                </span>
                                                <span class="icon is-small is-right">
                                                <i class="fas fa-check"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="field">
                                         <label class="label is-small">&nbsp;</label>
                                            <button class="button is-primary is-small">Save</button> {{ message }}
                                        </div>

                                </div>
                            </div>

                                   
                                    </form>
                            </div>
                        </div>
                    </div>


                    <div class="columns mt-2" v-if="profileTab == 'billing'">
                        <div class=" column is-four-fifths">
                            <div class="block">
                                Billing Details
                            </div>
                        </div>
                    </div>

                    <div class="columns mt-2" v-if="profileTab == 'security'">
                        <div class=" column is-four-fifths">
                            <div class="block">
                                Security Details
                            </div>
                        </div>
                    </div>

                    <div class="columns mt-2" v-if="profileTab == 'notifications'">
                        <div class=" column is-four-fifths">
                            <div class="block">
                                Notifications
                            </div>
                        </div>
                    </div>

                </section>

            </template>
        
    </template>
</template>

<style scoped>
.select1 {
    display: inline-block;
    max-width: 100%;
    position: relative;
    vertical-align: top;
}


/* <select> styles */
.select1 {
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

.select1 option {
    color: black;
    background-color: white;
}

.select1:focus {
    outline: none;
}

.select1::-ms-expand {
    display: none;
}
</style>
