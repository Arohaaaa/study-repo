// unknown是any的安全类型(任何使用any的地方，都可以使用unknown代替，增加代码健壮性)

let val: unknown = 123;

// 默认情况下 unknown必须要先进行类型检测（类型检查、类型断言）才能使用
function processInput(val: unknown) {
  if (typeof val === "string") {
    val.toUpperCase();
  } else if (typeof val === "number") {
    val.toFixed();
  }
}

let name: unknown = "HEHONG";
(name as string).toUpperCase();

// unknown类型在联合类型和交叉类型中的特点
type Unionunknown = unknown | string | null | undefined; // 和任何类型做联合类型都是unknown
type Interunknown = unknown & string; // 和任何类型做联合类型都是其他类型

type IKeyOf = keyof unknown;
type IKeyOf1 = keyof any;

export {};
