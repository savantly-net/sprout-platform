const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: "./assets.js",
    },
    output: {
        path: path.resolve(__dirname, "./src/main/resources/static/dist/"),
        filename: "[name].bundle.js"
    }
};