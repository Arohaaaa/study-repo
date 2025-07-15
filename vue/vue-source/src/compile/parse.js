const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// 匹配开始标签
const startTagOpen = new RegExp(`^<${qnameCapture}`);
// 匹配结束标签
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
// 匹配属性 name是匹配到的索引为1的，value是匹配到的索引为3或者索引为4或者索引为5的
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const startTagClose = /^\s*(\/?)>/; // 匹配开始标签的结束部分，例开始标签为<div>，则结束部分就是>，开始标签为<div />，结束部分就是/>

/**
 * 从头对html进行解析，解析完一部分就把解析完的部分删除，直到html全部被解析完。例：
 * 输入html：<div id="app">hello world</div>
 * 1、首先匹配开始标签
 *    匹配到<div，然后进行截取，截取后html剩余内容为 id="app">hello world</div>
 *
 * @param {*} html
 */
export function parseHTML(html) {
  const ELEMENT_TYPE = 1;
  const TEXT_TYPE = 3;
  // 用于存放元素
  const stack = [];
  // 指向栈中的最后一个元素
  let currentParent;
  let root;

  function createASTElement(tag, attrs) {
    return {
      tag,
      type: ELEMENT_TYPE,
      children: [],
      attrs,
      parent: null,
    };
  }

  function start(tag, attrs) {
    // 创造一个AST节点
    let node = createASTElement(tag, attrs);
    // 判断是否是空树
    if (!root) {
      // 如果为空，则将该节点作为根节点
      root = node;
    }
    if (currentParent) {
      node.parent = currentParent;
      currentParent.children.push(node);
    }
    stack.push(node);
    // currentParent为栈中最后一个
    currentParent = node;
  }

  function chars(text) {
    text = text.replace(/\s/g, "");
    // 如果遇到文本，则直接放到当前节点的children中
    if (text) {
      currentParent.children.push({
        type: TEXT_TYPE,
        text,
        parent: currentParent,
      });
    }
  }

  function end(tag) {
    // 遇到结束标签则弹出最后一个
    stack.pop();
    currentParent = stack[stack.length - 1];
  }

  // 将已经解析完的截取掉
  function advance(n) {
    html = html.substring(n);
  }

  // 解析开始标签
  function parseStartTag() {
    // start[0]是匹配到的所有内容，如<div
    // start[1]是匹配到的标签名称，如div
    const start = html.match(startTagOpen);

    if (start) {
      const match = {
        tagName: start[1],
        attrs: [],
      };
      // 截取掉已经匹配到的内容
      advance(start[0].length);

      // 如果不是开始标签的结束，就一直匹配下去，同时解析开始标签内的属性并从html中移除已匹配到的内容
      let attr;
      let end;
      while (
        // 匹配开始标签的结束部分，即">"
        !(end = html.match(startTagClose)) &&
        // 匹配属性
        (attr = html.match(attribute))
      ) {
        // 截取掉已经匹配到的属性的内容
        advance(attr[0].length);
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        });
      }
      if (end) {
        // 截取掉已经匹配到的>
        advance(end[0].length);
      }
      return match;
    }
    return false;
  }

  while (html) {
    // 如果textEnd = 0, 说明是一个开始标签或者结束标签
    // 如果textEnd > 0，说明就是文本的结束位置
    let textEnd = html.indexOf("<");
    if (textEnd === 0) {
      // 开始标签的匹配结果
      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        // 将开始标签的解析结果传递给start做后续处理
        start(startTagMatch.tagName, startTagMatch.attrs);
        continue;
      }

      let endTagMatch = html.match(endTag);
      if (endTagMatch) {
        advance(endTagMatch[0].length);
        // 将结束标签的解析结果传递给end做后续处理
        end(endTagMatch[1]);
        continue;
      }
    }
    if (textEnd > 0) {
      let text = html.substring(0, textEnd);
      if (text) {
        // 将文本的解析结果传递给chars做后续处理
        chars(text);
        advance(text.length);
      }
    }
  }

  return root;
}
