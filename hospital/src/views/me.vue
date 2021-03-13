<template>
  <div class="wrap">
    <header-top title="我的"/>
    <div class="content">
<!--      <personal-info/>-->
<!--      <menu-button @click="changTab(0)" name="疫情信息登记"/>-->
<!--      <menu-button name="人脸录入"/>-->
<!--      <menu-button name="退出"/>-->
      <van-cell-group style="margin: 3vh 16px;border-radius: 5px">
        <van-cell class="c1" title="疫情信息登记" is-link to="infoInput"/>
        <van-cell class="c1" title="人脸录入" is-link to="faceInput"/>
      </van-cell-group>
      <div style="width: 80vw;margin: 0 10vw">
        <van-button  round block type="danger">退出登录</van-button>
      </div>
    </div>
  </div>
</template>
<script>
  import HeaderTop from '../components/HeaderTop'
  import {getCategoryList} from "../api/hotel";
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
