<template>
    <div class="flex flex-col gap-12 items-center">
        <NavSection class="sticky top-0 z-50"/>
        <Slideshow/>
        <div class="flex w-[90%]">
            <p class="text-4xl font-bold">Members</p>
            <button onclick="create_modal.showModal()" class="btn btn-primary ml-auto">
                <icon class="text-xl" name="uil:plus-circle"/>
                <p>Add Member</p>
            </button>
            <dialog id="create_modal" class="modal">
                <div class="modal-box w-11/12 px-12 py-8 h- max-w-5xl">
                    <form method="dialog">
                        <button class="btn text-xl btn-square btn-sm btn-ghost absolute right-8 top-6">✕</button>
                    </form>
                    <h3 class="text-3xl font-bold">Add New Member</h3>
                    <form @submit.prevent="handleAdd" class="flex flex-col gap-4 mt-10">
                        <div class="grid grid-cols-2 gap-x-10 gap-y-4">
                            <p class="font-semibold divider col-span-2">Personal information</p>
                            <label class="input input-bordered flex items-center gap-2">
                                Name
                                <input v-model="newMember.name" type="text" class="grow" placeholder="Alex" />
                            </label>
                            <label class="input input-bordered flex items-center gap-2">
                                Email
                                <input v-model="newMember.email" type="text" class="grow" placeholder="alex@example.com" />
                            </label>
                            <label class="input input-bordered flex items-center gap-2">
                                Age
                                <input v-model="newMember.age" type="number" class="grow" placeholder="21" />
                            </label>
                        </div>
                        <div class="grid grid-cols-2 gap-x-12 gap-y-4">
                            <p class="font-semibold divider col-span-2">Work information</p>
                            <label class="input input-bordered flex items-center gap-2">
                                Salary
                                <input v-model="newMember.salary" type="number" class="grow" placeholder="8000" />
                            </label>
                            <label class="input input-bordered flex items-center gap-2">
                                Position
                                <input v-model="newMember.position" type="text" class="grow" placeholder="accountant" />
                            </label>
                            <div class="flex items-center gap-4 col-span-2">
                                <label class="text-base">Educational Document</label>
                                <input type="file" @change="handleFileUpload($event, 'educationalDocument')" accept=".pdf" required class="file-input file-input-sm max-w-xs" />
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-x-12 gap-y-4">
                            <p class="font-semibold divider col-span-2">Surety information</p>
                            <label class="input input-bordered flex items-center gap-2">
                                Surety
                                <input v-model="newMember.surety" type="text" class="grow" placeholder="Someone" />
                            </label>
                            <div class="flex items-center gap-4">
                                <label class="text-base">Surety Document</label>
                                <input type="file" @change="handleFileUpload($event, 'suretyDocument')" accept=".pdf" required class="file-input file-input-sm max-w-xs" />
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-x-12 gap-y-4">
                            <p class="font-semibold divider col-span-2">Other information</p>
                            <label class="input input-bordered flex items-center gap-2">
                                Code number
                                <input v-model="newMember.codeNumber" type="text" class="grow" placeholder="we234iow" />
                            </label>
                            <select v-model="newMember.status" class="select select-bordered w-full">
                                <option disabled selected>Status</option>
                                <option>Individual</option>
                                <option>Branch</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary mt-4">Submit</button>
                    </form>
                </div>
            </dialog>
        </div>
        <div class="flex">
            <label class="input input-bordered flex items-center gap-2">
                <input type="text" class="grow" placeholder="Search" />
                <icon name="uil:search"/>
            </label>
        </div>
        <div class="flex flex-col gap-4 items-center overflow-x-auto pb-24 w-[90%] mb-12">
            <table class="table table-zebra bg-white">
                <!-- head -->
                <thead>
                    <tr>
                        <th>N<u>o</u></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Salary</th>
                        <th>Position</th>
                        <th>Surety</th>
                        <th class="text-center">Surety's Document</th>
                        <th class="text-center">Educational Document</th>
                        <th>Code N<u>o</u></th>
                        <th>Status</th>
                        <th class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(member, index) of paginatedMembers" :key="member._id">
                        <th>{{ index + 1 + ((currentPage-1)*3)}}</th>
                        <td>{{ member.name }}</td>
                        <td>{{ member.email }}</td>
                        <td>{{ member.age }}</td>
                        <td>{{ member.salary }}</td>
                        <td>{{ member.position }}</td>
                        <td>{{ member.surety }}</td>
                        <td class="text-center">
                            <a v-if="member.suretyDocument" :href="member.suretyDocument" target="_blank">
                                <icon name="uil:file-alt" class="text-xl"/>
                            </a>
                        </td>
                        <td class="text-center">
                            <a v-if="member.educationalDocument" :href="member.educationalDocument" target="_blank">
                                <icon name="uil:file-alt" class="text-xl"/>
                            </a>
                        </td>

                        <td>{{ member.codeNumber }}</td>
                        <td>{{ member.status }}</td>
                        <td class="flex justify-center">
                            <DropdownMenu :onDelete="handleDelete" :data="member._id" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="join">
                <button 
                    v-for="page in totalPages" 
                    :key="page" 
                    class="join-item btn" 
                    :class="{'btn-primary': currentPage === page}"
                    @click="changePage(page)"
                    >
                    {{ page }}
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import NavSection from '~/components/nav-section.vue';
  import { useMembers } from '~/composables/useMembers';
  
  
  const { members, addMember, fetchMembers, deleteMember } = useMembers();
  const newMember = ref({
    name: '',
    email: '',
    age: 0,
    position: '',
    salary: 0,
    status: 'Individual',
    surety: '',
    suretyDocument: '',
    educationalDocument: '',
    codeNumber: ''
  });

  
// Pagination state
const currentPage = ref(1);
const membersPerPage = 3;

  await fetchMembers();

  // Paginated members
const paginatedMembers = computed(() => {
  const startIndex = (currentPage.value - 1) * membersPerPage;
  const endIndex = currentPage.value * membersPerPage;
  return members.value.slice(startIndex, endIndex);
});

// Total pages
const totalPages = computed(() => {
  return Math.ceil(members.value.length / membersPerPage);
});

// Change the current page
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

  

const handleFileUpload = (event, field) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file); // Convert PDF to Base64

    reader.onload = () => {
      newMember.value[field] = reader.result; // Store Base64 string
    };

    reader.onerror = (error) => {
      console.error('Error converting PDF to Base64:', error);
    };
  }
};

const handleAdd = async () => {
    if (newMember.value.name && newMember.value.email) {
      await addMember(newMember.value);
      newMember.value = {
        name: '',
        email: '',
        age: 0,
        position: '',
        salary: 0,
        status: 'Individual',
        surety: '',
        suretyDocument: '',
        educationalDocument: '',
        codeNumber: ''
      };
    }
  };

  const handleDelete = async (id) => {
    await deleteMember(id);
    console.log("member with id: " + id + " is deleted")
  };
</script>