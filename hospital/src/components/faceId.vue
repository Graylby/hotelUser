<template>
    <div>
        <van-form>
            <div class="camera-box">
                <div class="camera-box-ca">
                    <div class="camera-box-in">
                        <div class="c-b-size">
                            <video ref="top" class="camera" id="video" style="width: 100%; height:100%; object-fit: fill" v-show="!imgSrc"></video>
                            <canvas class="camera" id="canvas" :width="videoWidth" :height="videoHeight" v-show="imgSrc"></canvas>
                        </div>
                    </div>
                </div>
                <p class="camera-p">{{!imgSrc?'提示：请将人脸居中按"拍照"键确认':''}}</p>
                <div class="butt-box">
                    <van-button type="info" round block @click="setImage" >确认</van-button>
<!--                    <van-button v-if="imgSrc" @click="setFileUpload">确定</van-button>-->
                </div>
            </div>
        </van-form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                videoWidth: '300',
                videoHeight: '300',
                thisCancas: null,
                thisContext: null,
                thisVideo: null,
                imgSrc: '',
                visible: false,
                isShutter:false
            }
        },
        mounted() {
            let topHeight = this.$refs.top.offsetHeight
            this.videoWidth = topHeight;
            this.videoHeight = topHeight;
            this.visible = true;
            this.getCompetence()
        },
        methods: {
            // init () {
            //     this.visible = true;
            //     this.$nextTick(() => {
            //         this.getCompetence()
            //     })
            // },
            getCompetence() {
                // 初始化的时候直接让为空
                this.imgSrc = '';
                var _this = this;
                this.thisCancas = document.getElementById('canvas')
                this.thisContext = this.thisCancas.getContext('2d')
                this.thisVideo = document.getElementById('video')
                // 旧版本浏览器可能根本不支持mediaDevices，我们首先设置一个空对象
                if (navigator.mediaDevices === undefined) {
                    navigator.mediaDevices = {}
                }
                // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
                // 使用getUserMedia，因为它会覆盖现有的属性。
                // 这里，如果缺少getUserMedia属性，就添加它。
                if (navigator.mediaDevices.getUserMedia === undefined) {
                    navigator.mediaDevices.getUserMedia = function (constraints) {
                        // 首先获取现存的getUserMedia(如果存在)
                        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia
                        // 有些浏览器不支持，会返回错误信息
                        // 保持接口一致
                        if (!getUserMedia) {
                            return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
                        }
                        // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
                        return new Promise(function (resolve, reject) {
                            getUserMedia.call(navigator, constraints, resolve, reject)
                        })
                    }
                }
                var constraints = {
                    audio: false,
                    video: {width: this.videoWidth, height: this.videoHeight, transform: 'scaleX(-1)'}
                }
                navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
                    // 旧的浏览器可能没有srcObject
                    if ('srcObject' in _this.thisVideo) {
                        _this.thisVideo.srcObject = stream
                    } else {
                        // 避免在新的浏览器中使用它，因为它正在被弃用。
                        _this.thisVideo.src = window.URL.createObjectURL(stream)
                    }
                    // eslint-disable-next-line no-unused-vars
                    _this.thisVideo.onloadedmetadata = function (e) {
                        _this.thisVideo.play()
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            setImage() {
                var _this = this
                // 点击，canvas画图
                _this.thisContext.drawImage(_this.thisVideo, 0, 0, _this.videoWidth, _this.videoHeight)
                // 获取图片base64链接
                var image = this.thisCancas.toDataURL('image/png')
                _this.imgSrc = image;
                _this.isShutter = true
                this.setFileUpload();
            },
            setFileUpload(){
                this.visible = false;
                this.$emit('refreshCameraPhoto', this.imgSrc)
            }
        }
    }
</script>

<style scoped>
    .c-b-size{
        width: 70vw;
        height: 70vw;
        margin: 0 auto;
    }
    .camera-box-ca{
        width: 100vw;
        height: 100vw;
    }
    .camera-box-in{
        margin: 30px auto;
        width: 300px;
    }
    .camera{
        border-radius: 35vw
    }
    .camera-p{
        text-align: center;
    }
    .butt-box{
        width: 50vw;
        margin: 10vh 25vw;
    }
</style>
