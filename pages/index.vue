<template>
  <section>
    <h1>Hello world!</h1>

    <UInput v-model="githubUsername" />
  </section>
</template>

<script setup>
const githubUsername = ref('ejfox')

onMounted(() => {

  const data = await $fetch('/api/github', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      content: githubUsername.value
    }
  })

})

</script>

<style></style>
