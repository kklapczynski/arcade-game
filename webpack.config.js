const path = require('path');   // nodejs function - includes 'path' package into project
const HtmlWebpackPlugin = require('html-webpack-plugin');   // another package for webpack to build/stream html from src

module.exports = {
    entry: ['babel-polyfill','./src/js/app.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),  // was: path.resolve(__dirname, 'dist/js'), but dev-server wasn't updating when changes in index.html done
        filename: 'js/bundle.js'                // was: 'bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin(
            {template: './src/index.html'}
        )
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use: 'babel-loader'
            }    // load all files ending with '.js' using babel-loader
        ]
    }
    //mode: 'development'         // bundles quicker without minifiying and other optimizations, which are done in prod mode
    // better practice: set webpack mode in npm in package.json

};