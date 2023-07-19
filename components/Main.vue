<template>
    <div v-if="!business">
        <div v-if="category">
            <div class="columns is-multiline is-mobile is-variable is-2-tablet mt-4 mb-6">
                <div class=" column is-6-mobile is-4-tablet is-4-desktop is-3-widescreen" v-for="s in subcategories"
                    :key="s._id">
                    <a :href="`/${slug(city)}/${slug(s?.name)}-in-${slug(city)}`" class="grid-item box">
                        <p><b>{{ s.name }}</b></p>
                    </a>
                </div>
            </div>
        </div>
        <div v-else>
            Show All Businesses {{ subcategory }} in {{ city }}
        </div>
    </div>
    <div v-else>
        {{ business }}
    </div>
</template>

<script setup>



slug: (str) => {
    return str ? str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') : '';
}

title: (str) => {
    var words = str ? str.split('-') : '';
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
    return words ? words.join(' ') : '';
}

// useHead({
//     title: pageTitle,
//     meta: [
//         { name: 'description', content: metaContent }
//     ]
// })

$fetch(`/api/query?category=${category}`, {
    method: 'get'
}).then((res) => {
    this.subcategories = res
})


        // $fetch(`/api/query?subcategory=${this.subcategory}&?city=${this.city}`, {
        //     method: 'get'
        // }).then((res) => {
        //     this.businesses = res.values
        // })







</script>