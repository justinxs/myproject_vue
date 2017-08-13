<template>
  <article class="index">
    <v-swipe></v-swipe>
    <v-nav></v-nav>
  </article>
</template>

<script>
import ComptSwipe from './swipe.vue';
import ComptNav from './nav.vue';
export default {
  components:{
      "v-swipe":ComptSwipe,
      "v-nav":ComptNav
  }
}
</script>

<style>

</style>
