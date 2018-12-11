const path = require('path');   // nodejs function - includes 'path' package into project
const HtmlWebpackPlugin = require('html-webpack-plugin');   // another package for webpack to build/stream html from src

module.exports = {
    devtool: 'cheap-module-eval-source-map',    // to get right line numbers in source files in debugger
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
            },    // load all files ending with '.js' using babel-loader
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images/',
                        name: '[name].[ext]'        // keeps original file name, without it was a hash
                    }
                  },
                  {
                    loader: 'image-webpack-loader', // before adding this loader 5 images were 43,2 KB
                    options: {}                     // now they are  20,6 KB
                  }

                ]
            }
        ]
    }
    //mode: 'development'         // bundles quicker without minifiying and other optimizations, which are done in prod mode
    // better practice: set webpack mode in npm in package.json

};