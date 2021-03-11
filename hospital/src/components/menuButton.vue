<template>
    <div class="menu">
        <p>{{name}}</p>
    </div>
</template>

<script>
    export default {
        props:{
            name:String
        }
    }
</script>

<style scoped>
.menu{
    height: 7vh;
    background-color: azure;
}
</style>