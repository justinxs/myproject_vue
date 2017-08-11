"use strict";
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "build.js"
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            inject: "body"
        })
    ],
    module: {
        rules: [{
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            // {
            //     test: /\.tpl$/,
            //     use: [
            //         "html-loader"
            //     ]
            // },
            // {
            //     test: /\.(jpg|gif|png)$/,
            //     use: [{
            //             loader: "url-loader",
            //             options: {
            //                 limit: 19000
            //             }
            //         },
            //         "image-webpack-loader"
            //     ]
            // },
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