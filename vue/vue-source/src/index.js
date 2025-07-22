import { initGLobalAPI } from "./globalApi";
import { initMixin } from "./init";
import { initLifeCycle } from "./lifecycle";
import Watcher from "./observe/watcher";

function Vue(options) {
  this._init(options);
}

initMixin(Vue); // 在Vue.prototype上扩展了_init方法
initLifeCycle(Vue);
initGLobalAPI(Vue);

Vue.prototype.$watch = function (exprOrFn, cb, options = {}) {
  console.log(exprOrFn, cb, options);
  new Watcher(
    this,
    exprOrFn,
    {
      user: true,
    },
    cb
  );
};

export default Vue;
