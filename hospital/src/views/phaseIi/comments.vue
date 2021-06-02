<template>
    <div class="wrap">
        <header-top :is-return="true" title="我的订单"/>
        <div class="content">
            <div class="box" :style="{'bottom':height}">
                <comment v-for="(msg,index) in comments"
                         :key="index"
                         :msg="msg" />
            </div>
            <div ref="top" class="bottom">
                <div style="margin: 10px">
                    <van-rate v-model="value"/>
                    <van-button type="primary"
                                style="position: absolute;right: 5px"
                                size="mini"
                                @click="onSubmit"
                                round>匿名评价</van-button>
                </div>
                <van-field
                        v-model="message"
                        rows="2"
                        autosize
                        label="评价"
                        label-width="40px"
                        type="textarea"
                        maxlength="50"
                        placeholder="    请输入评价"
                        show-word-limit
                />
            </div>
        </div>
    </div>
</template>

<script>
    import HeaderTop from "../../components/HeaderTop";
    import Comment from "../../components/comment";
    import {getComments, insertComment} from "../../api/shop";
    export default {
        name: "comments",
        components: {Comment, HeaderTop},
        data(){
            return{
                value:5,
                message:'',
                msg:{
                    id: 1,
                    hotelId: 0,
                    userId: 0,
                    star: 5,
                    comments: "哈哈哈",
                    time: null
                },
                comments:[],
                onLoad:false,
                Height:0
            }
        },
        mounted(){
            this.getList();
            this.onLoad=true;
            let topHeight = this.$refs.top.offsetHeight // 头部高度
            this.Height = topHeight;
        },
        computed:{
            height() {
                if (this.onLoad){
                    return this.Height
                }else return 20
            }
        },
        methods:{
            getList(){
                getComments().then(res=>{
                    this.comments = res.data.data
                })
            },
            onSubmit(){
                let data={
                    comments:this.message,
                    star:this.value,
                    hotelId: 1,
                    userId: 1
                }
                insertComment(data).then(res=>{
                    console.log(res)
                    this.value = 5;
                    this.message = '';
                    this.getList();
                })
            }
        }
    }
</script>


<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl";
.bottom{
    position fixed;
    bottom :0;
    width 100%
    background : #FFFFFF
}
    .box{
        position: absolute;
        overflow: scroll;
        top: 45px;
        bottom 130px
    }
    .van-field__control{
        background #f4f5f7!important;
    }
</style>