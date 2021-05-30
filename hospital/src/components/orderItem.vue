<template>
    <div class="text" style="background: #fafafa;width: 90%;display: flex;margin: 5px auto;align-items: center;justify-content: space-between">
        <div style="display: flex;padding: 8px;flex-direction: column;flex:3">
                <label>{{name}}</label>
                <label>{{room}}</label>
                <label>预计入住时间：{{time}}</label>
        </div>
        <div style="margin-right: 10px">
            <van-button @click="deleteOrder" type="danger">取消订单</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "orderItem",
        props:{
            name:{type:String,default:'香格里拉酒店'},
            room: {type:String,default:'标间'},
            time:String,
            id:Number
        },
        methods:{
            deleteOrder(){
                this.$dialog.confirm({
                    message:'确认要取消订单？'
                }).then(()=>{
                    alert('shanchuchenggong')
                })
            }
        }
    }
</script>

<style scoped>
.text{
    font-family: 微软雅黑;
}
    label{
        padding: 3px 0;
    }
</style>