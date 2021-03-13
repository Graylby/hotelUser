module.exports = {
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
