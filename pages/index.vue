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
            <MemberForm/>
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
                    <tr v-for="tableData of data" :key="tableData.id">
                        <th>{{ tableData.id }}</th>
                        <td>{{ tableData.name }}</td>
                        <td>{{ tableData.email }}</td>
                        <td>{{ tableData.age }}</td>
                        <td>{{ tableData.salary }}</td>
                        <td>{{ tableData.position }}</td>
                        <td>{{ tableData.surety }}</td>
                        <td class="text-center">
                            <a :href="tableData.suretyDocument" target="_blank">
                                <icon name="uil:file-alt" class="text-xl"/>
                            </a>
                        </td>
                        <td class="text-center">
                            <a :href="tableData.educationalDocument" target="_blank">
                                <icon name="uil:file-alt" class="text-xl"/>
                            </a>
                        </td>
                        <td>{{ tableData.codeNumber }}</td>
                        <td>{{ tableData.status }}</td>
                        <td class="flex justify-center">
                            <DropdownMenu :onEdit="handleEdit" :onDelete="handleDelete" :data="tableData" />
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
import { useMemberData } from "~/composables/useMemberData";
const { data } = useMemberData();

// Handle edit and delete actions, now accepting the data parameter
const handleEdit = (data) => {
  alert("Editing member: " + data.id); // Replace with your actual edit logic
};

const handleDelete = (data) => {
  alert("Deleting member: " + data.id); // Replace with your actual delete logic
};
</script>