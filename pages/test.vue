<template>
    <div class="p-8">
      <h1 class="text-2xl font-bold mb-4">Nuxt 3 CRUD Example with MongoDB</h1>
  
      <!-- Add Member Form -->
      <form @submit.prevent="handleAdd">
        <input v-model="newMember.name" placeholder="Name" class="p-2 border" />
        <input v-model="newMember.email" placeholder="Email" class="p-2 border" />
        <input v-model="newMember.age" placeholder="Age" class="p-2 border" type="number" />
        <input v-model="newMember.position" placeholder="Position" class="p-2 border" />
        <input v-model="newMember.salary" placeholder="Salary" class="p-2 border" type="number" />
        <select v-model="newMember.status" class="p-2 border">
          <option value="Individual">Individual</option>
          <option value="Branch">Branch</option>
        </select>
        <input v-model="newMember.surety" placeholder="Surety" class="p-2 border" />
        <input v-model="newMember.suretyDocument" placeholder="Surety Document" class="p-2 border" />
        <input v-model="newMember.educationalDocument" placeholder="Educational Document" class="p-2 border" />
        <input v-model="newMember.codeNumber" placeholder="Code Number" class="p-2 border" />
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 ml-2">Add Member</button>
      </form>
  
      <!-- Display Members -->
      <ul class="mt-4">
        <li v-for="member in members" :key="member._id" class="flex justify-between mb-2">
            <div v-if="member._id == '67a2480bafceb25c3c8122f5'" class="border-2 border-green-500">
                <input
                  v-model="member.name"
                  @blur="handleUpdate(member._id, member)"
                  class="border p-1"
                />
                <input
                  v-model="member.email"
                  @blur="handleUpdate(member._id, member)"
                  class="border p-1"
                />
                <input
                  v-model="member.age"
                  @blur="handleUpdate(member._id, member)"
                  class="border p-1"
                  type="number"
                />
                <input
                  v-model="member.position"
                  @blur="handleUpdate(member._id, member)"
                  class="border p-1"
                />
                <input
                  v-model="member.salary"
                  @blur="handleUpdate(member._id, member)"
                  class="border p-1"
                  type="number"
                />
                <input
                  v-model="member.status"
                  @blur="handleUpdate(member._id, member)"
                  class="border p-1"
                />
                <input
                  v-model="member.surety"
                  @blur="handleUpdate(member._id, member)"
                  class="border p-1"
                />
                <input
                  v-model="member.suretyDocument"
                  @blur="handleUpdate(member._id, member)"
                  class="border p-1"
                />
                <input
                  v-model="member.educationalDocument"
                  @blur="handleUpdate(member._id, member)"
                  class="border p-1"
                />
                <input
                  v-model="member.codeNumber"
                  @blur="handleUpdate(member._id, member)"
                  class="border p-1"
                />
                <button @click="handleDelete(member._id)" class="text-red-500">Delete</button>
            </div>
        </li>
      </ul>
      {{ members }}
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
  const { members, fetchMembers, addMember, updateMember, deleteMember } = useMembers();
  
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
  
  const handleUpdate = async (id, updatedMember) => {
    if (updatedMember.name && updatedMember.email) {
      await updateMember(id, updatedMember);
    }
  };
  
  const handleDelete = async (id) => {
    await deleteMember(id);
    console.log("deleted")
  };
  </script>
  