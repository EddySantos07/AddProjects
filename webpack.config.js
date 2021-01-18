/* coppied and pasted from visual-algo project to simplify setup will be makign a project on how to use web
pack */

const path = require("path");
const webpack = require("webpack");

const config = {

    /*  entry is where to enter and find our file 
    output is where to bundle everything and put it into
    resolve these extensions so we dont have to teddiouslu have to write it out
    
    */

    
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
    },

    resolve: { extensions: [".mjs", ".js", ".jsx", ".css",".scss"] },

    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                use: [
                    "babel-loader",
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: 'style-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
            },
            {
                test:/\.scss$/,
                use: [
                    
                    "style-loader", // 3) injects styles into dom
                    "css-loader", // 2) turn css into commonjs
                    "sass-loader", // turns scss into css,
                ]
            }

        ]
    },

}

module.exports = config;
