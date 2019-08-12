# blog 前端页面（SPA）

## 安装扩展
```
npm install
```

### 启动开发环境服务器
```
npm run serve
```

### 代码规范检查
```
npm run lint
```

### 设置评论模块参数
设置 BlogComment 组件
```
data() {
  return {
    shortname: 设置 disqus shortname（具体查看 disqus 设置）
  };
}
```

### 编译生产环境代码
```
npm run build
```

### 详细配置文件
See [Configuration Reference](https://cli.vuejs.org/config/).