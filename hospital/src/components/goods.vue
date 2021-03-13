<template>
    <van-card
            :num="goods.num"
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
                id:String
            }
        },
        data(){
            return{
              value:0,
                name:this.goods.name,
                src:"require('../components/goods/伊利.jpg')"
            }
        },
        mounted() {
            console.log(this.src)
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