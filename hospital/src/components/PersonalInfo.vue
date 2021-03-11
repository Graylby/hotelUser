<template>
    <div class="Info">
        <div class="img"></div>
        <div class="name"></div>
    </div>
</template>

<script>
    export default {
        name: "PresonalInfor"
    }
</script>

<style scoped>
    .Info{
        display: flex;
        height: 15vh;
        background-color: aqua;
    }
    .img{
        flex: 1;
        background-color: antiquewhite;
    }
    .name{
        flex: 2;
    }

</style>