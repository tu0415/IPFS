<template>
    <div class="register">
        <Title :txt="'KTV注册'"></Title>
        <div class="info-box">
            <div class="item flexAI">
                <label class="h100" for="">手机号码</label>
                <input type="number" v-model="phone" placeholder="请输入手机号码">
            </div>
            <div class="item flexAI">
                <div class="flexAI">
                    <label for="">短信验证</label>
                    <input type="number" v-model="codeNum" placeholder="请输入验证码">
                </div>
                <p v-if="!sendTime" class="f14 code" @click="sendCode()">发送验证码</p>
                <p v-else class="f14 code">{{time}}s重新获取</p>
            </div>
            <!-- <div class="item flexAI">
                <label for="">账号</label>
                <input type="text" class="flex1" v-model="user" placeholder="请输入数字、字母、文字组合" maxlength="10">
            </div> -->
            <div class="item flexAI">
                <label for="">登录密码</label>
                <input type="password" v-model="password" maxlength="16" placeholder="请输入6-16位数字加字母">
            </div>
            <div class="item flexAI">
                <label for="">确认密码</label>
                <input type="password" v-model="confirmPwd" maxlength="16" placeholder="请确认登录密码">
            </div>
            <div class="item flexAI">
                <label for="">支付密码</label>
                <input type="password" v-model="payPwd" @input="onKeyInput($event,1)" maxlength="6" placeholder="请输入6位纯数字密码">
            </div>
            <div class="item flexAI">
                <label for="">确认密码</label>
                <input type="password" v-model="confirmpayPwd" @input="onKeyInput($event,2)" maxlength="6" placeholder="请确认支付密码">
            </div>
            <div class="item flexAI">
                <label for="">推荐人</label>
                <input type="number" v-model="referrer" placeholder="请输入推荐人号码" disabled>
            </div>
        </div>
        <div class="btn-box margin0auto">
            <Btn :txt="'提交'" @click="btn()"></Btn>
        </div>
        <Footer selectIndex='0'></Footer>
    </div>
</template>

<script>
import Title from "@/components/title";
import Btn from "@/components/btn";
import Api from "@/api/api";
import Footer from "../../components/footer"
export default {
    name: "register",
    components: {
        Title,
        Btn,
        Footer
    },
    data() {
        return {
            phone: "",
            user: "",
            code: "",
            referrer: "",
            time: 60, // 倒计时
            sendTime: false, // 定时器
            randomNum: "",
            codeNum: "",
            confirmPwd: "",
            password: "",
            payPwd: "",
            confirmpayPwd: ""
        };
    },
    mounted() {
        this.getUrlParms()
    },
    methods: {
        getUrlParms() {
            var url = window.location.search;
            if (url.indexOf("?") >= 0) {
                var temp1 = url.split("?");
                var pram = temp1[1];
                var keyValue = pram.split("&");
                // console.log(keyValue)
                var obj = {};
                for (var i = 0; i < keyValue.length; i++) {
                    var item = keyValue[i].split("=");
                    var key = item[0];
                    var value = item[1];
                    obj[key] = value;
                }
                this.referrer = obj.code
            }
        },

        btn() {

            // 大陆                香港         台湾         澳门
            let reg = /^[1][3456789]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]\d{7}$/;
            var userRes = /[^A-Za-z0-9]/g;
            let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
            let payReg = /^\d{6}$/;
            if (!reg.test(this.phone)) {
                this.$toast("请输入正确的手机号码");
                return false;
            }
            // if (!this.user) {
            //     this.$toast("请输入正确的用户名");
            //     return false;
            // }
            if (!this.codeNum) {
                this.$toast("验证码不正确");
                return false;
            }

            if (!this.password.trim() || !pwdReg.test(this.password)) {
                this.$toast("密码必须由 6-16位字母、数字组成");
                return false;
            }
            if (this.password != this.confirmPwd) {
                this.$toast("两次密码不一致");
                return false;
            }
            if (!this.payPwd.trim() || !payReg.test(this.payPwd)) {
                this.$toast("支付密码设置不正确");
                return false;
            }
            if (this.payPwd != this.confirmpayPwd) {
                this.$toast("两次支付密码不一致");
                return false;
            }
            // this.md5();
            let data = {
                tel: this.phone,
                card: this.codeNum,
                // userName: this.user,
                tuijianma: this.referrer,
                pwd: this.password,
                pwdQr: this.confirmPwd,
                payPwd: this.payPwd,
                payPwdQr: this.confirmpayPwd,

            };

            Api.getRegister(data).then(res => {
                if (res.code == 200) {
                    this.$toast(res.msg);
                    this.update()
                    // location.reload();
                } else {
                    this.$toast(res.msg);
                }
            });
        },
        onKeyInput(event, index) {
            let i = event.target.value;
            let num = i.charAt(i.length - 1);
            var reg = new RegExp('^[0-9]*$');
            if (!reg.test(num)) {
                this.$toast("请输入6位纯数字密码")
                if (index == 1) {
                    this.payPwd = '';
                } else {
                    this.confirmpayPwd = '';
                }

            } else {
                if (index == 1) {
                    this.payPwd = i;
                } else {
                    this.confirmpayPwd = i;
                }

            }

        },

        // 验证码倒计时
        send() {
            this.sendTime = true;
            let interval = window.setInterval(() => {
                if (this.time-- <= 0) {
                    this.time = 60;
                    this.sendTime = false;
                    window.clearInterval(interval);
                }
            }, 1000);
        },

        sendCode() {
            // 大陆                香港         台湾         澳门
            let reg = /^[1][3456789]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]\d{7}$/;
            var userRes = /[^A-Za-z0-9]/g;
            if (!reg.test(this.phone)) {
                this.$toast("请输入正确的手机号码");
                return false;
            }

            // this.md5();
            let data = {
                tel: this.phone,
                type: 1
            };
            Api.getFindSmsCode(data).then(res => {
                if (res.code == 200) {
                    this.$toast("短信码发送成功");
                    this.send();
                }
            });
            this.randomNum = ''
        },
        // 检测更新
        update() {
            var u = navigator.userAgent, app = navigator.appVersion;
            var isiOS = !u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            var os = ''
            if(isiOS) {
                 os = 1
            } else {
                 os = 2
            }
            let data = {
                os: os
            }
            Api.getFindVersion(data).then(res => {
                if (res.code == 200) {
                    if (isiOS) {
                        window.location.href = res.data.iOS;
                    } else {
                        window.location.href = res.data.Android;
                    }

                }
            });
        },
        // isversion() {
        //     var u = navigator.userAgent, app = navigator.appVersion;
        //     var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        //     var isiOS = !u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

        //     if (isiOS) {

        //     } else {

        //     }
        // }
    }
};
</script>

<style scoped lang='less'>
.register {
    .info-box {
        padding: 0.5rem 0.3rem 0 0.3rem;
        .item {
            border-bottom: 0.02rem solid #e5e5e5;
            height: 1rem;
            label {
                font-size: 0.28rem;
                width: 1.6rem;
                color: #333;
            }
            input {
                font-size: 0.28rem;
                color: #333;
                height: 100%;
            }
            input-placeholder {
                color: #cccccc;
            }

            .code {
                color: #ff3954;
                text-align: right;
                width: 1.8rem;
                // padding-right: 0.3rem;
            }
        }
    }
    .btn-box {
        margin: 0.6rem auto 0.6rem;
    }
}
</style>
