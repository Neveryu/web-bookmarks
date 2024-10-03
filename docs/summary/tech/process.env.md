# process.env 有哪几个地方可以设置

`process.env.NODE_ENV` 有哪几个地方可以设置：


## package.json
``` js
build:client": "cross-env NODE_ENV=production webpack --config build/webpack.client.config.js --progress --hide-modules",
```


## webpack
``` js
plugins: [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"'
  }),
  new VueSSRServerPlugin()
]
```
