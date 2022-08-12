# @nodelib/fs.walk

> 用于高效递归遍历目录的库。

## :bulb: Highlights

* :moneybag: Returns useful information: `name`, `path`, `dirent` and `stats` (optional).
* :gear: 内嵌 目录/文件和错误过滤系统。
* :link: Can safely work with broken symbolic links.

## Install

```console
npm install @nodelib/fs.walk
```

## Usage

```ts
import * as fsWalk from '@nodelib/fs.walk';

fsWalk.walk('path', (error, entries) => { /* … */ });
```

## API

### .walk(path, [optionsOrSettings], callback)

以递归和异步方式读取目录。需要回调函数。

> :book:如果要使用Promise API，请使用 `util.promisify`.

```ts
fsWalk.walk('path', (error, entries) => { /* … */ });
fsWalk.walk('path', {}, (error, entries) => { /* … */ });
fsWalk.walk('path', new fsWalk.Settings(), (error, entries) => { /* … */ });
```

### .walkStream(path, [optionsOrSettings])

以递归和异步方式读取目录 [使用node标准流](https://nodejs.org/dist/latest-v12.x/docs/api/stream.html#stream_readable_streams) 

```ts
const stream = fsWalk.walkStream('path');
const stream = fsWalk.walkStream('path', {});
const stream = fsWalk.walkStream('path', new fsWalk.Settings());
```

### .walkSync(path, [optionsOrSettings])

以递归和同步方式读取目录。返回遍历完成数组。

```ts
const entries = fsWalk.walkSync('path');
const entries = fsWalk.walkSync('path', {});
const entries = fsWalk.walkSync('path', new fsWalk.Settings());
```

#### path

* 必填: `true`
* 方式: `string | Buffer | URL`

文件的路径。如果提供了URL，则必须使用`file:`协议”。

#### optionsOrSettings

* 必填: `false`
* 方式: `Options | Settings`
* 默认: An instance of `Settings` class

可以使用[`Options`](#options) 或者 [`Settings`](#settings) 其中的一个配置方式

> :book:传递普通对象时，将自动创建`Settings`类的实例。如果计划频繁调用该方法，请使用预先创建的`Settings`类实例。 

### Settings([options])

允许设置的选项。

```ts
const settings = new fsWalk.Settings({ followSymbolicLinks: true });

const entries = fsWalk.walkSync('path', settings);
```

## Entry

* `name` — 文件名称 (`unknown.txt`).
* `path` — 文件的路径 (`root/unknown.txt`).
* `dirent` —  [`fs.Dirent`](./src/types/index.ts) 的实例
* [`stats`] — `fs.Stats` 的实例

## Options

### basePath（自定义根路径）

* 方式: `string`
* 默认: `undefined`

默认情况下，所有路径都是相对于根路径构建的。可以使用此选项设置自定义根路径。
在下面的示例中，我们从`root`目录读取文件，但在结果中，根路径将是`custom`

```ts
fsWalk.walkSync('root'); // → ['root/file.txt']
fsWalk.walkSync('root', { basePath: 'custom' }); // → ['custom/file.txt']
```

### concurrency（并发限制）

* 方式: `number`
* 默认: `Infinity`

对 `fs.readdir`的最大并发调用数

> :book: 数字越大，文件系统的性能和负载就越高。如果要在不易卡顿模式下读取，请将该值设置为 `4 * os.cpus().length` (4 是默认大小 [thread pool work scheduling](http://docs.libuv.org/en/v1.x/threadpool.html#thread-pool-work-scheduling)).

### deepFilter（深度遍历判断函数）

* 方式: [`DeepFilterFunction`](./src/settings.ts)
* 默认: `undefined`

目录是否将被深度遍历的函数。

```ts
// Skip all directories that starts with `node_modules`
const filter: DeepFilterFunction = (entry) => !entry.path.startsWith('node_modules');
```

### entryFilter（过滤器）

* 方式: [`EntryFilterFunction`](./src/settings.ts)
* 默认: `undefined`

一个函数 用来指示该路径是否需要包含在结果中

```ts
// Exclude all `.js` files from results
const filter: EntryFilterFunction = (entry) => !entry.name.endsWith('.js');
```

### errorFilter（错误处理函数）

* 方式: [`ErrorFilterFunction`](./src/settings.ts)
* 默认: `undefined`

   用一个函数定义错误的时候的处理 并指示该错误是否需要被跳过，错误的路径 error.code会返回为：`ENOENT` 

```ts
// 跳过 所有错误
const filter: ErrorFilterFunction = (error) => error.code == 'ENOENT';
```

### stats（获取Stat）

* 方式: `boolean`
* 默认: `false`

 [`Entry`](#entry).

> 添加添加的Stats到 [`Entry`]
>
> 在`ditional ` 将添加相关的数据

### followSymbolicLinks

* 方式: `boolean`
* 默认: `false`

是否遵循 `fs.stat` 的连接符 如果需要请设置`true` 

### `throwErrorOnBrokenSymbolicLink`

* 方式: `boolean`
* 默认: `true`

Throw an error when symbolic link is broken if `true` or safely return `lstat` call if `false`.

### `pathSegmentSeparator`（重置路径分隔符）

* 方式: `string`
* 默认: `path.sep`

我们默认会从path.sep获取适用系统分隔符（比如MacOS下是(`\`） 而Windows下是（/）） 处理路径 但是你在这里可以自定义

### `fs`

* 方式: `FileSystemAdapter`
* 默认: Node自带的fs

默认情况下，Node.js  module（`fs`）用于处理文件系统。您可以用自己的方法替换任何方法。

```ts
interface FileSystemAdapter {
	lstat: typeof fs.lstat;
	stat: typeof fs.stat;
	lstatSync: typeof fs.lstatSync;
	statSync: typeof fs.statSync;
	readdir: typeof fs.readdir;
	readdirSync: typeof fs.readdirSync;
}

const settings = new fsWalk.Settings({
	fs: { lstat: fakeLstat }
});
```

## Changelog

See the [Releases section of our GitHub project](https://github.com/nodelib/nodelib/releases) for changelog for each release version.

## License

This software is released under the terms of the MIT license.
