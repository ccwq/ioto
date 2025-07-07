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

# 为所有package执行 pnpm i, 其他命令类似
pnpm lerna exec -- pnpm i 

```


# 在所有包中执行build
```shell
lerna exec -- pnpm build
```

# 提升版本
lerna version patch



# 问题

在进行lerna publish时，可能会遇到以下问题, npm账号必须开启2fa,并且在publish时候提供opt,才能发布成功, 

如果关闭2fa,无法发布, 原因是npm的安全策略, 为了安全,必须开启2fa, 但是这样会导致发布时候需要输入otp, 为了解决这个问题, 可以使用以下方法


-- @ioto/el 一个无法被pnpm 安装的库, 问题目前无法解决

