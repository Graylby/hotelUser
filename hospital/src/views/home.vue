<template>
  <div class="wrap">
    <header-top title="酒店预订"/>
    <div class="content">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
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
          <van-cell class="menu" title="选择入住时间" :value="date" @click="show=true"/>
          <van-field v-model="length" label="入住天数" placeholder="请输入入住时长" type="digit"/>
          <van-calendar v-model="show" @confirm="onConfirm" :show-confirm="false" />
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
        this.show = false;
        this.date = this.formatDate(date);
      },
      searchHot(){
        this.$router.push('/search')
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
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>
