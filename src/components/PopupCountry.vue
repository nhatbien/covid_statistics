<template>
  <div>
    <div class="hide-overpage"></div>
    <div
      tabindex="-1"
      class="overflow-y-auto overflow-x-hidden fixed inset-0 w-full outline-none z-50 h-full flex justify-center items-center"
      aria-hidden="true"
    >
      <div class="relative p-4 w-full max-w-md h-auto mx-auto">
        <div class="relative bg-white rounded-lg shadow flex flex-col">
          <div class="text-center flex flex-col">
            <div class="flex flex-col items-center">
              <h3 class="mb-5 text-lg font-normal">
                {{ country?.name }}
              </h3>
              <img :src="country?.flag" class="p-2 w-32" />
            </div>
            <div class="flex flex-grow-0 justify-between p-1">
              <span class="font-bold"> Population</span>
              <span> {{ country?.population }}</span>
            </div>
            <div class="flex flex-grow-0 justify-between p-1">
              <span class="font-bold"> Region</span>
              <span> {{ country?.region }}</span>
            </div>
            <div class="flex flex-grow-0 justify-between p-1">
              <span class="font-bold"> Capital</span>
              <span> {{ country?.capital }}</span>
            </div>
            <div class="flex flex-grow-0 justify-between p-1">
              <span class="font-bold"> Subregion</span>
              <span> {{ country?.subregion }}</span>
            </div>
          </div>
          <div class="text-center">
            <button
              data-modal-toggle="popup-modal"
              type="button"
              @click="togglePopup()"
              class="m-2 text-white uppercase bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@/stores";
export default defineComponent({
  props: {
    country: Object,
  },
  setup() {
    const store = useStore();

    const togglePopup = () => {
      console.log("togglePopup");
      store.state.isPopupCountry = false;
    };

    return {
      togglePopup,
    };
  },
});
</script>
<style scoped>
.hide-overpage {
  @apply fixed inset-0 z-40 transition-opacity bg-black opacity-50 w-full h-full;
}
.md-18 {
  font-size: 18px;
}
.md-24 {
  font-size: 24px;
}
.md-36 {
  font-size: 36px;
}
.md-48 {
  font-size: 48px;
}
</style>
