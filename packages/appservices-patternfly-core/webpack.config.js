const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'index': './src/index.ts'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/umd'),
    libraryTarget: 'umd',
    library: 'apicurio-models',
    umdNamedDefine: true
  },
  plugins: [
    new CopyPlugin([
      { 
        from: path.resolve(__dirname, 'styles'), 
        to: path.resolve(__dirname, 'dist/styles')
      }])
    ]
};