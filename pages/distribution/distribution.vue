<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-blues"  :isBack="true">
			<block slot="backText"></block>
			<block slot="content">分销订单</block>
		</cu-custom>
		<!-- 渐变背景图部分 -->
		<view class="background"></view>
		<view class="tab">
			<u-tabs activeStyle="font-size: 28rpx;font-family: PingFang SC;font-weight: 700;color:#FFF"
				inactiveStyle="font-weight: 400;color:#FFF;font-size:28rpx" lineWidth="28" lineHeight="4" :list="list1"
				itemStyle="padding-left: 18px; padding-right: 15px; height: 44px;" lineColor="#FFFFFF"
				:activeStyle="{color:'#FFFFFF'}" :current="type" @change="changeTab"></u-tabs>
		</view>
		<view class="list" v-for="(item,index) in dataList" :key="index">
			<view class="fen" v-if="item.order_status == 1">
				<view class="fen-item">
					预计佣金：{{item.money}}元
					<view class="sun">

					</view>
				</view>
			</view>
			<view class="fen redColor" v-if="item.status == 2">
				<view class="fen-item">
					预计佣金：{{item.money}}元
					<view class="sun">
			
					</view>
				</view>
			</view>
			<view class="fen redDColor" v-if="item.status == 3">
				<view class="fen-item">
					预计佣金：{{item.money}}元
					<view class="sun">
			
					</view>
				</view>
			</view>
			<view class="fen orangeColor" v-if="item.status == 4">
				<view class="fen-item">
					预计佣金：{{item.money}}元
					<view class="sun">
			
					</view>
				</view>
			</view>
			
			<view class="flex s-center">
				订单{{item.status_name}} <image src="/static/icons/type1.svg" style="width: 32rpx;height: 32rpx;margin-left:20rpx" mode=""></image>
			</view>
			<view class="flex" style="margin-top: 46rpx;">
				<image src="/static/icons/honor.svg" style="margin-right: 22rpx;width: 32rpx;height: 32rpx;"></image> {{item.level_name}}
			</view>
			<view class="flex" style="margin-top: 18rpx;">
				<image src="/static/icons/user.svg" style="margin-right: 22rpx;width: 32rpx;height: 32rpx;"></image> {{item.nickname}}
			</view>
			<view class="flex" style="margin-top: 18rpx;">
				<image src="/static/icons/order.svg" style="margin-right: 22rpx;width: 32rpx;height: 32rpx;"></image> {{item.order_sn}}
			</view>
			<view class="flex" style="margin-top: 18rpx;">
				<image src="/static/icons/time.svg" style="margin-right: 22rpx;width: 32rpx;height: 32rpx;"></image> {{item.create_time}}
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list1: [{
					name: '全部',
				}, {
					name: '待付款',
				}, {
					name: '已付款'
				}, {
					name: '已收货'
				}, {
					name: '已分成'
				}],
				type: 0 ,//当前栏,
				dataList:[]
			}
		},
		onLoad() {
			this.getRebateList()
		},
		methods: {
			// 获取订单
			getRebateList(){
				let data = {}
				if(this.type == 0){
					data.status = '-1'
				}
				else if(this.type == 1){
					data.status = 0
				}
				else if(this.type == 2){
					data.status = 1
				}
				else if(this.type == 3){
					data.status = 2
				}
				else{
					data.status = 4
				}
				
				
				this.$http.getRebateList(data).then(res=>{
					if(res.status == 1){
						this.dataList = res.result.rows
					}
					else{
						
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
					
				})
			},
			// 切换tab栏事件
			changeTab(index){
				console.log(index);
				this.type=index.index
				this.getRebateList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.background{
		position: absolute;
		z-index: 0;
		top:88px;
		width: 100%;
		height: 150rpx;
		background-color: #33629C;
		
		border-bottom-left-radius:86rpx;
	}
	.list {
		width: 690rpx;
		height: 341rpx;
		border-radius: 12rpx;
		background: #fff;
		margin: 0 auto;
		margin-top: 20rpx;
		position: relative;
		padding: 25rpx;
		box-sizing: border-box;
		.fen {
			padding: 0 15rpx;
			padding-left:30rpx;
			height: 50rpx;
			background: #f71;
			position: absolute;
			right: 0;
			top:20rpx;
			font-family: "PingFang SC Bold";
			font-weight: 700;
			font-size: 22rpx;
			text-align: center;
			color: #fff;
			line-height: 50rpx;

			&-item {
				position: relative;

				.sun {
					position: absolute;
					left: 20rpx;
					width: 0;
					height: 0;
					border-left: 15rpx solid #fff;
					border-top: 25rpx solid transparent;
					border-bottom: 25rpx solid transparent;
					top:0;
					left: -30rpx;
				}

			}

		}
		.redColor{
			background-color: #FF0000;
		}
		.redDColor{
			background-color: #FF7A7A;
		}
		.orangeColor{
			background-color: #FFBB00;
		}
	}
</style>