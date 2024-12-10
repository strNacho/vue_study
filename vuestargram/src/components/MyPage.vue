<template>
  <div style="padding: 10px">
    <h4>팔로워</h4>
    <input placeholder="search" v-model="searchQeury" />
    <div class="post-header" v-for="(follower, i) in followers" :key="i">
      <div class="profile" :style="`background-image:url(${follower.image})`"></div>
      <span class="profile-name">{{ follower.name }}</span>
    </div>
  </div>
</template>

<!-- 
***********************************
<script setup>
import { ref } from 'vue'
let follower = ref([1,2,3])
</script> 

*******위 아래 동일한 동작*********

<script>
import { ref } from 'vue';

export default {
    name : 'MyPage',
    setup(){
      // Composition API 식으로 데이터만드는 법

      //var 데이터이름 = ref(데이터)
      let follower = ref([]);
      return {follower}
    }
};
</script>
***********************************

-->

<script>
import { computed, onMounted, ref, toRefs } from "vue";
import axios from "axios";
import { useStore } from "vuex";

export default {
  name: "MyPage",
  props: {
    propsTest: Number,
  },
  setup(props) {
    // Composition API 식으로 데이터만드는 법

    //var 데이터이름 = ref(데이터)
    let followers = ref([]); // reactive()도 가능
    // ref → primitive (Object, Array 제외한 나머지 자료형)
    // reactive → Object, Array (ref로 해도 상관은 없음)

    // setup 함수 안에서는 this가 없기 때문에 app.config.globalProperties로 등록한 axios에 직접 접근할 수 없음
    // inject를 사용하거나 import를 해야 합
    // this.axios.get('/followers.json').then((a)=>{
    // follower.value = a.data

    // 프롭스 사용법
    let { propsTest } = toRefs(props);
    // console.log(propsTest);
    console.log(propsTest.value);

    // computed() 사용법
    let re = computed(() => {
      return followers.value.length;
    });
    console.log(re.value); // axios 호출 전

    const store = useStore(); // import 해야 사용 가능
    console.log(store.state.name);
    store.commit("changeName", "쵸쵸");
    console.log(store.state.name);
    //mapState는 Vue 2의 Options API에서 주로 사용되므로, Vue 3에서는 useStore로 대체하는 것이 더 일반적

    // setup()은 created와 같은 LifeCycle임으로 위 코드는 먼저 실행 됨
    // aixos 호출 전후 re 변수의 값으로 확인가능
    onMounted(() => {
      axios.get("/followers.json").then((a) => {
        followers.value = a.data;

        // Life Cycle 실행 순서
        re = computed(() => {
          return followers.value.length;
        });
        console.log(re.value); //5
      });
    });
    return { followers };
  },
};
</script>

<style>
/* 스타일은 다른 곳에서 정의된 class 적용 가능 */
/* build 시 Vue가 Style태그를 하나로 합치기 때문 */
/* style 태그가 있는 컴포넌트에만 적용하고 싶다면 : <style scoped> 사용 */
</style>
