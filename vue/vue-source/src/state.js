export function initState(vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
}

function initData(vm) {
  let data = vm.$options.data;
  // data可能是函数或对象
  data = typeof data === "function" ? data.call(this) : data;
}
