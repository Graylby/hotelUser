<template>
    <div class="wrap">
        <header-top title="个人信息录入"/>
        <div class="content">
           <van-form @submit="onsubmit">
               <van-field
                   v-model="username"
                   name="姓名"
                   label="姓名"
                   placeholder="姓名"
                   />
               <van-field
                       v-model="telNo"
                       name="电话号码"
                       label="电话号码"
                       placeholder="电话号码"
               />
               <van-field
                       v-model="ID"
                       name="身份证号码"
                       label="身份证号码"
                       placeholder="身份证号码"
               />
               <div style="margin: 16px">
                   <van-button round block type="info" native-type="submit">提交</van-button>
               </div>
           </van-form>
        </div>
    </div>
</template>
<script>
    import headerTop from '../components/HeaderTop'
    export default {
        data() {
            return {
                username:'',
                telNo:'',
                ID:'',

            }
        },
        mounted(){
        },
        methods:{

        },
        components:{
            headerTop
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../common/stylus/mixin.styl"

</style>