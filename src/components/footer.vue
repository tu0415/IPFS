<template>
    <div class="footer">
        <ul class="uls flex">
            <li class="item flex" v-for="(item,index) in listData" :key="index" @click="goLink(item.link)">
                <img v-if="index != selectIndex" :src="item.url" alt="">
                <img v-else :src="item.selectUrl" alt="">
                <p :class="index == selectIndex ? 'curr':''">{{item.text}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: ["selectIndex"],
    data() {
        return {
            listData: [
                {
                    text: "首页",
                    url: require("../assets/images/footer/tab01.png"),
                    selectUrl: require("../assets/images/footer/tab001.png"),
                    link: "/"
                },
                {
                    text: "收益",
                    url: require("../assets/images/footer/tab02.png"),
                    selectUrl: require("../assets/images/footer/tab002.png"),
                    link: "/category"
                },
                {
                    text: "算力",
                    url: require("../assets/images/footer/tab03.png"),
                    selectUrl: require("../assets/images/footer/tab003.png"),
                    link: "/bookshelf"
                },
               
            ]
        };
    },
    methods:{
        goLink(value) {
            this.$router.push({path:value})
        }
    }
}
</script>

<style scoped lang="less">
.footer {
    height: 1rem;
    position: fixed;
    bottom: -0.02rem;
    left: 0;
    width: 100%;
    .uls {
        border-top: 1px solid #e8e8e8;
        background-color: #FFFFFF;
        height: 100%;
        .item {
            flex: 1;
            flex-direction: column;
            height: 100%;
            img {
                width: 0.48rem;
                height: 0.48rem;
            }
            p {
                font-size: 0.24rem;
                color: #B9C0C9;
            }
            .curr {
                 color: #505569;
            }
        }
    }
}
</style>

