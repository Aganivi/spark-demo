import axios from 'axios'
import { cookie } from './config.js'
import { encWbi } from './utils.js'

const baseUrl = 'https://api.bilibili.com/x'

axios.defaults.baseURL = baseUrl

axios.interceptors.request.use((config) => {
	config.headers = {
		Cookie: cookie,
		Referer: 'https://www.bilibili.com/',
		priority: 'u=1, i',
	}
	return config
})

export const getReply = async () => {
	return (await axios.get(`/msgfeed/reply?platform=web&build=0&mobi_app=web`))
		.data.data.items[0]
}

export const getWbiParams = async (aid) => {
	const res = (await axios.get(`web-interface/view?aid=${aid}`)).data.data
	return {
		aid: res.aid,
		cid: res.cid,
		up_mid: res.owner.mid,
	}
}
export const getSummaryQuery = async (WbiParams) => {
	const res = await axios.get(`/web-interface/nav`)
	const {
		data: {
			wbi_img: { img_url, sub_url },
		},
	} = res.data

	const img_key = img_url.slice(
			img_url.lastIndexOf('/') + 1,
			img_url.lastIndexOf('.')
		),
		sub_key = sub_url.slice(
			sub_url.lastIndexOf('/') + 1,
			sub_url.lastIndexOf('.')
		)

	return encWbi(WbiParams, img_key, sub_key)
}

export const replyMsg = async (messageBody) => {
	return (await axios.post(`/v2/reply/add`, messageBody)).data
}

// 实际上，这个接口并不需要Cookie
export const getSummary = async (query) => {
	return (await axios.get(`/web-interface/view/conclusion/get?${query}`)).data
		.data.model_result
}
