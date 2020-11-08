const fs = require('fs');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const {
//     CleanWebpackPlugin
// } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist')
};

const PAGES_DIR = `${PATHS.src}/pug/pages`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './scripts/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json', '.png', '.css', '.scss', '.pug'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // },
    devServer: {
        port: 4200
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/static/favicon.ico'), to: path.resolve(__dirname, 'dist/static') },
            ]
        }),
        ...PAGES.map(page => new HTMLWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/, '.html')}`
        }))
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: ['file-loader']
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            }
        ]
    }
};