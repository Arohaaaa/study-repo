import { parseHTML } from "./parse";

export function compileToFunction(template) {
  // 1、将template转化成ast语法树
  let ast = parseHTML(template);
}
