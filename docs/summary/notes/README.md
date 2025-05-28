# 笔记

整理了一些学习笔记！

::: tip
#### Prop 名字格式

如果一个 prop 的名字很长，应使用 camelCase 形式，因为它们是合法的 JavaScript 标识符，可以直接在模板的表达式中使用，也可以避免在作为属性 key 名时必须加上引号。
```js
defineProps({
  greetingMessage: String
})
```
使用时：
```html
<span>{{ greetingMessage }}</span>
```

虽然理论上你也可以在向子组件传递 props 时使用 camelCase 形式 (使用 [DOM 模板](https://cn.vuejs.org/guide/essentials/component-basics.html#dom-template-parsing-caveats)时例外)，但实际上为了和 HTML attribute 对齐，我们通常会将其写为 kebab-case 形式：
```html
<MyComponent greeting-message="hello" />
```
对于组件名我们推荐使用 [PascalCase](https://cn.vuejs.org/guide/components/registration.html#component-name-casing)，因为这提高了模板的可读性，能帮助我们区分 Vue 组件和原生 HTML 元素。然而对于传递 props 来说，使用 camelCase 并没有太多优势，因此我们推荐更贴近 HTML 的书写风格。也就是前面说的那种，传递 props 时，使用小写 + 短杠的形式：
```html
<MyComponent greeting-message="hello" />
```
:::

```html
愿你遍历山河 仍觉人间值得
愿你眼里有着太阳 心里有光荡漾敞开
愿你生活明朗 万物可爱 愿新年 胜旧年
愿你眼里有星辰 身边有微风 心中有暖阳
愿你所求皆如愿 所行化坦途 多喜乐长安宁
愿你所有快乐 无需假装 此生尽兴 赤诚善良
愿你夜里有灯 梦里有人 平安喜乐 得偿所愿
愿你万物更新 旧疾当愈 前路浩荡 未来可期
愿你今年所有所有的遗憾 都是明年惊喜的铺垫
愿你天天开心幸福平安 事事有余地 时时可开始
愿你宇宙山河浪漫 生活点滴温暖 都值得你前进
要时间嘉许 等春风得意 烟火和你 都值得被记住
愿你今后温暖纯良 不舍爱与自由 凡是过去皆为序幕
愿新年没有狗血剧情 没有崎岖波折 平平淡淡 喜乐就好
愿你岁岁常欢愉 年年皆胜意 前路浩浩荡荡 万事尽可期待
愿你的快乐与岁月无关 你的纯真与经历无关 乘风破浪炙热欢畅
```

<img src="" alt="">

