import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils'
import 'amfe-flexible'
//初始化样式
import './common/stylus/index.styl'

import 'photo-sphere-viewer/dist/photo-sphere-viewer.css' // 全景图样式
import PhotoSphereViewer from 'photo-sphere-viewer' // 全景图插件
Vue.prototype.$PhotoSphereViewer = PhotoSphereViewer // 引入全景图
Vue.config.productionTip = false

Vue.use(utils)
import { Sidebar,Notify,Overlay,Uploader,Row,Col,Dialog,SubmitBar,ActionSheet,SidebarItem,Stepper,AddressList,Image as VanImage,List,Card,Button,Popup,Calendar,Cell,CellGroup,Field,Form,Icon,Swipe, SwipeItem,Picker } from 'vant';
Vue.use(Notify)
Vue.use(Overlay)
Vue.use(Uploader)
Vue.use(Row)
Vue.use(Col)
Vue.use(List)
Vue.use(Dialog)
Vue.use(SubmitBar)
Vue.use(ActionSheet)
Vue.use(Stepper)
Vue.use(SidebarItem)
Vue.use(Sidebar)
Vue.use(VanImage)
Vue.use(AddressList)
Vue.use(Card)
Vue.use(Popup)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Calendar)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Field)
Vue.use(Form)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Picker)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
