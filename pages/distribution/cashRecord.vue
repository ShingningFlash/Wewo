<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-bluesd"  :isBack="true" bg>
			<block slot="backText"></block>
			<block slot="content">提现记录</block>
		</cu-custom>
		<!-- 渐变背景图部分 -->
		<!-- <view class='UCenter-bg'></view> -->
		
		<view class="box">
			<view class="item flex m-between" v-for="(item,index) in  menberList" :key="index">
				<view class="flex ">
					<view class="flex flex-col m-center">
						<view class="name">
							{{item.account_name}}
						</view>
						<view class="phone">
							
							{{item.status_name}}
						</view>
					</view>
				</view>
				<view class="flex flex-col m-center">
					<view class="time">
						<text>￥</text>{{item.fee}}
					</view>
					<view class="level">
						<image style="width: 19rpx;height: 19rpx;margin-right: 5rpx;" src="/static/icons/time.svg" mode=""></image>
						{{item.add_at}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page:1,
				menberList:[{
					name:'佣金提现',
					phone:'账户：余额',
					add_time:'2023-08-31 10:55:00',
					price:'20'
				},
				{
					name:'佣金提现',
					phone:'账户：余额',
					add_time:'2023-08-31 10:55:00',
					price:'20'
				}]
			}
		},
		onLoad() {
			this.getWithdrawLog()
		},
		onReachBottom() {
			this.page++
			this.getWithdrawLog()
		},
		methods: {
			getWithdrawLog(){
				let data = {}
				data.page = this.page
				this.$http.getWithdrawLog().then(res=>{
					if(res.status == 1){
						if(this.page == 1){
							this.menberList = res.result.rows
						}
						else{
							this.menberList = this.menberList.concat(res.result.rows)
						}
						
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
	}
</script>

<style>
	page{
		background-color: #EBEBEB;
	}
</style>
<style lang="scss" scoped>
	.box{
		margin-top: 60rpx;
		.item{
			width: 690rpx;
			height: 145rpx;
			border-radius: 12rpx;
			background: #fff;
			margin:0 auto;
			padding: 28rpx 22rpx;
			box-sizing: border-box;
			margin-bottom:30rpx;
			.name{
				font-family: "PingFang SC Bold";
				font-weight: 700;
				font-size: 30rpx;
				color: #2a2a2a;
			}
			
			
			.phone{
				font-family: "PingFang SC";
				font-weight: 400;
				font-size: 26rpx;
				color: #9c9c9c;
				margin-top: 10rpx;
				
			}
			.time{
				color: #ff0000;
				 font-size: 32rpx;
				 text-align: right;
				 font-weight: 500;
				 letter-spacing: 0;
				 text{
					 font-size: 24rpx;
				 }
			}
			.level{
				margin-top:10rpx;
				font-family: "PingFang SC";
				font-weight: 400;
				font-size: 22rpx;
				text-align: right;
				color: #9c9c9c;
			}
		}
	}
</style>
