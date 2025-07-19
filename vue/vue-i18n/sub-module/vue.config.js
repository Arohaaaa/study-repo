const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    extract: false, // CSS 内联（避免额外引入）
  },
  configureWebpack: {
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "packages"),
      },
    },
    performance: {
      // 关闭资源大小警告
      hints: false,
      maxAssetSize: 300000,
    },
  },
  productionSourceMap: false, // 不生成 .map 文件
});
