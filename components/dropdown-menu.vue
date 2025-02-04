<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useMembers } from '~/composables/useMembers';

const props = defineProps({
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

const { members, fetchMembers, updateMember } = useMembers();
  await fetchMembers();
  
  // Find the selected member using computed()
const selectedMember = computed(() => {
  const member = members.value.find((m) => m._id === props.data);
  if (member) {
    return {
      ...member,
      educationalDocumentName: extractFileName(member.educationalDocument),
      suretyDocumentName: extractFileName(member.suretyDocument),
    };
  }
  return null;
});

// Extracts file name from a Base64 string
const extractFileName = (base64String) => {
  if (!base64String) return null;

  try {
    const metadata = base64String.match(/^data:application\/pdf;name=(.*);base64,/);
    return metadata ? metadata[1] : 'Uploaded Document.pdf';
  } catch (error) {
    return 'Uploaded Document.pdf';
  }
};

// Handle file uploads & convert PDF to Base64
const handleFileUpload = (event, field) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Convert PDF to Base64

    reader.onload = () => {
      selectedMember.value[field] = reader.result; // Store Base64 string
      selectedMember.value[field + 'Name'] = file.name; // Store file name
      console.log(`Uploaded ${field}:`, file.name);
    };

    reader.onerror = (error) => {
      console.error(`Error converting ${field} to Base64:`, error);
    };
  }
};

const handleUpdate = async () => {
  if (selectedMember.value) {
    await updateMember(selectedMember.value._id, selectedMember.value);
    alert('Member updated successfully!');
  }
};
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

        <button onclick="edit_modal.showModal()" class="flex items-center px-4 py-2 w-full text-blue-600 hover:bg-gray-100">
            <icon name="uil:edit" />
            <span class="ml-2">Edit</span>
          </button>
          <dialog id="edit_modal" class="modal">
            <div class="modal-box w-11/12 px-12 py-8 h-max max-w-5xl">
              <form method="dialog">
                <button class="btn text-xl btn-square btn-sm btn-ghost absolute right-8 top-6">✕</button>
              </form>
              <h3 class="text-3xl font-bold">Edit Member</h3>

              <form v-if="selectedMember" @submit.prevent="handleUpdate" class="flex flex-col gap-4 mt-10">
                <div class="grid grid-cols-2 gap-x-10 gap-y-4">
                  <p class="font-semibold divider col-span-2">Personal Information</p>
                  <label class="input input-bordered flex items-center gap-2">
                    Name
                    <input v-model="selectedMember.name" type="text" class="grow" placeholder="Alex" />
                  </label>
                  <label class="input input-bordered flex items-center gap-2">
                    Email
                    <input v-model="selectedMember.email" type="text" class="grow" placeholder="alex@example.com" />
                  </label>
                  <label class="input input-bordered flex items-center gap-2">
                    Age
                    <input v-model="selectedMember.age" type="number" class="grow" placeholder="21" />
                  </label>
                </div>

                <div class="grid grid-cols-2 gap-x-12 gap-y-4">
                  <p class="font-semibold divider col-span-2">Work Information</p>
                  <label class="input input-bordered flex items-center gap-2">
                    Salary
                    <input v-model="selectedMember.salary" type="number" class="grow" placeholder="8000" />
                  </label>
                  <label class="input input-bordered flex items-center gap-2">
                    Position
                    <input v-model="selectedMember.position" type="text" class="grow" placeholder="Accountant" />
                  </label>

                  <!-- Educational Document Upload -->
                  <div class="flex flex-col gap-2 col-span-2">
                    <label class="text-base">Educational Document</label>
                    <div class="flex items-center gap-4">
                      <input
                        type="file"
                        accept=".pdf"
                        class="file-input file-input-sm max-w-xs"
                        @change="handleFileUpload($event, 'educationalDocument')"
                      />
                      <a v-if="selectedMember.educationalDocument" :href="selectedMember.educationalDocument" target="_blank" class="underline text-gray-600 text-sm">
                        {{ selectedMember.educationalDocumentName }}
                      </a>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-x-12 gap-y-4">
                  <p class="font-semibold divider col-span-2">Surety Information</p>
                  <label class="input input-bordered flex items-center gap-2">
                    Surety
                    <input v-model="selectedMember.surety" type="text" class="grow" placeholder="Someone" />
                  </label>

                  <!-- Surety Document Upload -->
                  <div class="flex flex-col gap-2 col-span-2">
                    <label class="text-base">Surety Document</label>
                    <div class="flex items-center gap-4">
                      <input
                        type="file"
                        accept=".pdf"
                        class="file-input file-input-sm max-w-xs"
                        @change="handleFileUpload($event, 'suretyDocument')"
                      />
                      <a v-if="selectedMember.suretyDocument" :href="selectedMember.suretyDocument" target="_blank" class="underline text-gray-600 text-sm">
                        {{ selectedMember.suretyDocumentName }}
                      </a>
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-x-12 gap-y-4">
                  <p class="font-semibold divider col-span-2">Other Information</p>
                  <label class="input input-bordered flex items-center gap-2">
                    Code Number
                    <input v-model="selectedMember.codeNumber" type="text" class="grow" placeholder="we234iow" />
                  </label>
                  <select v-model="selectedMember.status" class="select select-bordered w-full">
                    <option disabled selected>Status</option>
                    <option>Individual</option>
                    <option>Branch</option>
                  </select>
                </div>

                <button type="submit" class="btn btn-primary mt-4">Save</button>
              </form>
            </div>
          </dialog>
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
