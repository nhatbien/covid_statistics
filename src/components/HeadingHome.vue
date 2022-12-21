<template>
  <div>
    <h1 class="text-3xl font-bold text-center mb-4 p-4">
      Globally, <span class="text-blue-600"> {{ now }} </span>, there have been
      <span class="text-blue-600"
        >{{ totalConfirmed?.toLocaleString() }} confirmed cases
      </span>
      of COVID-19, including
      <span class="text-blue-600"
        >{{ totalDeadth?.toLocaleString() }} deaths</span
      >.
    </h1>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    totalConfirmed: {
      type: Number,
      required: true,
    },
    totalDeadth: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const now = Date();
    return {
      now,
    };
  },
});
</script>
