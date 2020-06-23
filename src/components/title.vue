<template>
    <div class="header">
        <!-- <img src="../assets/images/back.png" alt=""  @click="$emit('click')"> -->
        <!-- <img src="../assets/images/back.png" alt=""  @click="back"> -->
        <p class="flex">{{txt}}</p>
    </div>
</template>

<script>
export default {
    name:'titles',
    props:{
        txt:{
            type:String
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        }
    },
}
</script>

<style scoped lang='less'>
.header {
    height: 0.96rem;
    position: relative;
    img {
        width: 0.48rem;
        height: 0.48rem;
        position: absolute;
        top: 0.24rem;
        left: 0.24rem;
    }
    p {
        font-size: 0.32rem;
        color: #333333;
        height: 100%;
    }
}
</style>
