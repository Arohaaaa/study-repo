// 函数
type ISum = (a: string, b: string) => string;
let sum: ISum = (a, b) => {
  return a + b;
};
// 函数中的可选参数,增加?表示可选，只能放到后面
let minus = (a: number, b?: number): number => {
  if (b) {
    return a - b;
  } else {
    return a;
  }
};

// 1) 根据赋值进行类型推导
let name = "hehong";
let age = 30;
// 2) 根据返回值来进行类型推导
function sum1(a: string, b: string) {
  return a + b;
}
// 3) 根据上下文推导值的类型（根据位置来进行推导）
type ICallback = (a: string, b: number, c: boolean) => void;
function fn(callback: ICallback) {}
fn((x, y, z) => {
  // void表示不关心返回的具体类型, 所以返回的是字符串也没关系
  return "123";
});

// 使用typeof获取对象类型，使用keyof typeof获取对象属性联合类型
let person = {
  name: "hehong",
  age: 30,
};
type IPerson = typeof person;
type IPersonKey = keyof IPerson;
function getVal(this: IPerson, key: IPersonKey) {
  return this[key];
}
let value = getVal.call(person, "name");

// 重载
function toArray(value: string): string[];
function toArray(value: number): number[];
function toArray(value: number | string): Array<number | string> {
  if (typeof value === "string") {
    return value.split("");
  } else {
    return value.toString().split("").map(Number);
  }
}
let arr = toArray(1)
export {};
