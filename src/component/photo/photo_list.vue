<template>
    <section class="photoList wrapper">
        <ul ref="getWidth" class="category" v-if="showCategory">
            <Li class="mui-pull-left">
                <router-link to="/photo/list/0">全部</router-link>
            </Li>
            <li class="mui-pull-left" v-for="item in photoCategory" :key="item.id" @click="getPhotoList(item.id)">
                <router-link :to='"/photo/list/"+item.id'>{{item.title}}</router-link>
            </li>
        </ul>
        <div class="mui-card" v-for="item in photoList" :key="item.id">
            <router-link :to='"/photo/details/"+item.id'>
                <div class="mui-card-header">
                    <img class="mui-card-media" style="height:100%;width:100%" v-lazy="item.img_url" />
                </div>
            </router-link>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>{{item.title}}</p>
                    <p style="color: #333;">{{item.zhaiyao}}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
//组件中引入iscroll插件,全局引入与Vue不兼容,use不了
import IScroll from 'iscroll';
export default {
    data() {
        return {
            photoCategory: [],
            photoList: [],
            showCategory: false
        }
    },
    watch: {
        $route: function () {
            this.getPhotoList(this.$route.params.id);
        }
    },
    methods: {
        getPhotoCategory() {
            let url = this.config.domain + "/getimgcategory";
            this.$http.get(url).then(res => {
                if (res.body.status == 0) {
                    this.photoCategory = res.body.message;
                    this.showCategory = true;
                    //dom渲染结束后触发
                    this.$nextTick(function () {
                        let widthArr = Array.prototype.map.call(this.$refs.getWidth.children, (v, i) => {
                            return parseInt(window.getComputedStyle(v).width)
                        });
                        this.$refs.getWidth.style.width = widthArr.reduce((v1, v2) => v1 + v2) + "px";
                        //自定义的scroll插件,没有iscroll那么丝滑
                        // var tapScroll = new this.Scroll(this.$refs.getWidth);

                        //iscroll插件实例化
                        let myScroll = new IScroll('.wrapper', {
                            //mouseWheel: true,//滚轮
                            click: true,
                            //eventPassthrough: true, //纵向滚动整个页面，横向滚动iscroll区域
                            scrollX: true, //默认是纵向，横向需要设置scrollX
                            scrollY: false
                        });
                        //dom操作下划线
                        this.$refs.getWidth.onclick = function (e) {
                            Array.prototype.forEach.call(this.children, (v, i, self) => {
                                v.style.borderBottom = "";
                            })
                            e.target.parentNode.style.borderBottom = "1px solid deepskyblue";
                        }
                    });
                }
            })
        },
        getPhotoList(id) {
            let url = this.config.domain + "/getimages/" + id;
            this.$http.get(url).then(res => {
                if (res.body.status == 0) {
                    this.photoList = res.body.message.map((v, i) => {
                        v.img_url = this.config.baseURL + v.img_url;
                        return v
                    });;
                }
            })
        }
    },
    created() {
        this.getPhotoCategory();
        this.getPhotoList(this.$route.params.id);
    }
}
</script>

<style lang="less">
.photoList {
    // overflow-x: hidden;
    ul {
        width: 100%;
        padding: 0;
        margin: 0;
        height: 30px;
        list-style: none;
        overflow: hidden;
        li {
            a {
                display: inline-block;
                line-height: 20px;
                color: deepskyblue;
                font-size: 14px;
                padding: 4px;
            }
        }
    }
    .mui-card-header {
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
    }
}
</style>
