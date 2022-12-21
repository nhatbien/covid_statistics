<template>
  <PopupCountry v-if="isPopupCountry == true" :country="countryState" />
  <Loading
    :active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage"
  ></Loading>
  <main class="">
    <!-- <div class=" ">
      <h1 class="text-3xl font-bold text-center mb-4 p-4">
        Globally, as of 5:07pm CET, 16 December 2022, there have been
        647,972,911 confirmed cases of COVID-19, including 6,642,832 deaths,
        reported to WHO. As of 12 December 2022, a total of 13,008,560,983
        vaccine doses have been administered.
      </h1>
    </div> -->
    <HeadingHome :totalConfirmed="totalConfirmed" :totalDeadth="totalDeaths" />
    <BarChartCom
      v-if="dataLabelsDeadth"
      :dataValues="dataValuesDeadth"
      :dataLables="dataLabelsDeadth"
      :total="totalDeaths"
      title="deadths"
    />
    <BarChartCom
      v-if="dataValuesConfirmed"
      :dataValues="dataValuesConfirmed"
      :dataLables="dataLabelsDeadth"
      :total="totalConfirmed"
      title="confirmed cases"
    />

    <div class="flex flex-col justify-center">
      <h2 class="text-center text-4xl p-6">
        Reported Cases and Deaths by Country or Territory
      </h2>
           <span v-if="message" class="font-bold text-center text-2xl p-2">
        {{ message }}
      </span> 
      <div class="overflow-x-auto overflow-y-auto relative">
        <TableCountries v-if="listCountries" :items="listCountries" />
      </div>

   
    </div>
  </main>
</template>
<script lang="ts">
import "vue3-loading-overlay/dist/vue3-loading-overlay.css";

import TableCountries from "@/components/TableCountries.vue";
import PopupCountry from "@/components/PopupCountry.vue";
import HeadingHome from "@/components/HeadingHome.vue";
import BarChartCom from "@/components/Chart/BarChartCom.vue";
import Loading from "vue3-loading-overlay";

import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { worldService } from "@/services/covid19/world";
import type { Country } from "@/models/world";
import { useStore } from "@/stores";

export default defineComponent({
  components: {
    TableCountries,
    PopupCountry,
    HeadingHome,
    BarChartCom,
    Loading,
  },

  setup() {
    const store = useStore();
    const isPopupCountry = computed(() => store.state.isPopupCountry);
    const countryState = computed(() => store.state.country);

    const dataValuesDeadth = ref<number[]>([]);
    const dataLabelsDeadth = ref<string[]>([]);
    const dataValuesConfirmed = ref<number[]>([]);
    const message = ref<String>("");

    var today = new Date();
    var from = new Date();
    today.setDate(today.getDate() - 1);
    from.setDate(from.getDate() - 30);
    //get date from to
    const pageInfo = reactive({
      from: from.toISOString(),
      to: today.toISOString(),
    });

    const totalConfirmed = ref(0);
    const totalDeaths = ref(0);
    const totalRecovered = ref(0);

    const isLoading = ref(false);
    const fullPage = ref(true);
    const doAjax = () => {
      isLoading.value = true;
      setTimeout(() => {
        isLoading.value = false;
      }, 5000);
    };
    const onCancel = () => {
      isLoading.value = false;
    };

    const worldServiceTotal = async () => {
      try {
        const { data, status } = await worldService.total();
        console.log(status);

        if (data) {
          totalConfirmed.value = data.TotalConfirmed;
          totalDeaths.value = data.TotalDeaths;
          totalRecovered.value = data.TotalRecovered;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const worldServiceDate = async () => {
      try {
        const { data, status } = await worldService.worldDate(pageInfo);
        console.log(status);
        data.sort(function (a, b) {
          return a.TotalConfirmed - b.TotalConfirmed;
        });
        data.forEach((e) => {
          dataValuesDeadth.value.push(e.NewDeaths);
          dataValuesConfirmed.value.push(e.NewConfirmed);
          const date = new Date(e.Date);
          dataLabelsDeadth.value.push(`${date.getDate()}/${date.getMonth()}`);
        });
      } catch (error) {
        console.log(error);
      }
    };

    const listCountries = ref<Country[]>([]);
    const summaryService = async () => {
      try {
        const { data, status } = await worldService.summary();
        console.log(status);
        if (data.Message != "Caching in progress") {
          data.Countries.sort(function (a, b) {
            return a.TotalConfirmed - b.TotalConfirmed;
          }).reverse();
          listCountries.value = data.Countries;
        } else {
          message.value = "Server Is Error";
        }
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(async () => {
      doAjax();
      await worldServiceTotal();
      await worldServiceDate();
      await summaryService();
      onCancel();
    });

    return {
      dataLabelsDeadth,
      dataValuesDeadth,
      dataValuesConfirmed,
      totalConfirmed,
      totalDeaths,
      totalRecovered,
      listCountries,
      isLoading,
      fullPage,
      onCancel,
      isPopupCountry,
      countryState,
      message,
    };
  },
});
</script>
