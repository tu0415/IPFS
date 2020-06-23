
import request from "../axios/axios";

export default {
    /* 注册 */
    async getRegister(data){
        const result = await request.post(`/login/zhuce2`,data)
        return result
    },
   
    /* 获取验证码 */
    async getFindSmsCode(data){
        const result = await request.post(`/login/card`,data)
        return result
    },
     /* 获取版本号 */
     async getFindVersion(data){
        const result = await request.post(`/User/upgrade`,data)
        return result
    },
}
