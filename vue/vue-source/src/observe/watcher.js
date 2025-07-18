import Dep from "./dep";

let id = 0;

// 不同组件有不同的watcher
class Watcher {
  constructor(vm, fn, options) {
    this.id = id++;
    this.renderWatcher = options;
    this.getter = fn;
    this.deps = [];
    this.depsId = new Set();
    this.get();
  }

  addDep(dep) {
    let id = dep.id;
    if (!this.depsId.has(id)) {
      this.deps.push(dep);
      this.depsId.add(id);
      dep.addSub(this);
    }
  }

  get() {
    Dep.target = this;
    // getter方法即对应着vm._update(vm._render())方法，调用后会去vm上取值，从而触发响应式数据的getter方法，
    this.getter();
    // 渲染完毕后清空
    Dep.target = null;
  }

  update() {
    this.get();
  }
}

export default Watcher;
