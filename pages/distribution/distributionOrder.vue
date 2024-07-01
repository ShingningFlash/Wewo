<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-bluesd"  :isBack="true">
			<block slot="backText"></block>
			<block slot="content">我的分销</block>
		</cu-custom>
		<!-- 渐变背景图部分 -->
		<view class="background"></view>
		<view class="top_bg">
			<image src="/static/icons/topBg.png"></image>
			<view class="flex m-between s-center">
				<view class="name">
					多邀多得
				</view>
				<button open-type="share" class="text" >
					立即分享>>
				</button>
			</view>
			<view class="code">
				我的邀请码  {{dataList.distribut_code}}
			</view>
		</view>
		
		<view class="content"> 
			<view class="flex s-center m-between" @click="share">
				<view class="flex s-center">
					<image class="money" src="/static/icons/money.png"></image>
					<view class="title">
						我的佣金
					</view>
				</view>
				<view class="flex s-center"  >
					<view class="time">
						推广海报 >
					</view>
					
				</view>
			</view>
			<view class="heng"></view>
			<view class="box1">
				总佣金（元）
			</view>
			<view class="box2">
				{{dataList.distribut_money}}
			</view>
			<view class="flex m-around " style="margin-top:54rpx;align-items: baseline;">
				<view class="">
					<view class="one">
						可提现佣金（元）
					</view>
					<view class="two">
						{{dataList.distribut_money_can}}
					</view>
				</view>
				<view class="">
					<view class="one">
						不可提现佣金（元）
					</view>
					<view class="two2">
						{{dataList.distribut_money_no_can}}
					</view>
					<view class="two2" style="font-size: 27rpx;text-align: left">
						待客户确认签收
					</view>
					<view class="two2" style="font-size: 27rpx;text-align: left">
						或15天自动签收
					</view>
					
				</view>
			</view>
			<view class="btns flex m-center" style="margin-bottom:20rpx;">
				<view class="btn1" @click="navTo('/pages/distribution/withdraw?data='+JSON.stringify(dataList))">提现</view>
				<view class="btn2" @click="navTo('/pages/distribution/cashRecord')">
					提现记录
				</view>
			</view>
			<u-notice-bar  text="温馨提示：提现金额会在下一个工作日的上午12点前转到您银行卡（周六．日．法定节假日）不在工作日内！"></u-notice-bar>
			<view class="heng" style="margin-top:62rpx">
				
			</view>
			<view class="box3">
				<view class="item1" @click="navTo('/pages/distribution/distribution')">
					分销订单
				</view>
				<view class="item2" @click="navTo('/pages/mine/myTeam')">
					我的粉丝
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:{
					distribut_code:'000',
					distribut_money:0,
					distribut_money_can:0,
					distribut_money_no_can:0
				}
			}
		},
		onShow() {
			this.distributeCenter()
		},
		onShareAppMessage() {
			return{
				title:'立即分享',
				path:'/pages/index/index'
			}
		},
		methods: {
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
			
			 share(){
				this.$utils.showLoading()
				this.$http.getUserInfo().then(res=>{
					if(res.status == 1){
						this.$utils.hideLoading()
						if(res.result.member_id == ''){
							return uni.showModal({
								title:'提示',
								content:'请求前往个人中心实名认证',
								success: (res) => {
									if(res.confirm){
										uni.navigateTo({
											url:'/pages/mine/setting'
										})
									}
								}
							})
						}
						this.$utils.showLoading('正在获取海报...')
						this.$http.getSharePoster().then(res=>{
							if(res.status == 1){
								
								uni.downloadFile({
									url: res.result.poster, //图片服务器地址
									success: (resd) => {
										this.$utils.hideLoading()
										uni.showShareImageMenu({
											path: resd.tempFilePath, //转为本地地址showShareImageMenu进行分享
											success: (res) => {
												
												// this.modalShare = null;
											},
											fail: (err) => {
												
												// this.modalShare = null;
											},
										});
									},
								})
							}
							else{
								
								uni.showToast({
									title:res.msg,
									icon:'none'
								})
							}
							
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
			distributeCenter(){
				this.$http.distributeCenter().then(res=>{
					if(res.status == 1){
						this.dataList = res.result
					}
					else{
						
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
					
				})
			}
		},
		
		
	}
</script>
<style>
	page{
		background: linear-gradient(180.00deg, #71a8eb 0%, #33629c 100%);
	}
	button::after {
		border: none;
	}
	
	button {
		margin: 0;
		padding: 0;
		text-align: left;
		background: transparent;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		line-height: 40rpx;
		margin-top: 5rpx;
	
	}
	
	.button-hover {
		background:transparent;
	}
</style>
<style lang="scss" scoped>
	.background{
		position: absolute;
		z-index: 0;
		top:88px;
		width: 100%;
		// height: 150rpx;
		background-color: #33629C;
		
		// border-bottom-left-radius:86rpx;
	}
	.one{
		font-family: "PingFang SC";
		font-weight: 400;
		font-size: 24rpx;
		color: #818181;
		text-align: center;
	}
	.two{
		color: #ff0000;
		 font-size: 42rpx;
		 font-weight: 500;
		 text-align: center;
		 margin-top:10rpx;
	}
	.two2{
		color: #999999;
		 font-size: 42rpx;
		 font-weight: 500;
		 text-align: center;
		 margin-top:10rpx;
	}
.top_bg{
	width: 750rpx;
	height: 140rpx;
	position: relative;
	image{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: -1;
		left:0;
		top:0;
	}
	background-size: 100% 100%;
	padding: 25rpx 30rpx;
	box-sizing: border-box;
	.name{
		font-family: "PingFang SC Bold";
		font-weight: 700;
		font-size: 32rpx;
		color: #fff;
	}
	.text{
		font-family: "PingFang SC";
		font-weight: 400;
		font-size: 24rpx;
		color: #fff;
	}
	.code{
		font-family: "PingFang SC";
		font-weight: 400;
		font-size: 26rpx;
		color: #fff;
		margin-top: 6rpx;
	}
}
.content{
	width: 690rpx;
	// height: 602rpx;
	border-radius: 20rpx;
	background: #fff;
	margin: 0 auto;
	margin-top: 28rpx;
	padding: 44rpx 30rpx;
	box-sizing: border-box;
	.money{
		width: 30rpx;
		height: 35rpx;
	}
	.down{
		width:17rpx;
		height:12rpx;
	}
	.title{
		font-family: "PingFang SC Bold";
		font-weight: 700;
		font-size: 30rpx;
		color: #000;
		margin-left:14rpx;
	}
	.time{
		font-family: "PingFang SC Bold";
		font-weight: 700;
		font-size: 26rpx;
		color: #000;
		margin-right:10rpx;
	}
	.heng{
		width: 100%;
		height: 1rpx;
		background-color: #DFDFDF;
		margin-top: 46rpx;
	}
	.box1{
		font-family: "PingFang SC";
		font-weight: 400;
		font-size: 30rpx;
		text-align: center;
		color: #818181;
		margin-top:62rpx;
	}
	.box2{
		 color: #ff0000;
		 font-size: 60rpx;
		 font-weight: 700;
		 letter-spacing: 0;
		 text-align: center;
		 margin-top:20rpx;
	}
	.btns{
		margin-top:58rpx;
		.btn1,.btn2{
			width: 205rpx;
			height: 63rpx;
			border-radius: 31.5rpx;
			background: #fa4b43;
			text-align: center;
			line-height: 63rpx;
			font-family: "PingFang SC";
			font-weight: 400;
			font-size: 28rpx;
			color: #fff;
			&:active{
				background: lighten($color: #fa4b43, $amount: 10%);
			}
		}
		.btn2{
			background: #fab743;
			margin-left:35rpx;
			&:active{
				background: lighten($color:#fab743, $amount: 10%);
			}
		}
	}
	
	.box3{
		display: grid;
		grid-template-columns: repeat(2,1fr);
		text-align: center;
		.item1,.item2{
			padding: 30rpx 0;
		}
		.item1{
			position: relative;
			&::after{
				content: '';
				position: absolute;
				width: 1rpx;
				height: 77rpx;
				background-color: #D4D4D4;
				right: 0;
				top:50%;
				transform: translateY(-50%);
			}
		}
	}
}
</style>
