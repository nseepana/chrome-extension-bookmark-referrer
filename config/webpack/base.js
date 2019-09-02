const path = require('path');
const fsextra = require('fs-extra');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { WebpackChromeManifestPlugin } = require('../plugin/WebpackChromeManifestPlugin');

module.exports = {
	context: path.resolve(__dirname, '../../src'),
	entry: {
		background: ['./app/Background.ts'],
		popup: './view/Popup.tsx',
		options: './view/Options.tsx'
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)?$/,
				use: [{
					loader: "ts-loader"
				}],
				exclude: /node_modules/
			},
			{
				test: /\.css?$/,
				use: [{
					loader: "style-loader"
				}, {
					loader: "css-loader"
				}],
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpe?g)?$/,
				use: [{
					loader: "url-loader"
				}],
				exclude: /node_modules/
			},

		]
	},

	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Auto bookmark page referrer',
			template: './view/popup.html',
			filename: 'popup.html',
			chunks: ["runtime", "vendors", "popup"]
		}),
		new HtmlWebpackPlugin({
			title: 'Auto bookmark page referrer',
			template: './view/options.html',
			filename: 'options.html',
			chunks: ["runtime", "vendors", "options"]
		}),
		new CopyPlugin(
			[
				{
					from: 'images/*.png',
					to: path.resolve(__dirname, '../../dist'),
				}
			]
		),
		new WebpackChromeManifestPlugin(
			{
				field: "background",
				chunks: ["background"],
			})
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					enforce: true,
					chunks: "all"
				}
			}
		},
		/**
		 *  Ref: https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
		 *  Condition 1: The chunk is shared between both import calls
		 *  Condition 2: helpers is bigger than 30kb
		 *  Condition 3: Number of parallel requests at the import calls is 2
		 *  Condition 4: Doesn't affect request at initial page load
		 */
		runtimeChunk: "single"
	},
	resolve: {
		alias: {
			"@images": path.resolve('src/images/'),
			"@styles": path.resolve('src/styles/')
		},
		extensions: ['.tsx', '.ts', '.js']
	},
	output: {
		filename: '[name].[hash].js',
		path: path.resolve('dist'),
		publicPath: '/'
	}
}