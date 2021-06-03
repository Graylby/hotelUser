<template>
    <div class="wrap">
        <header-top :is-return="false" title="店内服务"/>
        <div class="content">
            <div v-if="isCheckIn">
                <van-cell-group title="店内购物">
                    <van-cell title="点击进入旅馆商店"  is-link @click="onStore"/>
                </van-cell-group>
                <van-cell-group title="客房服务">
                    <van-cell id="呼叫清理" title="呼叫清理" is-link @click="sendsService(0)"/>
                </van-cell-group>
                <van-cell-group title="自助服务">
                    <van-cell id="预约澡堂" title="预约澡堂" is-link @click="sendsService(1)"/>
                    <van-cell id="呼叫服务生" title="呼叫服务生" is-link @click="sendsService(2)"/>
                </van-cell-group>
<!--                <van-cell-group title="查看评价">-->
<!--                    <van-cell id="评论" title="查看评价" is-link @click="onComments"/>-->
<!--                </van-cell-group>-->
            </div>
            <div v-if="!isCheckIn">
                <div v-if="isLoading" style="margin: 35vh auto;display: flex;flex-direction: column;font-size: 7vw">
                    <van-loading size="30vw" style="margin: 0 auto" />
                </div>
                <div v-if="!isLoading" style="margin: 35vh auto;display: flex;flex-direction: column;font-size: 7vw">
                    <h1>您未入住酒店</h1>
                    <h1>无法使用店内服务</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderTop from '../components/HeaderTop'
    import {getId} from "../api/login";
    import {isCheckIn,service} from "../api/hotel";

    export default {
        data() {
            return {
              information:['呼叫清理','预约澡堂','呼叫服务生'],
              user:{},
                isCheckIn:false,
                isLoading:true
            }
        },
        mounted(){
          getId().then(res=>{
            this.user = res.data.data
            isCheckIn({userId:this.user}).then(res=>{
                  this.isCheckIn = res.data.data;
                  this.isLoading = false
            })
          })
        },
        methods:{
            onStore(){
                this.$router.push('/store')
        },
            onComments(){
                this.$router.push('/comments')
            },
          sendsService(index){
            this.$dialog.confirm({
              message: '是否确认选择'+this.information[index]+'服务',
            })
                .then(() => {
                  // on confirm
                  let data ={
                    faceCheck:0,
                    hotelId: 1,
                      roomId:1,
                    information:this.information[index],
                    userId: this.user.id,
                  }
                  console.log(data,index)
                  service(data).then(res=>{
                    console.log(res)
                      this.$notify({type:'success',message:'呼叫服务成功成功'})
                  })
                })
                .catch(() => {
                  // on cancel
                });


          }
        },
        components:{
            HeaderTop
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../common/stylus/mixin.styl"
    h1{
        margin 5px auto
    }
</style>