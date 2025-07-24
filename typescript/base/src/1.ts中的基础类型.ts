// ts中的类型分类：内置类型（DOM、Promise、原始方法）、基础类型、高级类型、自定义类型

// 字符串
let name = "string";
// 数字
let age = 30;
// 布尔值
let handsome = true;
// 数组
let arr1: number[] = [1, 2, 3];
let arr2: string[] = ["1", "2", "3"];
let arr3: (number | string)[] = [1, "2"];
let arr4: Array<number | string> = [1, "2"];
// 元组 规定长度和存储的类型
let tuple1: [string, number, boolean] = ["1", 2, true];
// 枚举类型，数字类型的枚举可以反举
enum USER_ROLE {
  USER,
  ADMIN,
  MANAGER,
}
// 常量枚举，如果不需要对象只是使用枚举值，可以直接采用常量枚举
const enum USER_ROLE_1 {
  USER,
  ADMIN,
  MANAGER,
}
// null、undefined为任何类型的子类型
let str: string = null;
// void 代表函数返回值为空，只在函数中使用
function fn() {}
// never 任何类型的子类型
function fn1(): never {
  while (true) {}
}
// never用于类型保护，保障程序的不缺失
function validate(val: never) {}
function getLatestResult(stringOrNumberOrBool: string | number | boolean) {
  if (typeof stringOrNumberOrBool === "string") {
    return stringOrNumberOrBool;
  }
  if (typeof stringOrNumberOrBool === "number") {
    return stringOrNumberOrBool;
  }
  if (typeof stringOrNumberOrBool === "boolean") {
    return stringOrNumberOrBool;
  }
  validate(stringOrNumberOrBool);
}
// never和其他类型做联合类型最终是不显示的
let union: string | number | boolean | never;
// object类型
let obj: object = {};
const create = (target: object) => {};
create(function () {});
create([]);
create({});

// any 任何类型， 绕过类型检测
let arr5 = []

// string number boolean null undefined array tuple never object symbol bigint any void
export {};
