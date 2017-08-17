<template>
    <section class="newsList">
        <v-title :title="title"></v-title>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(item,i) in newsList" :key="i">
                <router-link v-bind="{to:'/news/details/'+item.id}">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <p class="news_title">{{item.title}}</p>
                        <p class="mui-ellipsis">
                            <span class="mui-pull-left">加入时间 : {{item.add_time |formatDate("yyyy-mm-DD")}}</span>
                            <span class="mui-pull-right">点击量 : {{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
import ComptTitle from '../common/title.vue';
export default {
    data() {
        return {
            newsList: [],
            title: "新闻资讯"
        }
    },
    components: {
        "v-title": ComptTitle
    },
    methods: {
        getNewsList() {
            let url = this.config.domain + "/getnewslist"
            this.$http.get(url).then(res => {
                if (res.body.status == 0) {
                    this.newsList = res.body.message;
                }
            })
        }
    },
    created() {
        this.getNewsList();
    }
}
</script>

<style lang="less">
.news_title{
    color: #000;
}
</style>
