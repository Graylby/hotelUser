<template>
    <div class="commentsCard">
        <div style="padding: 10px;">
            <div>
                <p>匿名用户</p>
                <van-rate v-model="msg.star" readonly/>
            </div>
            <div class="textBox">
                {{msg.comments}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comment",
        props:{
            msg:Object
        }
    }
</script>

<style scoped>
.commentsCard{
    width: 90%;
    margin: 10px auto;
    box-shadow: 0 0 10px darkgrey;
}
    .textBox{
        color: darkgrey;
    }
    p{
        height: 20px;
        line-height: 20px;
        float: left;
        margin-right: 5px;
    }
</style>