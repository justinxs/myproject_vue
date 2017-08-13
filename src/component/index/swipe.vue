<template>
    <section class="swipe">
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="(v,i) in swipeList" :key="i">
                <a :href="v.url">
                    <img :src="v.img">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </section>
</template>

<script>

export default {
    data(){
        return {
            swipeList:[]
        }
    },
    methods: {
        getList() {
            // this.swipeList = [];
            let url = "http://139.199.192.48:8888/api/getLunbo"
            this.$http.get(url).then((res) => {
                console.log(res.body);
                if (res.body.status == 0) {
                    this.swipeList = res.body.message;
                }
            })
        }
    },
    created() {
        this.getList();
    }
}
</script>

<style lang="less">
.swipe {
    width: 100%;
    height: 230px;
    img {
        width: 100%;
        height: 230px;
    }
}
</style>
