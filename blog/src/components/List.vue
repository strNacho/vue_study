<template>
  
  <div v-for="post in posts" :key="post.number">
    <h5 @click="$router.push(`/detail/${post.number}`)">{{ post.title }}</h5>
    <p>{{ post.date }}</p>
  </div>
</template>

<script>
export default {
name : 'List',
props : {
    posts : Array,
}
}
</script>

<style>

</style>
