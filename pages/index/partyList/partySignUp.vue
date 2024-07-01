<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">聚会报名</block>
		</cu-custom>
		<view class="createBox">
			<view class="list flex s-center m-between" v-for="(item,index) in list" :key="item.id"
				@click="openShow(item.id)">
				<view class="flex s-center">
					<view class="key">
						{{item.key}}
					</view>
					<view class="value">
						<input v-model="item.name" type="text" :disabled="item.choose != 0"
							:placeholder="item.placeholder">
					</view>
				</view>
				<view class="upload bg-gradual-wineRed" v-if="item.choose == 2 && uploadUrl == ''" @click="upload">
					上传图片
				</view>
				<view class="upload flex m-around" v-if="item.choose == 2 && uploadUrl != ''">
					<view class="preview bg-gradual-wineRed" @click="perview">
						预览
					</view>
					<view class="change bg-gradual-wineRed" @click="upload">
						更换
					</view>
				</view>
				<image v-if="item.choose ==1" src="/static/icons/icon38.png" mode=""></image>
			</view>
			<view class="signUpBtn" @click="setActivityApplication">
				立即报名
			</view>
			
			<!-- 性别 -->
			<u-picker :immediateChange="true" :show="show" :columns="columns"  @cancel="show = false"
				@confirm="confirm"></u-picker>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				columns:[['男','女']],
				list: [{
						id: 1,
						key: '姓名',
						placeholder: '请填写您的姓名',
						choose: 0,
						name: ''

					},
					{
						id: 2,
						key: '性别',
						placeholder: '请选择您的性别',
						choose: 1,
						name: ''

					},
					{
						id: 3,
						key: '手机号码',
						placeholder: '请填写您的手机号码',
						choose: 0,
						name: ''

					},
				],
				id:1,
				activity_id:0 // 活动id
			}
		},
		onLoad(e){
			if(e.id){
				this.activity_id = e.id
			}
		},
		methods: {
			openShow(id){
				this.id = id
				if(id == 2){
					this.show = true
				}
			},
			confirm(e){
				this.list[this.id-1].name = e.value[0]
				this.show = false
			},
			// 活动报名
			setActivityApplication(){
				if(this.list[0].name == ''){
					return uni.showToast({
								title:'请填写您的姓名',
								icon:'none'
							})
				}
				if(this.list[1].name == ''){
					return uni.showToast({
								title:'请选择您的性别',
								icon:'none'
							})
				}
				if(this.list[2].name == ''){
					return uni.showToast({
								title:'请填写您的手机号码',
								icon:'none'
							})
				}
				uni.showModal({
					title:'提示',
					content:'确认报名吗？',
					success: (res) => {
						if(res.confirm){
							let data= {}
							data.name = this.list[0].name
							data.activity_id = this.activity_id
							if(this.list[1].name == '男'){
								data.sex = 1
							}
							else{
								data.sex = 2
							}
							data.phone = this.list[2].name
							this.$httpRequest({url:'setActivityApplication'},data).then(res=>{
								if(res.status == 1){
									uni.showToast({
										title:res.msg,
										icon:'none'
									})
									setTimeout(()=>{
										uni.navigateBack({
											delta:1
										})
									},2000)
								}
								else{
									uni.showToast({
										title:res.msg,
										icon:'none'
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
<style>
	page {
		background-color: #F1F1F1;
	}
</style>
<style scoped lang="scss">
.createBox {
		width: 690rpx;
		// height: 974rpx;
		border-radius: 12rpx;
		background: #fff;
		margin: 0 auto;
		margin-top: 30rpx;
		padding: 20rpx 20rpx;
		box-sizing: border-box;
		padding-bottom:50rpx;

		.list {
			padding: 38rpx 0;
			box-sizing: border-box;
			border-bottom: 1rpx solid #e3e3e3;

			.key {
				width: 120rpx;
				font-weight: 700;
				font-size: 28rpx;
				color: #000;

			}

			.value {
				font-weight: 400;
				font-size: 26rpx;
				margin-left: 36rpx;
			}

			image {
				width: 10rpx;
				height: 17rpx;
			}

			.upload {
				width: 183rpx;
				height: 53rpx;
				border-radius: 26.5rpx;
				line-height: 53rpx;
				text-align: center;
				font-weight: 400;
				font-size: 26rpx;
				color: #fff;

				&:active {
					background: lighten($color: #f02635, $amount: 10%);
				}

				.preview {
					border-radius: 16.5rpx;
					padding: 0 10rpx;
				}

				.change {
					border-radius: 16.5rpx;
					padding: 0 10rpx;
				}
			}
		}
	}
	
	.signUpBtn{
		width: 486rpx;
		height: 80rpx;
		border-radius: 40rpx;
		background: linear-gradient(180.00deg, #ec2432 0%, #cf0f1c 100%);
		margin: 0 auto;
		margin-top:50rpx;
		font-weight: 400;
		font-size: 30rpx;
		color: #fff;
		text-align: center;
		line-height: 80rpx;
		
		&:active{
			background: lighten($color: #ec2432, $amount: 10%);
		}
	}
</style>