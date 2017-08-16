<template>
    <section class="swipe">
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="(v,i) in swipe" :key="i">
                <a :href="v.url">
                    <img ref="imgH" :src="v.src">
                </a>
            </mt-swipe-item>
        </mt-swipe>
    </section>
</template>

<script>

export default {
    props: ["swipe"]
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
