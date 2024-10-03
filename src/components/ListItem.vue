<script setup lang="ts">
import { ref, inject } from 'vue'
import CardItem from "@/components/Card/CardItem.vue";
import Pagination from "@/components/common/Pagination.vue";
import { useUrlQuery } from '@/composables/useUrlQuery'
import { usePagination } from '@/composables/usePagination'
import { computed, watch, Ref } from 'vue';
import { getRandomElement } from '@/utils/common'

defineProps<{ msg: string, }>()

const PAGE_LIMIT = 14

const { getParamValue, setParamValue } = useUrlQuery()

const imagesInput = inject('imagesInput') as Ref<string[]>;

const total = getParamValue('total')
const page = getParamValue('page')
const pageSize = getParamValue('pageSize')


const currentPage = ref(Number(page))

const handlePageChange = (page: number) => {
  currentPage.value = page
}

watch(currentPage, (value) => {
  setParamValue('page', String(value))
})

const items = computed(() => {
  return Array.from({ length: total && Number(total) !== 0 ? Number(total) : 100 }, (_, index) => ({ image: getRandomElement(imagesInput.value), value: index + 1 }))
});


const { itemCurrent, totalPage } = usePagination({ totalItem: items.value, currentPage: currentPage, pageSize: Number(pageSize) || PAGE_LIMIT })

</script>

<template>
  <div class="grid-container">
    <div class="card" v-for="(item, index) in itemCurrent" :key="index">
      <CardItem :image="item.image" :description="`${item.value} - Image Card Item Image Card Item Image Card Item`" />
    </div>
  </div>
  <Pagination :total-pages="totalPage" :current-page="currentPage" @page-change="handlePageChange" />

</template>

<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 24px;
  padding: 24px 60px;

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: transform 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 1px;
    border-radius: 2px;

    &:hover {
      transform: scale(1.1);
    }

  }
}

@media (max-width: 80rem) {
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
}

@media (max-width: 40rem) {
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
}

@media (max-width: 80rem) {
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
}

@media (max-width: 40rem) {
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }

  .grid-container {
    padding: 24px 20px;
  }
}
</style>
