// webpack.config.cjs

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/main.jsx',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.css$/, // Add this rule to handle CSS files
                use: [
                    MiniCssExtractPlugin.loader, // Use MiniCssExtractPlugin to extract CSS
                    'css-loader', // Use css-loader to process CSS files
                ],
            },
            {
                test: /\.(js|jsx)$/, // Updated to include .jsx files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // Transpile ES6+ and JSX code
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
                type: 'asset/resource',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Add .jsx here to resolve these files automatically
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html', // Adjust the path to your HTML file
            favicon: './src/assets/favicon.ico', // Path to your favicon
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    devServer: {
        static: './dist', // Updated property name from contentBase to static
        open: true,
        hot: true,
    },
    mode: 'development',
};
