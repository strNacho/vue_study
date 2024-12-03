import { createWebHistory, createRouter } from 'vue-router';
import List from './components/List.vue'
import Home from './components/Home.vue'
import Detail from './components/Detail.vue'
import Author from './components/Author.vue'
import Comment from './components/Comment.vue'
import NotFound from './components/NotFound.vue';

const routes = [
    {
        path : '/list',
        component : List,
    },
    {
        path : '/home',
        component : Home
    },
    {
        path : '/detail/:id',
        component : Detail,
        children : [
            { path : 'author', component : Author },
            { path : 'comment', component : Comment }
        ]
    },
    {
        path : '/',
        component : Home
    },
    {
        path : '/:anything(.*)',
        component : NotFound,
        // Navigation guard : 로그인 검증 등에 사용, 
        // View 컴포넌트 안에서도 created() mounted()와 비슷하게 사용 가능 
        // beforeEnter(to, from, next) {
        //     next();
        // },
    }

]
// createWebHistory는 서버와 함께 사용 
//  (서버에 라우팅 페이지 없으면 404) 혹은 (클라이언트 사이드에서 라우팅되도록 서버 설정 필요)
// 서버없이 사용시 (클라이언트 사이드에서만 라우팅 할 때) creaetWebHashHistory
const router = createRouter({
        history : createWebHistory(),
        routes,
    });

// 여러개의 routes에 Navigation Guard 일괄 적용 시 
// router.beforeEach((to, from) => {
// })

export default router;