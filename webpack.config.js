const isProduction = false;

const path = require('path');
const cssnano = require('cssnano');

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const babel = {
    test: /\.tsx?$/,
    loaders: ['babel-loader'],
    exclude: [/node_modules/, nodeModulesPath]
};

const cssLoaders = [
    {
        loader: 'style-loader',
    },
    {
        loader: 'css-loader',
        options: {
            modules: true,
            camelCase: true,
            sourceMap: !isProduction,
        },
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: !isProduction,
            plugins: isProduction ? [] : [cssnano()],
        },
    },
];

const mainConfig = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? '' : 'inline-source-map',
    target: 'electron-main',
    entry: './src/main/main',
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'dist', 'main')
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
        rules: [
            babel
        ]
    },
    node: {
        __dirname: true
    }
}

const rendererConfig = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? '' : 'inline-source-map',
    target: 'electron-renderer',
    entry: './src/renderer/renderer',
    output: {
        filename: 'renderer.js',
        path: path.join(__dirname, 'dist', 'renderer')
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
        rules: [
            babel,
            {
                test: /\.css$/,
                use: cssLoaders
            },
            {
                test: /\.scss$/,
                use: cssLoaders.concat([
                    {
                        loader: 'sass-loader'
                    }
                ])
            },
            {
                test: /.jpe?g$|.gif$|.png$|.svg$|.woff$|.woff2$|.ttf$|.otf$|.eot$/,
                use: 'file-loader',
            }
        ]
    }
}

module.exports = [ mainConfig, rendererConfig ];