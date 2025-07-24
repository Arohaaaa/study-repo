import { initGlobalAPI } from "./globalApi";
import { initMixin } from "./init";
import { initLifeCycle } from "./lifecycle";
import { initStateMixin } from "./state";

function Vue(options) {
  this._init(options);
}

// 在Vue.prototype上扩展方法
initMixin(Vue);
initLifeCycle(Vue);
initGlobalAPI(Vue);
initStateMixin(Vue);

export default Vue;
