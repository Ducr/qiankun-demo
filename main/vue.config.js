module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_URL,
  transpileDependencies: ['common'],
  chainWebpack: config => {
    config.plugin('html')
      .tap((args) => {
        args[0].title = 'qiankun-mian'
        return args
      })
  }
}
