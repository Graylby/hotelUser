<template>
    <div class="wrap">
        <header-top title="酒店详情"/>
        <div class="content">
            <van-cell-group style="margin: 2vh 0">
                <van-image
                    width="100vw"
                    fit="contain"
                    :src="require('../components/images/01.png')"/>
                <van-cell
                        style="height: auto"
                        :title="hotel.name"
                        size="large"
                        :label="hotel.position"/>
                <van-cell
                        :label="hotel.information"
                        title="详细信息"
                        size="large"
                        style="height: auto"/>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="居住日期" :value="date" @click="show = true" is-link />
                <van-calendar v-model="show"
                              type="range"
                              :show-confirm="false"
                              @confirm="onConfirm" />
                <van-card v-for="room in rooms"
                    price="199"
                    :key="room.index"
                    :title="room.type"
                          :num="room.free"
                    desc="40平方米 双床有窗"
                    :thumb="require('../components/images/dachuangfang.png')">
                <template #num>
                    <van-button :id="room.type" @click="onOrder(room.type)"  type="danger" round>现在预订</van-button>
                </template>
                </van-card>
            </van-cell-group>
        </div>
        <van-overlay :show="showOverlay">
            <face-input1 v-if="isLoad"  @status="status" :use="1" />
        </van-overlay>
    </div>
</template>

<script>
    import HeaderTop from '../components/HeaderTop'
    import {getRoomList} from "../api/room";
    import {getId} from "../api/login";
    import faceInput1 from "./faceInput1";
    import {orderHotel} from "../api/hotel";

    export default {
        props:{
            id:Number,
        },
        data() {
            return {
                showOverlay:false,
                date:'',
                show:false,
                hotel:{},
                rooms:[],
                long:0,
                user:{},
              isLoad:false
            }
        },
        mounted(){
            this.hotel = this.$route.params.hotel
            console.log(this.hotel)
            this.date = this.hotel.date
            getRoomList(this.id).then(data=>{
                console.log(data.data.data)
                this.rooms = data.data.data
            })
            getId().then(res=>{
                this.user = res.data.data
            })
        },
        methods:{
            formatDate(date) {
                return `${date.getMonth() + 1}/${date.getDate()}`;
            },
            onConfirm(date) {
                const [start, end] = date;
                this.show = false;
                this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
                console.log((date[1]-date[0])/86400000)
                this.long = (date[1]-date[0])/86400000
                console.log(this.long)
            },
            onOrder(){
                if (this.user.face){
                    console.log(1)
                }else {
                    // this.$router.push({
                    //     name : '/faceInput'
                    // })
                  this.isLoad=true
                    this.showOverlay=true
                  if (this.showOverlay)
                    console.log(1)
                }
            },
            status(value){
              console.log("Emit",value)
                getId().then(res=>{
                this.user = res.data.data
              })
              //记得删除
              this.user.face = value.face
                let data_ = new FormData()
                data_.append('face',this.user.face)
              this.showOverlay = value.showOverlay
              this.creatOrder(data_)
            },
          creatOrder(){
              let user = this.user
              let hotel = this.hotel
              let data = {
                hotelId:hotel.id,
                type:'234',
                userId:user.id,
                  lengthOfStay:5,
                  perCheckinTime:'2020-02-23 00:00:00'
              }
            console.log("创建订单传输的数据：",data)
              //下面代码记得删
            orderHotel(data).then((res)=>{
                console.log('创建定单后：'+res)
                this.$notify({type:'success',message:'预订成功',onClose:this.returnHome,duration:1500})
                console.log("notify 没有执行？")
              })
          },
          returnHome(){
            this.$router.push('/')
          },
        },
        components:{
            HeaderTop,
            faceInput1,
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../common/stylus/mixin.styl"
</style>