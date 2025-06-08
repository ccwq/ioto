<!--
 * @Author: ccwq
 * @Date: 2025/6/7 23:03:00
 * @Description: 微信扫码登录的实现
 -->
<template lang="pug">
.WXSqCodeLogin
	.sqcode._pc.img(:id="id")

</template>
<script setup>
import { onMounted, onErrorCaptured, useId } from 'vue'
import { useEventListener } from '@vueuse/core'
import { globalErrorMessage } from '~/utils/globalErrorMessage'

const id = useId()

const props = defineProps()
const emits = defineEmits(['on-code'])
onErrorCaptured((err) => console.error('组件WXSqCodeLogin内部错误:', err))

const init = () => {
	const usp = new URLSearchParams(location.href)
	const isWxSQResult = usp.get('code')
	// 扫码结果回调模式
	if (isWxSQResult) {
		let code = usp.get('code')
		if (!code) {
			throw new Error('获取微信code失败')
		}

		const event = new CustomEvent('sq-code-result', {
			detail: { code },
		})
		top.document.dispatchEvent(event)
	}

	// 创建二维码模式
	else {
		const host = location.host
		// const host = 'www.zhijie985.com'

		const redirect_uri =
			location.protocol + '//' + host + '/login?scanqr=1'

		const appid = 'wxcfc579ced4a68a66'
		new WxLogin({
			self_redirect: true,
			id: id, // 二维码地址
			appid,
			scope: 'snsapi_login',
			redirect_uri,
			state: '',
			style: 'black',
			// href: location.origin + "/wx_sq_style.css",
			href: 'https://edu.tencentads.com/css/custom.css',
		})

		useEventListener(document, 'sq-code-result', (evt) => {
			console.log('捕获到自定义事件', evt.detail?.code)
			const code = evt.detail?.code
			if (code) {
				emits('on-code', code)
			} else {
				// globalErrorMessage('接受到的code为空')
				console.error("接受到的code为空")
				emits('on-code', null)
			}
		})
	}
}

onMounted(() => {
	init()
})
</script>
<style scoped lang="less">
.WXSqCodeLogin {
	.sqcode{
		:deep(iframe){
			height: 240px;
		}
	}
}
</style>
