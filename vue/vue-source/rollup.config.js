import babel from "rollup-plugin-babel";

export default {
  // 入口
  input: "./src/index.js",
  output: {
    // 出口
    file: "./dist/vue.js",
    // 打包后会在全局global上增加一个变量叫Vue
    name: "Vue",
    // esm, commonjs, umd, amd
    // umd模块化是会同时兼容commonjs, amd, esm等模块化规范
    format: "umd",
    // 用于调试源码
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
  ],
};
