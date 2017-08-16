<template>
  <article class="index">
    <v-swipe :swipe="swipeList"></v-swipe>
    <v-nav></v-nav>
  </article>
</template>

<script>
import ComptSwipe from '../common/swipe.vue';
import ComptNav from './nav.vue';
export default {
  data() {
    return {
      swipeList: []
    }
  },
  methods: {
    getSwipeList() {
      let url = this.config.domain + "/getLunbo"
      this.$http.get(url).then((res) => {
        if (res.body.status == 0) {
          this.swipeList = res.body.message.map(v => (v.src = v.img) && v);
        }
      })
    }
  },
  created() {
    this.getSwipeList();
  },
  components: {
    "v-swipe": ComptSwipe,
    "v-nav": ComptNav
  }
}
</script>

<style>

</style>
