// webpack v4#

const path = require('path');
const customerStyles = require('./entries.loader');


module.exports = (env,options) => {
    console.log(`This is the Webpack 4 'mode': ${options.mode}`);
    isDevMode = options.mode === 'development';

    return{
        entry: {
            functions: ['./assets/src/js/index.js','./assets/src/scss/index.scss'],
            customers: customerStyles
        },
        output: {
            path: path.resolve(__dirname, './assets'),
            filename: 'dist/js/[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'dist/css/[name].css',
                            }
                        },
                        {
                            loader: 'extract-loader',options: { sourceMap: isDevMode ? true : false  }
                        },
                        {
                            loader: 'css-loader?-url',options: { sourceMap: isDevMode ? true : false }
                        },
                        {
                            loader: 'postcss-loader',options: { sourceMap: isDevMode ? true : false }
                        },
                        {
                            loader: 'sass-loader',options: { sourceMap: isDevMode ? true : false }
                        }
                    ]
                }
            ]
        }
    }
};