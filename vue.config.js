module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:8080',
				pathRewrite: {'^/api': ''}
			}
		},
		disableHostCheck: true
	}
};
