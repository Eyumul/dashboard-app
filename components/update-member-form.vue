<template>
    <div>
        <dialog id="my_modal_4" class="modal">
            <div class="modal-box w-11/12 px-12 py-8 h- max-w-5xl">
                <form method="dialog">
                <button class="btn text-xl btn-square btn-sm btn-ghost absolute right-8 top-6">✕</button>
                </form>
                <h3 class="text-3xl font-bold">Add New Member</h3>
                <form v-for="member in members" :key="member._id" @submit.prevent="editted" :class="{'flex flex-col gap-4 mt-10' :  member._id == id}">
                    <div v-if="member._id == id" class="grid grid-cols-2 gap-x-10 gap-y-4">
                        <p class="font-semibold divider col-span-2">Personal information</p>
                        <label class="input input-bordered flex items-center gap-2">
                            Name
                            <input @blur="handleUpdate(member._id, member)" v-model="member.name" type="text" class="grow" placeholder="Alex" />
                        </label>
                        <label class="input input-bordered flex items-center gap-2">
                            Email
                            <input @blur="handleUpdate(member._id, member)" v-model="member.email" type="text" class="grow" placeholder="alex@example.com" />
                        </label>
                        <label class="input input-bordered flex items-center gap-2">
                            Age
                            <input @blur="handleUpdate(member._id, member)" v-model="member.age" type="number" class="grow" placeholder="21" />
                        </label>
                    </div>
                    <div v-if="member._id == id" class="grid grid-cols-2 gap-x-12 gap-y-4">
                        <p class="font-semibold divider col-span-2">Work information</p>
                        <label class="input input-bordered flex items-center gap-2">
                            Salary
                            <input @blur="handleUpdate(member._id, member)" v-model="member.salary" type="number" class="grow" placeholder="8000" />
                        </label>
                        <label class="input input-bordered flex items-center gap-2">
                            Position
                            <input @blur="handleUpdate(member._id, member)" v-model="member.position" type="text" class="grow" placeholder="accountant" />
                        </label>
                        <label class="input input-bordered flex items-center gap-2">
                            Educational document
                            <input @blur="handleUpdate(member._id, member)" v-model="member.educationalDocument" type="text" class="grow" placeholder="accountant" />
                        </label>
                        <!-- <div class="flex items-center gap-4 col-span-2">
                            <label class="text-base">Educational Document</label>
                            <input @blur="handleUpdate(member._id, member)" v-model="member.educationalDocument" type="file" class="file-input file-input-sm max-w-xs" />
                        </div> -->
                    </div>
                    <div v-if="member._id == id" class="grid grid-cols-2 gap-x-12 gap-y-4">
                        <p class="font-semibold divider col-span-2">Surety information</p>
                        <label class="input input-bordered flex items-center gap-2">
                            Surety
                            <input @blur="handleUpdate(member._id, member)" v-model="member.surety" type="text" class="grow" placeholder="Someone" />
                        </label>
                        <label class="input input-bordered flex items-center gap-2">
                            Surety Document
                            <input @blur="handleUpdate(member._id, member)" v-model="member.suretyDocument" type="text" class="grow" placeholder="Someone" />
                        </label>
                        <!-- <div class="flex items-center gap-4">
                            <label class="text-base">Surety Document</label>
                            <input @blur="handleUpdate(member._id, member)" v-model="member.suretyDocument" type="file" class="file-input file-input-sm max-w-xs" />
                        </div> -->
                    </div>
                    <div v-if="member._id == id" class="grid grid-cols-2 gap-x-12 gap-y-4">
                        <p class="font-semibold divider col-span-2">Other information</p>
                        <label class="input input-bordered flex items-center gap-2">
                            Code number
                            <input @blur="handleUpdate(member._id, member)" v-model="member.codeNumber" type="text" class="grow" placeholder="we234iow" />
                        </label>
                        <select @blur="handleUpdate(member._id, member)" v-model="member.status" class="select select-bordered w-full">
                            <option disabled selected>Status</option>
                            <option>Individual</option>
                            <option>Branch</option>
                        </select>
                    </div>
                    <button v-if="member._id == id" type="submit" class="btn btn-primary mt-4">Submit</button>
                </form>
            </div>
        </dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
  import { useMembers } from '~/composables/useMembers';

  defineProps({
  id: String, // Receive the data object for each table row
});
  
  
  const { members, fetchMembers, updateMember } = useMembers();
  
  await fetchMembers();
//   onMounted(async () => {
//   });
  
  function editted (){
    alert('edit complete')
  }
  const handleUpdate = async (id, updatedMember) => {
    if (updatedMember.name && updatedMember.email) {
      await updateMember(id, updatedMember);
    }
  };
</script>

<style scoped>

</style>