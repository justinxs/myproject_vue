<template>
    <section class="goodsDetails">
        <v-title :title="title"></v-title>
        <div class="mui-card">
            <div class="mui-card-header mui-card-media">
                <v-swipe :swipe="goodsPhotos"></v-swipe>
            </div>
            <div class="buy">
                <h3>{{buyInfo.title}}</h3>
                <div class="buy_price">
                    <del>市场价:${{buyInfo.market_price}}</del>
                    <strong>现价:${{buyInfo.sell_price}}</strong>
                </div>
                <div class="buy_num clearfix">
                    <p class="FL">购买数量: </p>
                    <span class="FL" @click="add(buyNum-1)">-</span>
                    <input class="FL" type="text" v-model="buyNum"></input>
                    <span class="FL" @click="add(1+buyNum)">+</span>
                    <p class="FL">库存:{{buyInfo.stock_quantity - buyNum}}</p>
                </div>
                <div class="add_goods clearfix">
                    <router-link to="/shopcar/list">
                        <button class="buyBtn mui-pull-left">立即购买</button>
                    </router-link>
                    <button class="addBtn mui-pull-right" @click="addToCar">加入购物车</button>
                </div>
            </div>
        </div>
        <div class="introduce">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">图文介绍</mt-tab-item>
                <mt-tab-item id="2">评论</mt-tab-item>
            </mt-navbar>
            <!-- tab-container -->
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <div class="mui-card-content">
                        <div class="mui-card-content-inner">
                            <p class="content_title">{{goodsInfo.title}}</p>
                            <p style="color: #333;" v-html="goodsInfo.content"></p>
                        </div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <v-comment :id="id"></v-comment>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    
    </section>
</template>

<script>
// import buyDate from '../../js/model/buy_date.js';
// import dateManager from '../../js/common/dateManager.js';

import ComptTitle from '../common/title.vue';
import ComptSwipe from '../common/swipe.vue';
import ComptComment from '../common/comment.vue';
export default {
    data() {
        return {
            title: "商品详情",
            id: this.$route.params.id,
            goodsInfo: {},
            buyInfo: {},
            goodsPhotos: [],
            buyNum: this.$store.state[this.$route.params.id] || 0,
            selected: "",
            showInfo: false
        }
    },
    components: {
        "v-title": ComptTitle,
        "v-swipe": ComptSwipe,
        "v-comment": ComptComment
    },
    methods: {
        getGoodsPhotos() {
            let url = this.config.domain + "/getthumimages/" + this.$route.params.id;
            this.$http.get(url).then(res => {
                if (res.body.status == 0) {
                    this.goodsPhotos = res.body.message.map((v, i) => {
                        v.src = this.config.baseURL + v.src;
                        return v
                    });
                }
            })
        },
        getGoodsInfo() {
            let url = this.config.domain + "/goods/getdesc/" + this.$route.params.id;
            this.$http.get(url).then(res => {
                if (res.body.status == 0) {
                    this.goodsInfo = res.body.message[0];
                    this.showInfo = true;
                }
            })
        },
        getBuyInfo() {
            let url = this.config.domain + "/goods/getinfo/" + this.$route.params.id;
            this.$http.get(url).then(res => {
                if (res.body.status == 0) {
                    this.buyInfo = res.body.message[0];
                }
            })
        },
        add(num) {
            num >= 0 && (this.buyNum = num);
        },
        addToCar(){
            this.$store.commit("set",{id:this.id,num:this.buyNum});
            // buyDate.set(this.id, this.buyNum);
            // document.querySelector("#carNum").innerText = buyDate.getAll();
        }
    },
    created() {
        this.getGoodsPhotos();
        this.getBuyInfo();
    },
    watch: {
        selected: function () {
            if (this.selected == 1 && JSON.stringify(this.goodsInfo) == "{}") {
                this.getGoodsInfo();
            }
        }
    }
}
</script>

<style lang="less">
.goodsDetails {
    .mui-card {
        .mui-card-media {
            padding: 0 24px;
            &:after {
                height: 0;
            }
        }
        .buy {
            padding: 6px 0px;
            background-color: #efeff4;
            h3 {
                text-align: center;
                font-size: 14px;
            }
            .buy_price {
                padding-left: 20px;
                margin: 10px 0px;
                strong {
                    margin-left: 40px;
                    font-size: 16px;
                    color: red;
                }
            }
            .buy_num {
                padding-left: 4px;
                .FL {
                    text-align: center;
                    float: left;
                    height: 30px;
                }
                p {
                    width: 60px;
                    line-height: 30px;
                    margin: 0 6px;
                }
                span {
                    width: 30px;
                    line-height: 30px;
                    font-size: 16px;
                    border: 1px solid #CCC;
                }
                input {
                    width: 70px;
                }
            }
            .add_goods {
                padding: 0px 20px;
                button {
                    width: 100px;
                    text-align: center;
                    border: none;
                    border-radius: 6px;
                    background-color: deepskyblue;
                }
            }
        }
    }
    .introduce {
        .mui-card-content-inner {
            padding: 10px 10px;
            p {
                margin: 0;
                padding: 0;
                text-indent: 2em;
                &[style],&[align]{
                    text-indent: 0;
                }
            }
            .content_title {
                text-indent: 0;
                padding:4px 0px;
                text-align: center;
                font-weight: bold;
            }
            img {
                width: 100%;
                vertical-align: middle;
            }
            table{
                width: 100% !important;
            }
        }
    }
}
</style>
