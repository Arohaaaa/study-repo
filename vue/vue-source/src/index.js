import { initMixin } from "./init";

function Vue(options) {
  this._init(options);
}

initMixin(Vue); // 在Vue.prototype上扩展了_init方法

export default Vue;
