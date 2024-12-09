<template>
  <div class="post">
    <div class="post-header">
      <div class="profile" :style="{ backgroundImage : `url(${posting.userImage})` }"></div>
      <span class="profile-name">{{ posting.name }}</span>
    </div>
    <div @click="likeToggle" :class="`${posting.filter} post-body`" :style="{ backgroundImage : `url(${posting.postImage})` }"></div>
    <div class="post-content">
      <!-- <p>{{ posting.likes }} Likes</p> -->
      <p>{{ $store.state.likes[index] }} Likes</p>

      <p><strong>{{ posting.name }}</strong> {{ posting.content }}</p>
      <p class="date">{{ posting.date }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    posting : Object,
    index: Number,
  },
  methods:{
    likeToggle(){
      console.log(this.$store.state.liked);
      // vuex mutations에 선언한 함수 사용
      this.$store.commit('toggle', this.index);
    }
  },
};
</script>

<style>
.post {
  width: 100%;
}
.profile {
  background-image: url("");
  width: 30px;
  height: 30px;
  background-size: 100%;
  border-radius: 50%;
  float: left;
}
.profile-name {
  display: block;
  float: left;
  padding-left: 10px;
  padding-top: 7px;
  font-size: 14px;
}
.post-header {
  height: 30px;
  padding: 10px;
}
.post-body {
  background-image: url("");
  height: 450px;
  background-position: center;
  background-size: cover;
}
.post-content {
  padding-left: 15px;
  padding-right: 15px;
  font-size: 14px;
}
.date {
  font-size: 11px;
  color: grey;
  margin-top: -8px;
}
</style>
