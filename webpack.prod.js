const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
//const WorkboxPlugin = require('workbox-webpack-plugin')
//const runtime = require("regenerator-runtime/runtime");
//const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    devServer: {
    port: 3000},
    output: {
    libraryTarget: 'var',
    library: 'Client',
},

    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
},
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
   },
 ],
  },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),


    ]
};
