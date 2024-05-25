<script setup>
// core imports
import { ref, reactive, onMounted } from 'vue'
import categories from '../categories.json'
import { toast } from 'vue3-toastify'

// ui components
import GlobalSpinner from './global/GlobalSpinner.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import CatItem from './CatItem.vue'

// state variables
const data = reactive([])
const isFetching = ref(false)

// imitate API call
onMounted(() => {
    isFetching.value = true
    setTimeout(() => {
        Object.assign(data, categories.data)
        isFetching.value = false
    }, 1000)
})

// handle find & delete
const deleteCategory = (id) => {
    const findAndDelete = (items) => {
        const index = items.findIndex((item) => item._id === id)
        if (index !== -1) {
            toast.error(`Category ${items[index].name['en-us']} is deleted`)
            items.splice(index, 1)
        } else {
            items.forEach((item) => {
                if (item.sub_categories) {
                    // recursion to search in sub categories
                    findAndDelete(item.sub_categories)
                }
            })
        }
    }
    findAndDelete(data)
}
</script>

<template>
    <div class="p-4 w-full lg:w-[800px]">
        <div class="py-6 mb-6 border-b border-gray-500 flex justify-between">
            <h1 class="text-xl font-medium text-gray-500">Categories</h1>
            <PlusIcon
                class="cursor-pointer bg-gray-50 rounded-full p-1 text-green-600 h-8 w-8 duration-300 hover:text-green-700 hover:bg-gray-100"
            />
        </div>
        <div class="me-8" v-if="data.length > 0 && !isFetching">
            <!-- this will display main categories -->
            <cat-item
                v-for="category in data"
                :key="category._id"
                :category="category"
                @deleteCategory="deleteCategory"
            />
        </div>
        <div v-else-if="isFetching" class="flex justify-center p-8">
            <global-spinner />
        </div>
        <div v-else class="text-center p-8">There is no categories</div>
    </div>
</template>
