const path = require('path');
const webpack = require("webpack");


module.exports = {
  entry: path.join(__dirname, '/client/index.jsx'),
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: [/\.css$/],
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ]
  },
   output: {
    filename: 'bundle.js',
    path: __dirname + '/public'
  }
};