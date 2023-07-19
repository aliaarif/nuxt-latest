
<script setup>

</script>

<template>
    <div class="blog-section mt-6 mb-6">
        <div class="blog-content">
            <nuxt-link class="media" v-for="b in businesses" @click="changeDFlagVal"
                :to="`/${slug(city)}/${b.title_slug}/${b.title_slug}`">
                <div class="media-left">
                    <figure class="image custom-image">
                        <img src="https://demo.themesberg.com/spaces/assets/img/meeting-office.jpg" alt="Blog Image">
                    </figure>
                </div>
                <div class="media-content">
                    <h1 class="title is-4">{{ b.name }}</h1>
                    <p>.</p>
                </div>
            </nuxt-link>
        </div>
        <aside class="sidebar">
            <h2 class="title is-5">Sidebar</h2>
            <p>.</p>
            <p>.</p>
            <p>.</p>
        </aside>
    </div>
</template>