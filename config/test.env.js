'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = {
  NODE_ENV: '"testing"',
  ENV_CONFIG: '"test"',
  BASE_API: '"http://0.0.0.0:8097"',
}
/**
  module.exports = merge(devEnv, {
    NODE_ENV: '"testing"',
    ENV_CONFIG: '"test"',
    BASE_API: '"http://0.0.0.0:8097"',
  })
 */