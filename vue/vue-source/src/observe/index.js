class Observer {
  constructor(data) {
    this.walk(data);
  }

  // 循环对象，队属性以此劫持
  walk(data) {
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key]);
    });
  }
}

function defineReactive(data, key, value) {
  // 如果值也是个对象，则继续往下劫持
  observe(value);
  Object.defineProperty(data, key, {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue === value) {
        return;
      }
      // 设置的新值也是个对象时，继续往下劫持
      observe(value);
      value = newValue;
    },
  });
}

export function observe(data) {
  // 只对对象进行劫持
  if (typeof data !== "object" || data === null) {
    return;
  }

  return new Observer(data);
}
