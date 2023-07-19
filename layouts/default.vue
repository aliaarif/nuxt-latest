<template>
    <section class="mx-1">
        <DefaultNav />
        <div class="container mt-2">

            <slot />

        </div>
        <!-- <Footer /> -->
    </section>
</template>
<style scoped>
.page-entter-active,
.page-leave-active {
    transform: all 0.4s;
}

.page-entter-from,
.page-leave-to {
    opacity: 0;
    filter: blur(1rem);
}
</style>