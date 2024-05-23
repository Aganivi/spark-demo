import WebSocket from 'ws'
import qs from 'qs'
import { APPId, APISecret, originUrl, bili_jct } from './config.js'
import DocumentQAndA from './asked.js'
import { bilibiliInfo } from './bilibili.js'
import { replyMsg } from './bilibiliAPI.js'

const { aid, root_id, source_id, fileId, source_content } = await bilibiliInfo()

const param = {
	APPId,
	APISecret,
	curTime: Math.floor(Date.now() / 1000).toString(),
	originUrl,
	fileId,
	question: source_content,
}
const documentQAndA = new DocumentQAndA(param)
const wsUrl = documentQAndA.getWebSocketUrl()
const headers = documentQAndA.getHeader()
const requestBody = await documentQAndA.getRequestBody()
const answers = []

const messageBody = {
	oid: aid,
	type: '1',
	message: '',
	root: root_id !== 0 ? root_id : source_id,
	parent: source_id,
	jsonp: 'jsonp',
	scene: 'msg',
	plat: '1',
	from: 'im-reply',
	build: '0',
	mobi_app: 'web',
	csrf_token: bili_jct,
	csrf: bili_jct,
}

setTimeout(() => {
	const ws = new WebSocket(wsUrl, {
		headers: headers,
	})

	ws.on('open', function open() {
		ws.send(JSON.stringify(requestBody))
	})

	ws.on('message', async function incoming(data) {
		const message = JSON.parse(data)
		const code = message.code
		if (code !== 0) {
			console.log(`请求错误: ${code}, ${JSON.stringify(message)}`)
			ws.close()
		} else {
			const content = message.content
			const status = message.status
			answers.push(content)
			if (status === 2) {
				const res = answers.join('')
				messageBody.message = res
				console.log(`res:`, res)
				await replyMsg(qs.stringify(messageBody))
				ws.close()
			}
		}
	})

	ws.on('error', function error(error) {
		console.error('WebSocket error:', error)
	})

	ws.on('close', function close() {
		console.log('WebSocket closed')
	})
}, 5000)
