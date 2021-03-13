<template>
    <div class="wrap">
        <header-top title="搜索结果"/>
        <div class="content">
        <van-list
                :v-if="isLoad"
            v-model="loading"
            :finished="finished"
            finished-text="到底了哟"
            @load="onLoad">
                <hotel v-for="item in list"
                        :key="item.ID"
                        :old-hotel="item"
                       :live-date="liveDate"
                />
        </van-list>
        </div>
    </div>
</template>

<script>
    import HeaderTop from "../components/HeaderTop";
    import hotel from "../components/hotel";
    import {getHotelList} from "../api/hotel";
    // import {getCategoryList} from "../api/hotel";

    export default {
        data(){
            return{
                list:[
                    {
                        ID:1,
                        name:'wonder',
                        info:'666',
                        position:'天津',
                        rest:6
                    }
                ],
                info:{
                    length:12,
                },
                loading:false,
                finished:false,
                liveDate:'',
                isLoad:false
            }
        },
        mounted(){
            this.liveDate=this.$route.params.date
            console.log(this.liveDate)
            this.isLoad=true
            console.log(this.onLoad)
        },
        methods:{
          onLoad(){
              getHotelList(this.info).then(data => {
                  this.list = data.data.data
                  this.finished = true
              })
          }
        },
        components:{
            HeaderTop,
            hotel
        }
    }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../common/stylus/mixin.styl"


</style>
