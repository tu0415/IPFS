<template>
    <div class="btn flex " @click="$emit('click')">
        {{txt}}
    </div>
</template>

<script>
export default {
    props:['txt']
}
</script>

<style scoped lang='less'>
.btn {
    width:6rem;
    height:0.8rem;
    border-radius:0.4rem;
    color: #FFFFFF;
    font-size: 0.3rem;
    margin: 0 auto;
    background:linear-gradient(90deg,rgba(255,56,84,1),rgba(255,173,45,1));
}
</style>
