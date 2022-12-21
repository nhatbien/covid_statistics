<template>
  <div>
    <table class="w-full text-sm text-left text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="py-1 px-6 font-bold">#</th>
          <th scope="col" class="py-3 px-6 font-bold">Country</th>
          <th scope="col" class="py-3 px-6 font-bold">Total Confirmed</th>
          <th scope="col" class="py-3 px-6 font-bold">Total Deaths</th>
          <th scope="col" class="py-3 px-6 font-bold">New Deaths</th>
          <th scope="col" class="py-3 px-6 font-bold">New Confirmed</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="paginatedItems.length > 0">
          <tr
            class="bg-white border-b"
            v-for="(country, index) in paginatedItems"
            :key="index"
          >
            <td class="py-4 px-6">
              {{
                pagination.currentPage > 1
                  ? index + 50 * (pagination.currentPage - 1)
                  : index
              }}
            </td>

            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap cursor-pointer hover:text-blue-600"
              @click="setCountry(country.CountryCode)"
            >
              {{ country.Country }}
            </th>
            <td class="py-4 px-6">{{ country.TotalConfirmed }}</td>
            <td class="py-4 px-6">{{ country.TotalDeaths }}</td>
            <td class="py-4 px-6 bg-red-600 text-white">
              + {{ country.NewDeaths }}
            </td>
            <td class="py-4 px-6 bg-yellow-700 text-white">
              + {{ country.NewConfirmed }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
    <ul class="inline-flex -space-x-px p-2">
      <button
        class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        :disabled="pagination.currentPage <= 1"
        @click="pagination.currentPage--"
      >
        Prev Page
      </button>

      <span
        class="cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        :class="
          pagination.currentPage == item
            ? `text-blue-600 border border-gray-300 bg-blue-50`
            : ``
        "
        v-for="item in pagination.totalPages"
        :key="item"
        @click="pagination.currentPage = item"
      >
        {{ item }}</span
      >
      <button
        class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        :disabled="pagination.currentPage >= pagination.totalPages"
        @click="pagination.currentPage++"
      >
        Next Page
      </button>
    </ul>
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "TableCountries",
});
</script>

<script setup>
import { computed, reactive, watch, ref } from "vue";
import { sort } from "fast-sort";
import { useStore } from "@/stores";
import { countriesService } from "@/services/countries/v2alpha";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  /*  fields: {
    type: Array,
    required: true,
  }, */
});

const pagination = reactive({
  currentPage: 1,
  perPage: 50,
  totalPages: computed(() =>
    Math.ceil(props.items.length / pagination.perPage)
  ),
});

const sortBy = ref(null);
const sortDesc = ref(null);
const store = useStore();

const sortedItems = computed(() => {
  const { items } = props;
  if (sortDesc.value === null) return items;

  if (sortDesc.value) {
    return sort(items).desc(sortBy.value);
  } else {
    return sort(items).asc(sortBy.value);
  }
});

const setCountry = async (country) => {
  try {
    const { data, status } = await countriesService.getFromCode(country);
    console.log(status);
    console.log(data);
    store.commit("toggleCountry", data);
  } catch (error) {
    console.log(error);
  }
};

const paginatedItems = computed(() => {
  const { currentPage, perPage } = pagination;
  const start = (currentPage - 1) * perPage;
  const stop = start + perPage;

  return sortedItems.value.slice(start, stop);
});

watch(
  () => pagination.totalPages,
  () => (pagination.currentPage = 1)
);
</script>
