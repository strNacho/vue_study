<template>
<NavBar/>

<!-- <List v-for="post in posts" :key="post.number" :post="post"/> -->
<div class="mt-4">
  <router-view :posts="posts"></router-view>
</div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import posts from './assets/posts'

export default {
  name: 'App',
  components: {
    NavBar : NavBar,
  },
  data(){
    return {
      posts : posts
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
