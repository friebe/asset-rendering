// webpack v4
const path = require('path');

module.exports = {
    entry: {
        functions : [ './assets/src/js/index.js', './assets/src/scss/index.scss']
        // './assets/src/scss/themes/light.scss'
    },
    output: {
        // pathinfo:true,
        path: path.resolve(__dirname, './assets'),
        filename: 'dist/js/[name].js'
    },
    // mode:'development',
    // devtool: 'eval',
    // cache:false,
    optimization: {
        // namedModules:true,
        // namedChunks: true,
        // minimize: true,
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                // {
                //     loader: 'file-loader',
                //     options: {
                //         name: 'dist/css/[name].css',
                //     }
                // },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap:true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap:true
                    }
                }
            ]
        }]
    }
};


