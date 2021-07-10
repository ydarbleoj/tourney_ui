var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

// ROOT_API: '"https://www.tourney-app.com"'
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_API: '"http://localhost:3000"',
})
