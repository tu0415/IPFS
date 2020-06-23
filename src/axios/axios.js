import Vue from 'vue'
import axios from 'axios'
import qs from 'qs';

// 创建axios实例
const http = axios.create({
    baseURL: '/api',  
    headers:{
        'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      
    },
    timeout: 15000 // 请求超时时间
})


// 请求拦截(请求前发出处理)
http.interceptors.request.use(
    config => {
        // weui.loading()
     
        return config
    },
    err => {
       
        return Promise.reject(err);
    });

// 响应拦截器
http.interceptors.response.use(data => {
    return data
}, error => {
    console.log(error)
    return Promise.reject(error)
});

function getResponseData(res) {
	return res.data
}

export default {
	post(url, data={}, options = {}) {
		return http({
			method: 'post',
			url,
            data: qs.stringify(data) || {},
		}).then(getResponseData)
	},
	get(url, params = {}, options = {}) {
		return http({
			method: 'get',
			url,
			params: params || {},
		}).then(getResponseData)
	}
}