<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white"  :isBack="true">
			<block slot="backText"></block>
			<block slot="content">退换货</block>
		</cu-custom>
		<view class="box1" v-if="OrderInfo != ''">
			
			<view class="top" style="" v-for="(items,indexs) in OrderInfo.goods_list" :key="indexs"
				@click="navTo('/pages/order/orderDetail?id='+item.order_id)">
				<view class="left_item">
					<u--image :showLoading="true" :src="items.original_img" width="178rpx" height="178rpx">
					</u--image>
				</view>
				<view class="right_item">
					<view class="">
						<view class="name">
							<view class="title">
								{{items.goods_name}}
							</view>
							<view class="num">
								x{{items.goods_num}}
							</view>
						</view>
						<view class="guige">
							规格：{{items.spec_key_name}}
						</view>
					</view>
					<view class="price" v-if="type != 6 ">
						<text class="text">￥</text>{{items.goods_price}} 
						<!-- <text class="priceD">￥{{items.goods_price}}</text> -->
							
					</view>
					<view class="price" v-if="type == 6">
						<text class="text">￥</text>{{items.final_price}} <text
							class="priceD">￥{{items.goods_price}}</text>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="list_item">
					<view class="head">订单编号</view>
					<view class="code" style="font-weight: 600;">{{OrderInfo.order_sn}}</view>
				</view>

				<view class="list_item">
					<view class="head">订单日期</view>
					<view class="code">{{OrderInfo.add_time}}</view>
				</view>
			</view>
			<!--  -->
			<view class="lineinfo">
				共{{OrderInfo.goods_list.length}}件商品

				<text class="text1">总计：</text>
				<text class="text2" v-if="type != 6 "><text>￥</text>{{OrderInfo.order_amount}}</text>
				<text class="text2" v-if="type == 6 "><text>￥</text>{{OrderInfo.refund_money}}</text>
			</view>


		</view>

		<view class="box2">
			<view class="title">
				选择服务类型
			</view>
			<view class="item" @click="goDetail(0)">
				<view class="leftBox">
					<u--image src="/static/icons/back1.png" width="50rpx" height="50rpx">
					</u--image>
					<view class="text">
						<view>我要退款（无需退货）</view>
						<view class="mark">没收到货，或与卖家协商同意不用退货只退款</view>
					</view>
				</view>
				<view class="rightBox">
					>
				</view>
			</view>
			<view class="item" @click="goDetail(1)">
				<view class="leftBox">
					<u--image src="/static/icons/back2.png" width="50rpx" height="50rpx">
					</u--image>
					<view class="text">
						<view>我要退货退款</view>
						<view class="mark">已收到货，需要退还收到的货物</view>
					</view>
				</view>
				<view class="rightBox">
					>
				</view>
			</view>
			<view class="item" @click="goDetail(2)">
				<view class="leftBox">
					<u--image src="/static/icons/back3.png" width="50rpx" height="50rpx">
					</u--image>
					<view class="text">
						<view>我要换货</view>
						<view class="mark">已收到货，需要更换收到的货物</view>
					</view>
				</view>
				<view class="rightBox">
					>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				OrderInfo: '',
				deorder: '',
				orderList: [],
			}
		},
		onLoad(e) {
			this.OrderInfo = JSON.parse(e.data)
			// this.OrderGoodsList()
		},
		methods: {
			OrderGoodsList() {
				let data = {}
				data.order_id = this.OrderInfo.order_id
				this.$httpRequest({
					url: 'OrderGoodsList'
				}, data).then(res => {
					console.log(res);
					if (res.status == 1) {
						this.deorder = res
					}

				})
			},
			goDetail(type) {
				uni.navigateTo({
					url: '/pages/order/exchangeDetail?data=' + JSON.stringify(this.OrderInfo) + '&type=' + type
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box2 {
		width: 690rpx;
		// height: 483rpx;
		border-radius: 12rpx;
		background: #fff;
		padding: 30rpx;
		box-sizing: border-box;
		margin: 0 auto;
		margin-top: 20rpx;

		.title {
			font-weight: 700;
			font-size: 30rpx;
			color: #000;
		}

		.item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-top: 45rpx;

			.leftBox {
				display: flex;
				align-items: center;

				.text {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					font-weight: 400;
					font-size: 26rpx;
					color: #000;
					margin-left: 20rpx;

					.mark {
						font-weight: 400;
						font-size: 20rpx;
						color: #b8b8b8;
					}
				}
			}
		}
	}

	.box1 {
		width: 690rpx;
		// height: 708rpx;
		border-radius: 12rpx;
		background: #fff;
		margin: 0 auto;
		margin-top: 30rpx;
		padding: 25rpx 25rpx 25rpx 25rpx;
		box-sizing: border-box;

		.status {
			.image {
				width: 36rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}

			.shopName {
				font-family: "PingFang SC Heavy";
				font-weight: 900;
				font-size: 30rpx;
				text-align: center;
				color: #000;
			}

			.statusName {
				width: 115rpx;
				height: 42rpx;
				border-radius: 5rpx;
				background: #ffc1c1;
				text-align: center;
				line-height: 42rpx;
				font-family: "PingFang SC";
				font-weight: 400;
				font-size: 26rpx;
				color: #f00;
			}
		}

		.top {
			display: flex;
			justify-content: space-between;

			padding: 30rpx 0;
			border-bottom: 1rpx solid #e1e1e1;

		}

		.list {

			padding-bottom: 30rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #e1e1e1;

			.list_item {
				display: flex;
				justify-content: space-between;
				margin-top: 18rpx;

				.head {
					font-weight: 400;
					font-size: 28rpx;
					color: #707070;
				}

				.code {
					font-weight: 400;
					font-size: 26rpx;
					color: #000;
					font-family: "PingFang SC";
				}

			}

		}

		.lineinfo {
			font-weight: 400;
			font-size: 24rpx;
			color: #9a9a9a;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			margin-top: 20rpx;

			.text1 {
				font-weight: 400;
				font-size: 26rpx;
				color: #000;
				margin-left: 20rpx;
			}

			.text2 {
				font-family: "DIN Medium";
				font-weight: 500;
				font-size: 40rpx;
				color: #FF0000;

				text {
					font-size: 26rpx;
				}
			}
		}

		.btns {
			display: flex;
			justify-content: flex-end;
			margin-top: 40rpx;
			gap: 20rpx;

			.btn_one {
				width: 189rpx;
				height: 60rpx;
				border-radius: 30rpx;
				border: 1rpx solid #000000;
				line-height: 60rpx;
				text-align: center;
				font-size: 26rpx;
				color: #000000;
				font-weight: 700;

				&:active {
					background: lighten($color: #000000, $amount: 90%);
				}
			}

			.btn_two {
				width: 189rpx;
				height: 60rpx;
				border-radius: 30rpx;
				background: #FA4B43;
				line-height: 60rpx;
				text-align: center;
				font-size: 26rpx;
				color: #fff;
				font-weight: 700;

				&:active {
					background: lighten($color: #FA4B43, $amount: 10%)
				}
			}
		}

		.left_item {}

		.right_item {
			width: 438rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.name {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.title {
					font-family: "PingFang SC Bold";
					font-weight: 700;
					font-size: 30rpx;
					color: #2a2a2a;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}

				.num {
					font-weight: 400;
					font-size: 26rpx;
					color: #000;
				}
			}

			.guige {
				font-weight: 400;
				font-size: 26rpx;
				color: #bebebe;
				margin-top: 10rpx;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.price {
				font-weight: 700;
				font-size: 36rpx;
				color: #FF0000;

				.text {
					font-size: 26rpx;
					font-weight: 400;

				}

				.priceD {
					font-family: "PingFang SC";
					font-weight: 400;
					font-size: 24rpx;
					color: #000;
					margin-left: 13rpx;
					text-decoration: line-through;
				}
			}

		}
	}
</style>