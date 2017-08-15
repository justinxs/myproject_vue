<template>
    <section class="title mint-header">
            <div class="mint-header-button is-left">
                    <button @click="rollback" class="mint-button mint-button--default mint-button--normal">
                        <span class="mint-button-icon">
                            <i class="mintui mintui-back"></i>
                        </span>
                        <label class="mint-button-text">返回</label>
                    </button>
            </div>
            <h1 class="mint-header-title">{{title}}</h1>
            <div class="mint-header-button is-right"></div>
    </section>
</template>

<script>

export default {
    props:["title"],
    methods: {
        rollback() {
          this.$router.go(-1);
        }
    }
}
</script>

<style lang="less">
    .title{
        
        background-color: rgb(225, 245, 106);
        color: #000;
        border-bottom: 1px solid #ccc;
        .mint-header-title{
            font-size: 18px;
            font-family: "微软雅黑";
        }
    }
</style>
