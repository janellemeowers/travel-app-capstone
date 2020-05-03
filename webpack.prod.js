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
  // {
  //      test: /\.(png|svg|jpg|gif)$/,
  //      loader: 'url-loader',
  //              options: {
  //                  limit: 8000, // Convert images < 8kb to base64 strings
  //                  name: 'images/[hash]-[name].[ext]'}
  //    },
  //    {
  //    test: /\.(html)$/,
  //    use: [{
  //      loader: 'html-loader'
  //    }]
  //  },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        

    ]
};
