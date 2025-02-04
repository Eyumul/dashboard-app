<template>
    <div>
        <dialog id="my_modal_3" class="modal">
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
                        <label class="input input-bordered flex items-center gap-2">
                            Educational document
                            <input v-model="newMember.educationalDocument" type="text" class="grow" placeholder="accountant" />
                        </label>
                        <!-- <div class="flex items-center gap-4 col-span-2">
                            <label class="text-base">Educational Document</label>
                            <input v-model="newMember.educationalDocument" type="file" class="file-input file-input-sm max-w-xs" />
                        </div> -->
                    </div>
                    <div class="grid grid-cols-2 gap-x-12 gap-y-4">
                        <p class="font-semibold divider col-span-2">Surety information</p>
                        <label class="input input-bordered flex items-center gap-2">
                            Surety
                            <input v-model="newMember.surety" type="text" class="grow" placeholder="Someone" />
                        </label>
                        <label class="input input-bordered flex items-center gap-2">
                            Surety Document
                            <input v-model="newMember.suretyDocument" type="text" class="grow" placeholder="Someone" />
                        </label>
                        <!-- <div class="flex items-center gap-4">
                            <label class="text-base">Surety Document</label>
                            <input v-model="newMember.suretyDocument" type="file" class="file-input file-input-sm max-w-xs" />
                        </div> -->
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
  import { useMembers } from '~/composables/useMembers';
  
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
  const { fetchMembers, addMember} = useMembers();
  
  await fetchMembers();
//   onMounted(async () => {
//   });
  
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
</script>

<style scoped>

</style>