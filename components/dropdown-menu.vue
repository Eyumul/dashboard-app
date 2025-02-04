<script setup>
import { ref, onMounted, onUnmounted } from "vue";

defineProps({
  onEdit: Function,
  onDelete: Function,
  data: String, // Receive the data object for each table row
});

const isOpen = ref(false);
const dropdownRef = ref(null);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// Function to close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

// Attach event listener on mount, remove on unmount
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
<div class="relative" ref="dropdownRef">
    <!-- Dropdown Trigger Button -->
    <button @click="toggleMenu" class="p-2 text-gray-700 hover:text-black">
        <icon name="ph:dots-three-outline-vertical-fill" />
    </button>

    <!-- Dropdown Menu -->
    <div
        v-if="isOpen"
        class="absolute z-[1] right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg"
    >

        <button onclick="my_modal_4.showModal()" class="flex items-center px-4 py-2 w-full text-blue-600 hover:bg-gray-100">
            <icon name="uil:edit" />
            <span class="ml-2">Edit</span>
          </button>
            <UpdateMemberForm :id="data"/>
        <button
            @click="() => { onDelete(data); isOpen = false; }"
            class="flex items-center px-4 py-2 w-full text-red-600 hover:bg-gray-100"
        >
            <icon name="uil:trash-alt" />
            <span class="ml-2">Delete</span>
        </button>
    </div>
</div>
</template>
