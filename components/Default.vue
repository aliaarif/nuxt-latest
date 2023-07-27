<script setup>
const { city, slug, title, action, module, setAction, setEdit, td, edit, fields, item } = useCommon()
const props = defineProps({
    // rows: Object,
})


const selected = ref('---Select---')

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

                    <div class="field" v-for="field in  fields " v-if="!item && module == 'subcategories'">
                        <label class="label">{{ field.label }}</label>
                        <div class="control">
                            <input v-if="field.type == 'text'" class="input" type="text"
                                :placeholder="`Enter ${field.label}`">
                            <textarea v-else-if="field.type == 'textarea'" class=" textarea" v-model="field.name"
                                :placeholder="`Enter  ${field.label}`"></textarea>

                            <div class="select is-primary" v-else-if="field.type == 'dropdown'">
                                <select v-model="field.name">
                                    <option v-if="field.name == 'category'">{{ field.default }}</option>
                                    <option v-for="opt in field.value" :value="opt.name">{{
                                        opt.name }}</option>
                                </select>
                            </div>

                            <!-- <div class="select is-primary" v-else-if="field.type == 'dropdown'">
                                <select v-model="field.name">
                                    <label class="label">{{ field.label }}</label>
                                    <option value="Unclaimed" v-if="field.default == 'Unclaimed'" selected>Unclaimed
                                    </option>
                                    <option value="Unclaimed" v-else>Unclaimed</option>

                                    <option value="Claimed" v-if="field.default == 'Claimed'" selected>Claimed</option>
                                    <option value="Claimed" v-else>Claimed</option>
                                </select>
                            </div> -->


                        </div>
                    </div>

                    <button type="button" @click="save" class="button is-primary">Save</button>
                </form>
            </div>
        </div>

    </template>
</template>
