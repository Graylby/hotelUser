<template>
  <div class="wrap">
    <header-top :is-return="false" title="酒店预订"/>
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
        <div class="box">
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
            <van-search v-model="searchText" placeholder="请输入搜索关键词" />
          </van-cell-group>
          <div style="margin: 0 16px;">
            <van-button @click="searchHot" type="info" block style="border-radius: 10px">搜索酒店</van-button>
          </div>
        </div>
      </div>
      <div class="fakeItem">
        <div style="margin: 10px;display: flex;padding: 10px 0">
          <div class="img1">
            <div>
              <div style="padding: 0 0 5px 0">
                <span>周边景点</span>
              </div>
              <van-image
                      fit="fill"
                      :src=img1
              />
            </div>
            <div style="display: flex;margin-top: 10px">
              <div style="flex: 1;margin-right: 10px">
                <div style="padding: 0 0 10px 0">
                  <span>豪华之旅</span>
                </div>
                <van-image
                        fit="fill"
                        :src=img3
                />
              </div>
              <div style="flex: 1">
                <div style="padding: 0 0 10px 0">
                  <span>发现好房</span>
                </div>
                <van-image
                        fit="fill"
                        :src=img4
                />
              </div>
            </div>
            </div>
          <div class="img2">
            <div>
              <div style="padding: 0 0 5px 0">
                <span>旅游推荐</span>
              </div>
              <van-image
                      fit="fill"
                      :src=img2
              />
            </div>
            <div style="display: flex;margin-top: 10px">
              <div style="flex: 1;margin-right: 10px">
                <div style="padding: 0 0 10px 0">
                  <span>精品酒店</span>
                </div>
                <van-image
                        fit="fill"
                        :src=img5
                />
              </div>
              <div style="flex: 1">
                <div style="padding: 0 0 10px 0">
                  <span>优美酒店</span>
                </div>
                <van-image
                        fit="fill"
                        :src=img6
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import headerTop from '../components/HeaderTop'
  import store from "../store";
  export default {
    data() {
      return {
        date: '',
        value:'',
        show: false,
        length:'',
        showPicker:false,
        columns:['全日房','钟点房'],
        searchText:'',
        img1:require('../assets/fakePage/1.png'),
        img2:require('../assets/fakePage/2.png'),
        img3:require('../assets/fakePage/3.png'),
        img4:require('../assets/fakePage/4.png'),
        img5:require('../assets/fakePage/5.png'),
        img6:require('../assets/fakePage/6.png'),
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
        this.length = (date[1]-date[0])/86400000;
        let perDate = this.formatDate(start)
        console.log(perDate)
        store.commit('setLength',this.length);
        store.commit('setDate',perDate)
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
    padding 20px 0
    background #FFFFFF
    border-radius 10px
    /*box-shadow 0 0 10px lightgrey*/
  }
    .img1, .img2{
      flex 1
      display flex
      flex-direction column
    }
      .img1{
        border-right solid darkgrey 2px
        padding-right: 5px
      }
        .img2{
          padding-left: 5px
        }
.content{
  position: absolute;
  left: 0;
  right: 0;
  top: 45px;
  bottom: 50px;
  overflow: auto;
}
    .fakeItem{
      margin 5px auto
      width 90vw
      background #FFFFFF
      border-radius 10px
      /*box-shadow 0 0 10px lightgrey*/
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
