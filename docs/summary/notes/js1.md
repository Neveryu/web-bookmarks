# JavaScript基础笔记

### bind实现

一、 `bind` 方法可以创建一个新的函数,当这个新的函数被调用时，`bind` 的第一个参数当做运行的 `this`，之后的参数当做实际参数传入。

``` js
// 实现如下操作
var foo = {
    value: 1
};

function bar() {
    return this.value;
}

var bindFoo = bar.bind(foo);

console.log(bindFoo()); // 1
```

``` js
// 第一版

Function.prototype.bind2 = function(content){
    // 这里保存self的作用是保存初始调用者, 这里即是bar函数
    let self = this;

    // 因为调用bind是返回一个函数,所以返回一个匿名函数
    return function() {
        // 在匿名函数执行时,这里是一个闭包,即将创建匿名函数时所保存的作用域里面会有一个self的值;apply执行这个函数,且将this改变成指定对象
        return self.apply(content)
    }
}

```

二、 bind方法还有一个特征,即在bind时可以传入参数,返回的新函数,如果继续传入实参,则传入的参数是bind时传入的剩余参数
``` js
var foo = {
    value: 1
};

function bar(name, age) {
    console.log(this.value);
    console.log(name);
    console.log(age);

}

var bindFoo = bar.bind(foo, 'daisy');
bindFoo('18');
// 1
// daisy
// 18
```
``` js
// 实现第二版
Function.prototype.bind2 = function(content){
    let self = this;

    // 将bind时传入的参数保存,注意是保存除了第一个参数以外的所有参数
    let args = Array.prototype.slice.call(arguments , 1)

    return function(){
        // 接着继续保存bind返回的参数,执行时所传入的参数,这样即可实现,bind时传入的参数和bind之后返回的函数传入的参数合并
        let bindArgs = Array.prototype.slice.call(arguments)
        return self.apply(content,args.concat(bindArgs))
    }
}
```

三、 当bind返回的函数当构造函数使用时,bind指定的this会失效,但传入的参数还是会生效
``` js
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

// 在new的时候, this的指向是obj
var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
```
``` js
// 实现第三版
Function.prototype.bind2 = function(content){
    // 这里的this是绑定函数
    let self =  this;
    
    let args = Array.prototype.slice.call(arguments, 1)

    var fBound = function(){
        let bindArgs = Array.prototype.slice.call(arguments)

        // 如果通过bind返回的函数是当构造函数使用,那么this instanceof Fbound是true,则使用当前的this
        //  反之就是当普通函数使用,使用之前的content
        return self.apply(this instanceof Fbound ? this : content , args.concat(bindArgs))
    }

    //  修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承绑定函数的原型中的值
    fBound.prototype = this.prototype
    
    return fBound
}
```
上述的实现有一个缺点,就是当修改返回函数的原型对象时,绑定函数的原型对象也会被修改,这是不可取的,所以改进方法可以使用一个空函数做空转
``` js
// 第三版改版
Function.prototype.bind2 = function(content){
    let self = this;

    let args = Array/.prototype.slice.call(arguments,1)

    var Fnop = function(){}

    var fBound = function(){
        let bindArgs = Array.prototype.slice.call(arguments)

        return self.apply(this instanceof Fbound ? this : content , args.concat(bindArgs))
    }

    // 使用Fnop函数做空转
    Fnop.prototype = this.prototype

    /**
        // 原函数
    function Person(name,age){
        // 这里的this即是原型prototype
        this.name = name
        this.age = age
    }
    将原函数的prototype挂载到fBound的原型上,这样fBound就拥有了原函数的一些参数,然后在apply的时候,传入参数赋值
    */
    fBound.prototype = new Fnop()

    // 这样如果直接修改返回函数的原型, 那么绑定函数的原型不会被修改
    return fBound 
}
```

### instanceof实现原理
``` js
function new_instance_of(leftVaule , rightVaule){
    let rightProto  =  rightVaule.prototype
    leftVaule = leftVaule.__proto__;
    while(true){
        if(leftVaule === null){
            return false
        }
        if(leftVaule === rightProto){
            return true
        }
        leftVaule = leftVaule.__proto__ 
    }
}

class Person {}
let person = new Person()
new_instance_of(person , Person) //true
```

### new模拟

``` js
function Otaku (name, age) {
    this.name = name;
    this.age = age;

    this.habit = 'Games';
}

Otaku.prototype.strength = 60;

Otaku.prototype.sayYourName = function () {
    console.log('I am ' + this.name);
}
```

#### 模拟new
``` js
function objectFactory(){
    let obj = new Object()

    // Constructor为传入的第一个参数,即是一个构造函数
    // 因为使用了slice,所以arguments也会被修改,将下标为0的参数移除
    let Constructor = [].slice.call(arguments,1)
    // 所以,此时的arguments是剩余参数了
    // Constructor是传入要被实例化的函数

    // 保存原型对象
    obj.__proto__ = Constructor.prototype
    
    // 将构造器执行,传入剩余参数
    let ret = Constructor.apply(obj, arguments)

    // 如果返回的是一个对象,则把对象return出去,如果什么都没有返回,则把实例返回
    return  typeof  ret === 'object' ? ret : obj
}
```

#### 使用
``` js
var person = objectFactory(Otaku , 'Kevin', '18');

console.log(person.name) // undefined
console.log(person.habit) // undefined
console.log(person.strength) // 60
console.log(person.age) // 18
```

### this的指向问题

#### 一. this的指向都是根据ECMAScript规范里面进行逻辑判断的
``` js
var foo = 1;

// 对应的Reference是：
var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};

/**------------------------*/
var foo = {
    bar: function () {
        return this;
    }
};
 
foo.bar(); // foo

// bar对应的Reference是：
var BarReference = {
    base: foo,
    propertyName: 'bar',
    strict: false
};
```

#### 二. ECMAScript规范底层this指向的逻辑需要用到
2.1 GetBase方法 : 返回 reference 的 base value。
2.2 IsPropertyReference方法 : 如果 base value 是一个对象，就返回true。
``` js
var foo = 1;

// fooReference 是 ref
var fooReference = {
    base: EnvironmentRecord,
    name: 'foo',
    strict: false
};

GetValue(fooReference) // 1;
// GetValue 返回对象属性真正的值，但是要注意：

// 调用 GetValue，返回的将是具体的值，而不再是一个 Reference

// 这个很重要，这个很重要，这个很重要。
```

#### 三. 计算this逻辑如下
3.1 计算 MemberExpression 的结果赋值给 ref
3.2 判断 ref 是不是一个 Reference 类型
3.21 如果 ref 是 Reference，并且 IsPropertyReference(ref) 是 true, 那么 this 的值为 GetBase(ref)
3.22 如果 ref 是 Reference，并且 base value 值是 Environment Record, 那么this的值为 ImplicitThisValue(ref)
3.23 如果 ref 不是 Reference，那么 this 的值为 undefined


> 注意 : 简单理解 MemberExpression 其实就是()左边的部分

``` js
    console.log(this)
}

foo(); // MemberExpression 是 foo

function foo() {
    return function() {
        console.log(this)
    }
}

foo()(); // MemberExpression 是 foo()

var foo = {
    bar: function () {
        return this;
    }
}

foo.bar(); // MemberExpression 是 foo.bar
```

### 示例
``` js
var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

//示例1
console.log(foo.bar());
//示例2
console.log((foo.bar)());
//示例3
console.log((foo.bar = foo.bar)());
//示例4
console.log((false || foo.bar)());
//示例5
console.log((foo.bar, foo.bar)());
```

``` js
// 示例1计算过程
1. MemberExpression 计算结果是foo.bar
2. foo.bar且是一个Reference
var Reference = {
  base: foo,
  name: 'bar',
  strict: false
};
3. base value 为 foo，是一个对象，所以 IsPropertyReference(ref) 结果为 true。 true。
4. 因为IsPropertyReference是true , 所以 this = GetBase(ref)
```

``` js
// 示例2计算过程
1. foo.bar 被 () 包住 , 实际上 () 并没有对 MemberExpression 进行计算，所以其实跟示例 1 的结果是一样的
```

``` js
// 示例3计算过程
// (foo.bar = foo.bar)()
1. 有赋值操作符
2. 因为使用了 GetValue，所以返回的值不是 Reference 类型
3. 按照之前讲的判断逻辑: 如果 ref 不是Reference，那么 this 的值为 undefined
```

``` js
// 示例4计算过程
// (false || foo.bar)()
1. 有逻辑与算法
2. 查看规范 11.11 Binary Logical Operators
3. 因为使用了 GetValue，所以返回的不是 Reference 类型，this 为 undefined
```

``` js
// 示例5计算过程
// (foo.bar, foo.bar)()
1. 有逗号操作符
2. 查看规范11.14 Comma Operator ( , )
3. 因为使用了 GetValue，所以返回的不是 Reference 类型，this 为 undefined
```

### 事件循环

> 前执行栈为空的时候，主线程会 查看微任务队列是否有事件存在。如果不存在，那么再去宏任务队列中取出一个事件并把对应的回到加入当前执行栈；如果存在，则会依次执行队列中事件对应的回调，直到微任务队列为空，然后去宏任务队列中取出最前面的一个事件，把对应的回调加入当前执行栈...如此反复，进入循环

#### 宏任务
```js
setInterval()
setTimeout()
```

#### 微任务
```js
new Promise()
new MutaionObserver()
```

#### 示例
```js
setTimeout(function () {
    console.log(1);
});

new Promise(function(resolve,reject){
    console.log(2)
    resolve(3)
}).then(function(val){
    console.log(val);
})

// 2
// 3
// 1
```

### 作用域

> 函数默认会有一个[[scope]]属性,来存储当前函数作用域

> 当函数激活时,会将函数的作用域压入作用域链中的顶端

> 函数作用域的生成 : 
函数创建(将当前作用域存入到scope属性中) ===> <br/> <br/>  
执行函数(创建执行上下文,压入执行上下文栈中) ===>  <br/> <br/>  
函数先不执行,创建函数作用域,将函数创建时,保存的作用域放入其中Scope,接着在陆续创建活动对象 ===> <br/>   <br/>  
接着在将当前的函数作用域继续压入刚刚创建的作用域Scope中去,进行合并  ===>  <br/>   <br/>  
准备工作做完之后,函数执行,陆续赋值 ===>  <br/>   <br/>  
函数执行完毕,弹出函数执行上下文


``` js
var scope = "global scope";
function checkscope(){
    var scope2 = 'local scope';
    return scope2;
}
checkscope();
```
> 1. 创建函数,存储当前函数作用域

``` js
checkscope.[[scope]] = [
    globalContext.VO
];
```

> 2. 执行函数,生成当前函数的执行上下文,然后压入执行上下文的栈中,push ; (注意,这跟当前作用域主题不相关)

``` js
ECStack = [
    globalContext,
    checkscopeContext
];
```

> 3. 函数先不执行, 开始做准备工作,创建作用域; 复制函数[[scope]]属性创建作用域链

``` js
checkscopeContext = {
    Scope: checkscope.[[scope]],
}
```

> 4. 使用arguments创建活动对象,创建活动对象,加入形参,函数声明,变量声明

``` js
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    }，
    Scope: checkscope.[[scope]],
}
```

> 5. 将活动对象压入作用域链的顶端

``` js
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: undefined
    }，
    Scope: [AO , [[Scope]]],
}
```

> 6. 准备工作做完，开始执行函数，随着函数的执行，修改 AO 的属性值

``` js
checkscopeContext = {
    AO: {
        arguments: {
            length: 0
        },
        scope2: 'local scope'
    },
    Scope: [AO, [[Scope]]]
}
```

> 7. 函数执行完毕,将函数弹出执行上下文栈

``` js
ECStack = [
    globalContext
];
```

### 原型链复习

#### 当读取实例上的属性时,如果找不到,会继续在原型链上找,一直找到最顶层为止
``` js
class Person {
    constructor(){
        this.name = "小绿"
    }
}
Person.prototype.name = "小红"

// 实例对象的原型是Person.prototype
let person = new Person()
console.log(person.__proto__ === Person.prototype) // true

console.log(person.__proto__.constructor === Person.prototype.constructor) // true

// 构造函数的原型的原型是Object的原型
console.log(Person.prototype.__proto__ === Object.prototype)

console.log(person.name); // 小绿
delete person.name
console.log(person.name); // 小红
```

#### 如果是通过函数创建构造器,默认是没有constructor属性
```js
function Person(){}

let person = new Person()

// 因为Person没有constructor属性,而Person的原型对象是有这个属性的,这种就变相的说明,当读取对象的属性时,是通过原型链的方式层层向下获取 
console.log(person.constructor === Person.prototype.constructor)// true
```


#### 反思和小结
> 对于javascript中的继承,其实不能算真正意义上的继承,继承即复制;更像是委托关系更加的直译些


### 垃圾回收机制

#### 一. 垃圾回收机制组成
<ul>
<li>垃圾回收主要由 <b>新生代区域</b> 和 <b>老生代区域</b>  组成</li>
<li>1. 新生代 : 大多数对象 <b>开始</b> 时都会被分配到这里。该区域被分为两半，一半用来分配内存，另一半用于在垃圾回收时将需要保留的对象复制过来。</li>
<li>2. 老生代 : 新生代中的对象在存活一段时间后就会被转移到老生代内存区</li>
</ul>

#### 二. javascript中
1. 对象，闭包存于堆内存  </br>
2. 栈内存 : 基础类型变量以及对象的指针

#### 三. 新生代区域处理内存过程
1. 使用了Scavenge算法
2. 会分配两个区域,From空间(激活)和To空间(未激活)
3. 在每次垃圾回收过程中,处于From中的变量如果是活动对象,会被复制保存到To中,然后将From中剩余的对象删除,然后将To和From两个角色互换

#### 四. 对象晋升
1. 在下一次垃圾回收时,会将新生代中已执行过Scavenge算法的变量且还是活动对象,移入老生代; 如果新生代区域中的内存占比不到25%,会自动将新变量移入到老生代区域

#### 五. 老生代区域处理内存过程
1. 主要使用到了Mark-Sweep(标记清除)和Mark-Compact(标记整理)算法
2. 在老生代区域中,将活动对象通过标记整理,移入到内存区域的一端,然后将未活动对象移除

#### 六、在平时的项目中,如何避免内存泄露
1. 定时器的及时清除
2. 尽量少的使用闭包
3. 尽量少的将变量挂载到window上
4. 清楚dom的引用
``` js
const elements = {
    button: document.getElementById('button')
};

function removeButton() {
    document.body.removeChild(document.getElementById('button'));
}

// 在移除dom 的时候, 其实还有一处位置也引用了改dom,所以,实际上内存中还是有这个引用
```
5. 可以使用WeakMap 和WeakSet
> 因为是若引用,不需要将WeakMap创建的对象手动的去清楚引用

```js
// 手动执行一次垃圾回收保证内存数据准确
> global.gc();
undefined

// 查看当前占用的内存，主要关心heapUsed字段，大小约为4.4MB
> process.memoryUsage();
{ rss: 21626880,
  heapTotal: 7585792,
  heapUsed: 4708440,
  external: 8710 }

// 创建一个WeakMap
> let wm = new WeakMap();
undefined

// 创建一个数组并赋值给变量key
> let key = new Array(1000000);
undefined

// 将WeakMap的键名指向该数组
// 此时该数组存在两个引用，一个是key，一个是WeakMap的键名
// 注意WeakMap是弱引用
> wm.set(key, 1);
WeakMap { [items unknown] }

// 手动执行一次垃圾回收
> global.gc();
undefined

// 再次查看内存占用大小，heapUsed已经增加到约12MB
> process.memoryUsage();
{ rss: 30232576,
  heapTotal: 17694720,
  heapUsed: 13068464,
  external: 8688 }

// 手动清除变量key对数组的引用
// 注意这里并没有清除WeakMap中键名对数组的引用
> key = null;
null

// 再次执行垃圾回收
> global.gc()
undefined

// 查看内存占用大小，发现heapUsed已经回到了之前的大小(这里约为4.8M，原来为4.4M，稍微有些浮动)
> process.memoryUsage();
{ rss: 22110208,
  heapTotal: 9158656,
  heapUsed: 5089752,
  external: 8698 }

```

### 执行上下文
有全局上下文,函数上下文

在代码执行时,会将新创建的上下文压入上下文栈中,先进后出

> 执行上下文创建步骤
>> 1. 在函数执行之后,会创建一个执行上下文<br/>
>> 2. 将函数创建之前存储的作用域写入<br/>
>> 3. 创建arguments对象<br/>
>> 4. 创建活动对象,给变量对象添加形参、函数声明、变量声明等初始的属性值
>> 5. 将当前的函数所作用域压入作用域栈中 (注意:当前的函数作用域也都一样存储了变量)<br/>
>> 6. 准备阶段完毕,根据代码的执行,赋值对应的变量参数

#### 题目
```js
function foo() {
    console.log(a);
    a = 1;
}

foo(); // ???

function bar() {
    a = 1;
    console.log(a);
}
bar(); // ???

// 第一段会报错：Uncaught ReferenceError: a is not defined。
// 第二段会打印：1。
// 这是因为函数中的 "a" 并没有通过 var 关键字声明，所有不会被存放在 AO 中
// 第一段执行 console 的时候， AO 的值是：
AO = {
    arguments: {
        length: 0
    }
}

// 没有 a 的值，然后就会到全局去找，全局也没有，所以会报错。
// 当第二段执行 console 的时候，全局对象已经被赋予了 a 属性，这时候就可以从全局找到 a 的值，所以会打印 1。
// 
```


#### 总结
1. 全局执行上下文由浏览器创建 , 代码执行时就会创建; 函数执行上下文只有在函数执行时会创建,调用多少次,执行多少次
2. 调用栈用于存放所有执行上下文,先进后出
3. 执行上下文创建阶段会绑定this , 创建词法环境, 和变量环境三个步骤 ; 
   两者的区别在于,创建词法环境时,只绑定let 和const , 变量环境只保存var申明的变量,且var默认是undefined , 而let 和const则是uninitialized(未初始化) , 这就是为什么有函数变量提升,和let,const没有暂时性死域


### 柯里化

#### 一. 柯里化介绍
<p>柯里化的本质是将函数参数的更加复用,降低通用性,提供适用性</p>
<p>里化可是将一个多参数的函数转换成多个单参数的函数</p>

``` js
// 示意而已
function ajax(type, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.send(data);
}

// 虽然 ajax 这个函数非常通用，但在重复调用的时候参数冗余
ajax('POST', 'www.test.com', "name=kevin")
ajax('POST', 'www.test2.com', "name=kevin")
ajax('POST', 'www.test3.com', "name=kevin")

// 利用 curry
var ajaxCurry = curry(ajax);

// 以 POST 类型请求数据
var post = ajaxCurry('POST');
post('www.test.com', "name=kevin");

// 以 POST 类型请求来自于 www.test.com 的数据
var postFromTest = post('www.test.com');
postFromTest("name=kevin");
```

#### 二. 柯里化的封装
```js
function sub_curry(fn) {
    var args = [].slice.call(arguments, 1);
    return function() {
        return fn.apply(this, args.concat([].slice.call(arguments)));
    };
}

function curry(fn, length) {
    
    // 第一次先记录函数参数的长度
    // 接着每次调用返回参数时,length都会有值,值是上一次长度的-1个
    length = length || fn.length;

    var slice = Array.prototype.slice;

    return function() {
        if (arguments.length < length) {
            var combined = [fn].concat(slice.call(arguments));
            // 每次会通过sub_curry函数,将上一次传入的参数和这次传入的参数进行保存,然后返回一下新的匿名函数
            // 接着curry继续返回一个新的函数,注意这里传入了length长度,即每次length的值都是原函数值的-1或传入参数的args长度
            return curry(sub_curry.apply(this, combined), length - arguments.length);
        } else {
            // 如果传入参数个数达到原函数参数个数时,执行
            // 这里的fn其实是一个匿名函数, 匿名函数返回的其实就是原函数
            return fn.apply(this, arguments);
        }
    };
}
```

#### 三. 柯里化的使用示例
> 注意 : 柯里化只有在参数全部传入之后才可返回结果,所以如果只传入部分参数,返回的都是匿名函数
<ul>
<li>map指定返回</li>
<li>参数累计计算</li>
</ul>

``` js
// map指定返回

var person = [{name: 'kevin'}, {name: 'daisy'}]

// 进行柯里化
var prop = curry(function (key, obj) {
    return obj[key]
});

// 因为prop('name')返回的是匿名函数,即key参数已有,在map中,会继续自动传入剩余参数,即obj
var name = person.map(prop('name')); // "kevin,daisy"
```

```js
var fn = curry(function(a, b, c) {
    return [a, b, c];
});

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]
```
#### 四. 附上超级简写方法
```js
// 保存上一次传入的参数,如果参数的长度和初始函数的参数长度相当时,执行初始函数
function curry(fn){
    judge = 
    (...args) => args.length === fn.length ?　
    fn(...args) 
    : 
    (arg) => judge(...args,arg)
}
```

#### 五. 链式调用,这里与柯里化不同,只是单纯的链式调用,因为面试题很容易出这些题目
```js
function add(a){
    
    // 也是利用的闭包的方式,每次参数与上次最后累计的参数进行累加
    var num = function(b){
        a = a + b;
        return num;
    }
    num.valueOf = num.toString = function(){return a};
    //当引用类型需要转为字符串时，自动调用toString方法
    //当引用类型需要转为数字时，自动调用valueOf方法
    return num;
}

add(1); // function
+add(1);// 1; 因为调用了valueOf方法
```

### 继承方式的优缺点

#### 原型继承
> 缺点 : 引用类型的属性被所有属性共享

```js
function Person(){
    this.list = [1,2,3]
}

function Child(){}
Child.prototype = new Person();

let child = new Child()
console.log(child.list); // [1,2,3]

let child2 = new Child()
console.log(child2.list); // [1,2,3]

child.list.push("test")

console.log(child.list); // [1,2,3,"test"]
console.log(child2.list); // [1,2,3,"test"]

```

#### 借用构造函数继承 (经典继承)
> 缺点 : 只继承构造函数中的方法,不会继承原型上的方法

```js
function Person(name) {
    this.name = name
}
function Child(name){
    Person.call(this,name)
}

let child = new Child("123")
let child1 = new Child("456")
console.log(child.name); //123
console.log(child1.name); //456
```

#### 组合继承
> 原型链和经典继承的组合方式。
> 
> 如果拥有继承对象的所有构造方法和原型方法,可以使用组合继承。

```js
function Person(name){
    this.name = name
    this.colors = ["blue"]
}

Person.prototype.getName = function () {
    return this.name
}

function Child(name , age){
    Person.call(this,name)
    this.age = age
}

// 施加魔法
// 可以拿到被继承对象上原型挂载的方法
Child.prototype = new Person()
// 这边在指定一下构造函数对象,确定构造器还是Child,这样就可以在Child自定义方法,不受Person干扰
Child.prototype.constructor = Child

let child = new Child("小红","123")
console.log(child.getName());//如果没有魔法,这句会报错
```

#### 原型式基础
> 类似于模拟Object.create方法

```js
let person = {
    name : '小红',
    age : 28,
}

function _create(o){
    function F(){}
    F.prototype = o
    return F()
}

```

#### 寄生组合式继承
> 在组合继承中, child和child.prototype会有相同的属性,那么寄生组合继承不会有这种问题

```js
function Person(name) {
    this.name = name
    this.colors = [1,2,3]
}

function Child(name , age){
    Person.call(this, name)
    this.age = age
}

let F = function(){}
F.prototype = Person.prototype
Child.prototype = new F()

let child1 = new Child('kevin', '18');


// 封装
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Person);
```

#### 小结
- 通过call实际是继承构造函数的方法,不会继承原型。
- 如果通过组合继承的方法去继承原型,被继承对象的构造器会执行两次,解决办法是通过寄生组合方法。
- 寄生组合继承方法,直接继承被继承对象的原型,中间要有一个媒介。


### 闭包

1. 闭包的定义

从理论角度：所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。
<br/>

从实践角度：以下函数才算是闭包：
- 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
- 在代码中引用了自由变量

``` js
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}

var foo = checkscope();
foo();
```
1. 创建全局执行上下文
2. 创建checkscope执行上下文,压入执行上下文栈中
3. checkscope执行完毕,checkscope执行上下文弹出
4. f执行上下文生成
5. f执行上下文出栈

问题 : 为什么f函数能访问checkscope中的变量呢,正常来说checkscope的执行上下文已经被销毁,应该不能被访问才对。
>解答 : 因为在f函数创建时,会把checkscope作用域保存到scope属性中去,所以在访问变量时,会从作用域链中查找
