<script setup>
const { city, slug, title, action, module, setAction, setEdit, td, edit, fields, item } = useCommon()
const props = defineProps({
    // rows: Object,
})



const modules = ref(['businesses', 'categories', 'subcategories', 'cities', 'states', 'users'])

const save = () => {

    // const { data: response } = useFetch('/api/save', {
    //     method: 'post',
    //     body: {
    //         data: {
    //             module: module.value,
    //             fData: item
    //         }
    //     }
    // })

    // if (response) {
    //     console.log(response.value);
    // }


    const { data: res } = useAsyncData('res',
        () => {
            return $fetch(`/api/save`, {
                method: 'post',
                body: {
                    data: {
                        module: module.value,
                        fData: item
                    }
                }
            })
        },
    )


    console.log(res.value);


}




</script>

<template>
    <template v-if="module == 'dashboard'">
        <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
            <div class="column is-6-mobile is-4-tablet is-3-desktop is-3-widescreen" v-for="module in modules"
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
            <Table />
        </div>
    </template>

    <template v-else>

        <div class="columns">
            <div class="column is-half">
                <form @submit.prevent="save()">

                    <section v-if="module == 'businesses'">{{ item }}</section>
                    <section v-if="module == 'categories'">{{ item }}</section>
                    <section v-if="module == 'subcategories'">{{ item }}</section>
                    <section v-if="module == 'cities'">{{ item }}</section>
                    <section v-if="module == 'states'">{{ item }}</section>
                    <section v-if="module == 'users'">{{ item }}</section>

                    <div class="field" v-for="field in  fields " v-if="!item">
                        <label class="label">{{ field.label }}</label>
                        <div class="control">
                            <input v-if="field.type == 'text'" class="input" type="text" :value="item.business_name"
                                :placeholder="`Enter ${field.label}`">
                            <textarea v-else-if="field.type == 'textarea'" class=" textarea" v-model="field.name"
                                :placeholder="`Enter  ${field.label}`"></textarea>

                            <div class="select is-primary"
                                v-else-if="field.type == 'dropdown' && typeof (field.value) == 'object'">
                                <select v-model="field.name">
                                    <label class="label">{{ field.label }}</label>
                                    <option value="" selected>---Select---</option>
                                    <option v-for="opt in field.value" :value="opt.name">{{ opt.name }}</option>
                                </select>
                            </div>

                            <div class="select is-primary"
                                v-else-if="field.type == 'dropdown' && field.name == 'business_ownership'">
                                <select v-model="field.name">
                                    <label class="label">{{ field.label }}</label>
                                    <option value="Unclaimed" v-if="field.default == 'Unclaimed'" selected>Unclaimed
                                    </option>
                                    <option value="Unclaimed" v-else>Unclaimed</option>

                                    <option value="Claimed" v-if="field.default == 'Claimed'" selected>Claimed</option>
                                    <option value="Claimed" v-else>Claimed</option>
                                </select>
                            </div>


                        </div>
                    </div>
                    <!-- <div class="field">
                        <label class="label">Slug</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Enter slug">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Business Name</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Enter business name">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">City</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Enter city">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Address</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Enter address">
                        </div>
                    </div> -->
                    <button type="button" @click="save" class="button is-primary">Save</button>
                </form>
            </div>
            <div class="column is-half">
                <!-- <form>
                    <div class="field">
                        <label class="label">Category</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Enter category">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Phone</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Enter phone number">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Map</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Enter map URL or coordinates">
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Description</label>
                        <div class="control">
                            <textarea class="textarea" placeholder="Enter description"></textarea>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">FAQs</label>
                        <div class="control">
                            <textarea class="textarea" placeholder="Enter FAQs"></textarea>
                        </div>
                    </div>


                    <button class="button is-primary">Primary</button>
                </form> -->


            </div>
        </div>

    </template>
</template>
