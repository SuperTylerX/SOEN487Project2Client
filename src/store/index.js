import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const querystring = require('querystring');
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		routerName: "",
		tableData: []
	},
	mutations: {
		CHANGEROUTER(state, payloads) {
			state.routerName = payloads.to.name;
		},
		CHANGETABLEDATA(state, payloads) {
			state.tableData = payloads.tableData;
		},
		DELETEALBUM(state, payloads) {
			state.tableData = state.tableData.filter(row => row.albumID !== payloads.albumID);
		},
		SUBMITFORM(state, payloads) {
			state.tableData.push(payloads.album);
		},
		UPDATEALBUM(state, payloads) {
			state.tableData.push(payloads.album);
		}
	},
	actions: {
		async LOADTABLEDATA({commit}) {
			const res = await axios.get("api/service/album");
			const tableData = res.data;
			commit('CHANGETABLEDATA', {tableData});
		},
		async DELETEALBUM({commit}, payloads) {
			const albumID = payloads.albumID;
			const res = await axios.delete("api/service/album/delete?albumID=" + albumID);
			if (res.data.status === 200) {
				commit('DELETEALBUM', {albumID});
			}
		},
		async SUBMITFORM({commit}, payloads) {
			const album = payloads.album;
			const res = await axios.post("api/service/album/create", album);
			if (res.data.status === 200) {
				commit('SUBMITFORM', {album});
			}
		},
		async UPDATEALBUM({commit}, payloads) {
			const album = payloads.album;
			const res = await axios.put("api/service/album/update", album);
			if (res.data.status === 200) {
				commit('UPDATEALBUM', {album});
			}
		},
		async DELETEIMAGE(tool, payloads) {
			await axios.delete("api/service/image/delete?id=" + payloads.id);
		},
		async DOFILTER({commit}, payloads) {
			const res = await axios.get("api/service/album/search?" + querystring.stringify(payloads.filter));
			const tableData = res.data;
			commit('CHANGETABLEDATA', {tableData});
		}
	},
	modules: {}
});
