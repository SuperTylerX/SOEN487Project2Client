<template>
	<div>
		<div class="filter-wrap">
			<h2>Filter</h2>
			<Form :model="filterForm" :label-width="120">

				<FormItem class="formItem" label="Date Range">
					<DatePicker type="daterange" placement="bottom-end" placeholder="Select date range"
								v-model="filterForm.dateRange"></DatePicker>
				</FormItem>

				<FormItem label="Radio">
					<RadioGroup v-model="filterForm.type">
						<Radio label="CREATE">CREATE</Radio>
						<Radio label="UPDATE">UPDATE</Radio>
						<Radio label="DELETE">DELETE</Radio>
					</RadioGroup>
				</FormItem>

			</Form>
			<Button class="filterButton" type="primary" @click="doFilter">Filter</Button>
			<Button class="filterButton" type="warning" @click="resetFilter">Reset</Button>
		</div>

		<div class="create-album">
			<h2>Result</h2>
			<Button class="createAlbum" type="primary" @click="clearLog">Clear Logs</Button>
		</div>
		<Table stripe :columns="columns" :data="$store.state.logData"></Table>
	</div>
</template>

<script>

import axios from "axios";

const convert = require('xml-js');

Date.prototype.format = function (fmt) {
	const o = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S": this.getMilliseconds()
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (const k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};

export default {
	data() {
		return {
			columns: [
				{
					title: "Date",
					render(h, rawData) {
						const date = new Date(Number(rawData.row.log_date));
						return h("span", {}, date.format("yyyy-MM-dd hh:mm:ss"));
					}
				},
				{
					title: "ISRC",
					key: "log_isrc"
				},
				{
					title: "Type",
					key: "log_type"
				},
				{
					title: "Description",
					key: "log_content"
				}
			],
			filterForm: {
				type: "",
				dateRange: []
			}
		};
	},
	created() {
		this.$store.dispatch("LOADLOGS", {args: {startDate: "", endDate: "", type: ""}});
	},
	methods: {
		doFilter() {
			const args = {};
			args["type"] = this.filterForm.type;
			args["startDate"] = this.filterForm.dateRange[0] === "" ? "" : this.filterForm.dateRange[0].getTime();
			args["endDate"] = this.filterForm.dateRange[1] === "" ? "" : this.filterForm.dateRange[1].getTime();
			this.$store.dispatch("LOADLOGS", {args});
		},
		resetFilter() {
			this.filterForm = {};
			this.$store.dispatch("LOADLOGS", {args: {startDate: "", endDate: "", type: ""}});
		},
		clearLog() {
			axios({
				url: "http://localhost:9999/logs",
				method: "POST",
				data: "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:soap=\"http://soap/\">\n" +
					"   <soapenv:Header/>\n" +
					"   <soapenv:Body>\n" +
					"      <soap:clearLogs/>\n" +
					"   </soapenv:Body>\n" +
					"</soapenv:Envelope>"
			}).then(res => {
				const result = JSON.parse(convert.xml2json(res.data));
				const resultArr = result.elements[0].elements[0].elements[0].elements;
				// console.log(resultArr[2].elements[0].elements[0].elements[0].text);
				this.$Modal.error({
					title: "error",
					content: resultArr[2].elements[0].elements[0].elements[0].text
				});
			});

		}
	}
}
;
</script>

<style lang="less" scoped>
.filter-wrap {

	.filterButton {
		float: right;
		margin: 0 0 20px 10px;
	}
}

.create-album {
	width: 100%;
	overflow: hidden;

	.createAlbum {
		float: right;
		margin: 0 0 20px 0;
	}
}
</style>
