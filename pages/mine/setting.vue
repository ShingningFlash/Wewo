<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-blues" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">个人资料</block>
		</cu-custom>
		<!-- 蓝色背景 -->
		<view class="background"></view>
		<view class="content">
			<u-cell-group>
				<button open-type="chooseAvatar" @chooseavatar="chooseavatar">
					<u-cell title="头像">
						<template #value>
							<view class="u-slot-value">
								<u-image :src="userInfo.head_pic" shape="circle" width="100rpx" height="100rpx"></u-image>
							</view>
						</template>
					</u-cell>
			
				</button>
				<u-cell title="姓名">
					<template #value>
						<view class="u-slot-value">
							<input type="text" v-model="userInfo.real_name" placeholder="请填写姓名" style="text-align: right;">
						</view>
							
					</template>
				</u-cell>
				<u-cell title="昵称">
					<template #value>
						<view class="u-slot-value">
							<input @change="change" type="nickname" v-model="userInfo.nickname" placeholder="请填写昵称"
								style="text-align: right;">
						</view>
			
					</template>
				</u-cell>
				<u-cell title="身份证" v-if="is_vip != 0">
					<template #value>
						<view class="u-slot-value">
							<input  type="idcard" v-model="userInfo.cert_id" placeholder="请填写身份证号"
								style="text-align: right;">
						</view>
							
					</template>
				</u-cell>
				
				<u-cell title="手机号">
					<template #value>
						<view class="u-slot-value">
							<input  type="number" v-model="userInfo.mobile" placeholder="请填写手机号码"
								style="text-align: right;">
							
						</view>
					</template>
				</u-cell>
				<u-cell title="必须实名" v-if="is_vip != 0">
					<template #value>
						<view class="u-slot-value">
							<text style="text-align: right;">{{userInfo.member_id != '' ? '是' : '否'}}</text>
							<!-- <input  type="number" v-model="userInfo.member_id" placeholder="请填写手机号码"
								style="text-align: right;"> -->
							
						</view>
					</template>
				</u-cell>
				
			</u-cell-group>
		</view>
		<view class="createBtn" @click="save">
			确认并保存
		</view>
	</view>
</template>

<script>
	import config from "@/common/config"; 
	export default {
		data() {
			return {
				userInfo:{},
				config:config,
				is_vip:0
			}
		},
		onLoad() {
			this.getUserData()
			if(uni.getStorageSync('is_vip')){
				this.is_vip = uni.getStorageSync('is_vip')
			}
		},
		methods: {
			change(e){
				console.log(e);
				this.userInfo.nickname = e.detail.value
			},
			// 获取个人资料
			getUserData(){
				this.$http.getUserInfo().then(res=>{
					this.userInfo = res.result
				})
				
			},
			chooseavatar(e){
				var that = this
				uni.showLoading({
					title:'请求中',
					mask:true
				})
				uni.uploadFile({
					url: config.uni_app_web_api_url+'/mini/ApiConnect/UploadRefundPic',
					filePath: e.detail.avatarUrl,
					name: 'refund_pic',
					header:{
						token:uni.getStorageSync('token')
					},
					
					success(res2) {
						uni.hideLoading()
						
						if (JSON.parse(res2.data).img_url) {
							that.userInfo.head_pic = (JSON.parse(res2.data).img_url)
							uni.showToast({
								title: '上传成功',
								icon: 'none'
							})
						} else {
							uni.showToast({
								title: '请求出错',
								icon: "none",
								duration: 2000
							});
						}
					}
				});
				
				
				
			},
			save(){
				uni.showModal({
					title:'提示',
					content:'确认保存吗',
					success: (res) => {
						if(res.confirm){
							let data ={}
							data = this.userInfo
							
							this.$http.setHandleUserInfo(data).then(res=>{
								if (res.status == 1) {
									uni.showToast({
										title: res.msg,
										icon: 'none',
										duration:2000
									})
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none',
										duration:2000
									})
								}
							})
							
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	button::after {
		border: none;
	}
	
	button {
		width: 100%;
		padding: 0;
		text-align: left;
		background: #fff;
	
	}
	
	.button-hover {
		background: #fff;
	}
// 蓝色背景
	.background {
		position: fixed;
		width: 100%;
		height: 200rpx;
		z-index: -1;
		background: #33629C;
	}
	.content{
		width: 690rpx;
		// height: 607rpx;
		border-radius: 12rpx;
		background: #fff;
		margin: 0 auto;
		margin-top: 20rpx;
	}
	.createBtn{
			width: 690rpx;
			height:90rpx; 
			text-align: center;
			line-height: 90rpx;
			font-weight: 400;
			font-size: 30rpx;
			color: #fff;
			border-radius: 45rpx;
			position: fixed;
			z-index: 2;
			bottom: 90rpx;
			left:50%;
			transform: translateX(-50%);
			box-shadow: 0 17px 40px #68686838;
			background: #33629C;
			&:active{
				background: lighten($color: #33629C, $amount: 10%)
			}
		}
</style>
