<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">订单详情</block>
		</cu-custom>
		<view class="TimeBox" v-if="orderList.order_status == 0">

			<view class="flex" style="align-items: inherit;">
				<u-icon name="clock-fill" color="#f79e03" size="26"></u-icon>
				<view class="" style="margin-left:20rpx;margin-top:10rpx">
					<view style="font-size: 28rpx;">
						<text style="color: 000;font-weight: bold;">{{orderList.status_name}}</text>
						<text style="color: #ff0000;margin-left:10rpx">￥{{orderList.order_amount}}</text>
					</view>
					<view style="color: #B0B0B0;font-size: 22rpx;">
						<u-count-down :time="countdownTime" format="DD:HH:mm:ss" autoStart millisecond
							@change="onChange">
							<view class="time">
								<text class="time__item">{{ timeData.days }}&nbsp;天</text>
								<text
									class="time__item">{{ timeData.hours>10?timeData.hours:'0'+timeData.hours}}&nbsp;时</text>
								<text class="time__item">{{ timeData.minutes }}&nbsp;分</text>
								<text class="time__item">{{ timeData.seconds }}&nbsp;秒</text>
							</view>
						</u-count-down>
					</view>

				</view>
			</view>
			<view class="flex" style="align-items: inherit;margin-top:30rpx">
				<u-icon name="map" color="#000000"></u-icon>
				<view class="" style="margin-left:20rpx;margin-top:10rpx">
					<view><text style="color: 000;font-weight: bold;">{{orderList.user_info.consignee}}</text> <text
							style="color: #000;margin-left:10rpx">{{orderList.user_info.mobile}}</text></view>
					<view style="color: #B0B0B0;font-size: 22rpx;">
						收货地址：{{orderList.user_info.address}}
					</view>

				</view>
			</view>
		</view>
		<view class="box1" v-if="orderList != ''">

			<view class="top" style="" v-for="(items,indexs) in orderList.goods_list" :key="indexs"
				@click="navTo('/pageB/order/orderDetail?id='+item.order_id)">
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
						<text class="text">￥</text>{{items.final_price}}
						<!-- <text class="priceD">￥{{items.goods_price}}</text> -->
					</view>
				</view>
			</view>
			<view class="list">
				<view class="list_item">
					<view class="head">订单编号</view>
					<view class="code" style="font-weight: 600;">{{orderList.order_sn}}</view>
				</view>
				<view class="list_item">
					<view class="head">订单状态</view>
					<view class="code" style="font-weight: 600;">{{orderList.status_name}}</view>
				</view>
				<view class="list_item">
					<view class="head">订单日期</view>
					<view class="code">{{orderList.add_time}}</view>
				</view>
			</view>
			<!--  -->
			<view class="lineinfo" v-if="orderList != '' && orderList">
				共{{orderList.goods_list.length}}件商品

				<text class="text1">总计：</text>
				<text class="text2" v-if="type != 6 "><text>￥</text>{{orderList.order_amount}}</text>
				<text class="text2" v-if="type == 6 "><text>￥</text>{{orderList.refund_money}}</text>
			</view>
			<view class="btns">
				<view class="btn_one" v-if="orderList.type >= 3 && orderList.type < 5" @click="lookwuliu(orderList)">
					查看物流</view>
				<view class="btn_one" v-if="item.type == 5 && item.order_status == 3"
					@click="removeOrder(item.order_id)">
					删除订单</view>
				<view class="btn_one" @click="cancelOrder(orderList.order_id)" v-if="orderList.type == 1">取消订单</view>
				<view class="btn_two" v-if="orderList.type == 1" @click="paynow(orderList.order_id)">
					立即支付
				</view>
				<view class="btn_one" v-if="orderList.type >= 2 && orderList.type < 4" @click="goEx(orderList)">申请售后
				</view>
				<navigator url="/pages/order/ReturnList" class="btn_two" v-if="orderList.type == 6">查看进度</navigator>
				<view class="btn_two" @click="UserOrderAffirm(orderList.order_id)" v-if="orderList.type == 3">确认收货
				</view>
				<!-- <view class="btn_two" @click="GoEvaluate(orderList)" v-if="orderList.type == 4">去评价</view> -->
			</view>

		</view>

		<!-- <view class="box2" v-if="orderList.order_status == 6">
			<view class="title">
				退换货
			</view>
			<view class="list">
				<view class="list_item">
					<view class="head">退换货状态</view>
					<view class="code" v-if="refund.status == 0">{{refund.status_name}}</view>
					<view class="code" v-if="refund.status == 1">{{refund.status_name}}</view>
					<view class="code" v-if="refund.status == 2">待卖家确认</view>
					<view class="code" v-if="refund.status == 3">待卖家退款</view>
					<view class="code" v-if="refund.status == 4">{{refund.status_name}}</view>
					<view class="code" v-if="refund.status == 5">{{refund.status_name}}</view>
				</view>
				
			</view>
		</view> -->
		<!-- <view class="box2" v-if="orderList.order_status == 6 && refund.status == 1">
			<view class="title">
				审核通过请填写物流信息
			</view>
			<view class="list">
				<view class="list_item">
					<view class="head">物流名称</view>
					<input type="text" class="code" placeholder="请输入物流名称" style="text-align: right;" v-model="express_name">
				</view>
				<view class="list_item">
					<view class="head">物流号</view>
					<input type="text" class="code" placeholder="请输入物流号" style="text-align: right;" v-model="express_sn">
					
				</view>
				<view class="btn" @click="backExpress">
					提交
				</view>
			</view>
		</view> -->

		<view class="box2" v-if="orderList.order_status != 0">
			<view class="title flex s-center m-between">
				客户信息

			</view>
			<view class="list">
				<view class="list_item">
					<view class="head">发货时间</view>
					<view class="code">{{orderList.user_info.shipping_time}}</view>
				</view>
				<view class="list_item">
					<view class="head">收货人</view>
					<view class="code">{{orderList.user_info.consignee}}</view>
				</view>
				<view class="list_item">
					<view class="head">手机号</view>
					<view class="code">{{orderList.user_info.mobile}}</view>
				</view>
				<view class="list_item">
					<view class="head">地址</view>
					<view class="code">{{orderList.user_info.address}}</view>
				</view>
				<view class="list_item">
					<view class="head">物流公司</view>
					<view class="code">{{orderList.user_info.shipping_name}}</view>
				</view>
				<view class="list_item">
					<view class="head">物流单号</view>
					<view class="code">{{orderList.user_info.express_sn}}</view>
				</view>
			</view>
		</view>

		<view class="box2">
			<view class="title">
				订单信息
			</view>
			<view class="list">
				<view class="list_item">
					<view class="head">订单编号</view>
					<view class="code">{{orderList.order_sn}}</view>
				</view>
				<view class="list_item">
					<view class="head">下单时间</view>
					<view class="code">{{orderList.add_time}}</view>
				</view>
				<view class="list_item">
					<view class="head">订单状态</view>
					<view class="code">{{orderList.status_name}}</view>
				</view>
				<view class="list_item">
					<view class="head">配送费</view>
					<view class="code">{{orderList.order_info.shipping_price}}</view>
				</view>
				<view class="list_item">
					<view class="head">支付状态</view>
					<view class="code">{{orderList.order_info.pay_status_name}}</view>
				</view>
				<view class="list_item">
					<view class="head">订单备注</view>
					<view class="code">{{orderList.order_info.user_note}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList: {},
				refund: {},
				targetDate: '',
				updateInterval: null,
				timeData: {}

			}
		},
		computed: {
			countdownTime() {
				if (this.targetDate != '') {
					const orderCreateTimeString = this.targetDate; // 订单创建时间的字符串，替换为实际的订单创建时间
					const orderCreateTime = new Date(orderCreateTimeString);

					// 计算订单过期时间（24小时后）
					const orderExpireTime = new Date(orderCreateTime.getTime() + 24 * 60 * 60 * 1000);

					// 计算当前时间距离订单过期时间的毫秒数
					const timeDifference = orderExpireTime - new Date();

					// 添加条件判断，满足条件时返回倒计时毫秒数，否则返回 0
					if (timeDifference > 0) {
						return timeDifference;
					} else {
						return 0;
					}
				}

			},
		},
		onLoad(e) {


			if (e.id) {
				this.getUserOrderInfo(e.id)
				// this.getUserRefundOrderInfo(e.id)
			}

		},

		methods: {
			onChange(e) {
				this.timeData = e
			},
			removeOrder(id) {
				uni.showModal({
					title: '提示',
					content: '是否删除订单？',
					success: (res) => {
						if (res.confirm) {
							let data = {}
							data.order_id = id
							this.$http.setUserOrderDel(data).then(res => {
								if (res.status == 1) {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
									setTimeout(() => {
										this.page = 1
										this.getGoodsCatLsit()
									}, 800)
								}

							})
						}
					}
				})
			},
			lookwuliu(data) {
				uni.navigateTo({
					url: '/pages/order/logistics?data=' + JSON.stringify(data)
				})
			},
			paynow(id) {
				let orderid = id
				let datas = {
					order_id: orderid,
					order_type: 1,
					user_id: uni.getStorageSync('user_id'),
					openid: uni.getStorageSync('openId')
					// openid: uni.getStorageSync('openid')

				}

				this.$http.MiniPayOrder(datas).then(res2 => {

					if (res2.status) {
						if (res2.status == 1) {
							if (res2.payinfo.data) {
								let results = res2.payinfo.data



								adapayPlugin.requestPay(results, this.paySuccess, this.payError)
							} else {
								uni.showToast({
									title: res2.payinfo.msg,
									icon: 'none',
									duration: 2000
								})
							}



						}
					} else {
						let regx = res2.replace(/https:\/\/page\.adapay\.tech\/v1\/wxpay\/createOrder/, '')

						let result = JSON.parse(regx)
						if (result.status == 1) {
							if (result.payinfo.data) {
								let results = result.payinfo.data



								adapayPlugin.requestPay(results, this.paySuccess, this.payError)
							} else {
								uni.showToast({
									title: result.payinfo.msg,
									icon: 'none',
									duration: 2000
								})
							}



						}
					}




				})
			},
			paySuccess(res) {
				console.log(res);

				uni.showToast({
					title: '支付成功',
					icon: 'none'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1000)
				// uni.removeStorageSync('addressObj')

			},
			payError(err) {
				console.log(err);
				uni.showToast({
					title: '支付失败',
					icon: 'none'
				})
			},
			cancelOrder(id) {
				uni.showModal({
					title: '提示',
					content: '是否取消订单？',
					success: (res) => {
						if (res.confirm) {
							let data = {}
							data.order_id = id
							this.$http.setAllOrderOut(data).then(res => {
								if (res.status == 1) {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
									setTimeout(() => {
										this.page = 1
										this.getGoodsCatLsit()
									}, 800)
								}

							})
						}
					}
				})
			},
			UserOrderAffirm(id) {
				uni.showModal({
					title: '提示',
					content: '是否确认收货？',
					success: (res) => {
						if (res.confirm) {
							let data = {}
							data.order_id = id
							this.$http.setUserOrderAffirm(data).then(res => {
								if (res.status == 1) {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
									setTimeout(() => {
										uni.navigateBack()
									}, 800)
								}

							})
						}
					}
				})
			},
			getUserOrderInfo(id) {
				let data = {}
				data.order_id = id
				this.$http.getUserOrderInfo(data).then(res => {
					if (res.status == 1) {
						this.orderList = res.result
						this.targetDate = res.result.order_info.add_time
					}
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.TimeBox {
		width: 690rpx;
		background-color: #fff;
		margin: 0 auto;
		margin-top: 20rpx;
		padding: 25rpx;

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
				background: #33629C;
				line-height: 60rpx;
				text-align: center;
				font-size: 26rpx;
				color: #fff;
				font-weight: 700;

				&:active {
					background: lighten($color: #33629C, $amount: 10%)
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

	.box2 {
		width: 690rpx;
		// height: 483rpx;
		border-radius: 12rpx;
		background: #fff;
		margin: 0 auto;
		margin-top: 30rpx;
		padding: 30rpx;
		box-sizing: border-box;

		.btn {
			width: 189rpx;
			height: 60rpx;
			border-radius: 30rpx;
			background: #A10B11;
			line-height: 60rpx;
			text-align: center;
			font-size: 26rpx;
			color: #fff;
		}

		.title {
			font-weight: 700;
			font-size: 30rpx;
			color: #000;

			.navBtn {
				width: 172.51rpx;
				height: 50.4rpx;
				background: #33629C;
				font-family: "PingFang SC";
				font-weight: 400;
				font-size: 26rpx;
				color: #fff;
				border-radius: 30rpx;

				image {
					width: 25rpx;
					height: 25rpx;
					margin-right: 10rpx;
				}
			}
		}

		.list {


			box-sizing: border-box;

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
					max-width: 470rpx;
				}
			}

		}
	}
</style>