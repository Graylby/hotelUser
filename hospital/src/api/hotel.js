import http from "../utils/request";
/**
 * 获取类目
 */
export const getCategoryList = () => {
    return http.request({
        url:'/hotel/getHotelList',
        method:'get'
    })
};


export const getHotelList = (params) => {
    return http.request({
        url:'/hotel/getHotelList',
        method:'get',
        params
    })
};
export const orderHotel = (data) => {
    return http.request({
        url:'/reservation/create',
        method:'post',
        data
    })
}
export const orderCancel = (data) => {
    return http.request({
        url:'/reservation/cancel',
        method:'post',
        data
    })
}
export const service = (data) =>{
    return http.request({
        url:'/task/create',
        method:"post",
        data
    })
}
export const order = (params) =>{
    return http.request({
        url:'/reservation/user/getListOK',
        method:'get',
        params
    })
}
