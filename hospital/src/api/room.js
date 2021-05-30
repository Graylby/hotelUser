import http from "../utils/request";
/**
 * 获取类目
 */
export const getRoomList = (params) => {
    return http.request({
        url:'/room/getRoomList',
        method:'get',
        params
    })
};