<template>
        <div class="global">
            <div :id="div"></div>
            <div class="noImg" v-if="imgShow">
                <img src="./test.jpeg" alt="">
                <div>暂无全景图，请联系工作人员上传全景图</div>
            </div>
        </div>
</template>

<script>
    import {Viewer} from 'photo-sphere-viewer'
    import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
    export default {
        props:{
            imgUrl:{type:String,default:require('./test.jpeg')}
        },
        data () {
            return {
                //全景图配置
                div:'panorama',
                imgShow:false,
                // imgUrl:require('./test.jpeg'),
                panoramaData:'',

            }
        },

        mounted () {
            this.initPhotoSphere();
        },
        methods: {
            initPhotoSphere(){
                const viewer = new Viewer({
                    container:this.div,
                    panorama:this.imgUrl,
                })
                console.log(viewer)
            },
            handleGoBack () {
                window.history.go(-1)
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixin.styl"
    #panorama{
        width 100vw!important;
        height 60vw!important;
    }
    .menu{
        /*border-color black*/
        /*border-radius 4vw*/
    }
    .choice{
        width 90vw
        margin 5vh auto
    }
    .my-swipe .van-swipe-item {
        height 20vh
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        background-color: #39a9ed;
    }
    .noImg{
        position: absolute;
        top: 0.44rem;
        left: 0;
        text-align: center;
        display: flex;
        justify-content: center; /* 水平居中 */
        align-items: center;     /* 垂直居中 */
        flex-direction: column;
        background-color: #fff;
        z-index: 2;
    }
    .noImg img{
        width: 100px;
        margin: 0 auto;
        display: block;
    }
    .noImg div{
        font-size: .14rem;
        margin-top: 10px;
    }
    .psv-navbar{
        display:none!important;
    }

</style>
