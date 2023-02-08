# 加密解密

```js
import Vue from 'vue'
import CryptoJS from 'crypto-js'
// import CryptoJS from 'crypto-js/crypto-js'

const CRYPTO_KEY = '800900'

// md5加密
function encodeAES(str) {
  return CryptoJS.AES.encrypt(str, CRYPTO_KEY).toString();
}

function decodeAES(str) {
  return CryptoJS.AES.decrypt(str, CRYPTO_KEY).toString(CryptoJS.enc.Utf8);
}

export { encodeAES, decodeAES }


export default {
  //加密
  encrypt(word, keyStr){
    keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
    var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
  },
  //解密
  decrypt(word, keyStr){
    keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
    var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }
}
```