import vueRouter from 'vue-router';

import ComptIndex from '../component/index/index.vue';
import ComptNewsList from '../component/news/news_list.vue';
import ComptNewsDetails from '../component/news/news_details.vue';

export default new vueRouter({
    routes:[
        {path:"/",redirect:"/index"},
        {path:"/index",component:ComptIndex},
        {path:"/news/list",component:ComptNewsList},
        {path:"/news/details/:id",component:ComptNewsDetails},
    ]
})