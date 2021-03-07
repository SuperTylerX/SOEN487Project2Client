<style>

body, html {
	height: 100%;
}

.layout {
	border: 1px solid #d7dde4;
	background: #f5f7f9;
	border-radius: 4px;
	overflow: hidden;
	min-height: 100%;
}

.layout-logo {
	float: left;
	top: 15px;
	left: 20px;
	font-size: 20px;
	color: white;
}

.layout-nav {
	float: right;
}

.layout-footer-center {
	text-align: center;
}
</style>
<template>
	<div class="layout">
		<Layout>
			<Header style="height: 60px">
				<Menu mode="horizontal" theme="dark" active-name="1">
					<div class="layout-logo">Album Management System</div>
					<div class="layout-nav">
						<MenuItem name="1" to="/albumTable">
							Albums
						</MenuItem>
						<MenuItem name="1" to="/logTable">
							Logs
						</MenuItem>
					</div>
				</Menu>
			</Header>
			<Content :style="{ padding: '0 50px' }">
				<Breadcrumb :style="{ margin: '20px 0' }">
					<BreadcrumbItem to="/albumTable">Home</BreadcrumbItem>
					<BreadcrumbItem>{{ $store.state.routerName }}</BreadcrumbItem>
				</Breadcrumb>
				<Card>
					<div style="min-height: 200px;">
						<router-view/>
					</div>
				</Card>
			</Content>
			<Footer class="layout-footer-center"
			>Concorida SOEN 487 Assignment 2
			</Footer
			>
		</Layout>
	</div>
</template>
<script>
export default {};
</script>
