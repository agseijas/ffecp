const path = require('path');

// WEB CONFIG: This is meant for loading the airports from a web service
const webConfig = {
  entry: './src/main/ts/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        include: /src/,
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};

// NODE CONFIG: This is meant for loading the airports from the csv file
const serverConfig = {
  entry: './src/main/ts/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        include: /src/
      },
      {
        test: /\.(csv|tsv)$/,
        use: 'csv-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist_node')
  }
};

module.exports = [ serverConfig ]