<template>
    <!-- 반복문 -->
    <div>
    <img :src="room.image" class="room-img">
    <!-- <h4 @click="modalView = true; index = j;"> --><!-- props는 Read Only -->
    <h4 @click="send"><!--부모 컴포넌트에게 (메세지, data) 보내기-->
      {{ room.title }}
    </h4>
    <p>{{ room.price }}원</p>
  </div>

</template>

<script>
export default {
    name: 'Card',
    props: {
        room: Object,
    },
    methods:{
        send(){
            this.$emit('openModal', this.room.id)
            // 에러주의 : this 붙여야 함 
        }
    }

}
</script>

<style>

</style>