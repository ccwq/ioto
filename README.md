一个工具库,使用monorepo
关于lerna的学习笔记: [NOTE.md](NOTE.md)

---

# lerna发布和管理多包


# 统一发布

## 需要otp的版本

脚本内容请看此文件: [force-publish.bat](force-publish.bat)

将会强制发布所有包，即使没有变更
- 会提示输入otp，输入后回车即可
- 选择版本的变更类型


## 无需otp的脚本
```shell
lerna publish --force-publish
```

# 为workspace安装依赖, 例如
```shell
pnpm add -D cross-env --workspace-root
```


# 在所有包中执行build
```shell
lerna exec -- pnpm build
```



