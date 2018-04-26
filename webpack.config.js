var webpack = require('webpack');
var path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        app : './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:6].js',
       publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader"
                    , "sass-loader"
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['es2015'] }
                }
            },
            {
                test: /\.(ttf)$/,
                loader: 'url-loader?&name=css/fonts/[hash:6].[ext]'
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                  'url-loader?name=images/[hash:6].[ext]',
                ],
              }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin({
            filename: 'css/[name].[hash:6].css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: './src/images/index.ico',
            title: 'Assignment',
            inject: 'body'
        })
    ]
}