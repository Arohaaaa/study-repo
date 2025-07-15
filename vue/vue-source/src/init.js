import { compileToFunction } from "./compile";
import { mountComponent } from "./lifecycle";
import { initState } from "./state";

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this;
    // 将选项挂载到实例上
    vm.$options = options;
    // 初始化状态
    initState(vm);

    if (options.el) {
      vm.$mount(options.el);
    }
  };

  Vue.prototype.$mount = function (el) {
    const vm = this;
    const opts = vm.$options;
    el = document.querySelector(el);

    if (!opts.render) {
      let template;
      if (opts.template) {
        template = opts.template;
      } else if (el) {
        template = el.outerHTML;
      }

      if (template) {
        const render = compileToFunction(template);
        opts.render = render;
      }
    }
    mountComponent(vm, el);
  };
}
