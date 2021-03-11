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
