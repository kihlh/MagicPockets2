# 安装

```sh
npm install sharp
```

```sh
yarn add sharp
```

## 运行环境

* Node.js >= 12.13.0

## 预编译的二进制文件

现成编译的sharp和libvips二进制文件提供给最常见的平台使用。

* macOS x64 (>= 10.13)
* macOS ARM64
* Linux x64 (glibc >= 2.17, musl >= 1.1.24, CPU with SSE4.2)
* Linux ARM64 (glibc >= 2.17, musl >= 1.1.24)
* Windows x64
* Windows x86

一个约7MB的tarball，包含libvips和它最常用的依赖项，通过HTTPS下载，通过资源完整性验证，并解压为 `node_modules/sharp/vendor` 期间 `npm install`.

这提供了对以下格式的支持
JPEG、PNG、WebP、AVIF、TIFF、GIF和SVG（输入）图像格式。

以下平台有预置的libvips，但没有sharp：

* Linux ARMv7 (glibc >= 2.28)
* Linux ARMv6 (glibc >= 2.28)
* Windows ARM64

* 以下平台需要从源代码编译 libvips 和 sharp。
* Linux x86
* Linux ARMv7 (glibc <= 2.27, musl)
* Linux ARMv6 (glibc <= 2.27, musl)
* Linux PowerPC
* FreeBSD
* OpenBSD

## 常见的问题

用于npm安装的Node.js的架构和平台
使用的Node.js架构和平台必须与运行时使用的Node.js架构和平台相同。
如果不是这样的话，请参见跨平台部分。

当使用`npm v6`或更早的版本时，以``root``或``sudo``用户身份安装时必须使用``npm install --unsafe-perm``标志。

当使用``npm v7``或更高版本时，运行`npm install`的用户必须拥有它所运行的目录。

当``npm``被配置为忽略安装脚本时，必须使用``npm install --ignore-scripts=false``标志。

检查运行``npm install --verbose --foreground-scripts sharp``的输出，了解有用的错误信息。

## Apple M1

从sharp v0.29.0开始，已经为ARM64的macOS提供了预构建的sharp和libvips二进制文件。

## 跨平台

在``npm``安装时，会自动为当前的操作系统平台和CPU架构选择预构建的二进制文件。
当前的操作系统平台和CPU架构（如有）。

目标平台和/或架构可以通过以下标志手动选择。

```sh
npm install --platform=... --arch=... --arm-version=... sharp
```

* `--platform`：`linux`、`darwin`或`win32`中的一个。
* `--arch`: `x64`, `ia32`, `arm` 或 `arm64`之一。
* `--arm-version`: `6`、`7`或`8`之一（`arm`默认为`6`，`arm64`默认为`8`）。
* `--libc`: `glibc`或`musl`之一。这个选项只适用于平台`linux`，默认为`glibc`。
* `--sharp-install-force`: 跳过版本兼容性和子资源完整性检查。

这些值也可以通过环境变量设置。
`npm_config_platform`, `npm_config_arch`, `npm_config_arm_version`, `npm_config_libc`.
和 `SHARP_INSTALL_FORCE`。

例如，如果目标机器有一个64位的ARM CPU并且运行Alpine Linux。
使用下面的标志。

```sh
npm install --arch=arm64 --platform=linux --libc=musl sharp
```

如果当前机器是Alpine Linux，目标机器是x64 cpu的Debian Linux。
使用以下标志。

```sh
npm install --arch=x64 --platform=linux --libc=glibc sharp
```

##自定义libvips

要使用一个自定义的、全局安装的libvips版本，而不是提供的二进制文件。
确保它至少是`package.json`文件中`config.libvips`下所列的版本
并且可以使用 `pkg-config --modversion vips-cpp'来定位它。

关于编译 libvips 及其依赖的帮助，请参见
[building libvips from source](https://www.libvips.org/install.html#building-libvips-from-source).

使用全局安装的libvips在Windows上是不被支持的。

##从源头开始构建

这个模块将在`npm install`时从源代码编译。

* 检测到全局安装的libvips（设置`SHARP_IGNORE_GLOBAL_LIBVIPS`环境变量来跳过这一点）。
* 当前平台上不存在预编译的锐利二进制文件，或
* 使用`npm install --build-from-source`标志时。

从源代码构建需要:

* C++11 编译器
* [node-gyp](https://github.com/nodejs/node-gyp#installation) 和它的依赖

## 自定义预构建的二进制文件

### 预建的sharp二进制文件

要从一个自定义的URL安装预建的sharp二进制文件。
设置 npm 配置选项 `sharp_binary_host`
或 `npm_config_sharp_binary_host` 环境变量。

要从本地文件系统的某个目录中安装预置的 sharp 二进制文件。
设置 `sharp_local_prebuilds npm config` 选项
或 `npm_config_sharp_local_prebuilds` 环境变量。

### Prebuilt libvips binaries

要从一个自定义的URL安装预构建的libvips二进制文件。
设置 `sharp_libvips_binary_host npm` 配置选项
或 `npm_config_sharp_libvips_binary_host` 环境变量。

要从本地文件系统的一个目录中安装预建的libvips二进制文件。
设置 `sharp_libvips_local_prebuilds npm config` 选项
或 `npm_config_sharp_libvips_local_prebuilds` 环境变量。

版本子路径和文件名会附加在这些上面。
例如，如果 `sharp_libvips_binary_host` 被设置为 https://hostname/path
并且libvips的版本是1.2.3，那么产生的URL将是
`https://hostname/path/v1.2.3/libvips-1.2.3-platform-arch.tar.br`.

更多的例子请见下面的中国镜像。

## 中国镜像

由阿里巴巴提供的一个位于中国的镜像网站，包含了 sharp 和 libvips 的二进制文件。

要使用它，可以设置以下配置。

```sh
npm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
npm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"
npm install sharp
```

或设置以下环境变量。

```sh
npm_config_sharp_binary_host="https://npmmirror.com/mirrors/sharp" \
  npm_config_sharp_libvips_binary_host="https://npmmirror.com/mirrors/sharp-libvips" \
  npm install sharp
```

## FreeBSD

在运行``npm``安装之前，必须先安装``vips``包。

```sh
pkg install -y pkgconf vips
```

```sh
cd /usr/ports/graphics/vips/ && make install clean
```

## Linux 的内存分配器

大多数基于glibc的Linux系统上的默认内存分配器
(如Debian, Red Hat)的默认内存分配器不适合长期运行的多线程进程。
进程不适合，因为它涉及到大量的小内存分配。

出于这个原因，默认情况下，夏普会限制使用基于线程的
[并发](api-utility#concurrency)，当运行时检测到glibc分配器的时候
在运行时被检测到。

为了帮助避免碎片化并提高这些系统的性能。
使用替代的内存分配器，如
[jemalloc](https://github.com/jemalloc/jemalloc)被推荐使用。

那些使用基于musl的Linux（如Alpine）和非Linux系统的用户不受影响。
不受影响。

## Heroku

添加 [jemalloc buildpack](https://github.com/gaffneyc/heroku-buildpack-jemalloc)
以降低内存碎片的影响。

设置
[NODE_MODULES_CACHE](https://devcenter.heroku.com/articles/nodejs-support#cache-behavior)
使用 `yarn` 进行包管理时 改成 `false`

## AWS Lambda

在`node_modules` 目录下的
[部署软件包](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-package.html)
必须包括用于Linux x64平台的二进制文件。

当在Linux x64以外的机器上构建你的部署包（glibc）时。
后运行以下额外的命令 `npm install`:

```sh
npm install
rm -rf node_modules/sharp
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install --arch=x64 --platform=linux --libc=glibc sharp
```

为了获得最佳性能，请选择最大的内存。
一个1536MB的函数比一个128MB的函数提供的CPU的处理时间快12倍。

## 打包器

### webpack

确保sharp被排除在捆绑打包内容之外，通过[externals](https://webpack.js.org/configuration/externals/)
配置。

```js
externals: {
  'sharp': 'commonjs sharp'
}
```

### esbuild

esbuild暂时不支持二进制打包，确保sharp被排除在捆绑之外，通过 [external](https://esbuild.github.io/api/#external)
配置.

```js
buildSync({
  entryPoints: ['app.js'],
  bundle: true,
  platform: 'node',
  external: ['sharp'],
})
```

```sh
esbuild app.js --bundle --platform=node --external:sharp
```

## 工作线程

在一些平台上，包括基于glibc的Linux。
主线程必须在创建工作线程之前调用 ```require('sharp')```
然后再创建工作线程。
这是为了确保共享库保持在内存中加载
直到所有线程都完成之后。

如果不这样做，可能会出现以下错误。

```
Module did not self-register
```

### 已知的冲突

### Canvas 和 Windows

由canvas为Windows提供的预置二进制文件依赖于未维护的GTK 2，最后一次更新是在2011年。

这些与sharp提供的现代的、最新的二进制文件相冲突。

如果在同一个Windows进程中使用这两个模块，就会出现以下错误

```
The specified procedure could not be found.
```
