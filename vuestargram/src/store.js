import { createStore } from 'vuex'
import axios from 'axios'
// mitt 등록 된 전역변수는 vue 컴포넌트 안에서만 사용 가능

const store = createStore({
    state(){
        return {
            likes : [56, 12, 34, 78],
            liked : [false,false,false,false,false],
            more : {},
            name : '나비',

        }
    },
    mutations: {// 동기적 - UI 등 상태변경
        changeName(state, data){
            state.name = data;
        },
        more(state, data){
            state.more = data;
        },
        toggle(state, index){
            if(state.liked[index] == false){
                state.likes[index]++;
                state.liked[index] = true;
            }else{
                state.likes[index]--;
                state.liked[index] = false;
            }
        }
    },
    actions:{// 비동기적 - 서버나 외부 API로부터 데이터 받아올 때
        getData(context){
        axios
        .get("https://codingapple1.github.io/vue/more0.json")
        .then((result) => {
          context.commit('more', result.data)
        })
        .catch(() => {
          // 실패시 실행할 코드
        });
        }
    }
})

export default store;