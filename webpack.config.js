const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const fs = require('fs');

const isDev = process.env.NODE_ENV === 'development';

// Скрипт поиска всех html-файлов по указанному адресу и создания для них своих экземпляров HtmlWebpackPlugin'а
function generateHtmlPlugins(templateDir) {
	const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
	return templateFiles.map(item => {
	  const parts = item.split('.');
	  const name = parts[0];
	  const extension = parts[1];
	  return new HtmlWebpackPlugin({
		filename: `${name}.html`,
		template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
		inject: false,
	  });
	});
}

// Аналогичный скрипт, но уже для создания массива точек входа для js-файлов страниц
function generateJsEntryPoints(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  const entries = new Object;
	templateFiles.map(item => {
	  const parts = item.split('.');
	  const name = parts[0];
    const extension = parts[1];
    entries[name] = path.resolve(__dirname, `${templateDir}/${name}.${extension}`);
  });
  return entries;
}

const htmlPlugins = generateHtmlPlugins('./src/pages');
const jsEntryPoints = generateJsEntryPoints('./src/scripts');

module.exports = {
	devServer: { contentBase: path.join(__dirname, 'dist')},
  entry: jsEntryPoints,
	output:
	{
		path: path.resolve(__dirname, 'dist'),
		filename: './scripts/[name].[chunkhash].js'
	},
	module:
	{
		rules:
		[
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {loader: "babel-loader"}
			},
			{
				test: /\.css$/,
				use:
				[
          {
					  loader: MiniCssExtractPlugin.loader,
            options: {publicPath: '../'}
          },
          'css-loader',
          'postcss-loader'
				]
			},
			{
				test: /\.(png|jpg|gif|ico|svg)$/,
				use:
				[
					'file-loader?name=./images/[name].[ext]',
					{
						loader: 'image-webpack-loader',
            options: {}
					}
				]
			},
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				loader: 'file-loader?name=./fonts/[name].[ext]'
			}
		]
	},
	plugins:
	[
		new MiniCssExtractPlugin({filename: './styles/style.[contenthash].css'}),
		new OptimizeCssAssetsPlugin(
		{
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {preset: ['default']},
			canPrint: true
		}),
		new WebpackMd5Hash(),
		new webpack.DefinePlugin({'NODE_ENV': JSON.stringify(process.env.NODE_ENV)})
	].concat(htmlPlugins)
};



