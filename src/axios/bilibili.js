import { APPId, APISecret } from './config.js'
import {
	getReply,
	getWbiParams,
	getSummaryQuery,
	getSummary,
} from './bilibiliAPI.js'
import { writeFile } from './utils.js'
import DocumentUpload from './upload.js'

export async function bilibiliInfo() {
	const oneReply = await getReply()
	const { item: replyItem } = oneReply
	const { subject_id: aid, root_id, source_id, source_content } = replyItem

	const WbiParam = await getWbiParams(aid)
	const summaryQuery = await getSummaryQuery(WbiParam)
	const summary = await getSummary(summaryQuery)
	const path = 'uploadFile/'
	const name = `${aid}.txt`
	writeFile(path, name, JSON.stringify(summary))

	// Spark Document Q&A
	const curTime = Math.floor(Date.now() / 1000).toString()
	const documentUpload = new DocumentUpload(
		APPId,
		APISecret,
		curTime,
		path + name
	)
	const fileId = (await documentUpload.uploadDocument()).data.fileId

	return {
		aid,
		root_id,
		source_id,
		fileId,
		source_content,
	}
}
