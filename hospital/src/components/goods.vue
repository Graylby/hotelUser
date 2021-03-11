<template>
    <van-card
            :num="goods.num"
            :price="goods.price"
            :title="goods.name"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
    >
        <template #footer>
            <van-stepper v-model="value"
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
            }
        },
        data(){
            return{
              value:0,
            }
        }
    }
</script>

<style scoped>

</style>