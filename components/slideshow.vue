<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import imgOne from "~/assets/images/imgOne.jpg";
import imgTwo from "~/assets/images/imgTwo.jpg";
import imgThree from "~/assets/images/imgThree.jpg";
import imgFour from "~/assets/images/imgFour.jpg";

// Image List
const images = ref([imgOne, imgTwo, imgThree, imgFour]);
const currentIndex = ref(0);
const direction = ref("next");
let intervalId = null;

// Function to show the next image
const nextImage = () => {
  direction.value = "next";
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};

// Function to show the previous image
const prevImage = () => {
  direction.value = "prev";
  currentIndex.value = (currentIndex.value - 1 + images.value.length) % images.value.length;
};

// Auto-slide every 5 seconds
onMounted(() => {
  intervalId = setInterval(nextImage, 10000);
});

// Clear interval when component unmounts
onBeforeUnmount(() => {
  clearInterval(intervalId);
});

// Compute slide transition class
const slideClass = computed(() => (direction.value === "next" ? "slide-next" : "slide-prev"));
</script>

<template>
  <div class="relative w-[90%] mx-auto overflow-hidden rounded-lg shadow-lg">
    <div class="relative flex w-full h-[500px]">
      <transition :name="slideClass">
        <img
          :src="images[currentIndex]"
          :key="currentIndex"
          alt="Carousel Image"
          class="absolute w-full h-[500px] object-cover"
        />
      </transition>
    </div>

    <!-- Previous Button -->
    <button
      @click="prevImage"
      class="btn btn-circle absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
    >
      ❮
    </button>

    <!-- Next Button -->
    <button
      @click="nextImage"
      class="btn btn-circle absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
    >
      ❯
    </button>

    <!-- Dots -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <span
        v-for="(image, index) in images"
        :key="index"
        @click="currentIndex = index"
        class="w-3 h-3 rounded-full cursor-pointer transition-all"
        :class="currentIndex === index ? 'bg-white scale-125' : 'bg-gray-400'"
      ></span>
    </div>
  </div>
</template>

<style scoped>
/* Slide Transition */
.slide-next-enter-active,
.slide-prev-enter-active {
  transition: transform 0.5s ease-in-out;
  position: absolute;
}

.slide-next-enter-from {
  transform: translateX(100%);
}
.slide-next-enter-to {
  transform: translateX(0%);
}

.slide-prev-enter-from {
  transform: translateX(-100%);
}
.slide-prev-enter-to {
  transform: translateX(0%);
}
</style>
