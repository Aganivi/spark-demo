import crypto from 'crypto'
import WebSocket from 'ws'
import { APPId, APISecret } from './config.js'

export default class DocumentQAndA {
	constructor({ APPId, APISecret, curTime, originUrl, fileId, question }) {
		this.appId = APPId
		this.apiSecret = APISecret
		this.timeStamp = curTime
		this.originUrl = originUrl
		this.fileId = fileId
		this.question = question
	}

	getOriginSignature() {
		const data = this.appId + this.timeStamp
		const hash = crypto.createHash('md5').update(data).digest('hex')
		return hash
	}

	getSignature() {
		const signatureOrigin = this.getOriginSignature()
		const signature = crypto
			.createHmac('sha1', this.apiSecret)
			.update(signatureOrigin)
			.digest('base64')
		return signature
	}

	getHeader() {
		const signature = this.getSignature()
		const header = {
			'Content-Type': 'application/json',
			appId: this.appId,
			timestamp: this.timeStamp,
			signature: signature,
		}
		return header
	}

	getWebSocketUrl() {
		const signature = this.getSignature()
		const queryString = `?appId=${this.appId}&timestamp=${this.timeStamp}&signature=${signature}`
		return this.originUrl + queryString
	}

	async getRequestBody() {
		return {
			chatExtends: {
				wikiPromptTpl:
					'请将以下内容作为已知信息：\n<wikicontent>\n请根据以上内容回答用户的问题。\n问题:<wikiquestion>\n回答:',
				wikiFilterScore: 0.83,
				temperature: 0.5,
			},
			fileIds: [this.fileId],
			messages: [
				{
					role: 'user',
					content: this.question,
				},
			],
		}
	}
}

// const curTime = Math.floor(Date.now() / 1000).toString()
// const originUrl = 'wss://chatdoc.xfyun.cn/openapi/chat'
// // Set your fileId from upload.js
// const fileId = '207956e1225c4a5d95efd3e9eb549ae9'
// // Set your question
// const question = '这是一条用作测试的评论'
// const param = { APPId, APISecret, curTime, originUrl, fileId, question }

// const documentQAndA = new DocumentQAndA(param)
// const wsUrl = documentQAndA.getWebSocketUrl()
// const headers = documentQAndA.getHeader()
// const requestBody = await documentQAndA.getRequestBody()
// const answers = []

// const ws = new WebSocket(wsUrl, {
// 	headers: headers,
// })

// ws.on('open', function open() {
// 	ws.send(JSON.stringify(requestBody))
// })

// ws.on('message', function incoming(data) {
// 	const message = JSON.parse(data)
// 	const code = message.code
// 	if (code !== 0) {
// 		console.log(`请求错误: ${code}, ${message}`)
// 		ws.close()
// 	} else {
// 		const content = message.content
// 		const status = message.status
// 		answers.push(content)
// 		if (status === 2) {
// 			const res = answers.join('')
// 			console.log(`res:`, res)
// 			ws.close()
// 		}
// 	}
// })

// ws.on('error', function error(error) {
// 	console.error('WebSocket error:', error)
// })

// ws.on('close', function close() {
// 	console.log('WebSocket closed')
// })
