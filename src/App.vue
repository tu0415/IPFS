<template>
    <div id="app">
        <router-view class="child-view"></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            // transitionName: "slide-left"
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            document.addEventListener("plusready", () => {
                var webview = plus.webview.currentWebview();
                plus.key.addEventListener("backbutton", () => {
                    webview.canBack(e => {
                        if (e.canBack) {
                            webview.back();
                        } else {
                            // webview.close(); //hide,quit
                            // plus.runtime.quit();
                            //首页返回键处理
                            //处理逻辑：1秒内，连续两次按返回键，则退出应用；
                            var first = null;
                            plus.key.addEventListener(
                                "backbutton",
                                () => {
                                    //首次按键，提示‘再按一次退出应用’
                                    if (!first) {
                                        first = new Date().getTime();
                                        this.$toast("再按一次退出应用");
                                        // window.plus.nativeUI.toast('再按一次退出应用')
                                        setTimeout(function() {
                                            first = null;
                                        }, 1000);
                                    } else {
                                        if (
                                            new Date().getTime() - first <
                                            1500
                                        ) {
                                            plus.runtime.quit();
                                        }
                                    }
                                },
                                false
                            );
                        }
                    });
                });
            });
        }
    },
    computed: {},
    components: {}
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    position: relative;
}
</style>

