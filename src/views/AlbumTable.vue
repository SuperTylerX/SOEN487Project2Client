<template>
	<div>
		<div class="filter-wrap">
			<h2>Filter</h2>
			<Form :model="filterForm" :label-width="60">

				<FormItem class="formItem" label="ISRC">
					<Input v-model="filterForm.isrc" placeholder="Enter ISRC..."></Input>
				</FormItem>

				<FormItem class="formItem" label="Title">
					<Input v-model="filterForm.title" placeholder="Enter Title..."></Input>
				</FormItem>

				<FormItem class="formItem" label="Year">
					<Input v-model.number="filterForm.year" placeholder="Enter Year..."></Input>
				</FormItem>

				<FormItem class="formItem" label="Artist">
					<Input v-model="filterForm.artist" placeholder="Enter Artist..."></Input>
				</FormItem>
			</Form>
			<Button class="filterButton" type="primary" @click="doFilter">Filter</Button>
			<Button class="filterButton" type="warning" @click="resetFilter">Reset</Button>
		</div>

		<div class="create-album">
			<h2>Result</h2>
			<Button class="createAlbum" type="primary" to="createAlbum">Add Album</Button>
		</div>
		<Table stripe :columns="columns" :data="$store.state.tableData"></Table>
	</div>
</template>

<script>
export default {
	data() {
		return {
			columns: [
				{
					title: "Cover",
					render(h, dataset) {
						if (!dataset.row.img.id) {
							return h("span", {}, "No image");
						} else {
							return h("img", {
								attrs: {
									src: "/api/service/image/download?id=" + dataset.row.img.id,
									width: 100
								}
							});
						}
					}
				},
				{
					title: "ISRC",
					key: "ISRC"
				},
				{
					title: "Title",
					key: "title"
				},
				{
					title: "Year",
					key: "year"
				},
				{
					title: "Artist",
					key: "artist"
				},
				{
					title: "Description",
					key: "description"
				},
				{
					title: "Actions",
					render: (h, dataset) => {
						return h('span', [
							h('Button', {
								'attrs': {
									type: "success",
									to: {'path': '/modifyAlbum', query: {id: dataset.row.albumID}}
								}
							}, "Modify"),
							h('Button', {
								'attrs': {
									type: "error",
									style: "margin-left: 5px"
								},
								on: {
									click: () => {
										this.$Modal.confirm({
											title: "Delete Confirmation",
											content: "Do you want to delete album " + dataset.row.title + "?",
											onOk: () => {
												this.$store.dispatch('DELETEALBUM', {albumID: dataset.row.albumID});
											}
										});
									}
								}
							}, "Delete")
						]);
					}
				}
			],
			filterForm: {
				title: "",
				isrc: "",
				year: undefined,
				artist: ""
			}
		};
	},
	created() {
		this.$store.dispatch("LOADTABLEDATA");
	},
	methods: {
		doFilter() {
			this.$store.dispatch("DOFILTER", {filter: this.filterForm});
		},
		resetFilter() {
			this.filterForm = {
				title: "",
				isrc: "",
				year: undefined,
				artist: ""
			};
			this.$store.dispatch("LOADTABLEDATA");
		}
	}
};
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
