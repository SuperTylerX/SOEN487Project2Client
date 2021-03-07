import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import soap from 'soap-everywhere';

const convert = require('xml-js');

const querystring = require('querystring');
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		routerName: "",
		tableData: [],
		logData: []
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
		LOADLOGS(state, payloads) {
			state.logData = payloads.result;
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
				commit('LOADLOGS', {});
			}
		},
		async UPDATEALBUM({commit}, payloads) {
			const album = payloads.album;
			const res = await axios.put("api/service/album/update", album);
			if (res.data.status === 200) {
				commit('LOADLOGS', {});
			}
		},
		async DELETEIMAGE(tool, payloads) {
			await axios.delete("api/service/image/delete?id=" + payloads.id);
		},
		async DOFILTER({commit}, payloads) {
			const res = await axios.get("api/service/album/search?" + querystring.stringify(payloads.filter));
			const tableData = res.data;
			commit('CHANGETABLEDATA', {tableData});
		},
		async LOADLOGS({commit}, payload) {
			// const url = 'http://localhost:9999/logs?wsdl';
			// const args = payload.args;
			// console.log(args);
			// soap.createClient(url, function (err, client) {
			// 	client.getChangeLogs(args, function (err, result) {
			// 		console.log(result.return);
			// 		commit('LOADLOGS', {result: result.return});
			// 	});
			// });
			const res = await axios({
				url: "http://localhost:9999/logs",
				method: "POST",
				data: "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soap=\"http://soap/\">\n" +
					"   <soapenv:Header/>\n" +
					"   <soapenv:Body>\n" +
					"      <soap:getChangeLogs>\n" +
					"         <!--Optional:-->\n" +
					"         <startDate>" + payload.args.startDate + "</startDate>\n" +
					"         <!--Optional:-->\n" +
					"         <endDate>" + payload.args.endDate + "</endDate>\n" +
					"         <!--Optional:-->\n" +
					"         <type>" + payload.args.type + "</type>\n" +
					"      </soap:getChangeLogs>\n" +
					"   </soapenv:Body>\n" +
					"</soapenv:Envelope>"
			});

			const result = JSON.parse(convert.xml2json(res.data));
			const resultArr = result.elements[0].elements[0].elements[0].elements;
			console.log(result.elements[0].elements[0].elements[0]);
			const entries = [];

			if (!resultArr){
				commit('LOADLOGS', {result: []});
				return;
			}
			resultArr.forEach(row => {
				const entry = {};
				row.elements.forEach(col => {
					entry[col.name] = col.elements[0].text;
				});
				entries.push(entry);
			});
			console.log(entries);
			commit('LOADLOGS', {result: entries});
		}
	},
	modules: {}
});
