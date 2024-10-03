# Three.js开发指南（第3版）

::: tip 说明
本节笔记来源：Three.js开发指南（第3版）
:::

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" src="//music.163.com/outchain/player?type=2&id=624084&auto=0&height=66" oncontextmenu="return false"></iframe>

**TrackballControls.js** 有了它便可以利用鼠标任意移动摄像机，以便从不用角度观察场景。

```js
// 基本材质
var planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xAAAAAA
});

var cubeMaterial = new THREE.MeshLambertMaterial({
  color: 0xFF0000
});
```
我们使用的基本材质不会对光源有任何反应，基本材质只会使用 **指定的颜色渲染物体**。

**Three.js 中的材质 MeshPhysicalMaterial 和 MeshStandardMaterial （以及被弃用的 MeshPhongMaterial）在渲染时会对光源产生反应。**

**【由于渲染阴影需要耗费大量的计算资源，所以默认情况下three.js中是不会渲染阴影的。】**

`renderer.shadowMap.enabled = true;` 来告诉渲染器需要阴影效果。
你还需要明确指定哪个物体投射阴影，哪个物体接受阴影。
```js
plane.receiveShadow = true;  // 接受阴影
sphere.castShadow = true;  // 投射阴影
```

还需要定义能够产生阴影的光源。因为并不是所有的光源都能够产生阴影。SpotLight定义的光源是能够产生阴影的。
```js
spotLight.castShadow = true;
```

`setInterval()` 的缺点在于它不管浏览器当前正在发生什么（比如正浏览其他网页），它都会每隔几毫秒执行一次。除此之外，`setInterval()` 方法并没与屏幕的刷新同步。这会导致较高的 CPU 使用率和性能不良。


# TWO - 构建Three.js应用的基本组件
每个你添加到 Three.js 场景的对象，甚至包括 THREE.Sence 本身，都是继承自一个名为 THREE.Object3D 的对象。

name属性：给对象命名在调试的时候是很有用的，而且还可以直接通过名字来获取场景中的对象。如果使用 `Three.Scene.getObjectByName(name)` 方法，可以直接获取场景中名为 name 的对象，然后可以执行一些比如改变位置的操作。

THREE.Scene.Add：用于向场景中添加对象

THREE.Scene.Remove：用于移除场景中的对象

THREE.Scene.children： 用于获取场景中所有的子对象列表

THREE.Scene.getObjectByName：利用name属性，用于获取场景中特定的对象

【THREE.Scene.traverse()方法】：我们可以将一个方法作为参数传递给traverse()方法，这个传递来的方法将会在每一个子对象上执行。由于THREE.Scene对象存储的是对象树，所以如果子对象本身还有子对象，traverse()方法会在所有的子对象上执行，直到遍历完场景树中的所有对象为止。


### 给场景添加雾化效果
fog(雾化)、overrideMaterial(材质覆盖)

雾化效果：场景中的物体离摄像机越远就会变得越模糊。
```js
scene.fog = new THREE.Fog()  // 线性变化
scene.fog = new THREE.FogExp2(oxffffff, 0.01)  // 只需要设定颜色和浓度，随距离呈指数增长
````


### 几何体
尽管可以使用 THREE.js 提供的几何体，**【但是你仍然可以通过定义顶点和面来自定义创建几何体】**。
```js
// 定义顶点
var vertices = [
  new THREE.Vector3(1,3,1)
  // ...
]
// 定义面，3个点确定一个面
var faces = [
  new THREE.FACE3(0,2,1)
  // ...
]
var geom = new THREE.Geometry()
geom.vertices = vertices;
geom.faces = faces;;
geom.computeFaceNormals()
```

**创建面的顶点时的创建顺序，因为顶点顺序决定了某个面时面向摄像机还是背向摄像机的**。如果你想创建面向摄像机的面，那么顶点的顺序时顺时针的，反之顶点的顺序时逆时针的。

::: tip
到底是使用四边形还是三角形来创建面？对于渲染器和游戏引擎来说，使用三角形更加容易，因为三角形渲染起来效率更高。
:::

Three.js 支持使用多种材质来创建网格。
```js
ver mesh = THREE.SceneUtils.createMultiMaterialObject(geom, materials)
```
这个方法创建的并不是一个 THREE.Mesh 对象实例，而是为 materials 数组中每个指定的材质创建一个实例，并把这些实例存放在一个组里（THREE.Object3D对象）。

我们使用了 `THREE.SceneUtils.createMultiMaterialObject()` 方法为几何体添加了线框。还可以使用 THREE.WireframeGeometry 来添加线框。

### 设置position
```js
// 方法1
cube.position.x = 10
// 方法2
cube.position.set(10, 3, 1)
// 方法3
cube.position = new THREE.Vector3(10, 3, 1)
```

Three.js 提供了两种不同的摄像机：正交投影摄像机和透视投影摄像机。

Thrss.js 还提供了一些非常特殊的摄像机用于支持3D眼镜和VR设备。（P40）

### 选择合适的摄像机
透视投影摄像机：立方体距离摄像机越远，它们就会被渲染得越小。

使用正交摄影摄像机的话，所有的立方体被渲染出来的尺寸都是一样的。因为对象相对于摄像机的距离对渲染的结果是没有影响的。这种摄像机通常被用于二维游戏中。实现伪三维效果。


# Three 光源
WebGL 本身并不支持光源。如果不使用 Three.js，则需要自己写 WebGL 着色程序来模拟光源。

- THREE.AmbientLight (这是一个基本光源，该光源的颜色将会叠加到场景现有物体的颜色上)
- THREE.PointLight (这是一个点光源，从空间的一点向所有方向发射光线。点光源不能用来创建阴影)
- THREE.SpotLight （这种光源有聚光的效果，类似台灯、天花板上的吊灯或者手电筒。这种光源可以投射阴影）
- THREE.DirectionalLight （这种光源也称作无限光，从这种光源发出的光线可以看作是平行的，打个比方，就像太阳光。这种光源也可以用来创建阴影）
- THREE.HemisphereLight （这是一种特殊的光源“半球光光源”，可以通过模拟反光面和光线微弱的天空来创建更加自然的室外光线。这个光源也不提供任何与阴影相关的功能）
- THREE.AreaLight（“区域光光源”，使用这种光源可以指定散发光线的平面，而不是一个点。THREE.AreaLight不投射任何阴影）
- THREE.LensFlare（这不是一种光源，但是通过使用 THREE.LensFlare，可以为场景中的光源添加镜头光晕效果）

::: tip
实际上 Three.js 在构造 THREE.Color 对象时非常灵活，它可以基于下面所列的任何一种方式来完成。（方式这里不罗列，自行查阅）
:::

【修改颜色】：
- 1、构造一个临时颜色对象，并将其赋值给现有对象。
- 2、使用 THREE.Color 类携带的方法来读取和修改其内部颜色值。（方法api看：P62）

也有轻松修改光源和材质的颜色的方法。

THREE.SpotLight 对象都有的属性，其中之一就是 target 属性。也就是光源瞄准的对象。

THREE.HemisphereLight 可以创建更加贴近自然的户外光照效果。使用平行光来模拟太阳，并不怎么自然。在户外，并不是所有的光照都来自上方，很多时来自于大气的散射和地面以及其他物体的反射。而半球光光源就是为这种情形创建的。
```js
// 参数为天空的颜色，体面的颜色，光强
var hemiLight = new THREE.HemisphereLight(0x0000ff, 0x00ff00, 0.6);
```

【引入一张图片来做地面】
```js
var textureGrass = new THREE.TextureLoader().load("../../assets/textures/ground/grasslight-big.jpg");
textureGrass.wrapS = THREE.RepeatWrapping;
textureGrass.wrapT = THREE.RepeatWrapping;
textureGrass.repeat.set(10, 10);

var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 20, 20);
var planeMaterial = new THREE.MeshLambertMaterial({
map: textureGrass
});
```

# 材质
材质就像物体的皮肤，决定了几何体的外表。皮肤定义了一个几何体看起来是否像金属、透明与否，或者显示为线框。

有哪些材质（P70）

### 材质的共有属性
- 基础属性(P72)
- 融合属性(融合属性决定了我们渲染的颜色如何与它们后面的颜色交互，P73)
- 高级属性(P74)

1、传入属性配置材质的两种方法：
```js
var material = new THREE.MeshBasicMaterial({
  color: '',
  name: ''
})
// or
var material = new THREE.MeshBasicMaterial()
material.color = ''
```

- MeshBasicMaterial ， 这种不考虑场景中光照的影响，也可以显示几何体的线框
- MeshDepthMaterial ， 外观由物体到摄像机的距离决定的，可以创建出逐渐消失的效果

联合材质
```js
var cube = new THREE.SceneUtils.createMultiMaterialObject(cubeGeometry, [colorMaterial, cubeMaterial
])
cube.children[1].scale.set(0.99, 0.99, 0.99)
```

- MeshNormalMaterial ，每一面的颜色是由从该面向外指的法向量计算得到的。（找到质心、）

2、如何在一个3D形体上为特定的面指定不同的材质。
为几何体的每个面指定不同的材质是可能的。

3、高级材质
- MeshPhongMaterial （创建一种光亮的材质）
- MeshLambertMaterial （创建暗淡的并不光亮的表面，会对场景中的光源产生反应。 color-颜色、 emissive-自发光）

- MeshStandardMaterial （更好的表现塑料感和金属质感）
- MeshPhysicalMaterial （提供了对反光度的更多控制）

- ShaderMaterial （创建自己的着色器，直接在 webgl 环境中运行）


### 线性几何体
Three.js 库提供了两种可用于线段的不同材质
- THREE.LineBasicMaterial
- THREE.LineDashedMaterial (虚线)


# 几何体
Three.js 中用于代表几何体的两个可用基类： THREE.Geometry 和 THREE.BufferGeometry。前者是旧版本中所有几何体的基类，而后者则由新版本提供给开发者。
> 新的，提供了运行效率，易用性稍差一些

THREE.Geomery : vertices(顶点)、faces(面)

THREE.BufferGeometry : attributes(分量)、index(索引)

THREE.Geometry 提供了 fromBufferGeometry 方法，可以接收基于 THREE.BufferGeometry 的对象，并将其数据导入到 THREE.Geometry 对象中。 对应的， THREE.BufferGeometry 也提供了 fromGeometry 方法，用于实现反向转换。

要访问几何体的属性，必须使用对象的 parameters 属性。例如： `plane.parameters.width`。

### 二维几何体
圆形、环形、平面、任意图形(THREE.ShapeGeometry)

【关于THREE中方向的说明】
Three.js 创建的二位图形都是“直立”的，所以他们只位于x-y平面。这很符合逻辑，因为他们是二位图形。但一般来讲，特别是 THREE.PlaneGeometry，你会希望这个网格“躺”下来，以便构建一种地面(x-z平面)，好把其他对象放在上面。创建一个水平放置而不是竖直的二维对象，最简单的方法是将网格沿x轴向后旋转四分之一圈（-PI/2）。
```js
mesh.rotation.x =- Math.PI/2
```

【THREE.ShapeGeometry】
1、先用 THREE.Shape() 画出图形对象
2、传入 new THREE.ShapeGeometr(new THREE.Shape())
或者 `shape.makeGeometry(options)`，这个函数会返回一个 THREE.ShapeGeometry 的实例。

关于线/曲线/平滑曲线的方法，可以查看P108。

### 三维几何体


# 六、高级几何体和二元操作
高级几何体： THREE.ConvexGeometry、THREE.LatheGeometry、THREE.TubeGeometry。

使用 THREE.ExtrudeGeometry 从二维图形创建三维图形。

使用 THREE.TextGeometry 来创建三维文字效果。

从一个外部加载的 SVG 图片创建出一个三维图形。

`THREE.ParamtericGeomery` 对象。使用这个对象，可以基于一组方程来创建几何体。

### 通过 THREE.ConvexGeometry，我们可以围绕一组点创建一个凸包。

::: tip 注意
（P124） 调用 computeVertexNormals 和 computeFaceNormals 两个函数来计算法线。这是因为顶点和面的法线是 Three.js 为物体渲染平滑的表面所必需的数据。虽然大部分几何体在创建对象时会自动计算这些法线，但是只有这个类的对象是个例外。
:::

### 从一个二维图形拉伸出三维图形
最通用的拉伸图形的方法是使用 THREE.ExtrudeGeometry 对象。创建 ExtrudeGeometry 时，第一个参数必须是Shape或者包含Shape的数组。

也可以使用 `extrudePath` 选项沿着一条路径拉伸图形。

### THREE.TubeGeometry，沿着一条三维的样条曲线拉伸出一根管。
通过指定一些顶点来定义路径，然后用 THREE.TubeGeometry 创建这根管。

THREE.TubeGeometry 构造函数，第一个参数必须是一条平滑的曲线，用 THREE.CatmullRomCurve3 创建一条平滑的曲线。

### THREE.ExtrudeGeometry
从SVG拉伸

### THREE.ParametricGeometry
创建基于等式的几何体

### 创建三维文本
首先利用 three.js 提供的 THREE.FondLoader 类加载字体。得到字体对象，将其包含在一个名为 `options` 的映射表变量中，并用它来创建 `THREE.TextGeometry` 几何体对象。

由于 THREE.TextGeometry 类是基于 THREE.ExtrudeGeometry 类的扩展，因此同样可以为字体形体的正面和侧面制定不同材质。如果向字体对象提供包含两个材质的数组，则数组中的第一个材质会被用于字体的正面，而第二个材质则被用于侧面。

::: tip
如果你想渲染二维文字，使用 `html5` 画布会更好。
:::

### 添加自定义字体
`TypeFace.js` 库可以将 TrueType 和 OpenType 字体转换为 JavaScript 文件或者 JSON 文件，以便在网页中的JavaScript程序中直接使用。

### 使用二元操作组合网格：构造实体几何体（Constructive Solid Geometry，CSG）
【intersect(相交)】、【union(联合)】、【subtract(相减)】
```js
var sphere1BSP = new ThreeBSP(sphere1)
var sphere2BSP = new ThreeBSP(sphere2)

resultBSP = sphere1BSP.subtract(sphere2BSP);
// or
// resultBSP = sphere1BSP.intersect(sphere2BSP);
// or
// resultBSP = sphere1BSP.union(sphere2BSP);

result = resultBSP.toMesh();
// 之所以要调用这两个函数，是因为在执行一二元操作之后，几何体的顶点和面会改变，并且面的法向量也会改变，显示的重新计算它们。可以保证新生成的对象着色光滑，并且正确呈现。
result.geometry.computeFaceNormals();
result.geometry.computeVertexNormals();
scene.add(result);
```
::: tip
`union` 函数意义最无趣，因为 `Three.js` 自己也提供了（THREE.Geometry.merge）而且性能更好。
:::

# 七、粒子和精灵
使用 `THREE.Points`（有时也叫作精灵（sprite））,可以非常容易的创建很多细小的物体，用来模拟雨滴、雪花、烟和其它有趣的效果。
```js
// Sprite
var material = new THREE.SpriteMaterial({
  color: Math.random() * 0xffffff
});
var sprite = new THREE.Sprite(material);

// Point
var geom = new THREE.Geometry();
var material = new THREE.PointsMaterial({
  size: 2,
  vertexColors: true,
  color: 0xffffff
});
for (var x = -15; x < 15; x++) {
  for (var y = -10; y < 10; y++) {
    var particle = new THREE.Vector3(x * 4, y * 4, 0);
    geom.vertices.push(particle);
    geom.colors.push(new THREE.Color(Math.random() * 0xffffff));
  }
}
var cloud = new THREE.Points(geom, material);
scene.add(cloud);

// 【使用HTML5画布样式化粒子】
// 在THREE.CanvasRenderer中使用HTML5画布
// Sprite加载Canvas绘制的图形
// getTexture 是一个创建canvas的函数
var material = new THREE.SpriteCanvasMaterial({
  program: getTexture
});
var sprite = new THREE.Sprite(material);

// 在WebGLRenderer中使用HTML5画布
// 在createGhostTexture()里，我们基于HTML5画布元素创建了一个THREE.Texture对象
var material = new THREE.PointsMaterial({
  size: size,
  transparent: transparent,
  opacity: opacity,
  map: createGhostTexture(),
  sizeAttenuation: sizeAttenuation,
  color: color
});
cloud = new THREE.Points(geom, material);
cloud.name = 'points';
scene.add(cloud);

// 【使用纹理样式化例子】
// 【纹理应该是正方形的，并且尺长最好是2的幂】
var texture = new THREE.TextureLoader().load("../../assets/textures/particles/raindrop-3.png");
var material = new THREE.PointsMaterial({
  size: size,
  transparent: transparent,
  opacity: opacity,
  map: texture,
  blending: THREE.AdditiveBlending,
  sizeAttenuation: sizeAttenuation,
  color: color
});
```




# 八、 创建、加载高级网格和几何体
1、组合和合并；2、从外部加载。

利用Group实现对象组合；多数情况下使用组可以很容易的操纵和管理大量网格。但是当对象的数量非常多时，性能就会成为一个瓶颈。使用组，每个对象还是独立的，仍然需要对它们分别进行处理和渲染。通过 `THREE.Geometry.merge()` 函数，你可以将多个几何体合并起来创建一个联合体。
```js
var geometry = new THREE.Geometry();
for (var i = 0; i < controls.numberOfObjects; i++) {
  var cubeMesh = addcube();
  cubeMesh.updateMatrix();
  geometry.merge(cubeMesh.geometry, cubeMesh.matrix);
}
scene.add(new THREE.Mesh(geometry, cubeMaterial));
```
::: tip
matrix： 变换矩阵。当我们将此矩阵添加到merge函数后，那么合并的方块将会被正确定位。
:::

### 2、从外部加载
`Three.js` 提供了一个叫做 `THREE.ObjectLoader` 的辅助对象，使用它可以将JSON转换成 `THREE.Mesh` 对象。
```js
// 模型转换成json数据
var result = knot.toJSON();
// 加载json数据
loadedMesh = loader.parse(result);
scene.add(loadedMesh);

// 整个场景转换成json数据
var loadedSceneAsJson = scene.toJSON()
// 加载json数据为scene
var loader = new THREE.ObjectLoader();
scene = loader.parse(loadedSceneAsJson);
```

【加载OBJ，MTL】
```js
var objLoader = new THREE.OBJLoader();
objLoader.setMaterials(materials);
objLoader.load('../../assets/models/pinecone/pinecone.obj', function (mesh) {
  // ...
})

// 下面这两行是确保正确渲染使用的材质所必需的
child.geometry.computeVertexNormals();
child.geometry.computeFaceNormals();
```


# 九、创建动画和移动摄像机
【基础动画】、【移动相机】、【变形和骨骼动画】、【加载外部动画】

### 1、基础动画：修改对象的三个属性：位置、旋转和缩放。
```js
render();
function render() {
  // 修改对象的三个属性：位置、旋转和缩放。
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
```
::: tip
在没有`requestAnimationFrame`函数之前，一般会使用`setInterval`或者`setTimeout`，问题是它们并没有考虑其他正在发生的事情。即使动画没有显示或者隐藏在某个标签页下，这两个函数依然会被调用，而且会耗费某些资源。另外，它们一旦调用就会刷新屏幕，不管这时对浏览器来说是不是恰当的时机。这也就意味着较高的CPU使用率。通过`requestAnimationFrame`，我们不必告诉浏览器什么时候需要刷新屏幕，而是请求浏览器在最合适的时候执行我们提供的函数。通常情况下其结果是60fps(帧频)。使用`requestAnimationFrame`会让你的动画运行得更平缓，而且对CPU和GPU更友好，你也不必再担心渲染时机方面的问题。
:::


### 2、碰撞检测(选择对象)
使用鼠标在场景中选择一个对象。
```js
var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
vector = vector.unproject(camera);

var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
var intersects = raycaster.intersectObjects([sphere, cylinder, cube]);

if (intersects.length > 0) {
  console.log(intersects[0]);
  console.log(intersects[0].object);
}

// 1、首先，基于我们在屏幕上点击的位置创建一个Vector3向量。
// 2、接着，使用vector.unproject方法将屏幕上的点击位置转换成三维场景中的坐标。
// 3、然后，创建THREE.Raycaster。使用THREE.Raycaster可以向场景中发射光线。
// 4、最后，我们使用raycaster.intersectObjects方法来判断指定的对象中哪些被该光线照射到了。
```

### 3、Tween
```js
var origPosition = geometry.attributes['position'].clone()
geometry.origPosition = origPosition

```

### 4、使用摄像机
`Three.js` 提供了一些摄像机控件，使用这些控件，你可以控制场景中的摄像机。

第一视角控制器（FirstPersonControls）、飞行控制器（FlyControls）、翻滚控制器（RollControls）、轨迹球控制器（TrackBallControls）、轨道控制器（OrbitControls）。

【轨迹球控制器：创建它，并将它绑定到摄像机上。`clock.getDelta()`方法可以精确地计算此次调用距离上次调用的时间间隔，或者一个渲染循环花费的时间。若要更新摄像机的位置，可以调用`trackballControls.update()`方法】
```js
trackballControls.update(clock.getDelta());
```

【飞行控制器：使用WSADRFGE等键来控制】

【第一视角控制器：】

【轨道控制器：轨道控制器主要使用鼠标】

### 5、变形动画和骨骼动画
当你使用外部软件创建动画时，通常会有两种主要的动画定义方式：【变形动画】、【骨骼动画】。

Three.js 对这两种模式都支持，但是相比较而言，使用变形动画能够得到更好的效果。骨骼动画的主要问题是如何从Blender等三维程序中较好的导出数据，从而在Three.js中制作动画，但是变形动画就可以很容易获取良好的工作模型。

当一个具有动画数据的模型被加载后，获得的模型对象往往具有一个名为animations的成员对象。该对象包含了一个THREE.AnimationClip对象集合。

THREE.AnimationMixer对象用于控制多个THREE.AnimationClip对象，确保这些动画在适当的时间发生，使动画同步或者控制从一个动画过度到另一个。

【THREE.AnimationClip】、【THREE.AnimationMixer】、【THREE.AnimationAction】

当一个具有动画数据的模型被加载后，获得的模型对象往往具有一个名为animations的成员对象。该对象包含一个THREE.AnimationClip对象集合。

THREE.AnimationClip 对象通常保存有某种特定类型的动画数据。
```js
loader.load('../../assets/models/horse/horse.js', function (geometry, mat) {
  // 下面两行是必须的，用于动画的流畅和光滑，详情看文档
  geometry.computeVertexNormals();
  geometry.computeMorphNormals();
  ...
  mixer = new THREE.AnimationMixer( mesh );
  animationClip = geometry.animations[0];
  clipAction = mixer.clipAction( animationClip ).play();  
  clipAction.setLoop(THREE.LoopRepeat);
  scene.add(mesh)
}
```
THREE.AnimationMixer对象用于控制多个THREE.AnimationClip对象，确保这些动画在适当的事件发生。

调用者会得到一个THREE.AnimationAction。很多动画控制功能是通过THREE.AnimationAction来调用的。而THREE.AnimationMixer本身并没有提供很全面的控制接口。

我们必须以`mixer.update(delta)`的形式去调用update函数。

关于这三个动画对象的属性，请查阅文档(P213)。

THREE.AnimationMixer还提供了两个可侦听的事件。可以调用混合器的addEventListener函数指定事件侦听函数。当一个动画已经完整播放一遍时，侦听函数会收到`loop`事件通告；当一个动画已经彻底播放完成时，侦听函数会收到`finished`事件通告。


### 在程序里从无到有创建动画&使用多个THREE.AnimationClip对象
调用`CreateFromMorphTargetSequence`函数创建了`animationClip`动画类的两个对象：`animationClip1`和`animationClip2`。

重点了解两个最重要的属性：weight和timeScale。weight属性决定了动画对模型的形状的影响程度，如果你将两段动画中的weight属性设为0，则无法再看到变化。timeScale可以调节动画的速度，如果将它设定为2，则动画会比正常速度快一倍；相反，如果将它设定为0，则动画会立刻暂停进行。

### 用骨骼和蒙皮创建动画
变形动画十分简洁。Three.js知道所有目标顶点的位置，实现变形动画所要做的就是将每个顶点从一个位置变换到另一个位置。而骨骼和蒙皮则要复杂一些。当你使用骨骼创建动画时，你移动一个骨骼，Three.js需要决定如何相应的移动相应的皮肤（这是一系列顶点，所以会复杂一些）。


### 使用外部模型创建动画
glTF模型：该模型的全称为“GL Transmission format(glTF)”，可以译为GL传输格式。该格式专用于存储3D场景和模型，其优势在于可以最小化文件尺寸，并且可以高效的加载模型。

# 十、加载和使用纹理
如何再材质中使用外部图片（也叫纹理）。使用纹理，可以使得对象看上去像是用木料、金属和石头等做出来的。

【凹凸贴图、法线贴图、位移贴图为网格添加深度和细节；使用光照贴图创建假阴影；使用高光贴图、金属感贴图和粗糙贴图为网格的特定部分设定闪亮度；使用Alpha贴图使物体部分透明；使用环境贴图为材质增加细节反射；微调和自定义网格的UV映射；将HTML5的画布和视频作为纹理的输入。】
```js
var textureLoader = new THREE.TextureLoader();
textureLoader.load('../../assets/textures/general/metal-rust.jpg')
```
纹理的加载是异步的；如果要加载的纹理较大，而程序在纹理加载完成之前开始渲染场景，则会在最开始的瞬间看到场景中的一些物体表面没有贴图。如果希望等待纹理加载完成，可以像下面这样为THREE.TextureLoader.load()函数提供回调函数：
```js
var textureLoader = new THREE.TextureLoader();
textureLoader.load('../../assets/textures/general/metal-rust.jpg', onLoadFunction, onProgressFunction, onErrorFunction)
```
可以使用任何你喜欢的图片来作为纹理使用，但是为了达到最好的效果，最好使用长宽大小为2的次方的正方形图片。

### 使用凹凸贴图创建褶皱
```js
var cubeMaterial = new THREE.MeshStandardMaterial({
  map: textureLoader.load("../../assets/textures/stone/stone.jpg"),
  bumpMap: textureLoader.load("../../assets/textures/stone/stone-bump.jpg"),
  metalness: 0.2,
  roughness: 0.07
});
```
通过bumpMap属性，我们可以设置凹凸的高度（如果值为负数，则表示的是深度）

凹凸图只包含像素的相对高度，没有任何倾斜的方向信息，所以使用凹凸贴图所能表达的深度信息有限，要想实现更多细节可以使用法向贴图。

### 使用法向贴图创建更加细致的凹凸和褶皱
```js
var cubeMaterial = new THREE.MeshStandardMaterial({
  map: textureLoader.load("../../assets/textures/general/plaster.jpg"),
  normalMap: textureLoader.load("../../assets/textures/general/plaster-normal.jpg"),
  metalness: 0.2,
  roughness: 0.07
});
```
使用方法和凹凸贴图一样，只是这次我们将normalMap属性设置为法向纹理。
【使用法向贴图的最大问题是它们很难创建】

使用法向贴图和凹凸贴图来增加物体表面细节时，不需要改变模型的实际形状；所有顶点都保持在原始位置不变。这些贴图利用场景中的光照来制造伪深度和细节。除了上面两种方法，Three.js还提供了第三个方法来基于贴图为模型表面增加细节，这就是使用【位移贴图（displacement map）】。

### 使用位移贴图来改变顶点位置
在Three.js里有一种纹理贴图可以用于修改模型的顶点。法向贴图和凹凸贴图都只能在物体表面生成一种凹凸不平的假象，而位移贴图则能够根据贴图的内容，真正改变模型的形状。
```js
var sphereMaterial = new THREE.MeshStandardMaterial({
  map: textureLoader.load("../../assets/textures/w_c.jpg"),
  displacementMap: textureLoader.load("../../assets/textures/w_d.png"),
  metalness: 0.02,
  roughness: 0.07,
  color: 0xffffff
});
```

### 用环境光遮挡贴图实现细节阴影
在环境光中，虽然模型的大部分表面都能接收到环境光，但它们接收光线的多少仍然有差别。我们以一个站立的人物模型为例，头顶往往接收的环境光更多，而胳膊下侧则接收的更少。这种光照的差异可以被渲染（又称烘焙）到一张纹理贴图上，然后与颜色贴图混合在一起应用到模型上。这样一来便可以避免在渲染循环中重复计算光照差异。

获得环境光遮挡贴图后，可以将他设置到模型的aoMap属性上。
```js
var material = new THREE.MeshStandardMaterial({
  aoMap: textureLoader.load("../../assets/models/baymax/ambient.png"),
  aoMapIntensity: 2,
  color: 0xffffff,
  metalness: 0,
  roughness: 1
});
```


### 用光照贴图产生假阴影
模型的光照信息被预先烘培到了纹理贴图中。
```js
var plane = sceneGroup.getObjectByName("Plane")
  plane.geometry.faceVertexUvs.push(plane.geometry.faceVertexUvs[0]);
  plane.material = new THREE.MeshBasicMaterial({
    map: textureLoader.load("../../assets/textures/general/floor-wood.jpg"),
    lightMap: textureLoader.load("../../assets/textures/lightmap/lightmap.png"),
  });
```
但是请记住，烘培到纹理贴图中的阴影、光照以及环境光遮挡信息只能用于静态场景，或者场景中静态的物体。一旦光源或物体发生移动或者改变，就不得不实时计算阴影了。

### 金属光泽贴图和粗糙度贴图

### Alpha贴图
用于控制物体表面的透明度

### 自发光贴图
控制模型表面实现自发光效果的纹理贴图；自发光特性只能单独影响物体本身，却不能使该物体变成光源。

### 高光贴图
用于指定物体表面中哪部分比较闪亮，或者哪部分相对暗淡。

### 纹理的高级用途
【自定义UV映射】、【重复纹理】

### 在画布上绘制图案并作为纹理
使用Literally库（http://literallycanvas.com）来创建一个交互式的画布，在这个画布上你可以进行绘图。
```js
var texture = new THREE.Texture(canvas)
// 然后每次render时更新材质：
sphereMesh.material.map.needsUpdate = true
```

### 将画布用作凹凸贴图

### 将视频输出作为纹理
说白了，也就是将视频作为模型的纹理，在模型表面播放
```js
var video = document.getElementById( 'video' );
var texture = new THREE.VideoTexture(video);
texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.LinearFilter;
texture.format = THREE.RGBFormat;
```
由于我们的视频不是正方形的，所以需要确保材质不会生成mipmap。由于材质变化很频繁，所以我们还需要设置简单高效的过滤器。最后就是把这个纹理当作材质用到模型上面去。

# 十一、自定义着色器和后期处理
【自定义着色器&渲染后期处理】
主要包含：Three.js提供的后期处理通道：THREE.BloomPass和THREE.FilmPass；使用掩码将效果应用到部分场景；使用THREE.ShaderPass添加更基础的后期渲染处理；使用THREE.ShaderPass产生各种模糊效果和高级滤镜；通过开发简单的着色器来创建自定义后期处理。

主要是`THREE.EffectComposer`对象。
```js
// 1、
var composer = new THREE.EffectComposer(renderer);
```
2、为后期处理配置`THREE.EffectComposer`
每个通道都会按照其加入到THREE.EffectComposer的顺序执行。
```js
var renderPass = new THREE.RenderPass(scene, camera);
// 调用addPass()方法就可以将THREE.RenderPass添加到THREE.EffectComposer对象上
composer.addPass(renderPass);
var effectFilm = new THREE.FilmPass(0.8, 0.325, 256, false);
effectFilm.renderToScreen = true;
composer.addPass(effectFilm);
```
3、更新渲染循环
在循环中使用组合器来替换THREE.WebGLRenderer
```js
function render() {
  //...
  composer.render(delta)
}
```
在代码中我们移除了`renderer.render(scene.camera)`，然后使用`composer.render(delta)`，这样就会调用`EffectComposer`对象的`render`方法。

### 后期处理通道有哪些
请看文档P269。

效果组合器中通道的顺序是很重要的。因为后一个通道是在前一个通道处理结果的基础上进行处理的。

如果要重用THREE.EffectComposer特定实例的处理结果，你可以使用THREE.TexturePass。

如果在THREE.EffectComposer中有多个THREE.RenderPass，需要确保clear属性被设置为false。否则，你只会看到最后一个THREE.RenderPass的处理结果。

# 十二、在场景中添加物理效果和声音
另外一个用来扩展Three.js功能的库——`Physijs`。使用`Physijs`库可以在3D场景中添加物理效果。包括重力效果，它们可以互相碰撞，施加力之后可以移动，还可以通过合页和滑块在移动过程中在对象上施加约束。这个库是基于另外一个著名的物理引擎`ammo.js`实现的。除了物理效果，我们还会介绍如何使用Three.js在场景中添加空间声音。

如何改变场景中物体的摩擦系数和复原性（弹性）。

首先我们要创建的是一个可以使用 Physijs 的Three.js场景。模拟这样的场景是非常耗费处理器资源的。如果在渲染线程中来做这样的模拟计算的话，场景的帧频会受到严重的影响。为了弥补这一点，Physijs在后台线程中做计算处理（web workers）。你可以在单独的线程里执行CPU密集型任务，这样就不会影响场景的渲染。

我们要包含ammo.js文件的原因是，Physijs只是ammo.js的包装器。ammo.js是一个实现了物理引擎的库，Physijs只是对这个物理库做了封装，使其使用起来更加方便。由于Physijs只是一个包装器，所以Physijs也可以与其他的物理引擎一起工作。

为了配置Physijs，我们还需要设置下面这两个属性：
```js
Physijs.scripts.worker = '../../libs/other/physijs/physijs_worker.js';
Physijs.scripts.ammo = './ammo.js';
```
创建场景：
```js
var scene = new Physijs.Scene({reportSize: 10, fixedTimeStep: 1 / 60});
// 在y轴方向上设置了值为-10的重力效果
scene.setGravity(new THREE.Vector3(0, -10, 0));
```
我们可以使用Three.js中的普通方法来定义对象，但是必须使用Physijs的特定对象将这些对象包装起来，这样对象才能被Physijs库管理。
```js
var stoneGeom = new THREE.BoxGeometry(0.6, 6, 2);
var stone = new Physijs.BoxMesh(stoneGeom, Physijs.createMaterial(new THREE.MeshStandardMaterial({
  color: colors[index % colors.length], transparent: true, opacity: 0.8
})));
scene.add(stone)
```
最后一步：
```js
renderer.render(scene, camera);
scene.simulate(undefined, 1);
```

使用`THREE.Audio`和`THREE.AudioListener`在场景中添加固定的声源。

















