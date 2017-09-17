"use strict";

//引入分离css—plugin
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//引用webpack
const webpack = require('webpack');

const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: {
        "build": "./src/app.js",
        // "myScroll":["scroll"]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "build.js"
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin(),
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            inject: "body",
            minify: {
                //压缩html
                //删除空格
                collapseWhitespace: true,
                //移除注释
                removeComments: true
            }
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'myScroll',
        //     filename: 'my_scroll.js'
        // }),
        //分离css
        new ExtractTextPlugin("styles.css"),
    ],
    module: {
        rules: [{
                test: /\.(less|css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader"]
                })
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //         "style-loader",
            //         "css-loader"
            //     ]
            // },
            // {
            //     test: /\.tpl$/,
            //     use: [
            //         "html-loader"
            //     ]
            // },
            {
                test: /\.(jpg|gif|png|ttf)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 19000
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015"],
                        plugins: ["transform-runtime"]
                    }
                }]
            },
            {
                test: /\.vue$/,
                use: [
                    "vue-loader"
                ]
            }
        ]

    }

}