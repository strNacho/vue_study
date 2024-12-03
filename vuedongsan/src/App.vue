<template>
  <!-- 애니메이션 효과 -->
  <!-- <div :class="{ 클래스명 : true }"></div> -->
  <!-- <div :class="{ 클래스명 : modalView }"></div> -->
  <Transition name="fade">
    <!-- Props : 데이터 넘겨주기 -->
    <Modal
      @closeModal="modalView = false"
      :products="products"
      :index="index"
      :modalView="modalView"
    />
  </Transition>

  <!-- Navigation bar -->
  <div class="menu">
    <a v-for="(menuItem, i) in menus" :key="i">{{ menuItem }}</a>
  </div>

  <!-- Component : 반복되는 요소에 사용하는 문법 -->
  <Transition name="fade">
    <Discount v-if="timeOut == true" :discountQTY="discountQTY" />
  </Transition>

  <button @click="priceSort">가격순</button>
  <button @click="nameSort">이름순</button>
  <button @click="sortBack">되돌리기</button>

  <!-- 반복문과 Props 함께 사용, Cusotm Event : @이벤트메세지 수신 -->
  <Card
    v-for="room in products"
    :key="room.id"
    :room="room"
    @openModal="
      modalView = true;
      index = $event;
    "
  />
</template>

<script>
import data from "./assets/oneroom";
import Discount from "./Discount.vue";
import Modal from "./Modal.vue";
import Card from "./Card.vue";

export default {
  name: "App",
  data() {
    return {
      index: 0,
      menus: ["Home", "Shop", "About"],
      price: ["50", "60", "70"],
      product: ["역삼동원룸", "천호동원룸", "마포구원룸"],
      modalView: false,
      products: [...data],
      productsOriginal: data,
      btnState: false,
      timeOut: true,
      discountQTY: 30,
    };
  },
  methods: {
    priceSort() {
      // sort()는 원본 데이터 변경
      // this.products.sort(function(a,b){
      //   return a.price - b.price
      //})
      this.btnState = !this.btnState;

      if (this.btnState) {
        this.products.sort(function (a, b) {
          return a.price - b.price;
        });
      } else {
        this.products.sort(function (a, b) {
          return b.price - a.price;
        });
      }
    },
    nameSort() {
      this.products.sort(function (a, b) {
        return a.name > b.name ? 1 : -1;
      });
    },
    sortBack() {
      this.products = [...this.productsOriginal];
    },
  },
  mounted() {
    setTimeout(() => {
      this.timeOut = false;
    }, 30000);
    setInterval(() => {
      this.discountQTY--;
    }, 1000);
  },
  components: {
    Discount: Discount,
    Modal: Modal,
    Card: Card,
  }
};
</script>

<style>
body {
  margin: 0;
}

div {
  box-sizing: border-box;
}

.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
  margin: 0px;
}

.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}

.room-img {
  width: 100%;
  margin: 20px 10px;
}

#app {
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  color: #2c3e50;
}

.menu {
  background: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}
.menu a {
  color: white;
  padding: 10px;
}

/* transition 태그 사용시 */
/* 창 열릴 때 */
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
/* 창 닫힐 때 */
.fade-leave-from {
  opacity: 1;
}
.fade-leave-active {
  transition: all 1s;
}
.fade-leave-to {
  opacity: 0;
}
</style>
