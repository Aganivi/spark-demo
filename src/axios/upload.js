import crypto from 'crypto'
import fs from 'fs'
import axios from 'axios'
import FormData from 'form-data'
// import { APPId, APISecret } from './config.js'

export default class DocumentUpload {
	constructor(APPId, APISecret, timestamp, filePath) {
		this.APPId = APPId
		this.APISecret = APISecret
		this.Timestamp = timestamp
		this.filePath = filePath
		this.instant = axios.create()
	}

	getOriginSignature() {
		const data = this.APPId + this.Timestamp
		const hash = crypto.createHash('md5').update(data).digest('hex')
		return hash
	}

	getSignature() {
		const signatureOrigin = this.getOriginSignature()
		const signature = crypto
			.createHmac('sha1', this.APISecret)
			.update(signatureOrigin)
			.digest('base64')
		return signature
	}

	getHeader(formData) {
		const signature = this.getSignature()
		const headers = {
			...formData.getHeaders(),
			appId: this.APPId,
			timestamp: this.Timestamp,
			signature: signature,
		}
		return headers
	}

	async uploadDocument() {
		const formData = new FormData()
		formData.append('file', fs.createReadStream(this.filePath))
		formData.append('url', '')
		formData.append('fileName', '')
		formData.append('fileType', 'wiki')
		formData.append('needSummary', 'false')
		formData.append('stepByStep', 'false')
		formData.append('callbackUrl', '')

		const headers = this.getHeader(formData)
		try {
			const response = await this.instant.post(
				'https://chatdoc.xfyun.cn/openapi/v1/file/upload',
				formData,
				{ headers }
			)
			return response.data
		} catch (error) {
			console.error('Error:', error)
		}
	}
}

// 示例
// const curTime = Math.floor(Date.now() / 1000).toString()

// const documentUpload = new DocumentUpload(APPId, APISecret, curTime)

// const fileId = (await documentUpload.uploadDocument()).data.fileId

// console.log(`fileId:`, fileId)
