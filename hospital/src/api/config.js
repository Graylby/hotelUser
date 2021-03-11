/**
 * 请求数据配置
 * 配置编译环境和线上环境之间的IP切换
 *
 * baseURL: 域名地址
 * fileUpBaseUrl:上传文件
 **/
var baseURL = 'http://123.56.87.76/'
var fileUpBaseUrl = ''

// if (process.env.NODE_ENV === 'development') {
//   baseURL = '/apiPath'
//   fileUpBaseUrl = ''
// } else {
//   baseURL = ''
//   fileUpBaseUrl = ''
// }
export {
  baseURL,
  fileUpBaseUrl
}
