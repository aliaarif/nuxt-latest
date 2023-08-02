<script setup>
const { city, slug, title, action, module, setAction, setEdit, td, edit, fields, item, categories, subcategories } = useCommon()


const formData = ref({
    subcategory: '',
    category: '',
    page_title: '',
    page_content: ''
})


const edit = async () => {
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
        <div class="column is-half" v-if="module == 'subcategories'">
            {{ formData.subcategories }}
            <form @submit.prevent="edit()">
                {{ item }}
                <div class="field">
                    <label class="label">Sub category Name 1</label>
                    <div class="control">
                        <input type="text" class="input" v-model="formData.subcategory"
                            placeholder="Enter A Subcategory Name">
                    </div>
                </div>

                <div class="field">
                    <label class="label">category Name</label>
                    <div class="control">
                        <input type="text" class="input" v-model="formData.category" placeholder="Select A category">
                    </div>
                </div>



                <button type="button" @click="save" class="button is-primary">Save</button>
            </form>
        </div>
    </div>
</template>




