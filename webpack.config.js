var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		'main': './build/oe-anh-doe/src/main.js'
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './www')
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
			}
		]
    }
};