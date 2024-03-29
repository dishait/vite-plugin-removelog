# vite-plugin-removelog

生产环境下移除 `console` 的 `vite` 插件

<br />
<br />

## 动机 🦒

不希望开发时的日志在生产环境下被人看到

<br />
<br />
<br />

## 特性 🦖

- 支持 `.js`，`.ts`，`.jsx`，`.tsx`，`.vue`

<br />
<br />
<br />

## 使用 🦕

### 安装

```shell
npm i vite-plugin-removelog -D
```

<br />
<br />

### 配置

```js
// vite.config.js
import Removelog from "vite-plugin-removelog";

export default defineConfig({
  plugins: [Removelog()],
});
```

<br />

#### 包含

```js
// vite.config.js
import Removelog from "vite-plugin-removelog";

export default defineConfig({
  plugins: [
    Removelog({
      // 默认包含 log，warn，error
      include: ["log", "warn"],
    }),
  ],
});
```

<br />

#### 规范

可以通过 `normalize` 来自定义哪些模块需要被作用

```js
// vite.config.js
import Removelog from "vite-plugin-removelog";

export default defineConfig({
  plugins: [
    Removelog({
      // 返回 Truthy 时，模块被将作用
      normalize(id) {
        return /(\.vue|\.[jt]sx?)$/.test(id);
      },
    }),
  ],
});
```

<br />

#### 忽略 `node_modules`

可以通过 `ignoreNodeModules` 忽略 `node_modules` 包的处理

```js
// vite.config.js
import Removelog from "vite-plugin-removelog";

export default defineConfig({
  plugins: [
    Removelog({
      // 默认为 true
      ignoreNodeModules: true,
    }),
  ],
});
```

<br />
<br />

## 原理

该插件不传入 `normalize` 时由 [vite](https://cn.vitejs.dev/) 内置的
[esbuild](https://esbuild.github.io/) 进行转换，当传入 `normalize` 时，则为
[gogocode](https://github.com/thx/gogocode/issues) 进行转换。

[gogocode](https://github.com/thx/gogocode/issues) 实现的转换也是导出的 👇

```js
import { gogocodeRemovelog } from "vite-plugin-removelog";

const code = `
const foo = 1
console.log("foo")
`;
const dest = gogocodeRemovelog(code);

console.log(dest); // const foo = 1
```

<br />
<br />

## 组织 🦔

欢迎关注 **帝莎编程**

- [官网](http://dishaxy.dishait.cn/)
- [Gitee](https://gitee.com/dishait)
- [Github](https://github.com/dishait)
- [网易云课堂](https://study.163.com/provider/480000001892585/index.htm?share=2&shareId=480000001892585)

<br />
<br />
<br />

## License

Made with [markthree](https://github.com/markthree)

Published under [MIT License](./LICENSE).

<br />
