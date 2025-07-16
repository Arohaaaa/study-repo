import { createElementVNode, createTextVNode } from "./vdom";

function createElm(vnode) {
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

function patchProps(el, props) {
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

function patch(oldVNode, vnode) {
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

export function initLifeCycle(Vue) {
  Vue.prototype._update = function (vnode) {
    const vm = this;
    const el = vm.$el;

    vm.$el = patch(el, vnode);
  };
  Vue.prototype._c = function () {
    return createElementVNode(this, ...arguments);
  };
  Vue.prototype._v = function () {
    return createTextVNode(this, ...arguments);
  };
  Vue.prototype._s = function (value) {
    if (typeof value !== "object") return value;
    return JSON.stringify(value);
  };
  Vue.prototype._render = function () {
    // 通过with+call语法，将render函数的作用域指向vm，这样render函数中的
    // _c，_v，_s以及变量都是从vm上取
    return this.$options.render.call(this);
  };
}

export function mountComponent(vm, el) {
  vm.$el = el;
  // 1、调用render方法产生虚拟节点
  vm._update(vm._render());
  // 2、根据虚拟DOM产生真实DOM
  // 3、插入到el元素中
}
