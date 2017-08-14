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
            let url = this.config.domain + "/getLunbo"
            this.$http.get(url).then((res) => {
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
