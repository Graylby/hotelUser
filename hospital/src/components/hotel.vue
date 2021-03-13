<template>
    <div>
        <van-card
            :title="hotel.name"
            :desc="hotel.information"
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
            oldHotel:Object,
            liveDate:String
        },
        data(){
            return{
                hotel:this.oldHotel
        }
        },
        mounted() {
            console.log(this.liveDate)
            console.log(this.hotel)
            this.$set(this.hotel,'date',this.liveDate)
            console.log(this.hotel)
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