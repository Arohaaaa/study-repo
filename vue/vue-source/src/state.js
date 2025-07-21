import { observe } from "./observe";
import Dep from "./observe/dep";
import Watcher from "./observe/watcher";

export function initState(vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
  if (opts.computed) {
    initComputed(vm);
  }
}

function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key];
    },
    set(newValue) {
      vm[target][key] = newValue;
    },
  });
}

function initData(vm) {
  let data = vm.$options.data;
  // data可能是函数或对象
  data = typeof data === "function" ? data.call(this) : data;

  // 将处理后的data挂载到实例上
  vm._data = data;
  observe(data);

  // 为了使取值更加方便，这里做了一层代理：vm.name -> vm._data.name
  for (let key in data) {
    proxy(vm, "_data", key);
  }
}

function initComputed(vm) {
  const computed = vm.$options.computed;
  const watchers = (vm._computedWatchers = {});
  for (let key in computed) {
    let userDef = computed[key];

    // 计算属性watcher, 监控计算属性中get的变化
    let fn = typeof userDef === "function" ? userDef : userDef.get;
    // 将属性和watcher对应起来
    watchers[key] = new Watcher(vm, fn, { lazy: true });

    defineComputed(vm, key, userDef);
  }
}

function defineComputed(target, key, userDef) {
  const emptyFun = () => {};
  const setter = userDef.set || emptyFun;
  Object.defineProperty(target, key, {
    get: createComputedGetter(key),
    set: setter,
  });
}

function createComputedGetter(key) {
  // 检测是否需要执行这个getter
  return function () {
    const watcher = this._computedWatchers[key];
    if (watcher.dirty) {
      watcher.evaluate();
    }
    if (Dep.target) {
      // 计算属性watcher出栈后，还要渲染watcher
      watcher.depend();
    }
    return watcher.value;
  };
}
