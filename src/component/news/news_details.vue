<template>
    <section class="newsDetails">
        <v-title :title="title"></v-title>
        <div class="mui-card" v-if="showIt">
            <div class="listTitlte mui-card-header">{{newsDetails.title}}</div>
            <div class="mui-card-footer">
                <span>加入时间 : {{newsDetails.add_time |formatDate("yyyy-mm-DD")}}</span>
                <span>点击量 : {{newsDetails.click}}</span>
            </div>
            <div class="mui-card-content">
                <div class="content mui-card-content-inner" v-html="newsDetails.content">
    
                </div>
            </div>
    
        </div>
        <v-comment :id="id"></v-comment>
    </section>
</template>

<script>
import ComptTitle from '../common/title.vue';
import ComptComment from '../common/comment.vue';
export default {
    data() {
        return {
            newsDetails: {},
            title: "新闻详情",
            showIt: false,
            id: this.$route.params.id
        }
    },
    components: {
        "v-title": ComptTitle,
        "v-comment": ComptComment
    },
    methods: {
        getNewsDetails() {
            let url = this.config.domain + "/getnew/" + this.$route.params.id;
            this.$http.get(url).then(res => {
                if (res.body.status == 0) {
                    this.newsDetails = res.body.message[0];
                    this.showIt = true;
                }
            })
        }
    },
    created() {
        this.getNewsDetails();
    }
}
</script>

<style lang="less">
.newsDetails {
    .listTitlte {
        font-size: 20px;
        font-weight: bold;
        display: block;
        text-align: center;
    }
}
</style>
