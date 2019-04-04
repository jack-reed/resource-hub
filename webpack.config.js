const path = require('path')

module.exports = {
  mode: 'development',
  entry: './public/javascripts/calendar.js',
  resolve: {
    extensions: [ '.js' ]
  },
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'dist')
  },
  devtool: 'sourcemap'
}