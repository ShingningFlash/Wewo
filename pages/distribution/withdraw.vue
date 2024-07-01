<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-blues" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">佣金提现</block>
		</cu-custom>
		<!-- 渐变背景图部分 -->
		<view class='background' style="height: 195rpx;"></view>
		<view class="content">
			<view class="sum">
				总佣金（元）
			</view>
			<view class="sum_num">
				{{dataList.distribut_money}}
			</view>
			
			<view class="flex m-between s-center" style="padding: 0 47rpx;margin-top:39rpx;margin-bottom: 62rpx;text-align: center;">
				<view class="left" style="font-size: 24rpx;color: #818181;">
					可提现佣金（元）
					<view class="" style="font-size: 30rpx;color:#FF0000;margin-top:12rpx">
						{{dataList.distribut_money_can}}
					</view>
				</view>
				<view class="right" style="font-size: 24rpx;color: #818181;">
					不可提现佣金（元）
					<view class="" style="font-size: 30rpx;color:#FF0000;margin-top:12rpx">
						{{dataList.distribut_money_no_can}}
					</view>
				</view>
			</view>
			<view style="wr">
				提现金额
			</view>
			<view class="inputs flex s-center m-between" >
				<view class="flex s-center">
					<text style="margin-right: 13rpx;">￥</text>
					<input type="number" placeholder="请输入提现金额" v-model="price">
				</view>
				<view class="all" @click="all">
					全部提现
				</view>
				
			</view>
			<view class="annotation">
				<text>温馨提示：</text>提现金额会在下一个工作日的上午11点前转到您银行卡（周六．日．法定节假日）不在工作日内！
			</view>
		</view>
		<view class="createBtn" @click="withdraw">
			立即提现
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price:0,
				dataList:{}
			}
		},
		onLoad(e) {
			this.dataList = JSON.parse(e.data)
		},
		methods: {
			// 全部提现赋值
			all(){
				this.price = this.dataList.distribut_money_can
			},
			// 立即提现
			withdraw(){
				uni.showModal({
					title:'提示',
					content:'是否立即提现？',
					success: (res) => {
						if(res.confirm){
							let data = {}
							data.fee = this.price
							this.$http.setwithdrawApply(data).then(res=>{
								if(res.status == 1){
									uni.showToast({
										title:res.msg,
										icon:'none',
										duration:2000
									})
								}
								else{
									uni.showToast({
										title:res.msg,
										icon:'none',
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
	.background{
		position: absolute;
		z-index: -1;
		top:88px;
		width: 100%;
		// height: 150rpx;
		background-color: #33629C;
		
		border-bottom-left-radius:86rpx;
	}
.content{
	width: 690rpx;
	
	border-radius: 12rpx;
	background: #fff;
	margin: 0 auto;
	margin-top:20rpx;
	padding: 0 37rpx;
	box-sizing: border-box;
	padding-top:56rpx;
	padding-bottom: 80rpx;
	.sum{
		font-family: "PingFang SC";
		font-weight: 400;
		font-size: 26rpx;
		text-align: center;
		color: #818181;
	}
	.sum_num{
		 font-size: 48rpx;
		 font-weight: 700;
		 letter-spacing: 0;
		 margin-top:18rpx;
		 text-align: center;
		 color:#FF0000;
	}
	.wr{
		font-family: "PingFang SC";
		font-weight: 400;
		font-size: 28rpx;
		text-align: left;
		color: #000;
	}
	.inputs{
		padding:20rpx 0;
		border-bottom: 1rpx solid #DEDEDE;
	}
	.all{
		font-family: "PingFang SC";
		font-weight: 400;
		font-size: 26rpx;
		color:#FF7711;
	}
	.annotation{
		color: #757575;
		 font-size: 22rpx;
		 font-family: 'PingFang SC',sans-serif;
		 font-weight: 400;
		 letter-spacing: 0;
		 margin-top:28rpx;
		 text{
			 color:#FF002B;
		 }
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
		background: linear-gradient(179.00deg, #33629C 0%, #3466a2 100%);

		&:active {
			background: lighten($color: #33629C, $amount: 10%)
		}
	}
</style>
