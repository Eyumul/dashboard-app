<template>
    <div class="flex flex-col gap-12 items-center">
        <NavSectoin class="sticky top-0 z-50"/>
        <Slideshow/>
        <div class="flex w-[90%]">
            <p class="text-4xl font-bold">Members</p>
            <button onclick="my_modal_3.showModal()" class="btn btn-primary ml-auto">
                <icon class="text-xl" name="uil:plus-circle"/>
                <p>Add Member</p>
            </button>
            <AddMemberForm/>
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
                    <tr v-for="member of members" :key="member._id">
                        <th>{{ member._id }}</th>
                        <td>{{ member.name }}</td>
                        <td>{{ member.email }}</td>
                        <td>{{ member.age }}</td>
                        <td>{{ member.salary }}</td>
                        <td>{{ member.position }}</td>
                        <td>{{ member.surety }}</td>
                        <td class="text-center">
                            <a :href="member.suretyDocument" target="_blank">
                                <icon name="uil:file-alt" class="text-xl"/>
                            </a>
                        </td>
                        <td class="text-center">
                            <a :href="member.educationalDocument" target="_blank">
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
                <button class="join-item btn">1</button>
                <button class="join-item btn btn-primary">2</button>
                <button class="join-item btn">3</button>
                <button class="join-item btn">4</button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
  import { useMembers } from '~/composables/useMembers';
  
  const { members, fetchMembers, deleteMember } = useMembers();
  
  await fetchMembers();
//   onMounted(async () => {
//   });
  

  
  const handleDelete = async (id) => {
    await deleteMember(id);
    console.log("member with id: " + id + " is deleted")
  };
</script>