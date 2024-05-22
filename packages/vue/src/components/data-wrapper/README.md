# data-wrapper

对网络请求和分页以及请求状态维护的方法封装, 3组功能可以组合使用,也可以分开使用

# 使用

## [dataWrapper.ts](dataWrapper.ts)


## [dataWrapperWithPage.ts](dataWrapperWithPage.ts)

```ts
// 首先需要设置axios的请求实体
dataWrapperWithPageLoadFunSetter.set((dw:IDWWithPageOptions, options)=>instance(options));

/* News.vue
//template
ElPagination.mt45x.main_content.tc(
    layout="prev, pager, next, total, sizes"
    :page-sizes="[2, 3, 4, 5]"
    v-bind="pageBinder"
)

//js
const [newsDw, newsReqOptions, pageBinder] = useDataWrapperHelper<News[]>({
    responseType: 'page-list',
    pageSize: 3,
    reqOptions: computed(() => ({
        url: '/screen/index/portal/publish-news',
    })),
});
*/

```

## [DataWrapper.vue](DataWrapper.vue)



