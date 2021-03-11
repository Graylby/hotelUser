import axios from 'axios'
import {getRefreshToken, getToken, removeRefreshToken, removeToken, setRefreshToken, setToken} from '../auth'
import {Dialog, Toast} from 'vant';
import router from '../../router'
import store from "../../store";

// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = [];

// api 前缀
const baseUrl = process.env.VUE_APP_BASE_API;

// const baseUrl='/api/';


/**
 * 判断是否为开发环境
 */
function isDevelopment() {
    // return true;
    return process.env.NODE_ENV === 'development'
}

/**
 * 请求接口日志记录
 */
function printRequest(req) {
    if (isDevelopment()) {
        console.log(`[request] 发起 ${req.method} 请求：${baseUrl}${req.url}`, req.data || req.params || '无参数', req)
    }
}

/**
 * 响应接口日志记录
 */
function printResponse(res) {
    if (isDevelopment()) {
        console.log(`[request] ${res.url} 响应结果：`, res)
    }
}

// 创建服务实例
const http = axios.create({
    baseURL: baseUrl,
    timeout: 18000,
    headers: {
        "Content-Type": "application/json;"
    }
});

// 刷新 token
async function refreshToken_() {
    let refreshToken;
    if (store.state.refreshToken !== '') {
        refreshToken = store.state.refreshToken;
    } else {
        refreshToken = getRefreshToken();
    }
    return await http.request({
        url: `/auth/user/refresh`,
        method: 'POST',
        data: {
            refreshToken
        }
    })
}

// 请求拦截器
http.interceptors.request.use((config) => {
    // 如果有 token，则带上
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    printRequest(config);
    return config;
});



// 响应拦截器
http.interceptors.response.use((response) => {

    printResponse(response);

    // 无感刷新 token
    if (response.data.status === 103||response.data.status===102) {
        const {config} = response;
        if (!isRefreshing) {
            isRefreshing = true;
            return refreshToken_().then((res) => {
                const {token,refreshToken} = res.data;
                store.commit('setToken',token);
                setToken(token);
                store.commit('setRefreshToken',refreshToken);
                setRefreshToken(refreshToken);
                console.log('[request] Refresh token success.');
                config.headers.Authorization = `Bearer ${token}`;
                // 已经刷新了token，将所有队列中的请求进行重试
                requests.forEach((cb) => cb(token));
                requests = [];
                return http(config)
            }).catch(async (res) => {
                // 无法刷新 token，需要重新登录
                console.error('[request] Refresh token error =>', res);
                // 清除 token
                removeToken();
                removeRefreshToken();
                // 重定向到登录页面
                Dialog.alert({
                    title: '登录状态失效',
                    message: '请重新登录',
                }).then(() => {
                    router.push({name: 'login'});
                });
                // 抛出错误，阻止本次请求
                // error.response = response
                throw new Error('登录态过期')
            }).finally(() => {
                isRefreshing = false
            })
        }
        // 正在刷新token，返回一个未执行resolve的promise
        return new Promise((resolve) => {
            // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
            requests.push((token) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                resolve(http(config))
            })
        })
    }

    // 自定义错误判断
    if (!(response.data.status === 200 || response.data.status === 115)) {
        // Dialog.alert(response.data.message);
        // error.response = response
        console.log(response);
        if (response.data.status === 101) Toast.fail({
            message: "当前处于登出状态",
            onClose() {
                requests = [];
                router.push({name: 'login'});
            }
        });
        else {
            console.log(response.data);
            Toast.fail(response.data.message);
        }
        console.log(1111)
        throw new Error(response.data.message)
    }

    return response

}, (error) => {
    Promise.reject(error.message).then(() => {
    });
    return {
        data: {},
        status: 405
    };
});

export default http
