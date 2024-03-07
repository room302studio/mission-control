<template>
  <section>
    <h1>Hello world!</h1>


    

    <div class="w-1/2">
        <UInput v-model="githubUsername" />
      </div>
    <section class="flex">
      

      <div class="w-1/4">
        <h2>Repos</h2>
        <UTable :rows="repos" />
      </div>

      <div class="w-1/4">
        <h2>PRs</h2>
        <UTable :rows="prs" />
      </div>

      <div class="w-1/4">
        <h2>Branches</h2>
        <UTable :rows="branches" />
      </div>

      <div class="w-1/4">
        <h2>Milestones</h2>
        <UTable :rows="milestones" />
      </div>
    </section>

    <div class="w-full max-h-96 overflow-y-auto p-8">
      <VueJsonPretty :data="rawData" />
    </div>
  </section>
</template>

<script setup>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

const rawData = ref(null)
const githubUsername = ref('room302studio')
const repos = ref([])
const prs = ref([])
const branches = ref([])
const milestones = ref([])

onMounted(async () => {

  const {data} = await $fetch('/api/github', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      username: githubUsername.value
    }
  })
  rawData.value = data

  repos.value = data.repos
  prs.value = data.prs
  branches.value = data.branches
  milestones.value = data.milestones

})

</script>

<style></style>
