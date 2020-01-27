/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const autoprefixer = require('autoprefixer');
// const AppLoaderScript = require('@talend/react-components/lib/AppLoader/constant');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const ICON = 'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNTEgMTUxIj4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPGNpcmNsZSBjeD0iNzUuNSIgY3k9Ijc1LjUiIHI9Ijc1LjUiIGZpbGw9IiMwNjc1QzEiLz4KICAgIDxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTYzLjAxNDI1LDkwLjI4ODg5MzMgQzYxLjg4MzI1LDkxLjc4MjY5MzMgNjAuMjMyMjUsOTIuNzUyNjkzMyA1OC4zNjY3NSw5My4wMTEzNiBDNTYuNTAxMjUsOTMuMjcwMDI2NyA1NC42NDg3NSw5Mi43OTE0OTMzIDUzLjE0NzI1LDkxLjY2NjI5MzMgQzUwLjA0Njc1LDg5LjMzODI5MzMgNDkuNDI5MjUsODQuOTM0NDkzMyA1MS43NjkyNSw4MS44NDM0MjY3IEM1Mi45MDAyNSw4MC4zNDk2MjY3IDU0LjU1MTI1LDc5LjM4NjA5MzMgNTYuNDEwMjUsNzkuMTI3NDI2NyBDNTYuNzQ4MjUsNzkuMDgyMTYgNTcuMDczMjUsNzkuMDU2MjkzMyA1Ny40MDQ3NSw3OS4wNTYyOTMzIEM1OC45MjU3NSw3OS4wNTYyOTMzIDYwLjQwMTI1LDc5LjU0MTI5MzMgNjEuNjM2MjUsODAuNDcyNDkzMyBDNjMuMTM3NzUsODEuNTk3NjkzMyA2NC4xMDYyNSw4My4yNDAyMjY3IDY0LjM2NjI1LDg1LjA5NjE2IEM2NC42MzI3NSw4Ni45NTIwOTMzIDY0LjE1MTc1LDg4Ljc5NTA5MzMgNjMuMDE0MjUsOTAuMjg4ODkzMyBNMTMuOTcxNzUsMTIuNTI3MjI2NyBDMTIuODM0MjUsMTQuMDIxMDI2NyAxMS4xODMyNSwxNC45ODQ1NiA5LjMyNDI1LDE1LjI0OTY5MzMgQzcuNDY1MjUsMTUuNTA4MzYgNS41OTk3NSwxNS4wMjk4MjY3IDQuMTA0NzUsMTMuODk4MTYgQzAuOTk3NzUsMTEuNTc2NjI2NyAwLjM4MDI1LDcuMTcyODI2NjcgMi43MjAyNSw0LjA4MTc2IEMzLjg1MTI1LDIuNTg3OTYgNS41MDIyNSwxLjYyNDQyNjY3IDcuMzY3NzUsMS4zNjU3NiBDNy42OTkyNSwxLjMyMDQ5MzMzIDguMDMwNzUsMS4yOTQ2MjY2NyA4LjM1NTc1LDEuMjk0NjI2NjcgQzkuODc2NzUsMS4yOTQ2MjY2NyAxMS4zNTIyNSwxLjc3OTYyNjY3IDEyLjU4NzI1LDIuNzEwODI2NjcgQzE0LjA4ODc1LDMuODM2MDI2NjcgMTUuMDYzNzUsNS40Nzg1NiAxNS4zMjM3NSw3LjMzNDQ5MzMzIEMxNS41ODM3NSw5LjE5MDQyNjY3IDE1LjEwMjc1LDExLjAzMzQyNjcgMTMuOTcxNzUsMTIuNTI3MjI2NyBNODcuOTYxMjUsMjguNjM1NjkzMyBDODQuMzQ3MjUsMjguNjM1NjkzMyA4MS4wMTI3NSwyOS44MjU1NiA3OC4zMjgyNSwzMS44MzAyMjY3IEw1OC4xMTMyNSw3LjE2NjM2IEM1OC4xNzgyNSw3LjA5NTIyNjY3IDU4LjI0OTc1LDcuMDE3NjI2NjcgNTguMzA4MjUsNi45MzM1NiBDNTkuNTk1MjUsNS4yNDU3NiA1OS4yNTA3NSwyLjg0NjYyNjY3IDU3LjU1NDI1LDEuNTcyNjkzMzMgQzU1Ljg1Nzc1LDAuMjkyMjkzMzMzIDUzLjQ0NjI1LDAuNjM1MDI2NjY3IDUyLjE2NTc1LDIuMzIyODI2NjcgQzUwLjg4NTI1LDQuMDEwNjI2NjcgNTEuMjI5NzUsNi40MDk3NiA1Mi45MTk3NSw3LjY4MzY5MzMzIEM1NC4xNzQyNSw4LjYyMTM2IDU1LjgxMjI1LDguNjg2MDI2NjcgNTcuMDk5MjUsNy45NzQ2OTMzMyBMNzcuMzI3MjUsMzIuNjUxNDkzMyBDNzUuODUxNzUsMzMuOTY0MjI2NyA3NC42MTY3NSwzNS41MjkxNiA3My43MDY3NSwzNy4yOTQ1NiBMMTYuMjMzNzUsMTEuMDI2OTYgQzE2LjY2Mjc1LDkuNzk4MjkzMzMgMTYuNzk5MjUsOC40NzkwOTMzMyAxNi42MTA3NSw3LjE1MzQyNjY3IEMxNi4yOTg3NSw0Ljk1NDc2IDE1LjE1NDc1LDMuMDA4MjkzMzMgMTMuMzczNzUsMS42NzYxNiBDMTEuNTkyNzUsMC4zMzc1NiA5LjM5NTc1LC0wLjIyNTA0IDcuMTg1NzUsMC4wNzg4OTMzMzMzIEM0Ljk3NTc1LDAuMzg5MjkzMzMzIDMuMDI1NzUsMS41MzM4OTMzMyAxLjY4MDI1LDMuMzA1NzYgQy0xLjA4ODc1LDYuOTU5NDI2NjcgLTAuMzYwNzUsMTIuMTc4MDI2NyAzLjMxODI1LDE0LjkzOTI5MzMgQzQuNzgwNzUsMTYuMDM4NjI2NyA2LjUyMjc1LDE2LjYxNDE2IDguMzIzMjUsMTYuNjE0MTYgQzguNzEzMjUsMTYuNjE0MTYgOS4xMDk3NSwxNi41ODgyOTMzIDkuNDk5NzUsMTYuNTMwMDkzMyBDMTEuNzA5NzUsMTYuMjE5NjkzMyAxMy42NjYyNSwxNS4wODE1NiAxNS4wMTE3NSwxMy4zMDk2OTMzIEMxNS4yNzE3NSwxMi45NjA0OTMzIDE1LjQ5OTI1LDEyLjU4NTQyNjcgMTUuNzA3MjUsMTIuMjEwMzYgTDczLjE1NDI1LDM4LjQ2NTAyNjcgQzcyLjQzOTI1LDQwLjE3MjIyNjcgNzIuMDE2NzUsNDIuMDIxNjkzMyA3MS45NDUyNSw0My45NTUyMjY3IEwyMy4xNDk3NSw0My45NTUyMjY3IEMyMi45ODA3NSw0Mi42MzYwMjY3IDIyLjI5ODI1LDQxLjM4MTQ5MzMgMjEuMTQxMjUsNDAuNTE0OTYgQzE4Ljg1OTc1LDM4LjgxNDIyNjcgMTUuNjE2MjUsMzkuMjY2ODkzMyAxMy45MDAyNSw0MS41MTcyOTMzIEMxMi4xODQyNSw0My43Njc2OTMzIDEyLjYzOTI1LDQ2Ljk2ODY5MzMgMTQuOTE0MjUsNDguNjYyOTYgQzE3LjE5NTc1LDUwLjM2MzY5MzMgMjAuNDMyNzUsNDkuOTExMDI2NyAyMi4xNDg3NSw0Ny42NjcwOTMzIEMyMi43MDc3NSw0Ni45Mjk4OTMzIDIzLjAzMjc1LDQ2LjEwMjE2IDIzLjE0OTc1LDQ1LjI1NTAyNjcgTDcxLjk0NTI1LDQ1LjI1NTAyNjcgQzcyLjAyOTc1LDQ3LjM0Mzc2IDcyLjUxNzI1LDQ5LjMyOTAyNjcgNzMuMzM2MjUsNTEuMTMzMjI2NyBMNjAuOTY2NzUsNTcuMjI0ODI2NyBDNjAuNDQwMjUsNTYuNTAwNTYgNTkuNjUzNzUsNTUuOTU3MzYgNTguNzExMjUsNTUuNzQzOTYgQzU2LjYzNzc1LDU1LjI3MTg5MzMgNTQuNTc3MjUsNTYuNTY1MjI2NyA1NC4xMDI3NSw1OC42MjgwOTMzIEM1My42MzQ3NSw2MC42OTA5NiA1NC45MzQ3NSw2Mi43NDA4OTMzIDU3LjAwODI1LDYzLjIxMjk2IEM1OS4wODE3NSw2My42Nzg1NiA2MS4xMzU3NSw2Mi4zODUyMjY3IDYxLjYxMDI1LDYwLjMyMjM2IEM2MS43NjYyNSw1OS42NTYyOTMzIDYxLjcyNzI1LDU4Ljk5NjY5MzMgNjEuNTQ1MjUsNTguMzgyMzYgTDczLjkyMTI1LDUyLjI5NzIyNjcgQzc0Ljk3NDI1LDU0LjE5MTk2IDc2LjQwNDI1LDU1Ljg0NzQyNjcgNzguMTEzNzUsNTcuMTczMDkzMyBMNjIuMDQ1NzUsNzkuMTg1NjI2NyBDNjAuMzI5NzUsNzguMDM0NTYgNTguMjg4NzUsNzcuNTU2MDI2NyA1Ni4yMzQ3NSw3Ny44NDA1NiBDNTQuMDI0NzUsNzguMTUwOTYgNTIuMDY4MjUsNzkuMjk1NTYgNTAuNzIyNzUsODEuMDY3NDI2NyBDNDcuOTYwMjUsODQuNzI3NTYgNDguNjg4MjUsODkuOTM5NjkzMyA1Mi4zNjA3NSw5Mi43MDA5NiBDNTMuODIzMjUsOTMuNzkzODI2NyA1NS41NzE3NSw5NC4zNzU4MjY3IDU3LjM3MjI1LDk0LjM3NTgyNjcgQzU3Ljc2MjI1LDk0LjM3NTgyNjcgNTguMTUyMjUsOTQuMzQ5OTYgNTguNTQ4NzUsOTQuMjk4MjI2NyBDNjAuNzU4NzUsOTMuOTg3ODI2NyA2Mi43MTUyNSw5Mi44NDMyMjY3IDY0LjA1NDI1LDkxLjA3MTM2IEM2NS4zOTk3NSw4OS4yOTk0OTMzIDY1Ljk3MTc1LDg3LjExMzc2IDY1LjY1OTc1LDg0LjkxNTA5MzMgQzY1LjM4Njc1LDgzLjAwMDk2IDY0LjQ3Njc1LDgxLjI3NDM2IDYzLjA2NjI1LDc5Ljk4MTAyNjcgTDc5LjE3MzI1LDU3LjkyOTY5MzMgQzgxLjY5NTI1LDU5LjU3ODY5MzMgODQuNzE3NzUsNjAuNTQyMjI2NyA4Ny45NjEyNSw2MC41NDIyMjY3IEM5Ni44MjA3NSw2MC41NDIyMjY3IDEwNC4wMDMyNSw1My4zOTY1NiAxMDQuMDAzMjUsNDQuNTg4OTYgQzEwNC4wMDMyNSwzNS43NzQ4OTMzIDk2LjgyMDc1LDI4LjYzNTY5MzMgODcuOTYxMjUsMjguNjM1NjkzMyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjMuNTk0IDMzLjcwNikiLz4KICA8L2c+Cjwvc3ZnPg==)';

const SASS_DATA = '@import \'~@talend/bootstrap-theme/src/theme/guidelines\';';
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
		options: { sourceMap: true, data: SASS_DATA },
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
				exclude: /@talend/,
			}, {
				// Bootstrap styles
				test: /\.scss$/,
				use: getSassLoaders(false),
				include: /bootstrap-theme/,
			}, {
				// Talend UI styles
				test: /\.scss$/,
				use: getSassLoaders(true),
				include: /@talend/,
				exclude: /bootstrap-theme/,
			}, {
				// App styles
				test: /\.scss$/,
				use: getSassLoaders(false),
				exclude: /@talend/,
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
			port: 8080,
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
