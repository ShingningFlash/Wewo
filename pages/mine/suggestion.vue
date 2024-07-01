<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">意见反馈</block>
		</cu-custom>
		<view class="content">
			<u--textarea style="width: 628rpx;height: 274rpx;background: #F6F6F6;" v-model="content"
				placeholder="请描述您遇到的相关问题 (必填)"></u--textarea>
				<view class="" style="margin-top:55rpx;font-size: 36rpx;">
					上传图片（{{fileList1.length}}/3）
				</view>
			<view class="width:620rpx;margin:0 auto;margin-top:30rpx;">
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple
					:maxCount="3"></u-upload>
			</view>
			<view class="" style="margin-top:55rpx;font-size: 36rpx;">
				联系电话
			</view>
			<view class="phone flex s-center">
				<input type="number" v-model="phone" placeholder="请输入联系方式，更好的解决问题"/>
			</view>
		</view>
		<view class="createBtn" @click="save">
			确认并保存
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: '',
				fileList1: [],
				phone:'',
				imgs:[]
			}
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					console.log(result);
					let item = this[`fileList${event.name}`][fileListLen]
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
			},
			save(){
				let data ={}
				if(this.content == ''){
					return uni.showToast({
						title:'请输入内容',
						icon:'none'
					})
				}
				if(this.phone == ''){
					return uni.showToast({
						title:'请输入联系方式',
						icon:'none'
					})
				}
				
				this.fileList1.forEach((item=>{
					if(item.url){
						this.imgs.push(item.url)
					}
				}))
				data.content = this.content
				data.imgs = this.imgs
				data.phone = this.phone
				this.$http.setHandleFeedback(data).then(res=>{
					if(res.status == 1){
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
					else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'https://wwsc.ydlweb.com/mini/ApiConnect/UploadRefundPic', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'refund_pic',
						header:{
							token:uni.getStorageSync('token')
						},
						success: (res) => {
							
							setTimeout(() => {
								resolve(JSON.parse(res.data).img_url)
							}, 1000)
						}
					});
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #EEEEEE;
	}
</style>
<style lang="scss" scoped>
	.content {
		width: 690rpx;
		height: 935rpx;
		background: #fff;
		margin: 26rpx auto;
		padding: 30rpx;
		box-sizing: border-box;
		.phone{
			width: 628rpx;
			height: 88rpx;
			border-radius: 15rpx;
			background: #f6f6f6;
			padding:0 30rpx;
			
		}
	}
	
	.createBtn {
		width: 690rpx;
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
		font-weight: 400;
		font-size: 30rpx;
		color: #fff;
		border-radius: 45rpx;
		position: fixed;
		z-index: 2;
		bottom: 90rpx;
		left: 50%;
		transform: translateX(-50%);
		box-shadow: 0 17px 40px #68686838;
		background: #33629C;
	
		&:active {
			background: lighten($color: #33629C, $amount: 10%)
		}
	}
</style>