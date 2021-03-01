import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iviewui from "view-design";
import locale from 'view-design/dist/locale/en-US';

Vue.use(iviewui, {locale});
Vue.config.productionTip = false;

router.afterEach((to) => {
	store.commit("CHANGEROUTER", {to});
});

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
