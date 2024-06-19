# Angular 实战中的总结与技术点剖析


## 一、bootstrapApplication 和 platformBrowserDynamic
`bootstrapApplication` 是AngularJS框架中的一个方法，用于手动启动应用程序
```js
import { bootstrapApplication } from '@angular/platform-browser';

angular.element(document).ready(function() {
  angular.bootstrap(document, ['myApp'], {
    strictDi: true
  });
});
```

`bootstrapApplication` 和 `platformBrowserDynamic` 都是 Angular 框架中用于手动启动应用程序的方法，但它们的作用和使用方式有所不同。

`platformBrowserDynamic` 是 Angular 框架中的一个函数，它返回一个 PlatformRef 实例，该实例表示在浏览器中运行Angular应用程序的平台。我们可以使用这个实例来启动我们的应用程序。以下是一个使用 `platformBrowserDynamic` 方法的示例：
```js
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
```

我们使用 `platformBrowserDynamic` 方法返回的 PlatformRef 实例来启动我们的 Angular 应用程序。我们还需要引入我们的应用程序模块（在这个例子中是AppModule）。

> `platformBrowserDynamic` 是 Angular 框架中用于手动启动应用程序的方法，而 `bootstrapApplication` 是 AngularJS 框架中用于手动启动应用程序的方法。【现在都是 Angular了，所以使用 `platformBrowserDynamic`。

## 二、关于 tsconfig.app.json、 tsconfig.json、 tsconfig.spec.json、 angular.json

在Angular项目中，`tsconfig.json` 和 `tsconfig.app.json` 都是 TypeScript 编译器的配置文件。它们的作用和用途有所不同。

`tsconfig.json` 是 TypeScript 编译器的主要配置文件，它定义了项目的全局编译选项。例如，我们可以在 `tsconfig.json` 中指定编译输出目录、编译目标、模块系统、源代码目录等。这个文件通常位于项目的根目录下。

`tsconfig.app.json` 是 Angular CLI 应用程序的编译器选项的配置文件。它继承了 `tsconfig.json` 中的所有编译选项，并添加了一些特定于应用程序的选项。例如，我们可以在 `tsconfig.app.json` 中指定应用程序的根目录、输出目录、源代码目录等。这个文件通常位于 src 文件夹下。

总之，`tsconfig.json` 是 TypeScript 编译器的主要配置文件，而 `tsconfig.app.json` 是 Angular CLI 应用程序的编译器选项的配置文件。它们都用于定义项目的编译选项，但作用和用途有所不同。

在 Angular 项目中，`tsconfig.spec.json` 文件是用来配置 TypeScript 编译器在运行单元测试时的选项。这个文件会被 Karma 或者 Jest 自动识别并使用。

在 Angular 项目中，`angular.json` 文件是用来配置项目的构建和打包选项的。这个文件包含了多个配置项，可以用来定制化构建和打包过程。


## 三、NgModule 的作用
`@NgModule` 装饰器中的 bootstrap 属性指定了应用程序的根组件。它告诉 Angular 框架哪个组件应该作为应用程序的入口点，并在启动应用程序时自动引导该组件。

`@NgModule` 装饰器中的 imports 属性用于导入当前模块所需的其他模块。在Angular应用程序中，我们通常需要导入一些内置模块或第三方模块，以便我们可以使用它们提供的功能。

BrowserModule 是Angular框架中的一个内置模块，它提供了一些浏览器特定的服务和指令。例如，我们可以使用 BrowserModule 中的 `ngIf` 和 `ngFor` 指令来创建条件性和循环性的 DOM元素。另外，BrowserModule 还提供了一些浏览器特定的服务，例如 DomSanitizer 和 Title 等。
因此，在Angular应用程序中，我们通常需要在根模块中导入BrowserModule模块。这样我们就可以使用它提供的服务和指令。

需要注意的是，在Angular应用程序中，每个组件都必须在一个只能由一个模块引导的环境中运行。因此，在根模块中导入BrowserModule模块是必须的，否则我们无法在应用程序中使用任何指令或服务。

> `imports: [BrowserModule]`是用于导入所需模块的属性。在Angular应用程序中，我们通常需要在根模块中导入BrowserModule模块，以便我们可以使用它提供的服务和指令。

如果在 `@NgModule` 装饰器中的 bootstrap 数组中传入多个组件，则Angular框架将同时引导这些组件。这意味着，每个组件都会在应用程序启动时被创建，并且会在DOM中显示出来。
以下是一个使用多个组件的 bootstrap 数组的示例：
```js
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent]
})
export class AppModule {}
```
在上面的示例中，我们在bootstrap数组中传入了三个组件：AppComponent、HeaderComponent和FooterComponent。当我们启动应用程序时，这三个组件将同时被创建，并且会在DOM中显示出来。

需要注意的是，当我们在bootstrap数组中传入多个组件时，每个组件都必须具有自己的视图容器。否则，Angular框架将无法将它们添加到DOM中。

总之，如果在 `@NgModule` 装饰器中的bootstrap数组中传入多个组件，则Angular框架将同时引导这些组件，并在应用程序启动时创建它们。

## 四、CommonModule、 FormModule
CommonModule 是 Angular 框架中的一个模块，它提供了一些常用的指令和管道，如 `ngIf`、`ngFor`、`DatePipe` 等。
通常情况下，你需要在一个模块中导入 `CommonModule`，以便在该模块中使用这些指令和管道。你可以通过以下方式导入 `CommonModule`：
```js
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  // ...
})
export class YourModule { }
```
一旦你在模块中导入了CommonModule，你就可以在该模块中使用 `ngIf`、`ngFor`、`DatePipe` 等指令和管道了。例如：
```js
<div *ngIf="showContent">显示内容</div>

<div *ngFor="let item of items">{{ item }}</div>

<p>{{ today | date }}</p>
```

除了CommonModule，还有FormsModule模块，你必须自己添加此模块才能使用 `[(ngModel)]` 等等指令。

## 五、关于 `class implements OnInit` 的详解
在Angular中，`OnInit`是一个生命周期钩子，用于在组件初始化时执行一些操作。当一个组件被创建时，Angular会按照特定的顺序调用一系列生命周期钩子函数，以便开发人员可以在不同的阶段执行不同的任务。`OnInit`钩子函数是其中之一，它在组件初始化时被调用。

具体来说，当一个组件被创建并添加到DOM中时，Angular会按照以下顺序调用生命周期钩子函数：
1. `constructor()`：这是组件的构造函数，用于创建组件实例并注入依赖项。
2. `ngOnChanges()`：这个钩子函数会在组件的输入属性发生变化时调用。
3. `ngOnInit()`：这个钩子函数会在组件初始化完成后立即调用。在这个函数中，您可以执行一些初始化操作，例如获取数据或者订阅一个Observable。
4. `ngDoCheck()`：这个钩子函数会在Angular检测到组件的变化时调用。
5. `ngAfterContentInit()`：这个钩子函数会在组件内容初始化完成后调用。
6. `ngAfterContentChecked()`：这个钩子函数会在Angular检测到组件内容变化后调用。
7.`ngAfterViewInit()`：这个钩子函数会在组件视图初始化完成后调用。
8. `ngAfterViewChecked()`：这个钩子函数会在Angular检测到组件视图变化后调用。
9. `ngOnDestroy()`：这个钩子函数会在组件被销毁时调用。

`OnInit` 钩子函数的作用是在组件初始化时执行一些操作。具体来说，当一个组件被创建并添加到DOM中时，Angular会按照以下顺序调用生命周期钩子函数：
1. 首先调用组件的构造函数`constructor()`。
2. 然后调用`ngOnChanges()`，如果该组件有输入属性，并且这些输入属性已经发生了变化。
3. 最后调用`ngOnInit()`，该函数允许您执行一些初始化操作。通常情况下，您可以在这个函数中获取数据或者订阅一个Observable。

需要注意的是，`OnInit`只会在组件初始化时被调用一次。如果您需要在组件的生命周期中执行其他操作，请参考上面列出的其他生命周期钩子函数。

<b style="color: red">那为什么要在 class 后面 implements OnInit 呢</b>
在Angular中，组件类可以实现一些接口来表明它们具有特定的行为或功能。`OnInit`是一个接口，它定义了一个名为`ngOnInit()`的方法，组件类可以实现该方法来在组件初始化时执行一些操作。
实现`OnInit`接口并在组件类中实现`ngOnInit()`方法的作用是让Angular在组件初始化时调用`ngOnInit()`方法。这样，您就可以在这个方法中执行任何您想要在组件初始化时执行的操作。

例如，如果您想在组件初始化时从服务器获取一些数据，您可以在组件类中实现`ngOnInit()`方法，并在该方法中发出HTTP请求以获取数据。当Angular调用`ngOnInit()`方法时，您就可以获取并处理数据。

因此，通过在组件类后面添加`implements OnInit`，您告诉Angular这个组件类实现了`OnInit`接口，并且具有`ngOnInit()`方法。这样，Angular就会在组件初始化时自动调用`ngOnInit()`方法，让您可以执行一些初始化操作。

<b style="color: red">不 implements OnInit，也可以实现 OnInit() 方法</b>
在Angular中，您可以在组件类中定义`ngOnInit()`方法，即使您没有显式地实现`OnInit`接口。这是因为`OnInit`接口只是一个标记接口，它没有任何属性或方法。实现这个接口只是为了告诉Angular这个组件类具有`ngOnInit()`方法，并且应该在组件初始化时调用。

因此，如果您不显式地实现`OnInit`接口，但在组件类中定义了`ngOnInit()`方法，Angular仍然会在组件初始化时自动调用该方法。这是因为Angular会检查组件类中是否存在`ngOnInit()`方法，并在需要时调用它。

当然，为了更好地表明您的组件类具有`ngOnInit()`方法，以及为了让其他开发人员更容易地理解您的代码，建议您仍然在组件类后面添加`implements OnInit`。这样，其他开发人员可以更容易地看出您的组件类实现了哪些接口，并且具有哪些方法。

## 六、一些约定（很重要）
$ 是一个约定，表示 `heroes$` 是一个 Observable 而不是数组。
由于 `*ngFor` 不能直接使用 Observable，所以要使用一个管道字符（|），后面紧跟着一个 async。这表示 Angular 的 AsyncPipe 管道，它会自动订阅 Observable，这样你就不用在组件类中这么做了。
