<template>
    <aside class="menu">


        <ul class="menu-list">
            <li><a class="is-active">Dashboard</a></li>
            <li>
                <a v-on:click="setModule('categories', null)">Categories</a>
                <ul>
                    <li><a v-on:click="setModule('categories', 'list')">List</a></li>
                    <li><a v-on:click="setModule('categories', 'add')">Add</a></li>
                </ul>
            </li>
            <li>
                <a v-on:click="setModule('subcategories', null)">Subcategories</a>
                <ul>
                    <li><a v-on:click="setModule('subcategories', 'list')">List</a></li>
                    <li><a v-on:click="setModule('subcategories', 'add')">Add</a></li>
                </ul>
            </li>
            <li>
                <a v-on:click="setModule('businesses')">Businesses</a>
                <ul>
                    <li><a v-on:click="setModule('businesses', 'list')">List</a></li>
                    <li><a v-on:click="setModule('businesses', 'add')">Add</a></li>
                </ul>
            </li>
            <li>
                <a v-on:click="setModule('cities', null)">Cities</a>
                <ul>
                    <li><a v-on:click="setModule('cities', 'list')">List</a></li>
                    <li><a v-on:click="setModule('cities', 'add')">Add</a></li>
                </ul>
            </li>
            <li>
                <a v-on:click="setModule('states', null)">States</a>
                <ul>
                    <li><a v-on:click="setModule('states', 'list')">List</a></li>
                    <li><a v-on:click="setModule('states', 'add')">Add</a></li>
                </ul>
            </li>

        </ul>


    </aside>
</template>

<script setup>
</script>