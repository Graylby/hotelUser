<template>
  <div class="wrap">
    <header-top title="酒店预订"/>
    <div class="content">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <van-image
                  fit="contain"
          :src="require('../components/images/1.jpg')"/>
        </van-swipe-item>
        <van-swipe-item>
          <van-image
                  fit="contain"
                  :src="require('../components/images/2.jpg')"/>
        </van-swipe-item>
        <van-swipe-item>
          <van-image
                  fit="contain"
                  :src="require('../components/images/3.jpg')"/>
        </van-swipe-item>
        <van-swipe-item>
          <van-image
                  fit="contain"
                  :src="require('../components/images/4.jpg')"/>
        </van-swipe-item>
      </van-swipe>
      <div class="choice">
        <van-cell-group style="margin: 3vh 16px">
          <van-field
                  readonly
                  clickable
                  label="房型"
                  :value="value"
                  placeholder="请选择房型"
                  @click="showPicker = true "
          />
          <van-popup v-model="showPicker" round position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columns"
                    @cancel="showPicker = false"
                    @confirm="onConfirm2"/>
          </van-popup>
          <van-cell title="居住时间" :value="date" @click="show = true" is-link />
          <van-calendar v-model="show"
                        type="range"
                        :show-confirm="false"
                        @confirm="onConfirm" />
<!--          <van-field v-model="length" label="入住天数" placeholder="请输入入住时长" type="digit"/>-->
        </van-cell-group>
        <div style="margin: 0 16px;">
          <van-button @click="searchHot" type="info" block round>搜索酒店</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import headerTop from '../components/HeaderTop'
  export default {
    data() {
      return {
        date: '',
        value:'',
        show: false,
        length:'',
        showPicker:false,
        columns:['全日房','钟点房'],
      }
    },
    mounted(){
    },
    methods:{
      onConfirm2(value){
        this.value = value;
        this.showPicker = false;
      },
      formatDate(date) {
        return `${date.getMonth() + 1}/${date.getDate()}`;
      },
      onConfirm(date) {
        const [start, end] = date;
        this.show = false;
        this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
        console.log((date[1]-date[0])/86400000)
      },
      searchHot(){
        this.$router.push({
          name: '/search',
          params: {date:this.date}})
      }

    },
    components:{
      headerTop
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../common/stylus/mixin.styl"
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
</style>
