const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const browserConfig = {
	entry: './client/src/index.js',
	output: {
		path: path.join(__dirname, '/public'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-react'],
				},
			},
		],
	},
	mode: 'development',
	plugins: [
		new webpack.DefinePlugin({
			__isBrowser__: 'true',
		}),
	],
};

const serverConfig = {
	entry: path.join(__dirname, 'server/index'),
	target: 'node',
	externals: [nodeExternals()],
	output: {
		path: path.join(__dirname, '/server'),
		filename: 'bundledserver.js',
		publicPath: '/',
	},
	module: {
		rules: [{ test: /\.(js)$/, loader: 'babel-loader' }],
	},
	mode: 'development',
	plugins: [
		new webpack.DefinePlugin({
			__isBrowser__: 'false',
		}),
	],
};

module.exports = [browserConfig, serverConfig];
