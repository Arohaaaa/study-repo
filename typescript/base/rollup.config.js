import ts from "rollup-plugin-typescript2";
import serve from "rollup-plugin-serve";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// 当前文件的绝对路径
const __filename = fileURLToPath(import.meta.url);
// 当前文件所在的文件夹的绝对路径
const __dirname = dirname(__filename);

export default {
  input: resolve(__dirname, "src/index.ts"),
  output: {
    // 打包后生成立即函数函数
    format: "iife",
    file: resolve(__dirname, "dist/bundle.js"),
    sourcemap: true,
  },
  plugins: [
    nodeResolve({
      extensions: [".js", ".js"],
    }),
    ts({
      tsconfig: resolve(__dirname, "tsconfig.json"),
    }),
    serve({
      port: 3000,
      openPage: "/public/index.html",
      open: true,
    }),
  ],
};
