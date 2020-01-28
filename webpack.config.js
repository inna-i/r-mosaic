/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const autoprefixer = require('autoprefixer');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const INDEX_TEMPLATE_PATH = path.resolve(__dirname, './src/index.html');
const INDEX_PATH = path.resolve(__dirname, './src/main.js');

const envVars = {
	'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
};
const isDev = process.env.NODE_ENV !== 'production';
const generateIndex = {
	title: 'App',
	env: envVars,
	template: INDEX_TEMPLATE_PATH,
	inject: 'body',
};

function getCommonStyleLoaders(enableModules) {
	const cssOptions = enableModules
		? {
			sourceMap: true,
			modules: true,
			importLoaders: 1,
			localIdentName: '[name]__[local]___[hash:base64:5]',
		}
		: {
			sourceMap: true,
		};
	return [
		{ loader: MiniCssExtractPlugin.loader },
		{ loader: 'css-loader', options: cssOptions },
		{
			loader: 'postcss-loader',
			options: {
				sourceMap: true,
				plugins: () => [autoprefixer({ browsers: ['last 3 versions', '> 1%'] })],
			},
		},
		{ loader: 'resolve-url-loader' },
	];
}

function getSassLoaders(enableModules) {
	return getCommonStyleLoaders(enableModules).concat({
		loader: 'sass-loader',
		options: { sourceMap: true },
	});
}

module.exports = options => {
	const config = {
		module: {
			rules: [{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			}, {
				test: /\.html$/,
				use: { loader: 'underscore-template-loader' },
			}, {
				test: /\.(ico)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
					context: './src',
				},
			}, {
				test: /\.css$/,
				use: getCommonStyleLoaders(false),
			}, {
				// App styles
				test: /\.scss$/,
				use: getSassLoaders(false),
			}, {
				test: /\.(png|jpg|svg)$/,
				loader: 'url-loader',
				options: {
					limit: 100000,
				},
			}, {
				test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader',
				options: {
					name: 'fonts/[name].[ext]',
					limit: 10000,
					mimetype: 'application/font-woff',
				},
			}],
		},
		stats: {
			colors: true,
		},
		plugins: [
			new webpack.LoaderOptionsPlugin({ debug: true }),
			new webpack.DefinePlugin(envVars),
			new HtmlWebpackPlugin(generateIndex),
			new MiniCssExtractPlugin({
				filename: 'main.css',
			}),			
		],
		entry: ['babel-polyfill', INDEX_PATH].concat(isDev ? ['webpack-hot-middleware/client?reload=true'] : []),
	};

	// BUNDLE ANALYZER config
	if (options && options.analyze) {
		config.plugins.push(new BundleAnalyzerPlugin({
			analyzerMode: 'server',
			generateStatsFile: false,
		}));
	}

	// DEV config
	if (isDev) {
		console.warn('Using dev environment');
		config.mode = 'development';
		config.devtool = 'source-map';
		config.plugins.push(
			new webpack.HotModuleReplacementPlugin()
		);
		// DEV SERVER config only for DEV environment
		config.devServer = {
			port: 3303,
			headers: { 'Access-Control-Allow-Origin': '*' },
			historyApiFallback: {
				rewrites: [
					{ from: /./, to: '/' },
				],
			},
			compress: true,
		};
	} else { // PRODUCTION config
		console.warn('Using prod environment');
		config.mode = 'production';
		config.devtool = false;
		config.plugins.push(
			new UglifyJSPlugin({
				sourceMap: 'source-map',
				compress: {
					screw_ie8: true,
					warnings: false,
				},
				comments: false,
				mangle: true,
				minimize: true,
				warningsFilter: function filter() {
					return false;
				},
			}),
			new CompressionPlugin({
				asset: '[path].gz[query]',
				algorithm: 'gzip',
				test: /\.(js|html|s?css)$/,
				threshold: 500,
				minRatio: 0.8,
				deleteOriginalAssets: 0,
			}),
			/*
			* Plugin: HtmlWebpackPlugin
			* Description: Simplifies creation of HTML files to serve your webpack bundles.
			* This is especially useful for webpack bundles that include a hash in the filename
			* which changes every compilation.
			*
			* See: https://github.com/ampedandwired/html-webpack-plugin
			*/
			new HtmlWebpackPlugin(generateIndex)
		);
		// ESLINT-LOADER config only for PROD environment
		config.module.rules.push({
			test: /\.js?$/,
			enforce: 'pre',
			loader: 'eslint-loader',
			exclude: /node_modules/,
			options: { configFile: path.resolve(__dirname, '.eslintrc') },
		});
	}
	return config;
};
