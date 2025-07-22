let oldArrayProto = Array.prototype;
// newArrayProto.__proto__ = oldArrayProto;
export let newArrayProto = Object.create(oldArrayProto);

// 数组所有的变异方法
const methods = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];

methods.forEach((method) => {
  newArrayProto[method] = function (...args) {
    // 调用原来的方法
    const result = oldArrayProto[method].apply(this, args);

    let inserted;
    // this.__ob__ 是 Observer 的实例
    const ob = this.__ob__;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        // splice的第二个参数是删除的数量，后面的都是插入的元素
        inserted = args.slice(2);
        break;
      default:
        break;
    }
    // 劫持新插入的元素
    if (inserted) {
      ob.observeArary(inserted);
    }

    ob.dep.notify();
    return result;
  };
});
