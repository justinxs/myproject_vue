<template>
    <main>
        <v-header></v-header>
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


</style>

