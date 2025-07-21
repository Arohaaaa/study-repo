let id = 0;

// 依赖收集器，用来收集watcher
class Dep {
  constructor() {
    this.id = id++;
    // 存放着当前属性对应的watcher
    this.subs = [];
  }

  depend() {
    Dep.target.addDep(this);
  }

  addSub(watcher) {
    this.subs.push(watcher);
  }

  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }
}

// 在Dep上设置一个全局变量用于挂载watcher实例
Dep.target = null;

let stack = [];
export function pushTarget(watcher) {
  stack.push(watcher);
  Dep.target = watcher;
}
export function popTarget() {
  stack.pop();
  Dep.target = stack[stack.length - 1];
}

export default Dep;
