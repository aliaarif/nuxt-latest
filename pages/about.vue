<script setup>

// const openedMarkerID = ref(null)

// const center = { lat: 48.8773406, lng: 2.327774 }
// const markers = [
//     {
//         description: "Google France",
//         id: "1",
//         position: {
//             lat: 48.8773406,
//             lng: 2.327774,
//         },
//     },
// ]


</script>
<template>
    <section>
        <h3>About Paage</h3>


        <!-- <GMapMap :center="center" :zoom="15" :options="{
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true,
        }" style="width: 500px; height: 300px; margin: auto">
            <GMapMarker :key="index" v-for="(marker, index) in markers" :position="marker.position" :clickable="true"
                :draggable="true" @click="openMarker(marker.id)">
                <GMapInfoWindow :closeclick="true" @closeclick="openMarker(null)" :opened="openedMarkerID === marker.id">
                    <div>{{ marker.description }}</div>
                </GMapInfoWindow>
            </GMapMarker>
        </GMapMap> -->

    </section>
</template>