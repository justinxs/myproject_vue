<template>
    <section class="goodsList">
        <v-title :title="title"></v-title>
        <div class="content clearfix">
            <div class="mui-card mui-col-xs-6 mui-pull-left" v-for="item in goodsList" :key="item.id">
                <div class="mui-card-header">
                    <router-link :to='"/goods/details/"+item.id'>
                        <div>
                            <img class="mui-card-media" style="height:auto;width:100%" v-lazy="item.img_url" />
                        </div>
                    </router-link>
                </div>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <h3>{{item.title}}</h3>
                        <span>上市:{{item.add_time |formatDate}}</span>
                        <span class="mui-pull-right">点击:{{item.click}}</span>
                        <p style="color: #333;">{{item.zhaiyao}}</p>
                    </div>
                </div>
                <div class="mui-card-footer">
                    <div class="price">
                        <strong>${{item.sell_price}}</strong>&nbsp;
                        <del>${{item.market_price}}</del>
                    </div>
                    <div class="stock">库存:{{item.stock_quantity - (buyed[item.id] || 0)}}</div>
                </div>
            </div>
        </div>
        <div class="more">
            <button ref="moreBtn" @click="getGoodsList">获取更多商品</button>
        </div>
    </section>
</template>

<script>
import ComptTitle from '../common/title.vue';
// import buyDate from '../../js/model/buy_date.js';
export default {
    data() {
        return {
            goodsList: [],
            title: "商品列表",
            pageIndex: 1,
            buyed:this.$store.state
        }
    },
    components: {
        "v-title": ComptTitle
    },
    methods: {
        getGoodsList() {
            let url = this.config.domain + "/getgoods?pageindex=" + this.pageIndex;
            this.$http.get(url).then(res => {
                if (res.body.status == 0) {
                    if (res.body.message.length > 0) {
                        this.goodsList.push(...res.body.message);
                        this.pageIndex++;
                    }else{
                        this.$refs.moreBtn.style.backgroundColor = "#ccc";
                        this.$refs.moreBtn.innerText = "没有更多了";
                    }
                }
            })
        }
    },
    created() {
        this.getGoodsList();
    }
}
</script>

<style lang="less">
.goodsList {
    .content {
        width: 100%; // overflow: hidden;
        .mui-card {
            width: 49%;
            // height: 370px;
            margin: 0;
            margin-bottom: 10px;
            position: static;
            &:nth-of-type(2n) {
                margin-left: 2%;
            }
            span {
                color: #8f8f94;
            }
            h3 {
                font-size: 12px; // text-align: center;
            }
            .mui-card-header {
                padding: 10px;
            }
            p {
                font-size: 12px;
            }
        }
        .mui-card-content {
            height: 130px;
            .mui-card-content-inner {
                padding: 10px;
                p {
                    margin: 0;
                    padding-top: 4px;
                }
            }
        }
        .mui-card-footer {
            height: 60px;
            padding: 0;
            .price {
                padding-left: 4px;
                strong {
                    color: red;
                    font-size: 16px;
                }
            }
            .stock{
                padding-right: 4px;
            }
        }
    }
    .more {
        width: 100%;
        margin-bottom: 10px;
        button {
            text-align: center;
            width: 100%;
            padding: 0px 10px;
            height: 40px;
            line-height: 40px;
            background-color: deepskyblue;
        }
    }
}
</style>
