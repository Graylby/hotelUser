import http from "../utils/request";

export function infoInput(data) {
    return http.request({
        url:'/epidemicPrevention/insert',
        method:'post',
        data,
    })
}
export function faceInput(data) {
    return http.request({
        url:'/information/updatePhoto',
        method:'post',
        data,
    })
}

