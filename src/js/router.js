import vueRouter from 'vue-router';

import ComptIndex from '../component/index/index.vue';
import ComptNewsList from '../component/news/news_list.vue';
import ComptNewsDetails from '../component/news/news_details.vue';
import ComptPhotoList from '../component/photo/photo_list.vue';
import ComptPhotoDetails from '../component/photo/photo_details.vue';

export default new vueRouter({
    routes:[
        {path:"/",redirect:"/index"},
        {path:"/index",component:ComptIndex},
        {path:"/news/list",component:ComptNewsList},
        {path:"/news/details/:id",component:ComptNewsDetails},
        {path:"/photo/list/:id",component:ComptPhotoList},
        {path:"/photo/details/:id",component:ComptPhotoDetails},
    ]
})