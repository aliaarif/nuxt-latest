<script setup>
const { city, slug, title, auth, action, module, setAction, setEdit, td, edit, fields, item } = useCommon()
const adminModules = ref(['businesses', 'categories', 'subcategories', 'cities', 'states', 'users'])
const qcModules = ref(['QC Done', 'Approoved', 'Pending', 'Rejected'])
const staffModules = ref(['Total Posted', 'Approoved', 'Pending', 'Rejected'])
const message = ref('')

const submit = ref(false)




const subCategoryFormData = ref({
    // module: module,
    name: '',
    category: '',
    page_title: '',
    page_content: ''
})

const addSubCategory = async () => {
    submit.value = true
    // message.value = ''
    useFetch("/api/save/subcategory", {
        method: 'post',
        body: subCategoryFormData
    }).then((res) => {
        console.log(res);
        message.value = res.data.value.payload
        submit.value = false
    })
}


const businessFormData = ref({
    // module: module,
    // editFlag: false,
    created_by: 'Obelcon',
    business_name: '',
    business_slug: '',
    business_ownership: '',
    business_category: '',
    business_services: '',
    business_timing:
    {
        monday: {
            start: "09:00 ",
            end: "17:00 "
        },

        tuesday: {
            start: "09:00 ",
            end: "17:00 "
        },

        wednesday: {
            start: "09:00 ",
            end: "17:00 "
        },

        thrusday: {
            start: "09:00 ",
            end: "17:00 "
        },

        friday: {
            start: "09:00 ",
            end: "17:00 "
        },

        saturday: {
            start: "NA",
            end: "NA"
        },

        sunday: {
            start: "NA",
            end: "NA"
        }
    },


    business_city: '',
    business_state: '',
    business_address: '',
    business_phone: '',
    business_email: '',
    business_website: '',
    business_Social: '',
    business_latitude: '',
    business_longitude: '',
    business_description: '',
    business_faqs: '',
    business_image: '',
    business_images: [],
    page_title: '',
    page_content: '',
    status: 'Active'
})

const addBusiness = async () => {
    // businessFormData.value.business_images = selectedFiles.value
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
        console.error('File upload failed:', error)
    }
    selectedFiles.value = []
}


const editBusiness = async () => {
    // console.log(selectedFiles)
    // item.value.business_images.push(...selectedFiles.value)
    try {
        const res = await useFetch('/api/save/business', {
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: item
        });
        console.log(res)
        // message.value = res.data.value.message
    } catch (error) {
        console.error('File upload failed:', error)
    }
}


// const editBusiness = async () => {
//     // message.value = ''
//     useFetch("/api/save/business", {
//         method: 'post',
//         body: item
//     }).then((res) => {
//         onsole.log(res.data.value)
//         message.value = res.data.value.message
//     })
// }



const makeSlug = () => {
    businessFormData.value.business_slug = slug(businessFormData.value.business_name)
}


const returnVoid = () => {
    return;
}

const selectedFiles = ref([])


const onFileChange = (event) => {
    const formData = new FormData();
    // selectedFiles.value = Object.values(event.target.files)
    // selectedFiles.value.foreach((img) => {
    //     aaaa.value.push(img.name)
    // })
    for (let i = 0; i < event.target.files.length; i++) {
        console.log(event.target.files[i])
        selectedFiles.value.push(event.target.files[i])
        formData.append('images[]', event.target.files[i]);

    }
    businessFormData.value.business_images = formData

    // if (eflg === true) {
    //     item.value.business_images.push(...selectedFiles.value)
    // } else {
    //     businessFormData.value.business_images.push(...selectedFiles.value)
    // }

    // console.log(selectedFiles.value)
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
                    <form>


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
                        <button type="button" @click="editSubCategory" class="button is-primary">Add</button> {{
                            message }}
                    </form>
                </div>
            </div>

        </section>

        <section v-if="module == 'subcategories' && !item">
            <div class="columns">
                <div class="column is-half">
                    <form>


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
                        <button type="button" @click="addSubCategory" class="button is-primary">Add</button>
                        {{ message }}
                    </form>
                </div>
            </div>
        </section>

        <section v-if="module == 'businesses' && item">

            <form @submit.prevent="editBusiness()">
                <div class="columns">
                    <div class="column">


                        <div class="field">
                            <label class="label">Business Name</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_name" @input="makeSlug"
                                    placeholder="Enter Business Name">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Business Slug</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_slug"
                                    placeholder="Enter Business Slug">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">business_ownership</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_ownership"
                                    placeholder="Enter business_ownership">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">business_category</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_category"
                                    placeholder="Enter business_category">
                            </div>
                        </div>

                        <!-- <div class="select">

                            <select v-model="businessFormData.business_category">
                                <option>Select dropdown</option>
                                <option>With options</option>
                            </select>
                        </div> -->



                        <div class="field">
                            <label class="label">business_services</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_services"
                                    placeholder="Enter business_services">
                            </div>
                        </div>


                        <div class="field">
                            {{ item.business_timing }}
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
                                            <input class="input" type="text" v-model="item.business_city"
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
                                <input class="input" type="text" v-model="item.business_phone"
                                    placeholder="Enter business_phone">
                            </div>
                        </div>



                        <div class="field">
                            <label class="label">business_email</label>
                            <div class="control">
                                <input class="input" type="text" v-model="item.business_email"
                                    placeholder="Enter business_email">
                            </div>
                        </div>



                        <div class="field">
                            <label class="label">business_website</label>
                            <div class="control">
                                <input class="input" type="text" v-model="item.business_website"
                                    placeholder="Enter business_website">
                            </div>
                        </div>


                        <div class="field">
                            <label class="label">business_Social</label>
                            <div class="control">
                                <input class="input" type="text" v-model="item.business_Social"
                                    placeholder="Enter business_Social">
                            </div>
                        </div>



                        <div class="field">
                            <label class="label">business_latitude</label>
                            <div class="control">
                                <input class="input" type="text" v-model="item.business_latitude"
                                    placeholder="Enter business_latitude">
                            </div>
                        </div>



                        <div class="field">
                            <label class="label">business_longitude</label>
                            <div class="control">
                                <input class="input" type="text" v-model="item.business_longitude"
                                    placeholder="Enter business_longitude">
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


                        <div class="field">
                            <label class="label">business_image</label>
                            <div class="control">
                                <input class="input" type="text" v-model="item.business_image"
                                    placeholder="Enter business_image">
                            </div>
                        </div>


                        <div class="field">
                            <label class="label">business_images</label>
                            <div class="control">
                                <input class="input" type="text" v-model="item.business_images"
                                    placeholder="Enter business_images">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">page_title</label>
                            <div class="control">
                                <input class="input" type="text" v-model="item.page_title" placeholder="Enter page_title">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">page_content</label>
                            <div class="control">
                                <input class="input" type="text" v-model="item.page_content"
                                    placeholder="Enter page_content">
                            </div>
                        </div>





                        <div class="file has-name is-fullwidth">
                            <label class="file-label">
                                <input class="file-input" type="file" name="b_img" @change="onFileChange" multiple>
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        Choose a file…
                                    </span>
                                </span>
                                <span class="file-name">
                                    Screen Shot 2017-07-29 at 15.54.25.png
                                </span>
                            </label>
                        </div>





                        <button type="button" @click="editBusiness" class="button is-primary">Save</button>
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
                                <input class="input" type="text" v-model="businessFormData.business_name" @input="makeSlug"
                                    placeholder="Enter Business Name">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">Business Slug</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_slug"
                                    placeholder="Enter Business Slug">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">business_ownership</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_ownership"
                                    placeholder="Enter business_ownership">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">business_category</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_category"
                                    placeholder="Enter business_category">
                            </div>
                        </div>

                        <!-- <div class="select">

                            <select v-model="businessFormData.business_category">
                                <option>Select dropdown</option>
                                <option>With options</option>
                            </select>
                        </div> -->



                        <div class="field">
                            <label class="label">business_services</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_services"
                                    placeholder="Enter business_services">
                            </div>

                            <div class="block">
                                <span class="tag is-primary is-medium">
                                    Hello World
                                    <button class="delete is-medium"></button>
                                </span>
                            </div>
                        </div>




                        <div class="field">
                            {{ businessFormData.business_timing }}
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
                                <input class="input" type="text" v-model="businessFormData.business_phone"
                                    placeholder="Enter business_phone">
                            </div>
                        </div>



                        <div class="field">
                            <label class="label">business_email</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_email"
                                    placeholder="Enter business_email">
                            </div>
                        </div>



                        <div class="field">
                            <label class="label">business_website</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_website"
                                    placeholder="Enter business_website">
                            </div>
                        </div>


                        <div class="field">
                            <label class="label">business_Social</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_Social"
                                    placeholder="Enter business_Social">
                            </div>
                        </div>



                        <div class="field">
                            <label class="label">business_latitude</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_latitude"
                                    placeholder="Enter business_latitude">
                            </div>
                        </div>



                        <div class="field">
                            <label class="label">business_longitude</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_longitude"
                                    placeholder="Enter business_longitude">
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


                        <div class="field">
                            <label class="label">business_image</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_image"
                                    placeholder="Enter business_image">
                            </div>
                        </div>


                        <div class="field">
                            <label class="label">business_images</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.business_images"
                                    placeholder="Enter business_images">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">page_title</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.page_title"
                                    placeholder="Enter page_title">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label">page_content</label>
                            <div class="control">
                                <input class="input" type="text" v-model="businessFormData.page_content"
                                    placeholder="Enter page_content">
                            </div>
                        </div>





                        <div class="file has-name is-fullwidth">
                            <label class="file-label">
                                <input class="file-input" type="file" name="b_img" @change="onFileChange" multiple>
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        Choose a file…
                                    </span>
                                </span>
                                <span class="file-name">
                                    Screen Shot 2017-07-29 at 15.54.25.png
                                </span>
                            </label>
                        </div>



                        <button type="button" @click="addBusiness" class="button is-primary">Add</button>
                        {{ message }}
                    </div>
                </div>
            </form>
        </section>

    </template>
</template>

<style>
.select {
    display: inline-block;
    max-width: 100%;
    position: relative;
    vertical-align: top;
}
</style>
