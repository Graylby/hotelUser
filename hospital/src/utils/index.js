import UTILS from './utils.js'

const UtilPlugin={}

UtilPlugin.install=function(Vue){
  const a = 1;
  Vue.prototype.$utils=UTILS
}
export default UtilPlugin
