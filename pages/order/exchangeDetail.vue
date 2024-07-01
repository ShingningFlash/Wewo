<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">退货详情</block>
		</cu-custom>

		<view class="box1" v-if="OrderInfo != ''">

			<view class="top" style="" v-for="(items,indexs) in OrderInfo.goods_list" :key="indexs"
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
						<text class="text">￥</text>{{items.goods_price}} <text
							class="priceD">￥{{items.goods_price}}</text>
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
				退货信息
			</view>
			<view class="item">
				<view class="leftBox">
					<view>货物状态<text>*</text></view>
				</view>
				<view class="rightBox">
					<input type="text" placeholder="请选择货物状态" style="text-align: right;" v-model="goodstatus" disabled
						@click="show2 = true">
				</view>
			</view>
			<view class="item">
				<view class="leftBox">
					<view>退款原因<text>*</text></view>
				</view>
				<view class="rightBox">
					<input type="text" placeholder="请选择退款原因" style="text-align: right;" v-model="reason" disabled
						@click="show = true">
				</view>
			</view>
			<view class="item">
				<view class="leftBox">
					<view>退款金额</view>
				</view>
				<view class="rightBox">
					<view>
						￥{{OrderInfo.order_amount}}
					</view>

				</view>
			</view>
		</view>

		<view class="box3">
			<view class="title">
				补充描述和凭证
			</view>
			<view class="textare">
				<textarea style="height: 200rpx;" name="" id="" cols="30" rows="10" v-model="describe"
					placeholder="请输入您的评价"></textarea>

				<view class="upload" @click="chooseImage" v-if="uploadsrc == ''">
					<u--image :showLoading="true" src="/static/icons/upload.png" width="38.36rpx" height="34.36rpx">
					</u--image>
					<text>添加照片</text>
				</view>
				<view class="upload" v-else @click="chooseImage">
					<u--image :showLoading="true" :src="uploadsrc" width="116rpx" height="116rpx"></u--image>
				</view>


			</view>
		</view>
		<view class="btn" @click="post">
			提交申请
		</view>
		<u-picker :show="show" :columns="columns" :immediateChange="true" @confirm="confirm" keyName="name"
			@cancel="show =false"></u-picker>
		<u-picker :show="show2" :columns="columns2" :immediateChange="true" @confirm="confirm2" keyName="name"
			@cancel="show2 =false"></u-picker>
	</view>
</template>

<script>
	import config from "@/common/config";
	export default {
		data() {
			return {
				config: config,
				columns: [],
				columns2: [],
				reasonId: '',
				show: false,
				show2: false,
				OrderInfo: '',
				refund_type: '',
				reason: '', //问题原因
				describe: '', //问题描述
				refund_imgs: '',
				uploadsrc: '',
				goodstatus: '',
				goods_status: ''
			}
		},
		onLoad(e) {
			this.refund_type = e.type
			this.OrderInfo = JSON.parse(e.data)
			this.getSelectOpts()

		},
		methods: {
			confirm2(e) {
				this.goods_status = e.value[0].id
				this.goodstatus = e.value[0].name
				this.show2 = false
			},
			confirm(e) {
				this.reasonId = e.value[0].id
				this.reason = e.value[0].name
				this.show = false
			},
			getSelectOpts() {
				this.$http.getSelectOpts().then(res => {

					if (res.status == 1) {
						let data = []
						data.push(res.result.return_cause)

						this.columns = (data)
						data = []
						data.push(res.result.cargo_status)
						this.columns2 = (data)
					}
				})
			},
			// 提交申请
			post() {
				uni.showModal({
					title: '提示',
					content: '是否提交申请',
					success: (res) => {
						if (res.confirm) {
							let data = {}
							data.refund_type = this.refund_type

							data.goods_status = this.goods_status
							data.order_id = this.OrderInfo.order_id
							data.reason = this.reasonId
							data.describe = this.describe
							data.refund_imgs = this.uploadsrc
							this.$http.setHandleOrderRefund(data).then(res => {
								if (res.status == 1) {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
									uni.navigateBack()

								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								}


							})
						}
					}
				})
			},

			// 上传图片
			chooseImage() {
				var that = this
				uni.chooseImage({
					count: 1,
					success: (res) => {

						if (res.errMsg == "chooseImage:ok") {
							this.uploadUrl = res.tempFilePaths[0]
							uni.uploadFile({
								url: config.uni_app_web_api_url + '/mini/ApiConnect/UploadRefundPic',
								filePath: res.tempFilePaths[0],
								name: 'refund_pic',
								header: {
									token: uni.getStorageSync('tokens')
								},

								success(res2) {
									that.uploadsrc = (JSON.parse(res2.data).img_url)
									// that.list[4].name = (JSON.parse(res2.data).result.img)
									uni.showToast({
										title: '上传成功',
										icon: 'none'
									})

								}
							});

						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.btn {
		width: 690rpx;
		height: 90rpx;
		border-radius: 45rpx;
		background: linear-gradient(179.00deg, #f97f78 0%, #f8342a 100%);
		margin: 0 auto;
		margin-top: 30rpx;
		text-align: center;
		line-height: 90rpx;
		font-weight: 400;
		font-size: 30rpx;
		color: #fff;
	}

	.box3 {
		width: 690rpx;
		// height: 463px;
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

		.textare {
			// width: 690rpx;
			// height: 300rpx;
			margin: 0 auto;
			margin-top: 36rpx;
			padding: 30rpx;
			box-sizing: border-box;
			border-radius: 15rpx;
			background: #f5f5f5;

			.upload {
				width: 116rpx;
				height: 116rpx;
				border-radius: 10rpx;
				border: 1rpx solid #ccc;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				text {
					font-weight: 400;
					font-size: 20rpx;
					color: #7a7a7a;
					margin-top: 10rpx;
				}
			}

		}
	}

	.box2 {
		width: 690rpx;
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
				color: rgba(0, 0, 0, 1);
				font-size: 26rpx;
				font-weight: 400;
				letter-spacing: 0;

				text {
					color: #FF0000;
				}
			}

			.rightBox {

				view {
					font-weight: 400;
					font-size: 28rpx;
					color: #f00;
				}

				text {
					font-weight: 400;
					font-size: 22rpx;
					color: #b8b8b8;
					margin-right: 18rpx;
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