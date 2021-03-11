import HttpRequest from './axios'
const request = new HttpRequest()
/**
 * 获取类目
 */
export const getCategoryList = () => request.post('/hotel/getHotelList')
export const getHotelList = (data) => request.post('/hotel/getHotelList',data)