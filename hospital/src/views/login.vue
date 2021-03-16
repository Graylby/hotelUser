<template>
    <div id="login">
        <van-form
                @submit="onSubmit">
            <div class="box">
                <div style="border-radius: 5px">
                    <van-cell title="欢迎使用智能酒店系统" size="large"/>
                    <van-field
                            size="large"
                            v-model="username"
                            name="用户名"
                            label="用户名"
                            placeholder="用户名"
                            :rules="[{ required: true, message: '请填写用户名' }]"
                    />
                    <van-field
                            size="large"
                            v-model="password"
                            type="password"
                            name="密码"
                            label="密码"
                            placeholder="密码"
                            :rules="[{ required: true, message: '请填写密码' }]"
                    />
                </div>

                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">登陆</van-button>
                </div>
            </div>
        </van-form>
<!--        <van-field v-model="username" label="文本" placeholder="" />-->
<!--        <van-field v-model="password" label="文本" placeholder="" />-->
<!--        <van-button block type="primary" @click="onClick">登录</van-button>-->
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
                username:'zqazqazqa1',
                password:'zqazqazqa1',
                note:{
                    backgroundImage:"url("+require("../components/images/back.png")+")",
                }
            }
        },
        methods:{
            onSubmit(){
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
    body{
        background-image: url("../components/images/back.png");
    }
.box{
    width: 80vw;
    margin: 30vh 10vw;
    border-radius: 4px;
}
    #login {
        background-image: url("../components/images/back.png");
        background-position: center;
        height: 100%;
        width: 100%;
        background-size: cover;
        position: fixed;
    }

</style>
