<template>
    <div class="wrap">
        <header-top title="店内商店"/>
        <div class="content">
            <div class="bar">
                <van-sidebar class="van-sidebar" v-model="activeKey" @change="onChange">
                    <van-sidebar-item title="零食"/>
                    <van-sidebar-item title="饮料"/>
                    <van-sidebar-item title="啤酒"/>
                    <van-sidebar-item title="酸奶"/>
                    <van-sidebar-item title="牛奶"/>
                </van-sidebar>
            </div>
            <div  class="goods">
                <goods v-for="item in goods[activeKey]"
                       :key="item.id"
                       :goods="item"/>
            </div>
            </div>
        <div class="cart">
            <van-icon
                    @click="show=true"
                    name="cart-o"
                    color="#ee0a24" size="15vw"/>
        </div>
        <van-action-sheet v-model="show" title="购物车">
            <van-cell>1</van-cell>
            <van-cell>1</van-cell>
            <van-cell>1</van-cell>
            <van-cell>1</van-cell>
            <van-cell>1</van-cell>
            <van-cell>1</van-cell>
            <van-cell>1</van-cell>
            <van-cell>1</van-cell>
            <van-cell>1</van-cell>
            <van-submit-bar
                    style="position: fixed;bottom: 0"
                    :price="3050" button-text="提交订单" @submit="onSubmit"/>
        </van-action-sheet>

        </div>
</template>

<script>
    import HeaderTop from '../components/HeaderTop'
    import goods from "../components/goods";
    export default {
        data() {
            return {
                activeKey:0,
                goods:[
                    [
                    {
                    id:11,
                    num:16,
                    price:22,
                    name:'乐事薯片'
                    },
                    {
                        id:12,
                        num:14,
                        price:20,
                        name:'牦牛肉'
                    },
                    {
                        id:13,
                        num:16,
                        price:3,
                        name:'呀土豆'
                    },
                    {
                        id:14,
                        num:77,
                        price:5,
                        name:'好丽友派'
                    },
                    {
                        id:15,
                        num:167,
                        price:6,
                        name:'奥利奥饼干'
                    },
                    {
                        id:16,
                        num:96,
                        price:10,
                        name:'彩虹糖'
                    },
                ],
                    [
                    {
                        id: 21,
                        num: 92,
                        price: 3,
                        name: "农夫山泉550ml"
                    },
                    {
                        id: 22,
                        num: 93,
                        price: 4,
                        name: "可口可乐瓶装"
                    },
                    {
                        id: 23,
                        num: 52,
                        price: 4,
                        name: "百事可乐瓶装"
                    },
                ],
                    [
                        {
                            id: 31,
                            num: 92,
                            price: 2.5,
                            name: "雪花啤酒330ml"
                        },
                        {
                            id: 32,
                            num: 93,
                            price: 5,
                            name: "百威啤酒330ml"
                        },
                        {
                            id: 33,
                            num: 52,
                            price: 4.5,
                            name: "青岛啤酒330ml"
                        },
                    ],
                    [
                        {
                            id: 41,
                            num: 92,
                            price: 3,
                            name: "君乐宝"
                        },
                        {
                            id: 42,
                            num: 93,
                            price: 11,
                            name: "蒙牛"
                        },
                        {
                            id: 43,
                            num: 52,
                            price: 13,
                            name: "养乐多"
                        },
                    ],
                    [
                        {
                            id: 51,
                            num: 92,
                            price: 2,
                            name: "蒙牛"
                        },
                        {
                            id: 52,
                            num: 93,
                            price: 3,
                            name: "海河"
                        },
                        {
                            id: 53,
                            num: 52,
                            price: 3,
                            name: "伊利"
                        },
                    ],
                ],
                cart:{

                },
                show:false
            }
        },
        mounted(){
        },
        methods:{
            onChange(index){
                console.log(index)
            },
            onSubmit(){
                this.show=false
            }
        },
        components:{
            HeaderTop,
            goods
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../common/stylus/mixin.styl"
    .van-sidebar{
        float left
    }
    .bar{
        float left
        width 80px
        height 100vh
        margin-right 10px
    }
    .goods{
        float right
        width 75vw
    }
    .cart{
        width 15vw
        height 15vw
        border-radius 15vw
        position fixed;
        right 40px
        bottom 70px
        opacity 0.6
    }
</style>