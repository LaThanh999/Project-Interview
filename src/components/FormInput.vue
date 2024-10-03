<template>
    <div class="container">
        <div class="form">
            <div class="group">
                <label for="quantity" class="label">Quantity Item:</label>
                <input id="quantity" type="number" v-model="quantity" placeholder="Please Input Quantity Item" min="0"
                    class="input">
            </div>
            <div class="group">
                <label for="pageSize" class="label">Page Size:</label>
                <input id="pageSize" type="number" v-model="pageSize" placeholder=" Please Input Page Size" min="0"
                    class="input">
            </div>
            <div class="group">
                <label for="imageBackground" class="label">Image Background:</label>
                <template v-for="(_, index) in imagesBackground">
                    <div class="input-image">
                        <input id="imageBackground" type="text" placeholder=" Please Input Image Background URL"
                            class="input" v-model="imagesBackground[index]">
                        <button v-if="imagesBackground.length > 1" @click="removeImageField(index)">-</button>
                    </div>
                </template>
                <button @click="addImageField" class="icon-button">+</button>
            </div>
            <button @click="onSubmit" class="button">Submit</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, inject, Ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { paths } from "@/constants/path";

const updateImagesInput = inject('updateImagesInput') as (value: string[]) => void;
const imagesInput = inject('imagesInput') as Ref<string[]>;

const router = useRouter()

const quantity = ref(10)
const pageSize = ref(10)
const imagesBackground = ref([''])


onMounted(() => {
    if (imagesInput.value.length > 0) {
        imagesBackground.value = imagesInput.value
    }
})


const addImageField = () => {
    imagesBackground.value.push('')
}

const removeImageField = (index: number) => {
    imagesBackground.value.splice(index, 1)
}

const onSubmit = () => {
    router.push(`${paths.listItem}?total=${quantity.value}&pageSize=${pageSize.value || 10}&page=1`)
    updateImagesInput(imagesBackground.value)
}

</script>

<style scoped lang="scss">
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: fixed;
    inset: 0;

    .form {
        display: flex;
        flex-direction: column;
        padding: 40px 80px;
        border-radius: 4px;
        background-color: #f9f9f9;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        max-height: 500px;
        overflow-y: auto;

        .group {
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
            gap: 8px;

            .input-image {
                display: flex;
                gap: 8px;

                button {
                    padding: 10px;
                    height: 36px;
                    border-radius: 4px;
                    cursor: pointer;
                    border: none;
                }

            }
        }
    }

    .input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 10px;
        width: 300px;
    }

    .button {
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
}
</style>