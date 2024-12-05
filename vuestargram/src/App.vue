<template>
  <div class="header">
    <ul class="header-button-left">
      <li @click="step--">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 1" @click="step = 2">Next</li>
      <li v-if="step == 2" @click="publish">Push</li>
    </ul>
    <img src="./assets/logo.png" class="logo" />
  </div>

  <Container :posts="posts" :step="step" :imageURL="imageURL" @writeString="newString = $event; console.log($event)"/>
  <div class="more">
    <a class="more-button" @click="more">more</a>
  </div>
  <div class="footer">
    <ul class="footer-button-plus">
      <!-- 파일 선택시 확장자 필터링(조회할때만 선택은 가능)하는 속성 : accept="image/*" 혹은 accept="image/png" -->
      <input
        @change="upload"
        multiple
        type="file"
        id="file"
        class="inputfile"
      />
      <label for="file" class="input-plus">+</label>
    </ul>
  </div>
</template>

<script>
import Container from "./components/Container.vue";
import posts from "./assets/posts.js";
import axios from "axios";

export default {
  name: "App",
  components: {
    Container: Container,
  },
  data() {
    return {
      posts: posts,
      numClicked: 0,
      step: 0,
      imageURL: "",
      newString : "write!",
    };
  },
  methods: {
    publish() {
      this.posts.unshift({
        name: "Kim Hyun",
        userImage: "https://picsum.photos/100?random=3",
        postImage: this.imageURL,
        likes: 36,
        date: "May 15",
        liked: false,
        content: this.newString,
        filter: "perpetua",
      });
      this.step = 0;
    },
    upload(e) {
      let imageFile = e.target.files;
      console.log(imageFile[0].name);
      this.imageURL = URL.createObjectURL(imageFile[0]);
      console.log(this.imageURL);
      this.step = 1;
    },
    more() {
      axios
        .get(`https://codingapple1.github.io/vue/more${this.numClicked}.json`)
        .then((result) => {
          // Get요청 성공 시 실행할 코드
          // console.log(result)  // result(object) 의 data 속성에 데이터 서버에서 내보내주는 data있음
          this.posts.push(result.data);
          this.numClicked++;
        })
        .catch(() => {
          // 실패시 실행할 코드
        });
      /* 
      axios
        .post("서버URL", "보낼데이터")
        .then((result) => {
          result.data;
          //POST요청 성공시 실행할 코드~~
        })
        .catch(() => {
          //실패시 실행할 코드
        });
        */
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.more {
  text-align: center;
}
.more-button {
  cursor: pointer;
  color: skyblue;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}
</style>
