const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.js',
      builderOptions: {
        productName: "Account manager",
        appId: "gpmaccountmgr",
        copyright: "Copyright ©2022",
        win: {
          icon: "src/assets/icons/icon.ico"
        },
        extraResources: [
          {
            from: './public/app-extension',
            to: 'app-extension'
          },
          {
            from: 'node_modules/puppeteer',
            to: 'node_modules/puppeteer'
          }
        ]
      },
      externals: ['knex','sqlite3', 'puppeteer']
    }
  }
})
