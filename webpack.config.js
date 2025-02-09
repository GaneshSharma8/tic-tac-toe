const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // Correct import
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: "development",
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'], // Loaders for CSS files
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new CleanWebpackPlugin(), // Clean dist folder before build
        new HtmlWebpackPlugin({
            template: './src/index.html', // Template for index.html
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/libraries', to: 'libraries' }, // Copy libraries folder
            ],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/style.css', to: 'style.css' }, // Copy CSS to `dist`
            ],
        }),
        new Dotenv(),
    ],
    output: {
        filename: 'sketch.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: './dist', // Serve files from dist
        port: 8080, // Development server port
        hot: false, // Disable Hot Module Replacement
        liveReload: true, // Use only live reload
    },
};