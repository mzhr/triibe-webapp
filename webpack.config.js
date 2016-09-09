var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
	context: __dirname,
	devtool: debug ? "inline-sourcemap" : null,
	entry: "./js/scripts.js",
	loaders: [
		{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
	],
	output: {
		path: __dirname + "/js",
		filename: "scripts.min.js"
	},
	plugins: debug ? [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	] : [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
	],
};

