const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    watch: true,
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        client:{
            progress:true,
            reconnect:5,
        },
        compress: true,
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.d.ts'],
    },
    plugins: [new HtmlWebpackPlugin()],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

};