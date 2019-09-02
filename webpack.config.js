const webpackMerge = require("webpack-merge");
const baseConfig = require("./config/webpack/base");

module.exports = ({ env = 'prod' }) => {
	console.log(env)
	const envconfig = require(`./config/webpack/${env}.js`);
	return webpackMerge(baseConfig, envconfig);
}