<template>
    <div>
        <dialog id="my_modal_3" class="modal">
            <div class="modal-box w-11/12 px-12 py-8 h- max-w-5xl">
                <form method="dialog">
                <button class="btn text-xl btn-square btn-sm btn-ghost absolute right-8 top-6">✕</button>
                </form>
                <h3 class="text-3xl font-bold">Add New Member</h3>
                <div class="flex flex-col gap-4 mt-10">
                    <div class="grid grid-cols-2 gap-x-10 gap-y-4">
                        <p class="font-semibold divider col-span-2">Personal information</p>
                        <label class="input input-bordered flex items-center gap-2">
                            Name
                            <input type="text" class="grow" placeholder="Alex" />
                        </label>
                        <label class="input input-bordered flex items-center gap-2">
                            Email
                            <input type="text" class="grow" placeholder="alex@example.com" />
                        </label>
                        <label class="input input-bordered flex items-center gap-2">
                            Age
                            <input type="number" class="grow" placeholder="21" />
                        </label>
                    </div>
                    <div class="grid grid-cols-2 gap-x-12 gap-y-4">
                        <p class="font-semibold divider col-span-2">Work information</p>
                        <label class="input input-bordered flex items-center gap-2">
                            Salary
                            <input type="number" class="grow" placeholder="8000" />
                        </label>
                        <label class="input input-bordered flex items-center gap-2">
                            Position
                            <input type="text" class="grow" placeholder="accountant" />
                        </label>
                        <div class="flex items-center gap-4 col-span-2">
                            <label class="text-base">Educational Document</label>
                            <input type="file" class="file-input file-input-sm max-w-xs" />
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-x-12 gap-y-4">
                        <p class="font-semibold divider col-span-2">Surety information</p>
                        <label class="input input-bordered flex items-center gap-2">
                            Surety
                            <input type="text" class="grow" placeholder="Someone" />
                        </label>
                        <div class="flex items-center gap-4">
                            <label class="text-base">Surety Document</label>
                            <input type="file" class="file-input file-input-sm max-w-xs" />
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-x-12 gap-y-4">
                        <p class="font-semibold divider col-span-2">Other information</p>
                        <label class="input input-bordered flex items-center gap-2">
                            Code number
                            <input type="text" class="grow" placeholder="we234iow" />
                        </label>
                        <select class="select select-bordered w-full">
                            <option disabled selected>Status</option>
                            <option>Individual</option>
                            <option>Branch</option>
                        </select>
                    </div>
                    <button class="btn btn-primary mt-4">Submit</button>
                </div>
            </div>
        </dialog>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>