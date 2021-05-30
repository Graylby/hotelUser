import http from "../utils/request";

export const getOrderList = () => {
    return http.request({
        url: '/reservation/user/getList',
        method:'get',
    })
};