<template>
    <div class="wrap">
        <header-top class="top" title="店内商店"/>
        <div class="content">
            <div class="bar">
                <van-sidebar class="van-sidebar" v-model="activeKey" @change="onChange">
                  <van-sidebar-item title="猜你喜欢"/>
                  <van-sidebar-item v-for="item1 in types"
                                      :key="item1"
                                      :title="item1"/>
<!--                  <van-sidebar-item title="零食"/>-->
<!--                    <van-sidebar-item title="饮料"/>-->
<!--                    <van-sidebar-item title="啤酒"/>-->
<!--                    <van-sidebar-item title="酸奶"/>-->
<!--                    <van-sidebar-item title="牛奶"/>-->
                </van-sidebar>
            </div>
            <div v-for="(type,index) in types"
                 v-show="index+1 === activeKey"
                 :key="type"
                 class="goods">
                <goods v-for="item in newGoods[index]"
                       @goodsNum="changeNum"
                       :ref="item.id"
                       :key="item.id"
                       :goods="item"/>
            </div>
            <div class="goods" v-show="activeKey===0">
                <div v-if="isLoading" style="margin: 250px auto;width: 50px">
                    <van-loading color="#1989fa" size="50px" />
                </div>
                <goods v-for="item in like"
                       @goodsNum="changeNum"
                       :ref="item.id"
                       :key="item.id"
                       :goods="item"/>
            </div>
<!--            <div v-show="activeKey === 1" class="goods">-->
<!--                <goods v-for="item in goods[0]"-->
<!--                       @goodsNum="changeNum"-->
<!--                       :ref="item.id"-->
<!--                       :key="item.id"-->
<!--                       :goods="item"/>-->
<!--            </div>-->
<!--            <div v-show="activeKey === 2" class="goods">-->
<!--                <goods v-for="item in goods[1]"-->
<!--                       @goodsNum="changeNum"-->
<!--                       :key="item.id"-->
<!--                       :ref="item.id"-->
<!--                       :goods="item"/>-->
<!--            </div>-->
<!--            <div v-show="activeKey === 3" class="goods">-->
<!--                <goods v-for="item in goods[2]"-->
<!--                       @goodsNum="changeNum"-->
<!--                       :key="item.id"-->
<!--                       :ref="item.id"-->
<!--                       :goods="item"/>-->
<!--            </div>-->
<!--            <div v-show="activeKey === 4" class="goods">-->
<!--                <goods v-for="item in goods[3]"-->
<!--                       @goodsNum="changeNum"-->
<!--                       :key="item.id"-->
<!--                       :ref="item.id"-->
<!--                       :goods="item"/>-->
<!--            </div>-->
<!--            <div v-show="activeKey === 5" class="goods">-->
<!--                <goods v-for="item in goods[4]"-->
<!--                       @goodsNum="changeNum"-->
<!--                       :key="item.id"-->
<!--                       :ref="item.id"-->
<!--                       :goods="item"/>-->
<!--            </div>-->
<!--            <div v-show="activeKey === 0" class="goods">-->
<!--&lt;!&ndash;                <goods v-for="item in goods[4]"&ndash;&gt;-->
<!--&lt;!&ndash;                       @goodsNum="changeNum"&ndash;&gt;-->
<!--&lt;!&ndash;                       :key="item.id"&ndash;&gt;-->
<!--&lt;!&ndash;                       :ref="item.id"&ndash;&gt;-->
<!--&lt;!&ndash;                       :goods="item"/>&ndash;&gt;-->
<!--              <goods :goods="cart[round[0]]" :isFake="false" />-->
<!--              <goods :goods="cart[round[1]]" :isFake="false"/>-->
<!--              <goods :goods="cart[round[2]]" :isFake="false"/>-->
<!--            </div>-->
            </div>
        <div class="cart"  @click="onCart">
            <van-icon
                    @click="show=true"
                    name="cart-o"
                    color="#ee0a24" size="15vw"/>
        </div>
        <van-action-sheet v-model="show" title="购物车">

            <div>
                <van-card class="goods-card"
                        v-for="(item,index) in newCart"
                        v-show="item.num"
                        :key="index"
                        :title="item.name"
                        :num="item.num"
                        :price="item.price"
                        :thumb="item.thumb"
                />
                <van-cell>1</van-cell>
                <van-submit-bar
                        style="position: fixed;bottom: 0"
                        :price="total" button-text="提交订单" @submit="onSubmit"/>
            </div>
        </van-action-sheet>

        </div>
</template>

<script>
    import HeaderTop from '../components/HeaderTop'
    import goods from "../components/goods";
    import {getId} from "../api/login";
    import {getGoodList, getGuess, getShopType, onSubmit} from "../api/shop";

    export default {
        data() {
            return {
                activeKey:0,
                types:[],
                goods:[
                    [
                    {
                    id:1,
                    num:16,
                    price:22,
                    name:'乐事薯片',
                        img:'leshi'
                    },
                    {
                        id:2,
                        num:14,
                        price:20,
                        name:'牦牛肉',
                        img:'maoniu'
                    },
                    {
                        id:3,
                        num:16,
                        price:3,
                        name:'呀土豆',
                        img:'yatudou'
                    },
                    {
                        id:4,
                        num:77,
                        price:5,
                        name:'好丽友派',
                        img:'haoliyou'
                    },
                    {
                        id:5,
                        num:167,
                        price:6,
                        name:'奥利奥饼干',
                        img:'aoliao'
                    },
                    {
                        id:6,
                        num:96,
                        price:10,
                        name:'彩虹糖',
                        img:'caihong'
                    },
                ],
                    [
                    {
                        id: 7,
                        num: 92,
                        price: 3,
                        name: "农夫山泉550ml",
                        img:'nongfu'
                    },
                    {
                        id: 8,
                        num: 93,
                        price: 4,
                        name: "可口可乐瓶装",
                        img:'kekou'
                    },
                    {
                        id: 9,
                        num: 52,
                        price: 4,
                        name: "百事可乐瓶装",
                        img:'baishi'
                    },
                ],
                    [
                        {
                            id: 10,
                            num: 92,
                            price: 2.5,
                            name: "雪花啤酒330ml",
                            img:'xuehua'
                        },
                        {
                            id: 11,
                            num: 93,
                            price: 5,
                            name: "百威啤酒330ml",
                            img:'baiwei'
                        },
                        {
                            id: 12,
                            num: 52,
                            price: 4.5,
                            name: "青岛啤酒330ml",
                            img:'qingdao'
                        },
                    ],
                    [
                        {
                            id: 13,
                            num: 92,
                            price: 3,
                            name: "君乐宝",
                            img:'junlebao'
                        },
                        {
                            id: 14,
                            num: 93,
                            price: 11,
                            name: "蒙牛",
                            img:'mengniu'
                        },
                        {
                            id: 15,
                            num: 52,
                            price: 13,
                            name: "养乐多",
                            img:'yangleduo'
                        },
                    ],
                    [
                        {
                            id: 16,
                            num: 92,
                            price: 2,
                            name: "蒙牛",
                            img:'mengniu'
                        },
                        {
                            id: 17,
                            num: 93,
                            price: 3,
                            name: "海河",
                            img:'haihe'
                        },
                        {
                            id: 18,
                            num: 52,
                            price: 3,
                            name: "伊利",
                            img:'yili'
                        },
                    ],
                ],
                newGoods:[],
                cart:[

                        {
                            id:1,
                            num:0,
                            price:22,
                            name:'乐事薯片',
                            img:'leshi'
                        },
                        {
                            id:2,
                            num:0,
                            price:20,
                            name:'牦牛肉',
                            img:'maoniu'
                        },
                        {
                            id:3,
                            num:0,
                            price:3,
                            name:'呀土豆',
                            img:'yatudou'
                        },
                        {
                            id:4,
                            num:0,
                            price:5,
                            name:'好丽友派',
                            img:'haoliyou'
                        },
                        {
                            id:5,
                            num:0,
                            price:6,
                            name:'奥利奥饼干',
                            img:'aoliao'
                        },
                        {
                            id:6,
                            num:0,
                            price:10,
                            name:'彩虹糖',
                            img:'caihong'
                        },


                        {
                            id: 7,
                            num: 0,
                            price: 3,
                            name: "农夫山泉550ml",
                            img:'nongfu'
                        },
                        {
                            id: 8,
                            num: 0,
                            price: 4,
                            name: "可口可乐瓶装",
                            img:'kekou'
                        },
                        {
                            id: 9,
                            num: 0,
                            price: 4,
                            name: "百事可乐瓶装",
                            img:'baishi'
                        },


                        {
                            id: 10,
                            num: 0,
                            price: 2.5,
                            name: "雪花啤酒330ml",
                            img:'xuehua'
                        },
                        {
                            id: 11,
                            num: 0,
                            price: 5,
                            name: "百威啤酒330ml",
                            img:'baiwei'
                        },
                        {
                            id: 12,
                            num: 0,
                            price: 4.5,
                            name: "青岛啤酒330ml",
                            img:'qingdao'
                        },


                        {
                            id: 13,
                            num: 0,
                            price: 3,
                            name: "君乐宝",
                            img:'junlebao'
                        },
                        {
                            id: 14,
                            num: 0,
                            price: 11,
                            name: "蒙牛",
                            img:'mengniu'
                        },
                        {
                            id: 15,
                            num: 0,
                            price: 13,
                            name: "养乐多",
                            img:'yangleduo'
                        },


                        {
                            id: 16,
                            num: 0,
                            price: 2,
                            name: "蒙牛",
                            img:'mengniu'
                        },
                        {
                            id: 17,
                            num: 0,
                            price: 3,
                            name: "海河",
                            img:'haihe'
                        },
                        {
                            id: 18,
                            num: 0,
                            price: 3,
                            name: "伊利",
                            img:'yili'
                        },

                ],
                newCart:[],
                like:[],
                show:false,
                id:null,
                round:[0,0,0],
                defaultTotal:0,
                isLoading:true
            }
        },
        watch:{
            activeKey(val){
                this.getGoods(this.types[val-1])
            },
            newCart(){

            }
        },
        computed:{
            total(){
                let total=this.defaultTotal;
                for (let x in this.newCart) {
                    total+=this.newCart[x].price*this.newCart[x].num;
                }
                return total*100;
            }
        },
        mounted(){
            getId().then(data=>{
                console.log(data)
                this.id = data.data.data.id
            })
            getShopType().then(res=>{
                this.types = res.data.data;
                for(let x in this.types){
                    this.getGoods(this.types[x],x)
                }
                getGuess({hotelId:1,num:10}).then(res=>{
                    this.like = res.data.data;
                    this.isLoading = false
                })
            })
          this.suiji_shu()
          console.log('随机数组'+this.round)
        },
        methods:{
            getGoods(type,index){
                let params = {type:type};
                getGoodList(params).then(res=>{
                    this.newGoods[index] = res.data.data;
              })
            },
          suiji_shu(){
            for (let i=0;i<3;i++){
              let array = this.round
              let a = Math.floor(Math.random()*18)
              console.log('随机数'+a)
              if (i==0||array[i-1]!=a){
                this.$set(array,i,a)
              }else i--
            }
          },
            onChange(index){
                console.log(index)
            },
            onCart(){
                let cart = this.cart
                this.total=0
                for (let Key in cart) {
                    if (cart[Key].num){
                        this.total+=cart[Key].num*cart[Key].price*100
                    }
                }
            },
            onSubmit(){
                let goods=[]
                for (let x in this.newCart){
                    let item = {
                        id:this.newCart[x].id,
                        num:this.newCart[x].num
                    }
                    goods.push(item)
                }
                let dada={
                    id:1,
                    hotelId: 1,
                    goods:goods,
                }
                onSubmit(dada).then(()=>{
                    this.show=false
                    this.$dialog.alert({
                        title:'成功下单',
                        message:'商品已成功下单，马上为您送达！',
                        theme:'round-button',
                    }).then(()=>{
                        console.log(this.show)
                        this.$router.back()
                    })
                })
            },
            changeNum(goods){
                let cart = this.newCart;
                for (let x in cart) {
                    if (goods.name === cart[x].name){
                        cart[x].num++;
                        this.newCart = cart;
                        return;
                    }
                }
                this.newCart.push(goods);
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
        position fixed
        top 45px
    }
    .goods{
        width 75vw
        position absolute
        right 0
        top 45px
        overflow scroll
    }
    .cart{
        width 15vw
        height 15vw
        border-radius 15vw
        position fixed;
        right 40px
        bottom 70px
        opacity 0.6
        color white
    }
    .goods-card{
        font size 29
    }
    .top{
        position fixed
    }
</style>