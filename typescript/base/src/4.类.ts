// 类本身就可以充当类型, 可以描述实例

// class Circle {
//   public x: string;
//   public y: string;

//   constructor(x: string, y: string) {
//     this.x = x;
//     this.y = y;
//   }
// }

// // 在构造函数中加入修饰符，等价于上述Circle类写法
// class Animal {
//   constructor(public name: string, public age: number) {}
// }

// let animal = new Animal("可莉", 12);

// 修饰符
// public （父、子、外界都能访问，默认）
// protected （父、子能访问）
// private（只有自己能访问）

// readonly仅读属性，写在修饰符后面

// 类的功能 主要是实例属性、原型属性、静态属性、属性访问器
class Animal {
  // 静态属性
  static habitat = "地球";

  private _sound: string = "";
  constructor(public name: string, public age: number) {}

  get sound() {
    return this._sound;
  }
  set sound(value: string) {
    this._sound = value;
  }
  eat(food: string): void {
    console.log(`正在吃${food}`);
  }
}

class Cat extends Animal {
  constructor(name: string, age: number) {
    super(name, age);
  }
  // 子类重写父类，要保证和父类方法的类型兼容
  eat(food: string): void {
    super.eat(food);
  }
}

let cat = new Animal("tom", 12);

// 单例
class Singleton {
  private static instance = new Singleton();
  private constructor() {}
  static getInstance() {
    return this.instance;
  }
}
let ins1 = Singleton.getInstance();

// 抽象类
// 1、不能被new
// 2、抽象类中可以创建抽象属性和方法，让子类来实现，但是静态方法、属性不可以
// 3、抽象类中可以拥有具体的实现
abstract class Person {
  static habitat = "地球";
  abstract eat(): void; // 描述是原型方法，一般使用这个
  abstract play: () => void; // 描述的是实例属性
  drink(): void {
    console.log("喝水");
  }
}

class Man extends Person {
  play: () => void = () => {};
  eat() {
    
  }
}
export {};
