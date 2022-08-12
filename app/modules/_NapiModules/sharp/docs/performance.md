# 性能

对该模块的性能进行测试，以确定其相对于其他模块的基准。


## 竞争者

* [jimp](https://www.npmjs.com/package/jimp) v0.16.1 - 纯JavaScript的图像处理。提供双三次插值。
* [mapnik](https://www.npmjs.org/package/mapnik) v4.5.9 - 虽然主要是一个地图渲染器，但Mapnik包含位图图像工具。
* [imagemagick](https://www.npmjs.com/package/imagemagick) v0.1.3 - 只支持文件系统，而且 "已经很久没有维护了"。
* [gm](https://www.npmjs.com/package/gm) v1.23.1 - 围绕GraphicsMagick的gm命令行工具的全功能封装。
* [@squoosh/lib](https://www.npmjs.com/package/@squoosh/lib) v0.4.0 - 图像库转为WebAssembly，避免GPLv3传播。
* [@squoosh/cli](https://www.npmjs.com/package/@squoosh/cli) v0.7.2 - 围绕@squoosh/lib的命令行包装器，通过生成进程避免了GPLv3的性传播
* sharp v0.30.0 / libvips v8.12.2 - 禁用libvips内的缓存以确保公平的比较。

## 工作任务

解压一个2725x2225的JPEG图像。
使用Lanczos 3重采样（如果有的话）调整大小至720x588。
然后以80的 "质量 "设置压缩为 JPEG。

## 环境

* AWS EC2 eu-west-1 [c5ad.xlarge](https://aws.amazon.com/ec2/instance-types/c5/) (4x AMD EPYC 7R32)
* Ubuntu 21.10 (ami-0258eeb71ddf238b3)
* Node.js 16.13.2

## Results

| **模块**    | **输入值**     | 输出量         | 运算/秒 | 加速 |
| :---------- | :------------- | :------------- | ------: | ---: |
| jimp        | buffer(缓冲)   | buffer(缓冲)   |    0.84 |  1.0 |
| squoosh-cli | 文件           | 文件           |    1.08 |  1.3 |
| squoosh-lib | buffer(缓冲)   | buffer(缓冲)   |    1.85 |  2.2 |
| mapnik      | buffer(缓冲)   | buffer(缓冲)   |    3.45 |  4.1 |
| gm          | buffer(缓冲)   | buffer(缓冲)   |    8.60 | 10.2 |
| gm          | 文件           | 文件           |    8.66 | 10.3 |
| imagemagick | 文件           | 文件           |    8.79 | 10.5 |
| sharp       | stream(标准流) | stream(标准流) |   28.90 | 34.4 |
| sharp       | 文件           | 文件           |   30.08 | 35.8 |
| sharp       | buffer(缓冲)   | buffer(缓冲)   |   30.42 | 36.2 |

启用缓存（默认）使用8核以上的机器，特别是拥有L1/L2 CPU缓存的设备，libvips的性能可以提高。

使用8核以上的机器，特别是拥有L1/L2 CPU缓存的设备，可以期待更好的libvips性能表现。相关(解)压缩库的I/O限制通常会决定最大吞吐量。

## 运行基准测试

需要安装*ImageMagick*，*GraphicsMagick*和*Mapnik*：

```sh
brew install imagemagick
brew install graphicsmagick
brew install mapnik
```

```sh
sudo apt-get install build-essential imagemagick libmagick++-dev graphicsmagick libmapnik-dev
```

```sh
sudo yum install ImageMagick-devel ImageMagick-c++-devel GraphicsMagick mapnik-devel
```

```sh
git clone https://github.com/lovell/sharp.git
cd sharp
npm install --build-from-source
cd test/bench
npm install
npm test
```
