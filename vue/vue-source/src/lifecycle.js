import Watcher from "./observe/watcher";
import { createElementVNode, createTextVNode } from "./vdom";
import { patch } from "./vdom/patch";

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
  const updateComponent = () => {
    vm._update(vm._render());
  };
  const watcher = new Watcher(vm, updateComponent, true);

  // 2、根据虚拟DOM产生真实DOM
  // 3、插入到el元素中
}

export function callHook(vm, hook) {
  const handlers = vm.$options[hook];
  if (handlers) {
    handlers.forEach((handler) => handler.call(vm));
  }
}
