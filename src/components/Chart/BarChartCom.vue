<template>
  <div class="flex flex-row p-3 m-3">
    <div class="flex flex-col p-2 m-3">
      <span class="text-3xl"> {{ total?.toLocaleString() }} </span>
      <span> {{ title }} </span>
    </div>
    <BarChart class="w-full" v-bind="barChartProps" />
  </div>
</template>
<script lang="ts">
import { BarChart, useBarChart } from "vue-chart-3";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  components: { BarChart },
  props: {
    dataValues: {
      type: Array,
      required: true,
    },
    dataLables: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
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
      labels: props.dataLables as any,
      datasets: [
        {
          data: props.dataValues  as any,
          backgroundColor: ["#123E6B"],
        },
      ],
    }));

    const { barChartProps, barChartRef } = useBarChart({
      chartData,
      options,
    });

    return {
      options,
      barChartRef,
      barChartProps,
    };
  },
});
</script>
