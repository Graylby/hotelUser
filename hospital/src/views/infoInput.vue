<template>
    <div class="wrap">
        <header-top title="疫情信息录入"/>
        <div class="content">
           <van-form @submit="onSubmit">
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
               <van-field
                       v-model="temp"
                       name="体温"
                       label="体温"
                       placeholder="当前体温"
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
    import {infoInput} from "../api/infoInput";

    export default {
        data() {
            return {
                username:'',
                telNo:'',
                ID:'',
                temp:'',
            }
        },
        mounted(){
        },
        methods:{
            onSubmit(values){
                console.log(values)
                console.log(this.ID)
                    infoInput({
                        name: this.username,
                        idCard:this.id,
                        phone:this.telNo,
                        temperature:this.temp
                    }).then(res=>{
                        console.log(res)
                    })
            }
        },
        components:{
            headerTop
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../common/stylus/mixin.styl"

</style>