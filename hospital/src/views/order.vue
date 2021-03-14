<template>
    <div class="wrap">
        <header-top title="店内服务"/>
        <div class="content">
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
        </div>
    </div>
</template>

<script>
    import HeaderTop from '../components/HeaderTop'
    import {getId} from "@/api/login";
    import {service} from "@/api/hotel";

    export default {
        data() {
            return {
              infomation:['呼叫清理','预约澡堂','呼叫服务生'],
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
          sendsService(index){
            this.$dialog.confirm({
              message: '是否确认选择'+this.infomation[index]+'服务',
            })
                .then(() => {
                  // on confirm
                  let data ={
                    faceCheck:false,
                    hotelId: 1,
                    information:this.infomation[index],
                    userId: this.user.id,
                  }
                  console.log(data,index)
                  service(data).then(res=>{
                    console.log(res)

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