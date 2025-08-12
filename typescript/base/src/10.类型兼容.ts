// 字面量类型可以赋予给基础类型
type R1 = "a" extends string ? true : false;
let r1: string = "a";
type R2 = 1 extends number ? true : false;
let r2: number = 1;
type R3 = true extends boolean ? true : false;
let r3: boolean = true;

// 字面类型可以赋予给字面量的联合类型
type R4 = "a" extends "a" | "b" | "c" ? true : false;
let r4: "a" | "b" | "c" = "a";
type R5 = 1 extends 1 | 2 | 3 ? true : false;
let r5: 1 | 2 | 3 = 1;
type R6 = true extends true | false ? true : false;
let r6: true | false = true;

// 基础类型是包装类型的子类型
type R7 = string extends String ? true : false;
let r7: String = "a";
type R8 = number extends Number ? true : false;
let r8: Number = 1;
type R9 = boolean extends Boolean ? true : false;
let r9: Boolean = true;

// any、unknown是最大的类型
type R10 = boolean extends Object ? true : false;
type R11 = Object extends unknown ? true : false;
type R12 = Object extends any ? true : false;

// never是最小的类型
type R13 = never extends " abc" ? true : false;

// never < 字面量 < 字面量联合类型 | 字面量类型 < 原始数据类型 < 包装类型 < Object < any | unknown

// 针对any来说，永远返回的结果是成功和失败的联合类型
type R14 = any extends 1 ? true : false; // true | false => boolean

// 类型层面上，低类型可以赋予高类型
type R15 = {} extends object ? true : false;
type R16 = {} extends Object ? true : false;
// 结构上考虑
type R17 = Object extends {} ? true : false;
type R18 = object extends {} ? true : false;
// ts默认object和Object可以互相赋值
type R19 = Object extends object ? true : false;
type R20 = object extends Object ? true : false;
export {};
