<template>
    <section class="shopcar">
        <v-title :title="title"></v-title>
        <div class="mycar">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media" v-for="item in goodsList" :key="item.cou">
                    <div class="content">
                        <mt-switch v-model="item.cou" class="controlBtn mui-pull-left"></mt-switch>
                        <router-link :to='"/goods/details/"+item.id'>
                            <img style="width:auto;height:100%" class="mui-media-object mui-pull-left" :src="item.src">
                        </router-link>
                        <div class="mui-media-body">
                            <p>{{item.title}}</p>
                            <div class="buy_num clearfix FL">
                                <p class="FL">单价:
                                    <strong>${{item.sell_price}}</strong>
                                </p>
                                <span class="FL" @click="add(item.id,mybuyDate[item.id]-1)">-</span>
                                <input class="FL" type="text" v-model="mybuyDate[item.id]"></input>
                                <span class="FL" @click="add(item.id,1+mybuyDate[item.id])">+</span>
                                <button class="FL" @click="del(item.id)">删除</button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="paybox">
                <div class="pay">
                    <p class="mui-pull-left">选中商品数量: {{selectedGoods}}</p>
                    <p class="mui-pull-right">总价:
                        <strong>${{total}}</strong>
                    </p>
                    <button>付款</button>
                </div>
                <div></div>
            </div>
    
        </div>
    </section>
</template>

<script>
// import buyDate from '../../js/model/buy_date.js';
// import dateManager from '../../js/common/dateManager.js';
import ComptTitle from '../common/title.vue';
export default {
    data() {
        return {
            title: "购物车",
            goodsList: [],
            mybuyDate: this.$store.state,
            selected: true,
            numValue: 0
        }
    },
    computed: {
        total() {
            let totalList = [];
            this.goodsList.forEach((v, i) => {
                if (v.cou) {
                    totalList.push(v.sell_price * this.mybuyDate[v.id]);
                }
            });
            return totalList.length && totalList.reduce((v1, v2) => v1 + v2);
        },
        selectedGoods() {
            let count = 0;
            this.goodsList.forEach((v, i) => {
                if (v.cou) {
                    count++
                }
            });
            return count
        }
    },
    components: {
        "v-title": ComptTitle,
    },
    methods: {
        getGoods() {
            let url;
            if (Object.keys(this.mybuyDate).length > 0) {
                url = this.config.domain + "/goods/getshopcarlist/" + Object.keys(this.mybuyDate);
            } else {
                return
            }
            console.log(url);
            this.$http.get(url).then(res => {
                if (res.body.status == 0) {
                    this.goodsList = res.body.message.map((v, i) => {
                        v.src = this.config.baseURL + v.thumb_path;
                        v.cou = true;
                        return v
                    });
                }
            })
        },
        getNum(id) {
            return this.numValue = this.mybuyDate(id)
        },
        add(id, num) {
            if (num >=0) {
                this.$store.commit("set",{id:id,num:num});
            }
        },
        del(id) {
            this.$store.commit("remove",id);
            let index = this.goodsList.findIndex(item=>item.id==id);
            this.goodsList.splice(index,1);
        }
    },
    created() {
        this.getGoods()
    }
}
</script>

<style lang="less">
.shopcar {
    .mycar {
        ul {
            background-color: #efeff4;
            li {
                height: 80px;
                padding: 0;
                padding-left: 15%;
                margin: 2px 0px;
                background-color: #fff;
                .controlBtn {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                }
                &>.content {
                    width: 100%;
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    position: static;
                    .mui-media-body {
                        p:nth-of-type(1) {
                            height: 42px;
                            overflow: hidden;
                        }
                        .buy_num {
                            margin-top: 6px;
                            .FL {
                                text-align: center;
                                float: left;
                                height: 30px;
                            }
                            p {
                                line-height: 30px;
                                margin: 0 2px;
                                strong {
                                    display: inline-block;
                                    font-size: 16px;
                                    color: red;
                                }
                            }
                            span {
                                width: 20px;
                                line-height: 30px;
                                font-size: 16px;
                                border: 1px solid #CCC;
                                box-sizing: border-box;
                            }
                            input {
                                padding: 0;
                                width: 30px;
                                box-sizing: border-box;
                            }
                            button {
                                width: 40px;
                                height: 20px;
                                line-height: 20px;
                                padding: 0;
                                text-align: center;
                                box-sizing: border-box;
                                margin: 0 2px;
                                color: red;
                            }
                        }
                    }

                    img {
                        max-width: 60px;
                    }
                }
            }
        }
        .paybox {
            .pay {
                width: 100%;
                box-sizing: border-box;
                padding: 4px; // margin: 10px;
                background-color: rgba(16, 15, 15, 0.85);
                position: fixed;
                left: 0;
                bottom: 50px;
                button {
                    color: #fff;
                    width: 100%;
                    border: none;
                    background-color: deepskyblue;
                }
            }
            &>div:last-child{
                height: 82px;
            }
        }
    }
}
</style>
