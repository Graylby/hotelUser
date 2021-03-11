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
                        style="height: 15vh"
                        :title="hotel.name"
                        size="large"
                        :label="hotel.position"/>
                <van-cell
                        :label="hotel.info"
                        title="详细信息"
                        size="large"
                        style="height: 20vh"/>
            </van-cell-group>
            <van-cell-group>
                <van-cell title="居住日期" :value="date" @click="show = true" is-link />
                <van-calendar v-model="show"
                              type="range"
                              :show-confirm="false"
                              @confirm="onConfirm" />
                <van-card
                    price="100"
                    title="大床房"
                    desc="40平方米 双床有窗"
                    :thumb="require('../components/images/大床房.png')">
                <template #num>
                    <van-button type="danger" round>现在预订</van-button>
                </template>
                </van-card>
            </van-cell-group>

        </div>
    </div>
</template>

<script>
    import HeaderTop from '../components/HeaderTop'
    export default {
        data() {
            return {
                date:'',
                show:false,
                hotel:{},
            }
        },
        mounted(){
            this.hotel=this.$route.params.hotel
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