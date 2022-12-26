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
            from: './public/extensions',
            to: 'extensions'
          }
        ]
      },
      externals: ['knex','sqlite3', 'puppeteer']
    }
  }
})
