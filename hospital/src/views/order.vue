<template>
    <div class="wrap">
        <header-top title="店内服务"/>
        <div class="content">
            <van-cell-group title="店内购物">
                <van-cell title="点击进入旅馆商店"  is-link @click="onStore"/>
            </van-cell-group>
            <van-cell-group title="客房服务">
                <van-cell title="呼叫清理" is-link/>
            </van-cell-group>
            <van-cell-group title="自助服务">
                <van-cell title="预约澡堂" is-link/>
                <van-cell title="呼叫服务生" is-link/>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    import HeaderTop from '../components/HeaderTop'
    export default {
        data() {
            return {
            }
        },
        mounted(){
        },
        methods:{
            onStore(){
                this.$router.push('/store')
        },
        },
        components:{
            HeaderTop
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../common/stylus/mixin.styl"
</style>