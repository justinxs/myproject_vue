import vueRouter from 'vue-router';

import ComptIndex from '../component/index/index.vue';
import ComptNewsList from '../component/news/news_list.vue';
import ComptNewsDetails from '../component/news/news_details.vue';
import ComptPhotoList from '../component/photo/photo_list.vue';
import ComptPhotoDetails from '../component/photo/photo_details.vue';
import ComptGoodsList from '../component/goods/goods_list.vue';
import ComptGoodsDetails from '../component/goods/goods_details.vue';
import ComptShopcar from '../component/shopcar/shopcar.vue';

export default new vueRouter({
    routes:[
        {path:"/",redirect:"/index"},
        {path:"/index",component:ComptIndex},
        {path:"/news/list",component:ComptNewsList},
        {path:"/news/details/:id",component:ComptNewsDetails},
        {path:"/photo/list/:id",component:ComptPhotoList},
        {path:"/photo/details/:id",component:ComptPhotoDetails},
        {path:"/goods/list",component:ComptGoodsList},
        {path:"/goods/details/:id",component:ComptGoodsDetails},
        {path:"/shopcar/list",component:ComptShopcar},
    ]
})