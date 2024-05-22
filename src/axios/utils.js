import md5 from 'md5'

const mixinKeyEncTab = [
	46, 47, 18, 2, 53, 8, 23, 32, 15, 50, 10, 31, 58, 3, 45, 35, 27, 43, 5, 49,
	33, 9, 42, 19, 29, 28, 14, 39, 12, 38, 41, 13, 37, 48, 7, 16, 24, 55, 40, 61,
	26, 17, 0, 1, 60, 51, 30, 4, 22, 25, 54, 21, 56, 59, 6, 63, 57, 62, 11, 36,
	20, 34, 44, 52,
]

const getMixinKey = (orig) =>
	mixinKeyEncTab
		.map((n) => orig[n])
		.join('')
		.slice(0, 32)

// 为请求参数进行 wbi 签名
export function encWbi(WbiParams, img_key, sub_key) {
	const mixin_key = getMixinKey(img_key + sub_key),
		curr_time = Math.round(Date.now() / 1000),
		chr_filter = /[!'()*]/g

	const summaryParams = {
		...WbiParams,
		wts: curr_time,
	}
	// 按照 key 重排参数
	const query = Object.keys(summaryParams)
		.sort()
		.map((key) => {
			// 过滤 value 中的 "!'()*" 字符
			const value = summaryParams[key].toString().replace(chr_filter, '')
			return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
		})
		.join('&')
	const wbi_sign = md5(query + mixin_key) // 计算 w_rid

	return query + '&w_rid=' + wbi_sign
}
