(window.webpackJsonp=window.webpackJsonp||[]).push([[160],{591:function(t,a,s){"use strict";s.r(a);var n=s(10),e=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"httpserver-nginx安装-withssl"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#httpserver-nginx安装-withssl"}},[t._v("#")]),t._v(" HttpServer Nginx安装 withSSL")]),t._v(" "),a("p",[t._v("备注：")]),t._v(" "),a("p",[t._v("1、Nginx统一安装1.10.2版本")]),t._v(" "),a("p",[t._v("2、安装的 openssl 版本若是 1.0.1—1.0.1f / 1.0.2 Beta1（可通过 openssl version 查看），而且如果还未修复心血漏洞的话（CentOS 可以通过 rpm -q --changelog openssl-1.0.1e | grep CVE-2014-0160 查看是否有输出，有输出则表示已修复），则需重新手动安装，否则会有心血漏洞的隐患。可参照 这篇文章下方的操作步骤 编译安装。")]),t._v(" "),a("p",[t._v("1.安装编译工具及库文件")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("（CentOS）\nyum "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-y")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("make")]),t._v(" zlib zlib-devel gcc-c++ libtool  openssl openssl-devel\n\n（Ubuntu）\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("apt-get")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("make")]),t._v(" zlib1g zlib1g-dev build-essential libtool openssl libssl-dev\n\n")])])]),a("p",[t._v("2.安装PCRE")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" /data/software\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("wget")]),t._v(" http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("tar")]),t._v(" zxvf pcre-8.35.tar.gz\n\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" pcre-8.35\n./configure\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("make")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("make")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v("\n\npcre-config "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--version")]),t._v("\n")])])]),a("p",[t._v("3.安装Nginx")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("wget")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-O")]),t._v(" /data/software/nginx-1.10.2.tar.gz http://nginx.org/download/nginx-1.10.2.tar.gz\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("tar")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("-zxvf")]),t._v(" /data/software/nginx-1.10.2.tar.gz\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" /data/software/nginx-1.10.2\n\n./configure "),a("span",{pre:!0,attrs:{class:"token parameter variable"}},[t._v("--prefix")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("/data/apps/nginx-main "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    --pid-path"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("/data/logs/nginx-main/nginx.pid "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    --lock-path"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("/data/apps/nginx-main/nginx.lock "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    --error-log-path"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("/data/logs/nginx-main/error.log "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    --http-log-path"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("/data/logs/nginx-main/access.log "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    --http-client-body-temp-path"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("/data/temps/nginx-main/client_body_temp "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    --http-proxy-temp-path"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("/data/temps/nginx-main/proxy_temp "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    --http-fastcgi-temp-path"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("/data/temps/nginx-main/fastcgi_temp "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    --http-uwsgi-temp-path"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("/data/temps/nginx-main/uwsgi_temp "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    --http-scgi-temp-path"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("/data/temps/nginx-main/scgi_temp "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    --with-http_stub_status_module "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    --with-http_ssl_module "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    --with-http_realip_module "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v("\n    --with-pcre"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("/data/software/pcre-8.35\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("make")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("make")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v("\n")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);