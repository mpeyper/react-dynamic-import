var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: './index.jsx',
        vendor: ['react', 'react-dom']
    },
    output: {
        path: '/dist',
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: "vendor", filename: "vendor.bundle.js"})
    ],
    devtool: "#eval-source-map",
    resolve: {
        extensions: ['.js', '.jsx', '.html', '.css', '.ttf', '.eot', '.woff', '.woff2', '.gif', '.jpg', '.png', '.ico'],
        modules: [
            "node_modules"
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                },
                exclude: path.resolve(__dirname, 'node_modules')
            }
        ]
    },
    externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    }
};
