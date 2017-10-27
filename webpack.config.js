const path = require('path');

module.exports = {
    entry: './src/index.js',
    target: 'web',
    node: {
      fs: 'empty'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
               test: /\.scss$/,
               loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.csv$/,
                loader: 'csv-loader',
                options: {
                  dynamicTyping: true,
                  header: true,
                  skipEmptyLines: true
              }
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        port: 8081,
        proxy: {
        '*': {
          target: 'http://localhost:8080',
          secure: false,
          rewrite: function(req) {
            req.url = req.url.replace(/^\/api/, '');
          },
          bypass: function(req, res, proxyOptions) {
            if (req.url.indexOf('api') !== 0) {
              return '/index.html';
            } else {
              return false;
            }
          }
        }
      }
    }
};
