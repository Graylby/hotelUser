<template>
    <div>
        <van-card
            :title="hotel.name"
            :desc="hotel.info"
            @click="hotelDetails"
            >
        <template #bottom>
            <p>{{hotel.position}}</p>
        </template>
        </van-card>

    </div>
</template>

<script>
    export default {
        props:{
            hotel:Object
        },
        mounted() {
        },
        methods:{
            hotelDetails(){
                this.$router.push({
                    name: '/hotel',
                    params: {hotel:this.hotel}})
            }
        }
    }
</script>

<style scoped>

</style>