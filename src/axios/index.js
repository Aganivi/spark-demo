import axios from 'axios'

import CryptoJS from 'crypto-js'

const appId = 'd0e47256'
let apiKey = 'MTE2ODg2YTc1Zjg3NzI3NGNiY2M0MWE5'
let apiSecret = 'e71a93f37ccb8a4b9517f907c06f5523'
let context = ''

const httpUrl = new URL('https://spark-api.xf-yun.com/v3.5/chat')
const modelDomain = 'generalv3.5'
const getUrl = () => {
	let url = 'wss://' + httpUrl.host + httpUrl.pathname

	// console.log('我打印的' + httpUrl.host)
	// console.log("我打印的" + httpUrl.pathname)

	let host = 'localhost:8080'
	let date = new Date().toGMTString()
	let algorithm = 'hmac-sha256'
	let headers = 'host date request-line'
	let signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${httpUrl.pathname} HTTP/1.1`
	let signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
	let signature = CryptoJS.enc.Base64.stringify(signatureSha)
	let authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
	let authorization = btoa(authorizationOrigin)
	url = `${url}?authorization=${authorization}&date=${date}&host=${host}`
	return url
}

export function getSpark() {
	let params = {
		header: {
			app_id: appId,
			uid: 'fd3f47e4-d',
		},
		parameter: {
			chat: {
				domain: modelDomain,
				temperature: 0.5,
				max_tokens: 1024,
			},
			context: context,
		},
		payload: {
			message: {
				text: [
					{
						role: 'user',
						content: '中国第一个皇帝是谁？',
					},
					{
						role: 'user',
						content: '秦始皇修的长城吗',
					},
				],
			},
		},
	}
	const url = getUrl()
	return axios.post(url, params)
}

console.log(`getSpark:`, await getSpark())
