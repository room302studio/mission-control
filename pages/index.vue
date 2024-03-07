<template>
  <section>
    <h1>Hello world!</h1>


    

    <div class="w-1/2">
        <UInput v-model="githubUsername" />
      </div>

      <h2>Repos</h2>
    <div class="">
      
      <div v-for="repo in rawData"
      class="w-1/3 overflow-hidden inline-block align-top"
      >
        <RepoSummary :repo="repo" />
      </div>
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

    <div class="w-full 96 overflow-y-auto p-8">
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

const pollFrequency = 1000 * 60 // 1 minute


async function fetchLatestGithubInfo() {
  console.log(`fetching latest github info for ${githubUsername.value}`)
  const {data} = await $fetch('/api/github', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      username: githubUsername.value
    }
  })
  rawData.value = data.combinedRepoData

  repos.value = data.repos
  prs.value = data.prs
  branches.value = data.branches
  milestones.value = data.milestones
}

onMounted(async () => {

  await fetchLatestGithubInfo()
  pollResume()

})

const { pause: pollPause, resume: pollResume, isActive: pollActive } = useIntervalFn(() => {
  fetchLatestGithubInfo()  
}, pollFrequency)

</script>

<style></style>
