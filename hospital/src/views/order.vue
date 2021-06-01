<template>
    <div class="wrap">
        <header-top :is-return="false" title="店内服务"/>
        <div class="content">
            <div>
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
                <van-cell-group title="查看评价">
                    <van-cell id="评论" title="查看评价" is-link @click="onComments"/>
                </van-cell-group>
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderTop from '../components/HeaderTop'
    import {getId} from "../api/login";
    import {service} from "../api/hotel";

    export default {
        data() {
            return {
              information:['呼叫清理','预约澡堂','呼叫服务生'],
              user:{},
            }
        },
        mounted(){
          getId().then(res=>{
            this.user = res.data.data
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
</style>