# 前端规范 文档 （初稿）2013/10/9 15:00:01

### base.css
基础css文件，包括“重置”，“功能”性的集合，初稿待定，如果需要可以另外增加，不建议用网上的，原因，冷门HTML的标签我们是用不到的，所以我们没必要去重置它，如果后面用到HTML5，或者不需要兼容低端浏览器，那升级一套 `base.css` 便可以。功能性类开头以"mf"开头，意思是"mofang"。

### 命名规范
命名规范，包括HTML,CSS,JS命名，这里我提取了几个不错网站的命名方案(**豆瓣，youtube,百姓网**)，宗旨都是模块化的命名思路。
最好用英文去命名（不知道的单词可以查一下，正好学下英语，不怕命名过长）

#### HTML命名规范

* HTML命名采用“-”做分隔，均使用英文小写，为什么这样做？能够更明确的提取出公共的代码。这些模块如果是单独，便可以直接拿来用，如果不是单独的或者需要特殊处理可以加入ID（推荐使用，但少用），来处理，如果存在JS交互，则命名加入大写前缀"J_xx"（下划线），来告诉开发者这里存在JS交互，不是单纯的HTML。
示例：

```html
<div id="J_dialog" class="article">
   <div class="article-hd"></div>
   <div class="article-bd"></div>
   <div class="article-ft"></div>
</div>
```

 假如上面是一个文章的模块，这样如果别的地方需要用我们就可以直接拿过来，那如果同样的模块，有少量的更改，我们也不需要重写？怎么做？，不需要！
```html
<div class="move-article article">
   <div class="article-hd"></div>
   <div class="article-bd"></div>
   <div class="article-ft"></div>
</div>
```
这样只需要用“move-article”这个单独类去覆盖少量的变化便可以了，如果模块差异很大，那么就没必要重用了，重新单独写一个。

* hack 命名规范
  在写样式的时候避免不了存在hack，那如果处理，我们用"B"来标记，低浏览器的hack,这样以后不用兼容低端浏览器的话，直接搜索大写的“B”删除即可以。

#### CSS命名规范

* CSS代码也同采用“-”做分隔同html是等价的，，更能适应**F.I.S去require**。在抒写CSS应当与写HTML一样提取公共的。由于样式要兼容IE浏览器，必免不了要去做写hack，那么如果

#### JavaScript命名规范
  ----待定

### 注释规范
中英文结合注释防止开发人员看不懂.使用 /* 注释 */，由于中文注释可能导致代码失效，所以采用英文开头，中间用一个空格，中文解释。
示例：
```css
  /* S module */  
   .module {
   }
  /* E module */
```

### CSS3 selector

#### 属性选择器
* [att=val] ```att```是属性,```val```是值,例如[id="css3-selector"]
* [att*=val] 只要属性中包含val
* [att^=val] 以某些开头的
* [att$=val] 以某些结尾

#### 伪类选择器
* after
* before

#### 结构性选择器
* root 根元素选择器，指向html
* empty 当元素为空时，
* not 排除这个结构下面的子元素
* target

#### 子类选择器 存在问题，如果是列表则无事，如h2 p h2 p 因为它针对不同类
* first-child
* last-child
* nth-child() odd even
* nth-last-child
* nth-of-type
* nth-last-type
* only-child 只有一个子元素时

### 自行换行
* word-break:break-all
* word-wrap:break-word;
* white-space:nowrap;
* overflow:hidden,srcoll 
* overflow-x overflow-y
* box-sizing :border-box 百分比布局
* transform 四种功能， 旋转，绽放，倾斜，移动
* rotate 旋转 scale 缩放
* scale 缩放大小 1.5 5
* skew 倾斜 30deg 50deg
* translate 移动

### 动画
* Transitions 通过属性 property(要更改属性) duration(持续多长时间) timing-function(什么方法过渡)
* Animations 通过关键帧
*

