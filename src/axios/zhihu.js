import axios from 'axios'

const cookie =
	'_zap=bc1d6d3c-7fda-4e1f-98fb-430b16491041; _xsrf=c0c8cbc7-13d8-4d9f-ba67-6c1482f4148d; Hm_lvt_98beee57fd2ef70ccdd5ca52b9740c49=1715607805,1715758298; d_c0=AHBdPijenhiPThx1ecZYF9husenzG8eZRNg; captcha_session_v2=2|1:0|10:1715758298|18:captcha_session_v2|88:ZEJuRDN6NmpTZmNVakh5U1IwRVQydmxYWmJ5Y1R0S2lWUUh1Q2ZrWmhKd1Q1REFKVWM0ZlZtbkdmWUEwcmhXNw; SESSIONID=DoIu7vFTyPxbDxz7DGEEx6IiO38g7kb9dihVexuxrn5; JOID=UF4XA0jkTjpzrZ9BQeZrKpYQhGBVpCVxBZvtAxecGkYT6uY_cj4sfxeon0dA1yTXtHwOh0Mdxn5rl_B1MQolxxc; osd=U1gdAE3nSDBwqJxHS-VuKZAah2VWoi9yAJjrCRSZGUAZ6eM8dDQvehSulURF1CLdt3kNgUkew31tnfNwMgwvxBI; __snaker__id=cTLC90RXgFth7sQ5; gdxidpyhxdE=GsbjYopxuWm9XQZyA7bACUYW60QEAsnosyWU7hBYQ%5C%5CHO%2BtySGgtf5w4AcA8DVv2zmBK5M3ym%5CwTW2BdaY7GpwEqJoblA45Ddd5DfmNktJPtSCw9KeQ%2FdybGZteOr9R7gGN364kfnVOnB%2B4abMKvJr7sr6ZH2zyE%2BIABCRi%2BLK5A%2Bla1%3A1715759199325; o_act=login; ref_source=other_https://www.zhihu.com/signin?next; expire_in=15552000; q_c1=12a0bfa9b081452badecd38f1c9b9913|1715758309000|1715758309000; BEC=f3a75d7265fd269b7c515e5c94175904; tst=f; z_c0=2|1:0|10:1715759040|4:z_c0|92:Mi4xS25rZUdnQUFBQUFBY0YwLUtONmVHQmNBQUFCZ0FsVk41Ykl4WndEWTBneWhaRjEteG5YREk4Q2prVzd3YjM3RkJB|9846f801964a69696da2256785061d7750e41f8d5661fc5c2b924303e559814b; Hm_lpvt_98beee57fd2ef70ccdd5ca52b9740c49=1715759403; KLBRSID=ca494ee5d16b14b649673c122ff27291|1715759404|1715758296'

var config = {
	method: 'get',
	url: 'https://www.zhihu.com/api/v4/comment_v5/articles/689886030/root_comment?order_by=score&limit=20&offset=',
	headers: {
		priority: 'u=1, i',
		'x-requested-with': 'fetch',
		'x-zse-93': '101_3_3.0',
		'x-zse-96':
			'2.0_6loN=BvLw06oplR8CbVhTHAK=/LeNPSX04mI8JR7o1hMqV5xSFQ0v+e2szF355dX',
		Cookie: cookie,
		Accept: '*/*',
		Host: 'www.zhihu.com',
		Connection: 'keep-alive',
	},
}

axios(config)
	.then(function (response) {
		console.log(JSON.stringify(response.data))
	})
	.catch(function (error) {
		console.log(error)
	})
