<script setup>
// const { page } = useCommon()
useHead({
    title: 'Obelcon | Contacts',
    meta: [
        { name: 'description', content: 'Dummy Meta for Contacts Page' }
    ]
})
const message = ref('')

const contactsFormData = ref({
    "name": "Dummy",
    "phone": "Dummy",
    "email": "Dummy",
    "subject": "Dummy",
    "message": "Dummy",
    "status": "Pending"
})

const sendMessage = async () => {
    useFetch("/api/save/contacts", {
        method: 'post',
        body: contactsFormData
    }).then((res) => {
        console.log(res);
        message.value = res.data.value.message
    })
}

const onFileChangeSave = (event) => {
    contactsFormData.value.subject = event.target.value
    // alert(contactsFormData.value.subject)

}

</script>
<template>
    <section>

        <form @submit.prevent="sendMessage" class="mt-6">

            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Name</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <p class="control is-expanded has-icons-left">
                            <input class="input" type="text" placeholder="Name" v-model="contactsFormData.name" required>
                            <span class="icon is-small is-left">
                                <i class="fas fa-user"></i>
                            </span>
                        </p>
                    </div>
                    <div class="field">
                        <p class="control is-expanded has-icons-left has-icons-right">
                            <input class="input is-success" type="email" placeholder="Email"
                                v-model="contactsFormData.email" required>
                            <span class="icon is-small is-left">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <span class="icon is-small is-right">
                                <i class="fas fa-check"></i>
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label"></div>
                <div class="field-body">
                    <div class="field is-expanded">
                        <div class="field has-addons">
                            <p class="control">
                                <a class="button is-static">
                                    +91
                                </a>
                            </p>
                            <p class="control is-expanded">
                                <input class="input" type="text" placeholder="Your phone number"
                                    v-model="contactsFormData.phone" required>
                            </p>
                        </div>
                        <!-- <p class="help">Do not enter the first zero</p> -->
                    </div>
                </div>
            </div>

            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Subhect</label>
                </div>
                <div class="field-body">
                    <div class="field is-narrow">
                        <div class="control">
                            <div class="select is-fullwidth">
                                <select @change="onFileChangeSave" required>
                                    <option selected value="">Select a Subject</option>
                                    <option>Enquiry</option>
                                    <option>Business</option>
                                    <option>Others</option>
                                </select>

                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div class="field is-horizontal">
                <div class="field-label is-normal">
                    <label class="label">Message</label>
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <textarea class="textarea" placeholder="Explain how we can help you"
                                v-model="contactsFormData.message" required></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field is-horizontal mb-6">
                <div class="field-label">
                    <!-- Left empty for spacing -->
                </div>
                <div class="field-body">
                    <div class="field">
                        <div class="control">
                            <button class="button is-primary">
                                Send message
                            </button> {{ message }}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </section>
</template>
