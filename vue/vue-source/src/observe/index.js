import { newArrayProto } from "./array";
import Dep from "./dep";

class Observer {
  constructor(data) {
    // 给数据添加一个__ob__属性，指向Observer实例
    Object.defineProperty(data, "__ob__", {
      enumerable: false, // 不可枚举
      value: this, // 指向当前的Observer实例
    });

    if (Array.isArray(data)) {
      data.__proto__ = newArrayProto; // 替换数组的原型链
      this.observeArary(data);
    } else {
      this.walk(data);
    }
  }

  // 循环对象，队属性以此劫持
  walk(data) {
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key]);
    });
  }

  observeArary(data) {
    data.forEach((item) => observe(item));
  }
}

function defineReactive(data, key, value) {
  // 如果值也是个对象，则继续往下劫持
  observe(value);
  let dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      if (Dep.target) {
        dep.depend();
      }
      return value;
    },
    set(newValue) {
      console.log(`属性 ${key} 被设置为 ${newValue}`);
      if (newValue === value) {
        return;
      }
      // 设置的新值也是个对象时，继续往下劫持
      observe(value);
      value = newValue;
      dep.notify();
    },
  });
}

export function observe(data) {
  // 只对对象进行劫持
  if (typeof data !== "object" || data === null) {
    return;
  }

  if (data.__ob__ instanceof Observer) {
    // 如果已经被劫持过了，则直接返回
    return data.__ob__;
  }
  return new Observer(data);
}
