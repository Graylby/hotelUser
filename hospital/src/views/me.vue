<template>
  <div class="wrap">
    <header-top title="我的"/>
    <div class="content">
      <personal-info/>
<!--      <menu-button @click="changTab(0)" name="疫情信息登记"/>-->
<!--      <menu-button name="人脸录入"/>-->
<!--      <menu-button name="退出"/>-->
      <van-cell-group style="margin: 3vh 16px">
        <van-cell title="疫情信息登记" is-link to="infoInput"/>
        <van-cell title="人脸录入" is-link to="faceInput"/>
      </van-cell-group>
      <div style="width: 100vw;margin: 0">
        <van-button  round block type="danger">退出登录</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import HeaderTop from '../components/HeaderTop'
  import {getCategoryList} from "../api";
  import PersonalInfo from "../components/PersonalInfo";

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
      }
    },
    components:{
      HeaderTop,
      PersonalInfo,
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../common/stylus/mixin.styl"


</style>
