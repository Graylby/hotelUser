<template>
    <div class="wrap">
        <header-top title="酒店详情"/>
        <div class="content">
            <van-cell-group style="margin: 2vh 0">
                <panorama />
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
                <van-cell id="评论" title="查看评价" is-link @click="onComments"/>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="居住日期" :value="date" @click="show = true" is-link />
                <van-calendar v-model="show"
                              type="range"
                              :show-confirm="false"
                              @confirm="onConfirm" />
                <van-card v-for="room in rooms"
                    :price="room.type.price"
                    :key="room.type.id"
                    :title="room.type.name"
                          :num="room.free"
                    :desc="room.type.information"
                    :thumb="room.type.img_url">
                <template #num>
                    <van-button :id="room.type" @click="onOrder(room.type.id)"  type="danger" round>现在预订</van-button>
                </template>
                    <template #tags>
                        <label>还剩{{room.free}}间</label>
                    </template>
                </van-card>
            </van-cell-group>
        </div>
        <van-overlay z-index="100" :show="showOverlay">
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
    import Panorama from "./panorama/panorama";
    import store from "../store";

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
                roomId:'',
              isLoad:false
            }
        },
        mounted(){
            // this.hotel = this.$route.params.hotel
            this.hotel = store.state.hotel
            this.date = this.hotel.date
            let params;
            // if (this.hotel) {
                params = {id: this.hotel.id};
            // }else params = store.state.nowHotelId;
            // params = store.state.nowHotelId;
            getRoomList(params).then(data=>{
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
                this.length = (date[1]-date[0])/86400000;
                let perDate = this.formatDate(start)
                console.log(perDate)
                store.commit('setLength',this.length);
                store.commit('setDate',perDate)
            },
            onOrder(id){
                this.roomId = id;
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
            onComments(){
                this.$router.push({
                    name:'comments',
                    params:{id:this.hotel.id}
                })
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
              let id = this.roomId;
              let myDate = store.state.preDate;
              let obj = myDate.split('/');
              let string
              if (obj[0]<10&&obj[1]<10) string = '2021-0'+obj[0]+'-0'+obj[1]+' 12:00:00'
              else if (obj[0]<10) string = '2021-0'+obj[0]+'-'+obj[1]+' 12:00:00'
              else if (obj[1]<10) string = '2021-'+obj[0]+'-0'+obj[1]+' 12:00:00'
              else string = '2021-'+obj[0]+'-'+obj[1]+' 12:00:00'
              let data = {
                hotelId:hotel.id,
                type:id,
                orderType:1,
                userId:user.id,
                  lengthOfStay:store.state.length,
                  perCheckinTime:string
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
            Panorama,
            HeaderTop,
            faceInput1,
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../common/stylus/mixin.styl"
</style>