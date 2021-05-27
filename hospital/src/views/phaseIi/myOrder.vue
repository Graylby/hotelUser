<template>
    <div class="wrap">
        <header-top :is-return="true" title="我的订单"/>
        <div class="content">
            <div>wddedingdan</div>
        </div>
    </div>
</template>

<script>
    import HeaderTop from "../../components/HeaderTop";
    export default {
        name: "muOrder",
        components: {HeaderTop},
        data(){
            return{

            }
        },
        mounted() {

        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixin.styl";

</style>