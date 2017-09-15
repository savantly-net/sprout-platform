const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const allFiles = (ctx => {
    let keys = ctx.keys();
    let values = keys.map(ctx);
    return keys.reduce((o, k, i) => { o[k] = values[i]; return o; }, {});
})(require.context('./src/main/resources/static', true, /.*/));



module.exports = {
    entry: allFiles,
    output: {
        path: path.resolve(__dirname, "./src/main/resources/static/dist/"),
        filename: "[name].bundle.js"
    }
};