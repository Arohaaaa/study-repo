import { observe } from "./observe";

export function initState(vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm);
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
