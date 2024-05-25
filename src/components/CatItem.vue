<script setup>
import { ref, computed } from 'vue'
import {
    TrashIcon,
    ChevronRightIcon,
    ChevronDownIcon,
} from '@heroicons/vue/24/solid'

const { category, level } = defineProps({
    category: {
        type: Object,
        required: true,
    },
    level: {
        type: Number,
        default: 0,
    },
})

const isExpanded = ref(true)

// calculate margin left for nested cats
const indent = computed(() => level * 32)

// emitter to pass the delete event to parent
const emit = defineEmits(['deleteCategory'])

// delete event function
const handleDelete = () => {
    emit('deleteCategory', category._id)
}
</script>

<template>
    <div class="ms-8">
        <div
            class="relative flex justify-between items-center p-4 rounded-2xl border shadow-md my-8"
        >
            <div class="ps-3 flex items-center gap-2">
                <div
                    class="cursor-pointer"
                    v-if="category.sub_categories.length"
                    @click="isExpanded = !isExpanded"
                >
                    <ChevronDownIcon v-if="isExpanded" class="h-4 w-4" />
                    <ChevronRightIcon v-else class="h-4 w-4" />
                </div>
                <p>
                    {{ category.name['en-us'] }}
                </p>
            </div>
            <TrashIcon
                @click="handleDelete"
                class="cursor-pointer text-red-500 w-6 h-6 duration-300 hover:text-red-600"
            />
            <!-- <div class="absolute -left-6 myArrow" v-if="level > 0"></div> -->
        </div>
        <div
            class="border-l"
            v-if="category.sub_categories.length"
            v-show="isExpanded"
        >
            <!-- recursion to display nested sub categories -->
            <cat-item
                v-for="sub in category.sub_categories"
                :key="sub._id"
                :category="sub"
                :level="level + 1"
                @deleteCategory="$emit('deleteCategory', $event)"
            />
        </div>
    </div>
</template>

<style scoped>
.myArrow {
    border: 14px solid;
    border-color: transparent transparent transparent #bbb;
}
</style>
