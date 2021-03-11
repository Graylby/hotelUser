<template>
    <div>
        <van-field v-model="username" label="文本" placeholder="" />
        <van-field v-model="password" label="文本" placeholder="" />
        <van-button block type="primary" @click="onClick">登录</van-button>
    </div>
</template>

<script>
    import {login} from "../api/login";
    import store from "../store";
    import {setToken,setRefreshToken} from "../utils/auth";
    import router from '../router/index'

    export default {
        name: "login",
        data(){
            return{
                username:'',
                password:''
            }
        },
        methods:{
            onClick(){
                login({
                    username:this.username,
                    password:this.password,
                }).then((res)=>{
                    console.log(res);
                    const {token,refreshToken} = res.data;
                    store.commit('setToken',token);
                    setToken(token);
                    store.commit('setRefreshToken',refreshToken);
                    setRefreshToken(refreshToken);
                    router.push({path:'/'})
                })
            }
        }
    }
</script>

<style scoped>

</style>
