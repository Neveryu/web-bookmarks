# HttpServer Nginx安装 withSSL

备注：

1、Nginx统一安装1.10.2版本

2、安装的 openssl 版本若是 1.0.1—1.0.1f / 1.0.2 Beta1（可通过 openssl version 查看），而且如果还未修复心血漏洞的话（CentOS 可以通过 rpm -q --changelog openssl-1.0.1e | grep CVE-2014-0160 查看是否有输出，有输出则表示已修复），则需重新手动安装，否则会有心血漏洞的隐患。可参照 这篇文章下方的操作步骤 编译安装。

1.安装编译工具及库文件
``` bash
（CentOS）
yum -y install make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel

（Ubuntu）
apt-get install make zlib1g zlib1g-dev build-essential libtool openssl libssl-dev

```

2.安装PCRE
``` bash
cd /data/software
wget http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz
tar zxvf pcre-8.35.tar.gz

cd pcre-8.35
./configure
make && make install

pcre-config --version
```

3.安装Nginx
``` bash
wget -O /data/software/nginx-1.10.2.tar.gz http://nginx.org/download/nginx-1.10.2.tar.gz
tar -zxvf /data/software/nginx-1.10.2.tar.gz
cd /data/software/nginx-1.10.2

./configure --prefix=/data/apps/nginx-main \
    --pid-path=/data/logs/nginx-main/nginx.pid \
    --lock-path=/data/apps/nginx-main/nginx.lock \
    --error-log-path=/data/logs/nginx-main/error.log \
    --http-log-path=/data/logs/nginx-main/access.log \
    --http-client-body-temp-path=/data/temps/nginx-main/client_body_temp \
    --http-proxy-temp-path=/data/temps/nginx-main/proxy_temp \
    --http-fastcgi-temp-path=/data/temps/nginx-main/fastcgi_temp \
    --http-uwsgi-temp-path=/data/temps/nginx-main/uwsgi_temp \
    --http-scgi-temp-path=/data/temps/nginx-main/scgi_temp \
    --with-http_stub_status_module \
    --with-http_ssl_module \
    --with-http_realip_module \
    --with-pcre=/data/software/pcre-8.35

make
make install
```
