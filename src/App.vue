<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderLayout from "@/components/HeaderLayout.vue";
import FooterLayout from "@/components/FooterLayout.vue";
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <HeaderLayout />
    <RouterView />
    <FooterLayout />
  </div>
</template>
