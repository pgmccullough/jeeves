const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts', // Entry point is the content.ts file
  output: {
    filename: 'index.js', // Output filename
    path: path.resolve(__dirname, 'dist') // Output directory
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Match TypeScript files
        include: path.resolve(__dirname, 'src'), // Include only files in the src directory
        exclude: /node_modules/, // Exclude node_modules
        use: [
          'babel-loader', // Transpile JavaScript using Babel
          'ts-loader' // Transpile TypeScript
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'] // Allow importing TypeScript files without extension
  }
};
