import crypto from 'crypto'
import fs from 'fs'
import axios from 'axios'
import FormData from 'form-data'

class DocumentUpload {
	constructor(APPId, APISecret, timestamp) {
		this.APPId = APPId
		this.APISecret = APISecret
		this.Timestamp = timestamp
	}

	getOriginSignature() {
		const data = this.APPId + this.Timestamp
		console.log(`data:`, data)
		const hash = crypto.createHash('md5').update(data).digest()
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
			// ...formData.getHeaders(),
			appId: this.APPId,
			timestamp: this.Timestamp,
			signature: signature,
		}
		console.log(`headers:`, headers)
		return headers
	}

	async uploadDocument() {
		const formData = new FormData()
		formData.append('file', fs.createReadStream('src/axios/背影.txt'))
		formData.append('url', '')
		formData.append('fileName', '背影.txt')
		formData.append('fileType', 'wiki')
		formData.append('needSummary', 'false')
		formData.append('stepByStep', 'false')
		formData.append('callbackUrl', 'your_callbackUrl')

		const headers = this.getHeader(formData)

		try {
			const response = await axios.post(
				'https://chatdoc.xfyun.cn/openapi/v1/file/upload',
				formData,
				{ headers }
			)
			console.log('Response:', response.data)
		} catch (error) {
			// console.error('Error:', error)
		}
	}
}

// 添加自己的APPId、APISecret
const APPId = 'd0e47256'
const APISecret = 'e71a93f37ccb8a4b9517f907c06f5523'
const curTime = Math.floor(Date.now() / 1000).toString()

const documentUpload = new DocumentUpload(APPId, APISecret, curTime)
documentUpload.uploadDocument()
