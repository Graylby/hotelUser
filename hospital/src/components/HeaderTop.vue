<template>
  <header class="header">
    <slot name="left">
      <div class="return">
        <van-icon v-if="isReturn" color="white" size="40px" @click="$router.go(-1)" name="arrow-left"/>
      </div>
    </slot>
    <span class="header_title">
      <span class="header_title_text ellipsis">{{title}}</span>
    </span>
    <slot name="right"></slot>
  </header>
</template>

<script>
  export default {
      props:{
        title:String,
        isReturn: {type:Boolean,default:true},
      },
      methods:{
      }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../common/stylus/mixin.styl"
  .header
    background-color $color-theme
    /*position fixed*/
    position relative
    z-index 100
    left 0
    top 0
    width 100%
    height $header-title-height
    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      color #fff
      text-align center
      .header_title_text
        font-size 18px
        color #fff
        display block
.return{
  height 40px
  width 1rem
  padding 2.5px
}
</style>
