<template>
    <div class="wrap">
        <header-top title="搜索结果"/>
        <div class="content">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="到底了哟"
            @load="onLoad">
            <hotel
                    v-for="item in list"
                    :key="item.ID"
                    :hotel="item"
            />
        </van-list>
        </div>
    </div>
</template>

<script>
    import HeaderTop from "../components/HeaderTop";
    import hotel from "../components/hotel";
    import {getHotelList} from "../api";
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
                    length:4,
                },
                loading:false,
                finished:false,
            }
        },
        mounted(){
            getHotelList(this.info).then(data => {
                console.log("数据",data)
            })
        },
        methods:{
          onLoad(){

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