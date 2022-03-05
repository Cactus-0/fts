const path = require('path');

/** @type {import('webpack').Configuration} */
const o = {
    target: 'node',
    mode: 'production',
    
    entry: {
        share: './src/sharer',
        receive: './src/receiver',
    },
    
    resolve: {
        extensions: [ '', '.ts', '.js' ]
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
            }
        ]
    },

    output: {
        path: path.join(__dirname, './release')
    }
}

module.exports = o;
