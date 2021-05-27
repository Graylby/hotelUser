<template>
  <div class="wrap">
    <header-top :is-return="false" title="我的"/>
    <div class="content">
<!--      <personal-info/>-->
<!--      <menu-button @click="changTab(0)" name="疫情信息登记"/>-->
<!--      <menu-button name="人脸录入"/>-->
<!--      <menu-button name="退出"/>-->
      <van-cell-group style="margin: 3vh 16px;border-radius: 5px">
        <van-cell class="c1" title="疫情信息登记" is-link to="infoInput"/>
        <van-cell class="c1" title="人脸录入" is-link to="faceInput"/>
        <van-cell class="c1" title="我的订单" is-link to="myOrder"/>
      </van-cell-group>
      <div style="width: 80vw;margin: 0 10vw">
        <van-button @click="isLogout" round block type="danger">退出登录</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import HeaderTop from '../components/HeaderTop'
  import {getCategoryList} from "../api/hotel";
  import store from "../store";
  import {removeToken,removeRefreshToken} from "../utils/auth";
  import router from "../router";
  // import PersonalInfo from "../components/PersonalInfo";

  export default {
    data() {
      return {
        routerList: ['/infoInput']
      }
    },
    mounted(){
      getCategoryList().then(data => {
        console.log("数据",data)
      })
    },
    methods:{
      changTab(index) {
        this.$router.push(this.routerList[index])
      },
        isLogout(){
          this.$dialog.confirm({
              message:'是否退出登录',
              theme:'round-button'
          }).then(()=>{
              this.logOut()
          })
            .catch(()=>{

            })
        },
        logOut(){
            console.log('登出操作')
            // store.dispatch('FedLogOut')
            store.commit('setToken','')
            store.commit('setRefreshToken','')
            removeToken()
            removeRefreshToken()
            router.push('/login')
        }
    },
    components:{
      HeaderTop,
      // PersonalInfo,
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../common/stylus/mixin.styl";
.c1{
  border-radius 5px
}

</style>
