import Vue from "vue";
import VueRouter from "vue-router";
import AlbumTable from "../views/AlbumTable.vue";
import CreateAlbum from "../views/CreateAlbum.vue";
import ModifyAlbum from "@/views/ModifyAlbum";
import LogTable from "../views/LogTable";

Vue.use(VueRouter);

const routes = [
	{
		name: "Index",
		path: "/albumTable",
		component: AlbumTable,
		meta: {}
	},
	{
		name: "Create Album",
		path: "/createAlbum",
		component: CreateAlbum,
		meta: {}
	},
	{
		name: "Modify Album",
		path: "/modifyAlbum",
		component: ModifyAlbum,
		meta: {}
	},
	{
		name: "Logs",
		path: "/logTable",
		component: LogTable,
		meta: {}
	},
	{
		path: "*",
		redirect: "/albumTable"
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
