var defaultConfig = {
  externals: {
  },
  entry: {
    index: './index.js',
  },
  output: {
    filename: '/dist/enum.js',
    library: 'Enum',
    libraryTarget: 'umd',
  },
  module: {
    // loaders: [
    //     {
    //         test: /\.js$/,
    //         loader: [
    //           'babel-loader',
    //         ],
    //     },
    // ],
  },
  plugins: [
  ],
  resolve: {
    alias: {
      'base': __dirname + '/src',
    },
  },
};

module.exports = defaultConfig;
