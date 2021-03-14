<template>
    <van-card v-if="isLoad"
            :num="num"
            :price="goods.price"
            :title="goods.name"
            :thumb="require('../components/goods/'+goods.name+'.jpg')"
    >
        <template #footer>
            <van-stepper v-model="value"
                         @change="onChange"
                         theme="round"
                         :max="goods.num"
                         min="0"
                         default-value="0"
                         disable-input button-size="22"/>
        </template>
    </van-card>
</template>

<script>
    export default {
        props:{
            goods:{
                price:String,
                name,String,
                num:String,
                id:String,
                isFake:Boolean
            }
        },
        data(){
            return{
                value:0,
                num:this.goods.num,
                name:this.goods.name,
                src:"require('../components/goods/伊利.jpg')",
              isLoad:false
            }
        },
        mounted() {
            console.log(this.src)
          if (!this.isFake){
            console.log('随机数量'+Math.floor(Math.random()*99+1))
            this.num = Math.floor(Math.random()*99+1)
          }
          this.isLoad = true
        },
        methods:{
            onChange(){
                let msg ={
                    num:this.value,
                    id:this.goods.id
                }
                this.$emit('goodsNum',msg)
            }
        }
    }
</script>

<style scoped>

</style>