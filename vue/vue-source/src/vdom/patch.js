export function createElm(vnode) {
  let { tag, data, children, text } = vnode;
  if (typeof tag === "string") {
    // 将真实节点和虚拟节点对应起来
    vnode.el = document.createElement(tag);

    patchProps(vnode.el, data);

    children.forEach((child) => {
      vnode.el.appendChild(createElm(child));
    });
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

export function patchProps(el, props) {
  for (let key in props) {
    if (key === "style") {
      const style = props[key];
      for (let styleName in style) {
        el.style[styleName] = style[styleName];
      }
    } else {
      el.setAttribute(key, props[key]);
    }
  }
}

export function patch(oldVNode, vnode) {
  const isRealElement = oldVNode.nodeType;
  if (isRealElement) {
    // 旧DOM元素
    const elm = oldVNode;
    // 父元素
    const parentElm = elm.parentNode;
    // 新DOM元素
    let newElm = createElm(vnode);
    // 将新DOM元素插入到旧的DOM元素后面
    parentElm.insertBefore(newElm, elm.nextSibling);
    // 删除旧的DOM元素
    parentElm.removeChild(elm);

    return newElm;
  } else {
    // diff算法
  }
}