module.exports = {
  publicPath:'./',            //部署应用包时的基本 URL
  outputDir:'dist',//生成的生产环境构建文件的目录
  assetsDir:'static', //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  indexPath:'index.html', //指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径

  devServer: {
    proxy: {
      "apiPath": {
        target: "需要跨域请求的地址",
        changeOrigin: true,
        pathRewrite: {
          "^/apiPath": "/",
        }
      },
    },
    public: require('os').networkInterfaces()[Object.keys(require('os').networkInterfaces())[0]][1].address + ':8080',
    disableHostCheck: true
  }
};
