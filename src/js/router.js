import vueRouter from 'vue-router';

import ComptIndex from '../component/index/index.vue'

export default new vueRouter({
    routes:[
        {path:"/",redirect:"/index"},
        {path:"/index",component:ComptIndex}
    ]
})