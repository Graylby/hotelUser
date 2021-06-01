import http from "../utils/request";
/**
 * 获取类目
 */
export const getShopType = (params) => {
    return http.request({
        url:'/good/type',
        method:'get',
        params
    })
};
export const getGoodList = (params) => {
    return http.request({
        url:'/good/getList',
        method:'get',
        params
    })
};
export const getComments = (params) =>{
    return http.request({
        url:'/comment/get',
        method:'get',
        params
    })
}
export const insertComment = (data) =>{
    return http.request({
        url:'/comment/insert',
        method:'post',
        data
    })
}