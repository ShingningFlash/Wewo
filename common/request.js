import config from "./config";  // 配置文件
import storage from "./storage"; // 缓存封装

export default {
	console(options){
		if(config.debug){
			console.log("<<===============================================>>");
			console.log("request start");
			console.log("header" + JSON.stringify(options.header));
			console.log("method: " + options.method + " URL: " + options.url);
			console.log(options.data);
			console.log("request end");
			console.log("<<===============================================>>");
		} 
	},
	domain(){
		return config.uni_app_web_api_url.replace("api","");
	},
	send(options={}){
		
			// loading加载
			// uni.showLoading({
			//    title: '加载中'
			// });
		
        
        
        // 拼接路劲，下面的配置文件会提到
		options.url = config.uni_app_web_api_url + '' + options.url;
        // 请求方式
		options.method = options.method || "GET";
		
        // 这里看项目的情况来定，如果是没有token，那就删除这里，上面的storage也不需要引入
		let users = uni.getStorageSync('token');
		
		if(users != ''){
			options.header = { "token" : users };
		}
		
		this.console(options);  // 打印请求数据，调试用，上线可以注释
        
        // 发起Promise请求
		return new Promise((resolve, reject) =>{
			uni.request(options).then(data=>{
				// uni.hideLoading()
				// console.log("data",data);
				if(data.statusCode == 200){
					if(data.data.status == 41001 || data.data.status== -2){
						uni.login({
							success: (res) => {
								let data = {}
								data.code = res.code
								uni.request({
									url:config.uni_app_web_api_url+'/mini/User/MiniCodeLogin',
									data:data,
									success: (res) => {
										uni.setStorageSync('openId', res.data.result.openid)
										uni.setStorageSync('token', res.data.result.token)
										
										// uni.showToast({
										// 	title:'请再重试',
										// 	icon:'none',
										// 	duration:2000
										// })
									}
								})
							}
						})
						
						
					}
					else{
						resolve(data.data)
					}
					
				}
				else{
					reject(data.data);
				}
				
			}).catch(err=>{
				console.log(err);
				uni.hideLoading()
			})
		});
	},
	get(url="",data={}){
		return this.send({
			url: url,
			data: data
		});
	},
	post(url="",data={}){
		return this.send({
			url: url,
			data: data,
			method: "POST"
		});
	}
};
