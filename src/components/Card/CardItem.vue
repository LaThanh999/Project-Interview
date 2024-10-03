<template>
    <div class="image-container">
        <img :src="image" alt="Image" class="card-image" @error="handleImageError">
    </div>
    <h2> {{ description }}</h2>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ref } from 'vue'
import { getRandomElement } from '@/utils/common'

const fallbackImage = ref('../../public/images/item1.png')
const fallbackImage2 = ref('../../public/images/item2.jpg')


defineProps<{ image: string, description: string }>()

const handleImageError = (e: Event) => {
    if (e.target instanceof HTMLImageElement) {
        e.target.src = getRandomElement([fallbackImage.value, fallbackImage2.value])
    }
}

</script>

<style lang="scss" scoped>
.image-container {
    position: relative;
    width: 100%;
    padding-top: 66.67%;
    overflow: hidden;

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        // object-position: top;
    }
}

h2 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 90%;
    font-size: 16px;
    padding: 12px 0px;
}
</style>