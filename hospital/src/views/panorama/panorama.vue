<template>
    <div class="wrap">
        <header-top :is-return="false" title="全景测试"/>
        <div class="global">
            <div :id="div"></div>
            <div class="noImg" v-if="imgShow">
                <img src="./test.jpeg" alt="">
                <div>暂无全景图，请联系工作人员上传全景图</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Viewer} from 'photo-sphere-viewer'
    import 'photo-sphere-viewer/dist/photo-sphere-viewer.css'
    import HeaderTop from "../../components/HeaderTop";
    export default {
        components: {HeaderTop},
        data () {
            return {
                //全景图配置
                div:'panorama',
                imgShow:false,
                imgUrl:require('./test.jpeg'),
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
                    size:{
                        width:'800',
                        height:'500'
                    }
                })
                console.log(viewer)
            },
            // show(){
            //     if(this.vrImg!="false"){
            //         if(this.vrImg.indexOf('http')!=-1){
            //             this.vrImg=this.vrImg.replace('http','https');
            //             console.log("替换后",this.vrImg)
            //         }
            //         window.addEventListener('load',this.fun())
            //         this.imgShow=false;
            //     }else{
            //         this.imgShow=true;
            //     }
            // },
            // fun(){
            //     let p;
            //     p=PhotoSphereViewer({
            //         container: this.div,
            //         panorama: this.vrImg,
            //         navbar:false,
            //         zoom_level:100,
            //         time_anim:false,
            //         zoomRangeWidth:100,
            //         default_fov:179,
            //         fisheye:true,
            //         loading_msg:"加载中",
            //         size: {
            //             width: '100%',
            //             height: '100%'
            //         }
            //     });
            // },
            handleGoBack () {
                window.history.go(-1)
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixin.styl"
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

</style>
