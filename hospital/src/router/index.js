import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home.vue'
import Login from '../views/login.vue'
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: '酒店预订',
        component: Home,
        meta: {
            title: '首页',
            isMenu: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '登录',
        }
    },
    {
        path: '/order',
        name: 'Order',
        component: () => import('../views/order.vue'),
        meta: {
            title: '店内服务',
            isMenu: true
        }
    },
    {
        path: '/me',
        name: 'Me',
        component: () => import('../views/me.vue'),
        meta: {
            title: '我的',
            isMenu: true
        }
    },
    {
        path: '/infoInput',
        name: 'infoInput',
        component: () => import('../views/infoInput'),
        meta: {
            title: '我的',
            isMenu: false
        }
    },
    {
        path: '/search',
        name: '/search',
        component: () => import('../views/search'),
        title: '我的',
        isMenu: false
    },
    {
        path: '/hotel',
        name: '/hotel',
        component: () => import('../views/hotelDetails'),
        title: '旅店详情',
        isMenu: false
    },
    {
        path: '/store',
        name: '/store',
        component: () => import('../views/store'),
        title: '店内商店',
        isMenu: false
    },
    {
        path: '/faceInput',
        name: '/faceInput',
        component: () => import('../views/faceInput1'),
        title: '人脸录入',
        isMenu: false
    },
    {
        path: '/test',
        name: '/test',
        component: () => import('../views/panorama/panorama.vue'),
        title: 'test',
        isMenu: false
    },


]

const router = new VueRouter({
    mode: 'hash',
    routes
})

router.beforeEach((to, from, next)=>{

    if(to.name!=='login'){
        if(store.state.token===''){
            next({name:'login'})
        }
    }
    next();
});

export default router
