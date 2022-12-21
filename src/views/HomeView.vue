<template>
  <main>
    <div class=" ">
      <h1 class="text-3xl font-bold text-center mb-4">
        Globally, as of 5:07pm CET, 16 December 2022, there have been
        647,972,911 confirmed cases of COVID-19, including 6,642,832 deaths,
        reported to WHO. As of 12 December 2022, a total of 13,008,560,983
        vaccine doses have been administered.
      </h1>
      <p class="text-gray-700 leading-relaxed">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. {{ total }}
      </p>
    </div>
    <div class="flex flex-row p-3 m-3">
      <div class="flex flex-col">
        <span> Global Situation </span>
        <span class="text-3xl"> {{ totalConfirmed }} </span>
        <span> confirmed cases </span>
      </div>
      <BarChart class="w-full" v-bind="barChartProps" />
    </div>

    <div class="flex flex-row p-3 m-3">
      <div class="flex flex-col">
        <span class="text-3xl"> {{ totalDeaths }} </span>
        <span> Deaths </span>
      </div>
      <BarChart class="w-full" v-bind="barChartProps" />
    </div>
    <div class="">
      <h2 class="text-center text-4xl p-6">
        Reported Cases and Deaths by Country or Territory
      </h2>

      <div class="overflow-x-auto relative">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="py-3 px-6">Product name</th>
              <th scope="col" class="py-3 px-6">Color</th>
              <th scope="col" class="py-3 px-6">Category</th>
              <th scope="col" class="py-3 px-6">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-white border-b">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              <td class="py-4 px-6">Sliver</td>
              <td class="py-4 px-6">Laptop</td>
              <td class="py-4 px-6">$2999</td>
            </tr>
            <tr class="bg-white border-b">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
              >
                Microsoft Surface Pro
              </th>
              <td class="py-4 px-6">White</td>
              <td class="py-4 px-6">Laptop PC</td>
              <td class="py-4 px-6">$1999</td>
            </tr>
            <tr class="bg-white dark:bg-gray-800">
              <th
                scope="row"
                class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Magic Mouse 2
              </th>
              <td class="py-4 px-6">Black</td>
              <td class="py-4 px-6">Accessories</td>
              <td class="py-4 px-6" v-if="articleList">{{ articleList }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
import { BarChart, useBarChart } from "vue-chart-3";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";
import { Chart, registerables } from "chart.js";

import { worldService } from "@/services/covid19/world";
import type { WorldModel } from "@/models/world";

Chart.register(...registerables);

export default defineComponent({
  components: { BarChart },

  setup() {
    const dataValues = ref<number[]>([]);
    const dataLabels = ref<string[]>([]);
    var today = new Date();
    var from = new Date();
    today.setDate(today.getDate() - 1);
    from.setDate(from.getDate() - 30);
    //get date from to
    const pageInfo = reactive({
      from: from.toISOString(),
      to: today.toISOString(),
    });

    const options = computed(() => ({
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    }));
    const chartData = computed(() => ({
      labels: dataLabels.value,
      datasets: [
        {
          data: dataValues.value,
          backgroundColor: [
            "#123E6B",
            "#123E6B",

            "#123E6B",
            "#123E6B",
            "#123E6B",
          ],
        },
      ],
    }));

    const { barChartProps, barChartRef } = useBarChart({
      chartData,
      options,
    });
    const totalConfirmed = ref(0);
    const totalDeaths = ref(0);
    const totalRecovered = ref(0);
    const total = ref(0);

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
          dataValues.value.push(e.NewConfirmed);
          const date = new Date(e.Date);
          dataLabels.value.push(`${date.getDate()}/${date.getMonth()}`);
        });
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(async () => {
      await worldServiceTotal();
      await worldServiceDate();
    });

    return {
      options,
      barChartRef,
      barChartProps,
      totalConfirmed,
      totalDeaths,
      totalRecovered,
      total,
    };
  },
});
</script>
