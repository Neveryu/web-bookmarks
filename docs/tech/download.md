# 下载实现

一、后端提供文件流的形式
```js
import loading from './loading'
import axios from 'axios'

export function downloadFile(url, params, tips) {
  tips = tips || "正在导出数据中..."
  loading.showLoading(tips);
  axios({
      method: 'post',
      url: url,
      params : params,
      data : params,
      processData: false,
      responseType: 'blob'
  }).then(response => {
      loading.close()
      let url = window.URL.createObjectURL(new Blob([response.data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url

      let realFileName = response.headers['content-disposition'].split('filename=')[1];
      realFileName = decodeURIComponent(realFileName);

      link.setAttribute('download', realFileName);

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link);
  }).catch((error) => {
      console.log(error);
  })
}
```

