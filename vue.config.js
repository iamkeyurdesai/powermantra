module.exports = {
  pluginOptions: {
    webpack: {
      dir: [
        './webpack'
      ]
    }
  },
  pwa: {
    name: 'Power Mantra',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
        skipWaiting: true
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
