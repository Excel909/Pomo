const path = require('path');

module.exports = {
  entry: {
    // calender:'./wbund/calender.js',
    // dashboard:'./wbund/dashboard.js',
    // signup:'./wbund/sign-up-success.js',
    notification:'./wbund/notification.js'
  },  
  output: {
    filename: '[name].js', 
    path: path.resolve(__dirname, 'dist'),  
  },
  mode: 'production', 
};
