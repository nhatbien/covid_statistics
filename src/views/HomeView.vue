<script>
import { defineComponent } from "vue";
import { GoogleMap, Polygon } from "vue3-google-map";

export default defineComponent({
  components: { GoogleMap, Polygon },
  setup() {
    const center = { lat: -30.56, lng: 22.94 };
     const triangleCoords = [
      { lat: 25.774, lng: -80.19 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.19 },
    ];
    const bermudaTriangle = {
      paths: triangleCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
    };
    return { center,bermudaTriangle };
  },
});
</script>

<template>
  <main>
    <GoogleMap
      api-key="AIzaSyBHHzALzXn6k4LScNNWdBV_InwoOXOSaFM"
      style="width: 100%; height: 500px"
      :center="center"
      :zoom="5"
    >
    <Polygon :options="bermudaTriangle" />
    </GoogleMap>
  </main>
</template>
