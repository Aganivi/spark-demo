import qs from 'qs'
import { bili_jct, APPId, APISecret } from './config.js'
import {
	getReply,
	getWbiParams,
	getSummaryQuery,
	getSummary,
	replyMsg,
} from './bilibiliAPI.js'
import DocumentUpload from './upload.js'

async function bilibiliInfo() {
	const oneReply = await getReply()
	const { item: replyItem } = oneReply
	const { subject_id: aid, root_id, source_id, source_content } = replyItem

	const WbiParam = await getWbiParams(aid)
	const summaryQuery = await getSummaryQuery(WbiParam)
	const summary = await getSummary(summaryQuery)

	const documentUpload = new DocumentUpload(APPId, APISecret, curTime, summary)

	// const fileId = (await documentUpload.uploadDocument()).data.fileId
	// console.log(`fileId:`, fileId)

	// const messageBody = qs.stringify({
	// 	oid: aid,
	// 	type: '1',
	// 	message: '',
	// 	root: root_id !== 0 ? root_id : source_id,
	// 	parent: source_id,
	// 	jsonp: 'jsonp',
	// 	scene: 'msg',
	// 	plat: '1',
	// 	from: 'im-reply',
	// 	build: '0',
	// 	mobi_app: 'web',
	// 	csrf_token: bili_jct,
	// 	csrf: bili_jct,
	// })
	// await replyMsg(messageBody)

	return {
		summary,
		userId,
		source_content,
	}
}

bilibiliInfo()
