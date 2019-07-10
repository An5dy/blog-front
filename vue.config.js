module.exports = {
  // 代理
  devServer: {
    proxy: {
      "/": {
        target: "http://lumen-blog.it",
        ws: false
      }
    }
  }
};
