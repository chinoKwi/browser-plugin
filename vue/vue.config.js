const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',//publicPath取代了baseUrl
  transpileDependencies: true
})
