"use strict";
import Vue from 'vue';
import vueRouter from 'vue-router';
import vueResource from 'vue-resource';

Vue.use(vueRouter);
Vue.use(vueResource);

import ComptApp from './component/App.vue';

import router from './js/router.js';

let vm = new Vue({
    el: "#app",
    render: c => c(ComptApp),
    router
})