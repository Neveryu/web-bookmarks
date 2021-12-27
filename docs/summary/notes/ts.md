# TS

### 下载/安装
略

### 编译单个文件
``` bash
npx tsc xx.ts
```

::: tip 告知
如果再看下面简略笔记的时候，有任何疑问和不清楚的地方，请查阅原文

[https://ts.xcatliu.com/](https://ts.xcatliu.com/)

[https://github.com/xcatliu/typescript-tutorial/blob/master/basics/type-inference.md](https://github.com/xcatliu/typescript-tutorial/blob/master/basics/type-inference.md)

[https://zhongsp.gitbooks.io/typescript-handbook/content/index.html](https://zhongsp.gitbooks.io/typescript-handbook/content/index.html)
:::

### 简略笔记
1、上述例子中，我们用 `:` 指定 `person` 参数类型为 `string`。 但是编译为 `js` 之后，并没有什么检查的代码被插入进来。

>TypeScript 只会进行静态检查，如果发现有错误，编译的时候就会报错。

2、TypeScript 编译的时候即使报错了，还是会生成编译结果，我们仍然可以使用这个编译之后的文件。

3、如果要在报错的时候终止 `js` 文件的生成，可以在 `tsconfig.json` 中配置 `noEmitOnError` 即可。 关于 `tsconfig.json`，请参阅官方手册（中文版）。 [https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tsconfig.json.html](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tsconfig.json.html)

4、JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。

>原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol。

5、事实上 `new Boolean()` 返回的是一个 Boolean 对象，直接调用 Boolean 也可以返回一个 `boolean` 类型。

6、JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 `void` 表示没有任何返回值的函数。

>声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`。

7、如何定义 Null 和 Undefined 类型呢？

> 在 TypeScript 中，可以使用 `null` 和 `undefined` 来定义这两个原始数据类型。
与 `void` 的区别是，`undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量。

8、任意值 `any`

> 可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。
> 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型。

9、如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。
如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 `any` 类型而完全不被类型检查。

10、【联合类型】
``` ts
let myFavoriteNumber: string | number;
```

11、【访问联合类型的属性或方法】

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法。

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型。

12、【对象的类型——接口】

在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。
一个类可以实现多个接口
``` ts
class Car implements Alarm, Light
```
接口与接口之间可以是继承关系
``` ts
interface LightableAlarm extends Alarm
```
接口也可以继承类。

接口一般首字母大写。有的编程语言中会建议接口的名称加上 `I` 前缀。

定义的变量比接口少了一些属性是不允许的：
``` ts
interface Person {
    name: string;
    age: number;
}

let tom: Person = {
    name: 'Tom'
};

// index.ts(6,5): error TS2322: Type '{ name: string; }' is not assignable to type 'Person'.
//   Property 'age' is missing in type '{ name: string; }'.
```
多一些属性也是不允许的。
::: danger
可见，赋值的时候，变量的形状必须和接口的形状保持一致。
:::

13、【可选属性】

有时我们希望不要完全匹配一个形状，那么可以用可选属性。
``` ts
interface Person {
    name: string;
    age?: number;
}
```

14、【任意属性】

有时候我们希望一个接口允许有任意的属性，可以使用如下方式：
``` ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```
使用 `[propName: string]` 定义了任意属性取 `string` 类型的值。
>需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集。

15、【只读属性】

有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 `readonly` 定义只读属性。

>注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候；那么就是说，只读的属性，定义的时候，就要给它赋值。


16、【数组的类型】
- 1. 类型+方括号 表示法
``` ts
let fibonacci: number[] = [1, 1, 2, 3, 5];
```
数组的一些方法的参数也会根据数组在定义时约定的类型进行限制。（比如说，push的时候，只能push 数字）

- 2. 数组泛型

我们也可以使用数组泛型（Array Generic） `Array<elemType>` 来表示数组。
``` ts
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
```

- 3. 用接口表示数组

接口也可以用来描述数组。
``` ts
interface NumberArray {
    [index: number]: number;
}
let fibonacci: NumberArray = [1, 1, 2, 3, 5];
```
`NumberArray` 表示：只要索引的类型是数字时，那么值的类型必须是数字。

>虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。

不过有一种情况例外，那就是它常用来表示类数组。

- 4.类数组

类数组（Array-like Object）不是数组类型，比如 arguments。
``` ts
function sum() {
    let args: number[] = arguments;
}

// Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
```

上例中，`arguments` 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口。
``` ts
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
```
>在这个例子中，我们除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 `length` 和 `callee` 两个属性。

- 5. 【any 在数组中的应用】

一个比较常见的做法是，用 `any` 表示数组中允许出现任意类型：
``` ts
let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
```

17、【函数的类型】

在 JavaScript 中，有两种常见的定义函数的方式 —— 函数声明（Function Declaration）和函数表达式（Function Expression）。

【函数声明】

【函数表达式】

如果要我们现在写一个对函数表达式（Function Expression）的定义，可能会写成这样：
``` ts
let mySum = function (x: number, y: number): number {
    return x + y;
};
```
这是可以通过编译的，不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 `mySum`，是通过赋值操作进行类型推论而推断出来的。如果需要我们手动给 `mySum` 添加类型，则应该是这样：
``` ts
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

【用接口定义函数的形状】

我们也可以使用接口的方式来定义一个函数需要符合的形状
``` ts
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```

【可选参数】

前面提到，输入多余的（或者少于要求的）参数，是不允许的。那么如何定义可选的参数呢？

与接口中的可选属性类似，我们用 ? 表示可选的参数。

>需要注意的是，可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了。

【参数默认值】
在 ES6 中，我们允许给函数的参数添加默认值，【TypeScript 会将添加了默认值的参数识别为可选参数】。

此时就不受「可选参数必须接在必需参数后面」的限制了。

【重载】

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
我们可以使用重载定义多个 `reverse` 的函数类型。
``` ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```
上例中，我们重复定义了多次函数 `reverse`，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

### 类型断言（Type Assertion）
类型断言（Type Assertion）可以用来【手动指定】一个值的类型。

【语法】
``` ts
<类型>值
```
或
``` ts
值 as 类型
```
【在 `tsx` 语法（React 的 jsx 语法的 ts 版）中必须用后一种。】

类型断言的用法如上，在需要断言的变量前加上 `<Type>` 即可。
``` ts
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
```
【类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的】
``` ts
function toBoolean(something: string | number): boolean {
    return <boolean>something;
}

// index.ts(2,10): error TS2352: Type 'string | number' cannot be converted to type 'boolean'.
//   Type 'number' is not comparable to type 'boolean'.
```

### 声明文件
【什么是声明文件】

通常我们会把声明语句放到一个单独的文件（`jQuery.d.ts`）中，这就是声明文件。
声明文件必需以 `.d.ts` 为后缀。

一般来说，全局变量都是禁止修改的常量，所以大部分情况都应该使用 `const` 而不是 `var` 或 `let`。

需要注意的是，声明语句中只能定义类型，切勿在声明语句中定义具体的实现。
``` ts
declare const jQuery = function(selector) {
    return document.querySelector(selector);
};
// ERROR: An implementation cannot be declared in ambient contexts.
```

`declare function` 用来定义全局函数的类型。jQuery 其实就是一个函数，所以也可以用 `function` 来定义：
``` ts
// src/jQuery.d.ts

declare function jQuery(selector: string): any;
```

在函数类型的声明语句中，函数重载也是支持的。
``` ts
// src/jQuery.d.ts

declare function jQuery(selector: string): any;
declare function jQuery(domReadyCallback: () => any): any;
// src/index.ts

jQuery('#foo');
jQuery(function() {
    alert('Dom Ready!');
});
```

【declare class】

当全局变量是一个类的时候，我们用 `declare class` 来定义它的类型。
同样的，`declare class` 语句也只能用来定义类型，不能用来定义具体的实现，比如定义 `sayHi` 方法的具体实现则会报错。

【declare enum】

使用 `declare enum` 定义的枚举类型也称作外部枚举（Ambient Enums）。

【声明合并】

假如 jQuery 既是一个函数，可以直接被调用 `jQuery('#foo')`，又是一个对象，拥有子属性 `jQuery.ajax()`（事实确实如此），那么我们可以组合多个声明语句，它们会不冲突的合并起来。

【混用 declare 和 export】

我们也可以使用 `declare` 先声明多个变量，最后再用 `export` 一次性导出。
注意，与全局变量的声明文件类似，`interface` 前是不需要 `declare` 的。

【UMD 库】

既可以通过 `<script>` 标签引入，又可以通过 `import` 导入的库，称为 `UMD` 库。

【直接扩展全局变量】

有的第三方库扩展了一个全局变量，可是此全局变量的类型却没有相应的更新过来，就会导致 `ts` 编译错误，此时就需要扩展全局变量的类型。

【declare global】

使用 `declare global` 可以在 npm 包或者 UMD 库的声明文件中扩展全局变量的类型。

注意即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件。

### 模块插件
【declare module】

### 内置对象


### 进阶

### 类型别名
我们使用 `type` 创建类型别名。类型别名常用于联合类型。

### 字符串字面量类型
``` ts
type EventNames = 'click' | 'scroll' | 'mousemove';
```
我们使用 `type` 定了一个字符串字面量类型 EventNames，它只能取三种字符串中的一种。

注意，类型别名与字符串字面量类型都是使用 `type` 进行定义。

### 元组（Tuple）
数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

当赋值或访问一个已知索引的元素时，会得到正确的类型；
也可以只赋值其中一项；
但是当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项。
``` ts
// right
let tom: [string, number];
tom = ['Tom', 25];

// wrong
let tom: [string, number];
tom = ['Tom'];
```

当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型：
``` ts
let tom: [string, number];
tom = ['Tom', 25];
tom.push('male');
tom.push(true);
// 可以添加越界的元素，但是只能添加 stirng 或者 number 类型，所以添加 true 就不对。
```

### 枚举（Enum）
枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等。

枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射；

> 反向映射的话，取索引就很方便了。

【手动赋值】
我们也可以给枚举项手动赋值：
``` ts
enum Days {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 7); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true
```
上面的例子中，未手动赋值的枚举项会接着上一个枚举项递增。

【常数项和计算所得项】

如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错。
``` ts
enum Color {Red = "red".length, Green, Blue};

// index.ts(1,33): error TS1061: Enum member must have initializer.
// index.ts(1,40): error TS1061: Enum member must have initializer.
```

【常数枚举】
常数枚举是使用 `const enum` 定义的枚举类型：
``` ts
const enum Directions {
    Up,
    Down,
    Left,
    Right
}
```

【外部枚举】
外部枚举（Ambient Enums）是使用 `declare enum` 定义的枚举类型：
``` ts
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
```

### 类（class）

当构造函数修饰为 `private` 时，该类不允许被继承或者实例化:
``` ts
class Animal {
    public name;
    private constructor (name) {
        this.name = name;
  }
}
class Cat extends Animal {
    constructor (name) {
        super(name);
    }
}

let a = new Animal('Jack');

// index.ts(7,19): TS2675: Cannot extend a class 'Animal'. Class constructor is marked as private.
// index.ts(13,9): TS2673: Constructor of class 'Animal' is private and only accessible within the class declaration.
```
>结论：不能实例化，也不能被继承。

当构造函数修饰为 `protected` 时，该类只允许被继承；

【readonly】

只读属性关键字，只允许出现在属性声明或索引签名或构造函数中。
注意如果 `readonly` 和其他访问修饰符同时存在的话，需要写在其后面。

【抽象类】

`abstract` 用于定义抽象类和其中的抽象方法。

什么是抽象类？

首先，抽象类是不允许被实例化的；
``` ts
abstract class Animal {
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
}

let a = new Animal('Jack');

// index.ts(9,11): error TS2511: Cannot create an instance of the abstract class 'Animal'.
```
实例化抽象类的时候报错了。

其次，抽象类中的抽象方法必须被子类实现；

### 类与接口

【类实现接口】
>实现（implements）是面向对象中的一个重要概念。

一个类可以实现多个接口；

【接口继承接口】
>接口与接口之间可以是继承关系

【接口继承类】
>常见的面向对象语言中，接口是不能继承类的，但是在 TypeScript 中却是可以的

换句话说，声明 `Point` 类时创建的 `Point` 类型只包含其中的实例属性和实例方法。（也就是说一个类，在作类型来使用时，只包含其中的实例属性和实例方法。）

同样的，在接口继承类的时候，也只会继承它的实例属性和实例方法。

### 泛型（Generics）
泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
``` ts
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
```
上例中，我们在函数名后添加了 `<T>`，其中 `T` 用来指代任意输入的类型，在后面的输入 `value: T` 和输出 `Array<T>` 中即可使用了。

【泛型约束】

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法。

上例中，泛型 `T` 不一定包含属性 `length`，所以编译的时候报错了。

这时，我们可以对泛型进行约束，只允许这个函数传入那些包含 `length` 属性的变量。这就是泛型约束：
``` ts
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```
上例中，我们使用了 `extends` 约束了泛型 `T` 必须符合接口 `Lengthwise` 的形状，也就是必须包含 `length` 属性。

此时如果调用 `loggingIdentity` 的时候，传入的 `arg` 不包含 `length`，那么在编译阶段就会报错了。