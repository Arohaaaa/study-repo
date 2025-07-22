import Dep, { popTarget, pushTarget } from "./dep";

let id = 0;

// 不同组件有不同的watcher
class Watcher {
  constructor(vm, exprOrFn, options, cb) {
    this.id = id++;
    // 标识是否是渲染watcher
    this.renderWatcher = options;
    if (typeof exprOrFn === "string") {
      this.getter = function () {
        return vm[exprOrFn];
      };
    } else {
      this.getter = exprOrFn;
    }

    this.cb = cb;
    this.deps = [];
    this.depsId = new Set();
    this.lazy = options.lazy;
    this.dirty = this.lazy;
    this.vm = vm;
    // 标识是否是用户自己的watcher
    this.user = options.user;

    if (!this.lazy) {
      this.value = this.get();
    }
  }

  addDep(dep) {
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.deps.push(dep);
      this.depsId.add(id);
      dep.addSub(this);
    }
  }

  evaluate() {
    // 获取到用户函数的返回值，并把dirty标识设置为false
    this.value = this.get();
    this.dirty = false;
  }

  get() {
    pushTarget(this);
    // getter方法即对应着vm._update(vm._render())方法，调用后会去vm上取值，从而触发响应式数据的getter方法，
    let value = this.getter.call(this.vm);
    // 渲染完毕后清空
    popTarget();
    return value;
  }

  depend() {
    let i = this.deps.length;
    while (i--) {
      // 让计算属性watcher也收集渲染watcher
      this.deps[i].depend();
    }
  }

  update() {
    if (this.lazy) {
      // 如果是计算属性，依赖的值变化了，就标识计算属性是脏值了
      this.dirty = true;
    } else {
      queueWatcher(this);
    }
  }

  run() {
    const oldValue = this.value;
    const newValue = this.get();
    if (this.user) {
      this.cb.call(this.vm, newValue, oldValue);
    }
  }
}

let queue = [];
let has = {};
let pending = false;

function flushSchedulerQueue() {
  let flushQueue = queue.slice(0);
  queue = [];
  has = {};
  pending = false;
  flushQueue.forEach((q) => q.run());
}

function queueWatcher(watcher) {
  const id = watcher.id;
  if (!has[id]) {
    queue.push(watcher);
    has[id] = true;
    if (!pending) {
      nextTick(flushSchedulerQueue);
      pending = true;
    }
  }
}

let callbacks = [];
let waiting = false;
function flushCallbacks() {
  let cbs = callbacks.slice(0);
  waiting = false;
  callbacks = [];
  cbs.forEach((cb) => cb());
}

// 异步任务优雅降级
let timerFunc;
if (Promise) {
  timerFunc = () => {
    Promise.resolve().then(flushCallbacks);
  };
} else if (MutationObserver) {
  let observe = new MutationObserver(flushCallbacks);
  let textNode = document.createTextNode(1);
  observe.observe(textNode, {
    characterData: true,
  });
  timerFunc = () => {
    textNode.textContent = 2;
  };
} else if (setImmediage) {
  timerFunc = () => {
    setImmediage(flushCallbacks);
  };
} else {
  timerFunc = () => {
    setTimeout(flushCallbacks);
  };
}

export function nextTick(cb) {
  callbacks.push(cb);
  if (!waiting) {
    timerFunc(flushCallbacks);
    waiting = true;
  }
}

export default Watcher;
