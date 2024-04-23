# lerna发布和管理多包


# 强制发布

将会强制发布所有包，即使没有变更
- 会提示输入otp，输入后回车即可
- 选择版本的变更类型

```shell

请使用cmd执行
```shell
cmd.exe /c "set /p otp=请输入opt & cross-env NPM_CONFIG_OTP=%otp% lerna publish --force-publish"
```

# 为workspace安装依赖, 例如
```shell
pnpm add -D cross-env --workspace-root
```


# 在所有包中执行build
```shell
lerna exec -- pnpm build
```



