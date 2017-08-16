<template>
    <section class="photoDetails">
        <v-title :title="title"></v-title>
        <div class="mui-card">
            <div class="mui-card-header">
                {{imgInfo.title}}
            </div>
            <div class="mui-card-content">
                <div class="tips">
                    <span>加入时间: {{imgInfo.add_time |formatDate}}</span>
                    <span class="mui-pull-right">热度: {{imgInfo.click}}</span>
                </div>
                <div class="mui-card-content-inner">
                    <ul class="mui-table-view mui-grid-view" v-if="showIt">
                        <li v-for="(item,i) in imgSrc" :key="i" class="mui-table-view-cell mui-media mui-col-xs-4">
                            <img class="mui-media-object" :src="item.src" v-preview="item.src">
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mui-card-footer" v-html="imgInfo.content"></div>
        </div>
    </section>
</template>

<script>
import ComptTitle from '../common/title.vue';
export default {
    data() {
        return {
            imgSrc: [],
            imgInfo: {},
            title: "图片详情",
            showIt: false
        }
    },
    components: {
        "v-title": ComptTitle
    },
    methods: {
        getPhoto() {
            let url = this.config.domain + "/getthumimages/" + this.$route.params.id;
            this.$http.get(url).then(res => {
                if (res.body.status == 0) {
                    this.imgSrc = res.body.message.map((v,i)=>{
                        v.src = this.config.baseURL + v.src;
                        return v
                    });

                    this.showIt = true;
                }
            })
        },
        getImgInfo() {
            let url = this.config.domain + "/getimageInfo/" + this.$route.params.id;
            this.$http.get(url).then(res => {
                if (res.body.status == 0) {
                    this.imgInfo = res.body.message[0];
                }
            })
        }
    },
    created() {
        this.getImgInfo();
        this.getPhoto();
    }
}
</script>

<style lang="less">
.photoDetails {
    .tips {
        span {
            color: #6d6d72;
            padding: 0 16px;
        }
    }
    .mui-card-header{
        display: block;
        font-weight: bold;
        text-align: center;
    }
    .mui-card-footer {
        padding-bottom: 20px;
        span {
            position: absolute;
            right: 0;
            bottom: 0;
        }
    }
}
</style>
