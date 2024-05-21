import axios from 'axios'

const url = 'https://api.bilibili.com/x/web-interface/view/conclusion/get'

const aid = '1552943357'
const cid = '1499458194'
const up_mid = '15516023'
const w_rid = '09c14c38e73c14ca0ebaba1a8cd8c31b'
const wts = '1716286064'
const params = `?aid=${aid}&cid=${cid}&up_mid=${up_mid}&wts=${wts}&w_rid=${w_rid}`

const getSummary = async () => {
	const res = await axios.get(url + params)
	console.log(`res:`, res.data)
}

await getSummary()
