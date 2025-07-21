import { initGLobalAPI } from "./globalApi";
import { initMixin } from "./init";
import { initLifeCycle } from "./lifecycle";

function Vue(options) {
  this._init(options);
}

initMixin(Vue); // 在Vue.prototype上扩展了_init方法
initLifeCycle(Vue);
initGLobalAPI(Vue);

export default Vue;
