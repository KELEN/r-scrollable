const path = require('path');

module.exports = {
  entry: path.join(__dirname, "src/index.js"),
  output: {
    path: path.join(__dirname, "lib"),
    library: 'r-scrollable',
    libraryTarget: 'umd',
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};