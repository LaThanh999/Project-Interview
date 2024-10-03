<template>
    <nav class="pagination" aria-label="Pagination">
        <ul class="pagination-list">
            <li>
                <button class="pagination-button" :disabled="currentPage === 1" @click="onPageChange(currentPage - 1)"
                    aria-label="Go to previous page">
                    <span class="pagination-icon">←</span>
                </button>
            </li>

            <li v-if="startPage > 1">
                <button class="pagination-button" @click="onPageChange(1)">
                    1
                </button>
            </li>

            <li v-if="startPage > 2">
                <span class="pagination-ellipsis">...</span>
            </li>

            <li v-for="page in visiblePages" :key="page">
                <button class="pagination-button" :class="{ 'is-active': page === currentPage }"
                    @click="onPageChange(page)">
                    {{ page }}
                </button>
            </li>

            <li v-if="endPage < totalPages - 1">
                <span class="pagination-ellipsis">...</span>
            </li>

            <li v-if="endPage < totalPages">
                <button class="pagination-button" @click="onPageChange(totalPages)">
                    {{ totalPages }}
                </button>
            </li>

            <li>
                <button class="pagination-button" :disabled="currentPage === totalPages"
                    @click="onPageChange(currentPage + 1)" aria-label="Go to next page">
                    <span class="pagination-icon">→</span>
                </button>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
    name: 'VPagination',

    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPages: {
            type: Number,
            required: true
        },
        maxVisibleButtons: {
            type: Number,
            default: 5
        }
    },

    emits: ['update:currentPage', 'pageChange'],

    setup(props, { emit }) {
        const startPage = computed(() => {
            if (props.totalPages <= props.maxVisibleButtons) {
                return 1
            }

            const halfWay = Math.floor(props.maxVisibleButtons / 2)
            if (props.currentPage <= halfWay) {
                return 1
            }

            if (props.currentPage + halfWay >= props.totalPages) {
                return props.totalPages - props.maxVisibleButtons + 1
            }

            return props.currentPage - halfWay
        })

        const endPage = computed(() => {
            if (props.totalPages <= props.maxVisibleButtons) {
                return props.totalPages
            }

            return Math.min(startPage.value + props.maxVisibleButtons - 1, props.totalPages)
        })

        const visiblePages = computed(() => {
            const range = []
            for (let i = startPage.value; i <= endPage.value; i++) {
                range.push(i)
            }
            return range
        })

        const onPageChange = (page: number) => {
            emit('update:currentPage', page)
            emit('pageChange', page)
        }

        return {
            startPage,
            endPage,
            visiblePages,
            onPageChange
        }
    }
})
</script>

<style scoped lang="scss">
.pagination {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}

.pagination-list {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: 5px;
}

.pagination-button {
    padding: 8px 12px;
    border: 1px solid #ddd;
    background-color: white;
    color: #333;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
}

.pagination-button:hover:not(:disabled) {
    background-color: #f0f0f0;
}

.pagination-button.is-active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
}

.pagination-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
}

.pagination-ellipsis {
    padding: 8px 12px;
    color: #666;
}

.pagination-icon {
    display: inline-block;
    width: 14px;
    height: 14px;
    line-height: 1;
}
</style>