<template>
<div class="text-xs p-4 border border-gray-400">
  <!-- <pre class="w-96 h-96">{{repo}}</pre> -->
  <h2 class="text-lg">{{repo.full_name}}</h2>

  <!-- if there are any milestones -->
  <div v-if="repo.milestones.length">
    <h2>Milestones</h2>
    <!-- <UTable :rows="repo.milestones" /> -->
    <div v-for="milestone in repo.milestones" :key="milestone.title">
      <span class="text-gray-500">{{milestone.title}}</span>
      {{milestone.open_issues}} open
      {{milestone.closed_issues}} closed
      <!-- super-lightweight viz of the milestone status -->
      <div class="flex">
        <div class="w-full rounded bg-primary-500 h-2">
          <div class="bg-gray-200 rounded h-2" :style="{width: milestone.open_issues / milestone.closed_issues * 100 + '%'}"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- if there are any PRs -->
  <div v-if="repo.prs.length">
    <h2>PRs</h2>
    <div v-for="pr in repo.prs" :key="pr.id">
      <!-- pr # -->
      <span class="text-gray-500 mr-2">#{{pr.number}}</span>
      <a 
      class="text-primary-500 py-2"
      :href="pr.html_url">{{pr.title}}</a>
      <!-- author -->
      <span class="ml-2 text-gray-500 dark:text-gray-700">{{pr.user.login}}</span>
    </div>
  </div>

  <!-- if there are any branches -->
  <div v-if="repo.branches.length">
    <h2>Branches</h2>
    
    <div v-for="branch in repo.branches" :key="branch.name">
      <span class="text-gray-500">{{branch.name}}</span>
    </div>
  </div>


</div>
</template>
<script setup>
const props = defineProps({
  repo: {
    type: Object,
    required: true
  }
})
</script>