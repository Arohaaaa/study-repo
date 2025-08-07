// type IFullname = {
//   firstname: string;
//   lastname: string;
// };

// type和interface的区别
// 1、如果只是用来描述结构采用interface，函数类型一般使用type来声明
// 2、如果涉及到联合类型，则只能使用type声明
// 3、type不能被扩展，interface可以扩展
// 4、type不能重名，interface重名可以合并
// 5、type在后续的学习中，可以使用循环和条件
interface IFullname {
  firstname: string;
  lastname: string;
}

type IFn = {
  (obj: IFullname): string;
};

const fullname: IFn = ({ firstname, lastname }: IFullname): string => {
  return firstname + lastname;
};

fullname({ firstname: "he", lastname: "hong" });

interface IVeg {
  readonly color: string;
  size: number;
  taste?: "sweet" | "sour";
  [key: string]: any;
}

const tomato: IVeg = {
  color: "red",
  size: 20,
  taste: "sweet",
};

// tomato.color = "green"

// 通过索引访问符获取值的类型
interface Person {
  name: string;
  age: number;
  [key: string]: string | number | boolean;
}
type PersonNameType = Person["name"];
type PersonAnyType = Person[string];

interface ICar {
  color: string;
  a: 1;
  b: 2;
}
// 通过索引操作符获取值的集合
type ValueOf = ICar[keyof ICar];

interface ChineseSpeakable {
  speakChinese(): void;
}

interface EnglishSpeakable {
  speakEnglish(): void;
}

class Speak implements ChineseSpeakable, EnglishSpeakable {
  speakEnglish(): void {
    throw new Error("Method not implemented.");
  }
  speakChinese(): void {
    throw new Error("Method not implemented.");
  }
}

export {};
