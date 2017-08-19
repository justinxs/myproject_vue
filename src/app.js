"use strict";
import Vue from 'vue';
import vueRouter from 'vue-router';
import Vuex from 'vuex';
import vueResource from 'vue-resource';
import mintUI from 'mint-ui';
import vuePicturePreview from 'vue-picture-preview';


//chrome新属性  让mousewheel和thouch事件更流畅
// import 'default-passive-events/default-passive-events.js'
//自定义插件
import Scroll from './js/scroll.js';
import config from './js/config.js';
import filter from './js/filter.js';


//css
import 'mui/dist/css/mui.css';
import 'mui/examples/hello-mui/css/icons-extra.css';
import 'mint-ui/lib/style.css';

Vue.use(vueRouter);
Vue.use(Vuex);
Vue.use(vueResource);
Vue.use(mintUI);
Vue.use(Scroll);
Vue.use(config);
Vue.use(filter);
Vue.use(vuePicturePreview);






import dateManager from './js/common/dateManager.js';
import ComptApp from './component/App.vue';

import router from './js/router.js';

let vm = new Vue({
    el: "#app",
    render: c => c(ComptApp),
    router,
    store: new Vuex.Store(dateManager)
})