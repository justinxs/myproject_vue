<template>
  <section class="footer">
    <nav class="mui-bar mui-bar-tab">
      <a class="mui-tab-item mui-active" href="#/index">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-chat">
        <span class="mui-icon mui-icon-extra mui-icon-extra-heart-filled">
          <span class="mui-badge">0</span>
        </span>
        <span class="mui-tab-label">收藏</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-contact">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">0</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </a>
      <a class="mui-tab-item" href="#tabbar-with-map">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">个人中心</span>
      </a>
    </nav>
    <div></div>
  </section>
</template>


<script>
export default {

}
</script>

<style lang="less">
.footer{
  nav{
    background-color: #fff;
  }
  div{
    height: 50px;
  }
}

</style>
