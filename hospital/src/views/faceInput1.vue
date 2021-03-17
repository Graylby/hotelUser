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
    import {faceInput} from "../api/infoInput";
    // import VConsole from 'vconsole'
    // // eslint-disable-next-line no-unused-vars
    // let vConsole = new VConsole();
    export default {
        props:{
          use:Number
        },
        data() {
            return {
                cameraPreviewVisible: false,
                picValueZero: '',
            }
        },
        mounted(){
            // this.use = this.$route.params.use
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
                let imgFile = this.base64ImgtoFile(cameraPhoto)
                let data_ = new FormData();
                data_.append('photo',imgFile)
                let status = {
                    showOverlay:false,
                    face:imgFile
                }
                this.status = status
                console.log(imgFile)
                faceInput(data_).then(res=>{
                    console.log(res)
                    this.$notify({type:'success',message:'人脸录入成功',onClose:this.returnHome,duration:1000})
                })

                // faceInput(data_).then((data)=>{
                //     if (this.use){
                //         console.log(data)
                //         // this.$emit('status',false,data_)
                //     }else {
                //       console.log(data)
                //     }
                // })







                // this.$http.post('/uploadImage', {
                //     params: {
                //         imageFile: cameraPhoto
                //     }
                // }).then(({data: res}) => {
                //     if (res.code !== 0) {
                //         return this.$message.error(res.msg)
                //     }
                //     httpZp = res.data.src;
                //     this.picValueZero = cameraPhoto;
                // }).catch(() => {
                // })
            },
            base64ImgtoFile(dataurl, filename = 'file') {
                let arr = dataurl.split(',')
                let mime = arr[0].match(/:(.*?);/)[1]
                let suffix = mime.split('/')[1]
                let bstr = atob(arr[1])
                let n = bstr.length
                let u8arr = new Uint8Array(n)
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n)
                }
                return new File([u8arr], `${filename}.${suffix}`, {
                    type: mime
                })
            },
            afterRead(file){
                console.log(file)
                faceInput({
                    photo:file
                }).then((data)=>{
                    console.log(data)
                })
            },
            returnHome(){
                if (this.use){
                    this.$emit('status',this.status)
                }else {
                    this.$router.back();
                }
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
<!--
中文：、
english:.

-->