<script setup lang="ts">
import { ref, provide } from 'vue';
import HeaderLayour from "@/layouts/HeaderLayour.vue"

const imagesInput = ref([''])

const updateImagesInput = (valueInput: string[]) => {
  imagesInput.value = valueInput
}

provide('imagesInput', imagesInput);
provide('updateImagesInput', updateImagesInput);

</script>

<template>
  <main>
    <HeaderLayour />
    <router-view />
  </main>
</template>

<style scoped></style>
