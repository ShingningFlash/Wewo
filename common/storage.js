export default {
	// 设置值到本地存储
	set(name,value){
		uni.setStorageSync(name,value);
	},
	// 将 JSON 对象以字符串形式设置到本地存储
	setJson(name,value){
		uni.setStorageSync(name,JSON.stringify(value));
	},
	// 从本地存储获取值
	get(name){
		return uni.getStorageSync(name);
	},
	// 从本地存储获取 JSON 对象
	getJson(name){
		const content = uni.getStorageSync(name);
		if(!content){
			return null;
		}
		return JSON.parse(content);
	},
	// 从本地存储移除值
	remove(name){
		uni.removeStorageSync(name);
	},
	// 清空本地存储的所有值
	clear(){
		uni.clearStorageSync();
	}
};
