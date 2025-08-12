interface Person1 {
  handsome: string;
  n: {
    n: number;
  };
}

interface Person2 {
  high: string;
  n: {
    b: string;
  };
}

type Person3 = Person1 & Person2;

let person3: Person3 = {
  handsome: "12",
  high: "231",
  n: {
    n: 123,
    b: "123",
  },
};

function mixin<T, K>(o1: T, o2: K) {
  return { ...o1, ...o2 };
}
let result = mixin({ a: "abc" }, { a: 1 });
type IMixin = typeof result;
type IVal = IMixin["a"];

let person2: Person2 = person3;
