class Animal {
  constructor(public name: string, public age: number) {}
}

class Person {
  constructor(public name: string, public age: number) {}
}

// type IClazz = new (name: string, age: number) => any;
interface IClazz<T> {
  new (name: string, age: number): T;
}

function createInstance<T>(target: IClazz<T>, name: string, age: number) {
  return new target(name, age);
}

const animal = createInstance<Animal>(Animal, "Cat", 18);

// 根据提供的数据，生成对应长度的数组
function createArray<T>(len: number, val: T) {
  let result = [] as T[];
  for (let i = 0; i < len; i++) {
    result.push(val);
  }
  return result;
}

let r = createArray(3, "abc");

// type ISwap = <T, K>(tuple: [T, K]) => [K, T];
interface ISwap {
  <T, K>(tuple: [T, K]): [K, T];
}
let swap: ISwap = (tuple) => {
  return [tuple[1], tuple[0]];
};
let r2 = swap(["abc", 1]);

// 泛型放到前面的时候，表示使用这个类型的时候传递泛型
type ICallback<T> = (item: T, index: number) => void;
// 泛型放到后面的时候，表示调用这个函数的时候传递类型
// type ICallback = <T>(item: T, index: number) => void;
type IForEach = <T>(arr: T[], callback: ICallback<T>) => void;
// interface IForEach {
//   <T>(arr: T[], callback: ICallback): void;
// }

const forEach: IForEach = (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i);
  }
};

forEach([1, 2, 3, "a", "b", "c"], function (item, index) {});

// 泛型默认值
type Union<T = boolean> = T | number | string;
let union: Union = true;

// 泛型约束，要求传递的参数必须符合要求
function handle<T extends string>(val: T): T {
  return val;
}
let b = handle("abc");

function getVal<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}
getVal({ name: "jw", age: 30 }, "age");

interface IResponse<T> {
  code: number;
  message?: string;
  data: T;
}

interface ILoginData {
  token: string;
  roles: number[];
}

function toLogin(): IResponse<ILoginData> {
  return {
    code: 200,
    data: {
      token: "token",
      roles: [1, 2],
    },
  };
}

class MyArray<T> {
  private arr: T[] = [];

  set(val: T) {}
}

let myArr = new MyArray<number>();
myArr.set(200);

export {};
