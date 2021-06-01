<template>
    <div class="wrap">
        <header-top :is-return="true" title="我的订单"/>
        <div class="content">
            <order-item @refresh="refreshOrder" v-for="(order,index) in orders"
                        :key="index"
                        :name="order.hotelInfo.name"
                        :room="order.typeInfo.name"
                        :id="order.id"
                        :time="order.perCheckinTime"/>
        </div>
    </div>
</template>

<script>
    import HeaderTop from "../../components/HeaderTop";
    import {order} from "../../api/hotel";
    import OrderItem from "../../components/orderItem";
    export default {
        name: "muOrder",
        components: {OrderItem, HeaderTop},
        data(){
            return{
                orders:{},
            }
        },
        mounted() {
            this.refreshOrder();
        },
        methods:{
            refreshOrder(){
                order().then((res)=>{
                    this.orders = res.data.data;
                })
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixin.styl";

</style>