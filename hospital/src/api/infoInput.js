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
        header:{
            'Content-Type': 'multipart/form-data'
        },
        transformRequest: [function (form) {
            return form;
        }],
        method:'post',
        data,
    })
}

