// 条件类型

type ResStatusMessage<T extends number> = T extends 200 | 204 | 206
  ? "success"
  : "fail";
type R1 = ResStatusMessage<200>;

type Conditional<T, U> = T extends U ? "success" : "fail";
type R2 = Conditional<"hehong", string>;
type R3 = Conditional<"hehong", number>;

interface Bird {
  name: "鸟";
}
interface Sky {
  name: "天";
}
interface Fish {
  name: "鱼";
}
interface Water {
  name: "水";
}

type Conditional1<T> = T extends Bird ? Sky : Water;
type R4 = Conditional1<Bird>;

type FormatReturnVal<T extends string | number> = T extends string
  ? string
  : T extends number
  ? number
  : never;
function sum<T extends string | number>(a: T, b: T): FormatReturnVal<T> {
  return a + (b as any);
}

let result = sum(1, 2)

export {};
