const path = require('path');

module.exports = {
  entry: './wbund/calender.js',  // Entry point of your app
  output: {
    filename: 'calender.js',  // Output file name
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
  mode: 'development',  // Set mode to development
};
