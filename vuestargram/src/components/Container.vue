<template>
  <!-- 포스트 -->
  <div v-if="step == 0">
    <Post v-for="(posting, i) in posts" :key="i" :index="i" :posting="posting" />
  </div>

  <!-- 필터선택페이지 -->
  <div v-if="step == 1">
    <div :class="`${filterApplied} upload-image`" :style="`background-image:url(${imageURL})`"></div>
    <div class="filters">
      <FilterBox v-for="filter in filters" :key="filter" :imageURL="imageURL" :filter="filter">
        <!-- slot문법 -->
        <template v-slot>{{filter}}</template>
        <!-- 추가 사용법 -->
        <!-- v-slot:a 라고 지정 시 자식 컴포넌트 slot태그 속성 name과 바인딩 -->
        <!-- 자식이 부모에게 전달 시 -->
        <!-- [child] slot 태그에서 v-bind로 데이터 전달(:data="data")-->
        <!-- [Parent] template 태그에서 v-slot:default="작명, 태그 내 {{ 작명.data }}로 바인딩"-->
      </FilterBox>
    </div>
    <!-- <div class="filter-1"></div>
    <div class="filter-1"></div>
    <div class="filter-1"></div>
    <div class="filter-1"></div>
    <div class="filter-1"></div> -->
  </div>

  <!-- 글작성페이지 -->
  <div v-if="step == 2">
    <div :class="`${filterApplied} upload-image`" :style="`background-image:url(${imageURL})`"></div>
    <div class="write">
      <textarea class="write-box" @input="writeString">write!</textarea>
    </div>
  </div>

  <div v-if="step == 3">
    <MyPage :propsTest="1"/>
  </div>
</template>

<script>
import Post from "./Post.vue";
import FilterBox from "./FilterBox.vue";
import MyPage from "./MyPage.vue";

export default {
  name: "Container",
  data(){
    return{
      filters: [ "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", 
      "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", 
      "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"],
    }
  },
  emits:["writeString"],
  props: {
    posts: Array,
    step: Number,
    imageURL: String,
    newString: String,
    filterApplied: String,
  },
  components: {
    Post : Post,
    FilterBox : FilterBox,
    MyPage : MyPage,
  },
  methods : {
    writeString(e){
      this.$emit('writeString', e.target.value)
    }
  }
};
</script>

<style>
.upload-image {
  width: 100%;
  height: 450px;
  background: white;
  background-size: cover;
}
.filters {
  overflow-x: scroll;
  white-space: nowrap;
}
.filter-1 {
  width: 100px;
  height: 100px;
  background-color: cornflowerblue;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
}
.filters::-webkit-scrollbar {
  height: 5px;
}
.filters::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.filters::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}
.filters::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.write-box {
  border: none;
  width: 90%;
  height: 100px;
  padding: 15px;
  margin: auto;
  display: block;
  outline: none;
}
</style>
