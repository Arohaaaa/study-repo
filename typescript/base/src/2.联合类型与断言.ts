// 以赋予值的结果来推导内容
let age = 30;

let name: string | number;
// 默认没有赋值的时候 联合类型可以调用公共的方法，如toString()，!是非空断言
name!.toString();

// 联合类型 一般我们会基于联合类型来扩展额外的类型

// 字面量类型，type可以声明一个类型
type Direction = "up" | "down" | "right" | "left";
let direction: Direction = "down";

// type+联合类型，可以用联合类型做到属性之间的互斥
type women =
  | {
      wealthy: true;
      waste: string;
    }
  | {
      wealthy: false;
      norality: string;
    };
let richWomen: women = { wealthy: true, waste: "购物和消费" };
let poorWomen: women = { wealthy: false, norality: "勤俭持家" };

// 断言
let ele: HTMLElement | null = document.getElementById("app");
// 非空断言
ele!.style.background = "red";
// as断言
(ele as HTMLElement).style.background = "green";

export {};
