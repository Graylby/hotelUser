<template>
    <div class="wrap">
        <header-top title="人脸录入"/>
        <div class="content">
<!--            <div @click="cameraPreviewOpen()">-->
<!--                <img :src="picValueZero" style="height: 105px;width: 79px;">-->
<!--            </div>-->
            <face-id v-if="cameraPreviewVisible" name="cameraPreview" ref="cameraPreview" @refreshCameraPhoto="refreshCameraPhoto"></face-id>
        </div>
    </div>
</template>
<script>
    import HeaderTop from '../components/HeaderTop'
    import faceId from "../components/faceId";

    export default {
        data() {
            return {
                cameraPreviewVisible: false,
                picValueZero: ''
            }
        },
        mounted(){
            this.cameraPreviewOpen();
        },
        methods:{
            // eslint-disable-next-line no-unused-vars
            cameraPreviewOpen(cameraType){
                this.cameraPreviewVisible = true
                this.$nextTick(() => {
                    this.$refs.cameraPreview.init()
                });
            },
            refreshCameraPhoto(cameraPhoto) {
                // eslint-disable-next-line no-unused-vars
                let httpZp;
                this.$http.post('/uploadImage', {
                    params: {
                        imageFile: cameraPhoto
                    }
                }).then(({data: res}) => {
                    if (res.code !== 0) {
                        return this.$message.error(res.msg)
                    }
                    httpZp = res.data.src;
                    this.picValueZero = cameraPhoto;
                }).catch(() => {
                })
            }
        },
        components:{
            HeaderTop,
            faceId
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../common/stylus/mixin.styl"


</style>
