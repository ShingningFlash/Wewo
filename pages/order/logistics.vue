<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white"  :isBack="true">
			<block slot="backText"></block>
			<block slot="content">物流信息</block>
		</cu-custom>
		<!-- 渐变背景图部分 -->
		<view class='UCenter-bg'></view>
		<view class="box1">
			<view class="item1">
				订单状态
			</view>
			<view class="item2">
				{{orderList.type_name}}
			</view>
			<view class="item3">
				订单编号：{{orderList.order_sn}}
			</view>
		</view>
		
		<view class="box2">
			<!-- <view class="" @click="crearteWeb">
				查看地图
			</view> -->
			<view class="title">
				物流信息
			</view>
			<u-steps current="0" dot direction="column" activeColor="#FD7B26">
				<u-steps-item :title="item.node_time" :desc="item.node_desc" v-for="(item,index) in wiliuList.list"
					:key="index">
				</u-steps-item>
				<!-- <u-steps-item title="已出库" desc="10:35"></u-steps-item>
				<u-steps-item title="运输中" desc="11:40"></u-steps-item> -->
			</u-steps>
			<view class="bottom">
				<view class="">
					运单号：{{wiliuList.Express_Num}}
				</view>
				<view class="">
					物流公司：{{wiliuList.ExpressName}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList:{},
				wiliuList:{
				}
			}
		},
		onLoad(e){
			this.orderList = JSON.parse(e.data)
			this.getWuliu(this.orderList.order_id)
		},
		methods: {
			getWuliu(id){
				let data = {}
				data.order_id = id
				this.$http.getWuliu(data).then(res=>{
					if(res.status==1){
						this.wiliuList = res.result.result
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.box2 {
		width: 690rpx;
		border-radius: 12rpx;
		background: #fff;
		margin: 0 auto;
		margin-top: 20rpx;
		padding: 30rpx;
		box-sizing: border-box;

		.title {
			font-weight: 700;
			font-size: 30rpx;
			color: #000;
			margin-bottom: 20rpx;
		}

		.bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-weight: 400;
			font-size: 26rpx;
			color: #787878;
		}
	}

	.box1 {
		width: 690rpx;
		border-radius: 12rpx;
		background: #fff;
		margin: 0 auto;
		margin-top: 20rpx;
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.item1 {
			font-weight: 400;
			font-size: 24rpx;
			color: #b1b1b1;
		}

		.item2 {
			font-size: 36rpx;
			color: #000;
			margin-top: 15rpx;
			font-family: "PingFang SC";
			font-weight: 400;
		}

		.item3 {
			font-family: "PingFang SC";
			font-weight: 400;
			font-size: 26rpx;
			color: #b1b1b1;
			margin-top: 20rpx;
		}
	}
</style>
