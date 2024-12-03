<template>
  <div class="black-bg" v-if="modalView == true">
    <div class="white-bg">
      <Discount />
      <img :src="products[index].image" class="room-img" />
      <h4>{{ products[index].title }}</h4>
      <p>{{ products[index].content }}</p>
      <!-- $event : JavaScript의 event리스너, 호출함수 파라미터 e와 같은 역할 -->
      <!-- <input @input="month = $event.target.value"> -->
      <input v-model="month" /><!--더 간편한 버전-->
      <!--input 입력값 숫자여도 문자취급 당함, 숫자로 받지 않으면 +연산에서 문자+문자로 숫자연산되지 않음-->
      <!-- 숫자로 받아야할 때 : <input v-model.number="month"> -->
      <input type="checkbox" v-model="month" />
      <p>{{ month }}개월 선택함 : {{ products[index].price * month }}원</p>
      <button @click="$emit('closeModal')">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      month: "",
      // 초기 값에 따라 입력값 예상함 (숫자 초기값 설정 시 문자로 재할당 불가)
    };
  },
  watch: { 
    month(a){
      // if (typeof a == 'string'){
        if (a !== '' && !/^\d+$/.test(a)) {
        // 숫자가 아닌 문자가 포함되면 필터링
        alert('숫자만');
        this.month = 1;
      }
    }
  },
  beforeUpdate(){
    if(this.month >= 13){
      alert('12개월까지 입력해주세요.');
      this.month = 12;
    }
    if(this.month < 1){
      alert('최소 1개월부터 가능합니다.');
      this.month = 1;
    }
  },
  props: {
    products: Array,
    modalView: Boolean,
    index: Number,
  },
};
</script>

<style></style>
