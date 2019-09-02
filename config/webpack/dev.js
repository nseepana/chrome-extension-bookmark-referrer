
const webpack = require('webpack');
const path = require('path');
const devConfig = {
	mode: 'development',
	devtool: 'eval-source-map',
	devServer: {
		contentBase: "./dist",
		hot: true,
		// liveReload: true,
		noInfo: true,
		// open: 'Google Chrome',
		openPage: 'popup.html',
		port: 8989
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}

module.exports = devConfig;