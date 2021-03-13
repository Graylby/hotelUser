import http from "../utils/request";
/**
 * 获取类目
 */
export const getRoomList = (data) => {
    return http.request({
        url:'/room/getRoomFreeList',
        method:'get',
        data
    })
};