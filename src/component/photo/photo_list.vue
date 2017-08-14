<template>
    <section class="photoList">
        <ul ref="getWidth" class="category">
            <Li class="mui-pull-left">
                <router-link to="/photo/list/0">全部</router-link>
            </Li>
            <li class="mui-pull-left" v-for="item in photoCategory" :key="item.id" @click="getPhotoList(item.id)">
                <router-link :to='"/photo/list/"+item.id'>{{item.title}}</router-link>
            </li>
        </ul>
        <div class="mui-card" v-for="item in photoList" :key="item.id">
            <router-link :to='"/photo/details/"+item.id'>
                <div class="mui-card-header mui-card-media" :style='"height:40vw;background-image:url("+getPhotoUrl(item.img_url)+")"'></div>
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

export default {
    data() {
        return {
            photoCategory: [],
            photoList: []
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
                    //dom渲染结束后触发
                    this.$nextTick(function () {
                        let widthArr = Array.prototype.map.call(this.$refs.getWidth.children, (v, i) => {
                            return parseInt(window.getComputedStyle(v).width)
                        });
                        this.$refs.getWidth.style.width = widthArr.reduce((v1,v2)=>v1+v2)+"px";
                        var tabScroll = new this.Scroll(this.$refs.getWidth);
                    });
                }
            })
        },
        getPhotoList(id) {
            let url = this.config.domain + "/getimages/" + id;
            this.$http.get(url).then(res => {
                if (res.body.status == 0) {
                    this.photoList = res.body.message;
                }
            })
        },
        getPhotoUrl(srcStr) {
            return this.config.baseURL + srcStr;
        }
    },
    created() {
        this.getPhotoCategory();
        this.getPhotoList(0);
    }
}
</script>

<style lang="less">
.photoList {
    overflow-x: hidden;
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
}
</style>
