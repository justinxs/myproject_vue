<template>
    <section class="comment">
        <div class="mui-card">
            <div class="mui-card-header">
                提交评论
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <textarea v-model="comments" id="textarea" rows="5" placeholder=""></textarea>
                    <button @click="sendMsg" type="button" class="mui-btn mui-btn-primary mui-btn-block">提交评论</button>
                </div>
            </div>
        </div>
    
        <div class="mui-card">
            <div class="mui-card-header">
                评论列表
            </div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <ul class="mui-table-view">
                        <li v-for="(item,i) in commentList" :key="i" class="mui-table-view-cell">
                            <div>
                                <span>用户: {{item.user_name}}</span>
                                <span class="mui-pull-right">评论时间: {{item.add_time |formatDate}}</span>
                            </div>
                            <p>{{item.content}}</p>
                        </li>
                    </ul>
                    <button ref="loadBtn" @click="getComments" type="button" class="mui-btn mui-btn-primary mui-btn-block" v-text="moreText"></button>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    props: ["id"],
    data() {
        return {
            comments: "",
            commentList: [],
            pageIndex: 1,
            moreText: "加载更多"
        }
    },
    methods: {
        sendMsg() {
            let url = this.config.domain + "/postcomment/" + this.id;
            let data = { content: this.comments };
            this.$http.post(url, data, { emulateJSON: true }).then(res => {
                if (res.body.status == 0) {
                    this.commentList.unshift({
                        user_name: "神", 
                        add_time: new Date(), 
                        content: this.comments
                    });
                    this.comments = "";
                    Toast({
                        message: '操作成功',
                        iconClass: 'icon icon-success'
                    });
                }
            })
        },
        getComments() {
            let url = this.config.domain + "/getcomments/" + this.id + "?pageindex=" + this.pageIndex;
            this.$http.get(url).then(res => {
                if (res.body.status == 0) {
                    if (res.body.message.length > 0) {
                        this.commentList.push(...res.body.message);
                        this.pageIndex++;
                    } else {
                        this.moreText = "没有更多了..."
                        this.$refs.loadBtn.disabled = true;
                        this.$refs.loadBtn.style.backgroundColor = "#ccc";
                    }

                }
            })
        }
    },
    created() {
        this.getComments()
    }
}
</script>


<style lang="less">

</style>

