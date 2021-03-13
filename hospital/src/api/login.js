import http from "../utils/request";

export function login(data) {
    return http.request({
        url:'/auth/user/login',
        method:'post',
        data,
    })
}
export function getId() {
    return http.request({
        url:'/information/user/get',
        method:'get'
    })
}
