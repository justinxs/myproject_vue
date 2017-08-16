<template>
    <main>
        <v-header></v-header>
        <lg-preview></lg-preview>
        <router-view></router-view>
        <v-footer></v-footer>
    </main>
</template>

<script>
import ComptHeader from './home/header.vue';
import ComptFooter from './home/footer.vue';


export default {
    data: function () {
        return {}
    },
    components: {
        "v-header": ComptHeader,
        "v-footer": ComptFooter
    }
}
</script>

<style lang="less">
.clearfix::after{
    content:"";
    display:block;
    height: 0;
    width: 0;
    visibility: hidden;
    clear: both;
}
body{
    touch-action: none;
}

</style>

