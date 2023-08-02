<script setup>
const { city, slug, title, action, module, setAction, setEdit, td, edit, fields, item } = useCommon()

const formData = ref({
    subcategory: '',
    category: '',
    page_title: '',
    page_content: ''
})


const add = async () => {
    useFetch("/api/save", {
        method: 'post',
        body: {
            data: {
                module: module,
                formData: formData
            }
        }
    }).then((res) => {
        console.log(res.value);
    })

}
</script>

<template>
    <div class="columns">
        <div class="column is-half">
            <form @submit.prevent="add()">

                <div class="field" v-if="module == 'subcategories' && !item">
                    <label class="label">Sub Category Name 1</label>
                    <div class="control">
                        <input class="input" type="text" v-model="subcategory" placeholder="Enter Subcategory">
                    </div>
                </div>

                <!-- <div class="field" v-for="field in  fields " v-if="module == 'subcategories' && !item">
                    <label class="label">{{ field.label }}</label>
                    <div class="control">
                        <input v-if="field.type == 'text'" class="input" type="text" v-model="field.name"
                            :placeholder="`Enter ${field.label}`">

                        <textarea v-else-if="field.type == 'textarea'" class="textarea" v-model="field.name"
                            :placeholder="`Enter  ${field.label}`"></textarea>

                        <div class="select is-primary" v-else-if="field.type == 'dropdown'">
                            <select v-model="field.name">
                                <option v-if="field.name == 'category'">{{ field.default }}</option>
                                <option v-for="opt in field.value" :value="opt.name">{{
                                    opt.name }}</option>
                            </select>
                        </div>
                    </div>
                </div> -->
                <button type="button" @click="add" class="button is-primary">Add</button>
            </form>
        </div>
    </div>
</template>




