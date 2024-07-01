<template>
	<view>
		<!-- 背景图 -->
		<view class="mine-bg"></view>
		<cu-custom bgColor="transparent" :isBack="false">
			<block slot="backText"></block>
			<block slot="content"></block>
		</cu-custom>
		<!-- 顶部内容 -->
		<view class="avatar flex m-between s-center " @click="navTo('/pages/mine/setting')">
			<view class="flex s-center">

				<image style="border-radius: 50%;" :src="userInfo.head_pic" class="avatarImage"></image>
				<!-- v-if="isLogin" -->
				<view class="ava-text">
					<view class="nickName">{{userInfo.nickname}}</view>
					<view class="acountName">账号名：{{userInfo.mobile}}</view>
				</view>
				<!-- <view class="" @tap.stop="getOpen" v-else>
					<button class="login-btn">
						登录
					</button>
				</view> -->

			</view>
			<u-icon name="arrow-right"></u-icon>
		</view>
		<view class="collect flex m-between s-center">
			<view class="left-box" @click="navTo('/pages/mine/myCollect')">
				<view class="text1">
					{{userInfo.goods_collect}}
				</view>
				<view class="text2">
					商品收藏
				</view>
			</view>
			<view class="right-box" @click="navTo('/pages/mine/browsing')">
				<view class="text1">
					{{userInfo.goods_visit}}
				</view>
				<view class="text2">
					浏览记录
				</view>
			</view>
		</view>
		<view class="tool">
			<view class="flex m-between s-center">
				<view class="name">我的订单</view>
				<view class="lookAll" @click="navTo('/pages/order/order?type=0')">查看全部>></view>
			</view>
			<view class="tool-item">
				<u-grid :border="false" :col="5" style="padding-top: 20rpx;" const>
					<u-grid-item v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
						@click="navTo(baseListItem.url)" style="position: relative;padding-top: 20rpx;">


						<u-badge type="error" max="99" bgColor="#ff0000" :value="baseListItem.num" :offset="[-7,7]" :absolute="true" v-if="baseListIndex == 0 || baseListIndex == 1 || baseListIndex == 2"></u-badge>
						<image :style="{width:baseListItem.width,height:baseListItem.height}"
							:src="baseListItem.iconUrl"></image>
						<text class="grid-text">{{baseListItem.name}}</text>

					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<view class="tool2">
			<view class="flex m-between s-center">
				<view class="name">更多服务</view>

			</view>
			<view class="tool-item">
				<u-grid :border="false" :col="4">
					<u-grid-item @click="navTo('/pages/distribution/distributionOrder')" v-if="userInfo.is_vip != 0">
						<view class="flex flex-col s-center m-center">
							<image style="width: 51.88rpx;height:46.99rpx;margin-top: 34rpx;"
								src="/static/icons/icon23.png"></image>
							<text class="grid-text">我的分销</text>
						</view>
					</u-grid-item>
					<u-grid-item @click="navTo('/pages/mine/myTeam')" v-if="userInfo.is_vip != 0">
						<view class="flex flex-col s-center m-center">
							<image style="width: 50.12rpx;height:42.3rpx;margin-top: 34rpx;"
								src="/static/icons/icon19.png"></image>
							<text class="grid-text">我的粉丝</text>
						</view>

					</u-grid-item>
					<u-grid-item @click="navTo('/pages/mine/address/address')">
						<view class="flex flex-col s-center m-center">
							<image style="width: 38.57rpx;height:41rpx;margin-top: 34rpx;"
								src="/static/icons/icon12.png"></image>
							<text class="grid-text">地址信息</text>
						</view>

					</u-grid-item>
					<u-grid-item @click="navTo('/pages/mine/bindList')" v-if="userInfo.is_vip != 0">
						<view class="flex flex-col s-center m-center">
							<image style="width: 38.57rpx;height:41rpx;margin-top: 34rpx;"
								src="/static/icons/icon12.png"></image>
							<text class="grid-text">银行卡</text>
						</view>

					</u-grid-item>
					<u-grid-item>
						<button open-type="contact">
							<image style="width: 41.52rpx;height:40.15rpx;margin-top: 34rpx;"
								src="/static/icons/icon18.png"></image>
							<text class="grid-text" style="font-size: 26rpx;">客服</text>
						</button>



					</u-grid-item>
					<u-grid-item @click="navTo('/pages/mine/suggestion')">
						<view class="flex flex-col s-center m-center">
							<image style="width: 38.06rpx;height:40.39rpx;margin-top: 34rpx;"
								src="/static/icons/icon21.png"></image>
							<text class="grid-text">意见反馈</text>
						</view>



					</u-grid-item>
					<u-grid-item @click="navTo('/pages/mine/aboutUs')">
						<view class="flex flex-col s-center m-center">
							<image style="width: 47.73rpx;height:41.05rpx;margin-top: 34rpx;"
								src="/static/icons/icon20.png"></image>
							<text class="grid-text">关于我们</text>
						</view>



					</u-grid-item>


				</u-grid>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin: false,
				// 工具栏
				baseList: [{
						name: '待付款',
						iconUrl: '/static/icons/icon15.png',
						width: '42.45rpx',
						height: '41.96rpx',
						url: '/pages/order/order?type=1',
						num:0
					},
					{
						name: '待发货',
						iconUrl: '/static/icons/icon14.png',
						width: '41.05rpx',
						height: '41.05rpx',
						url: '/pages/order/order?type=2',
						num:0
					},
					{
						name: '待收货',
						iconUrl: '/static/icons/icon16.png',
						width: '54.49rpx',
						height: '41.05rpx',
						url: '/pages/order/order?type=3',
						num:0
					},
					{
						name: '已完成',
						iconUrl: '/static/icons/icon13.png',
						width: '37.02rpx',
						height: '39.67rpx',
						url: '/pages/order/order?type=4',
						num:0
					},
					{
						name: '退款/售后',
						iconUrl: '/static/icons/icon22.png',
						width: '46.89rpx',
						height: '42.2rpx',
						url: '/pages/order/ReturnList',
						num:0
					},
				],

				userInfo: {
					goods_collect: 0,
					goods_visit: 0
				}
			}

		},
		onLoad(e) {
			// this.getCode()
			uni.login({
				success: (res) => {
					let data = {}
					data.code = res.code
					this.$http.MiniCodeLogin(data).then((res) => {
							uni.setStorageSync('openId', res.result.openid)
							uni.setStorageSync('token', res.result.token)

							this.getInfo()
						})
						.catch((error) => {
							uni.showToast({
								title: "请求错误，请重试~",
								icon: "none",
								duration: 2000,
							});
						});


				}
			})



		},
		onShow() {
			this.getInfo()
			this.getOrderNum()

		},
		methods: {
			getOrderNum() {
				this.$http.getOrderNum().then(res => {
					if (res.status == 1) {
						this.baseList[0].num = res.result.obligation
						this.baseList[1].num = res.result.shipped
						this.baseList[2].num = res.result.received
						this.baseList[3].num = res.result.completed
						this.baseList[4].num = res.result.return
					} else {
						
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}

				})
			},
			getInfo() {
				this.$http.getUserInfo().then(res => {
					if (res.status == 1) {
						this.userInfo = res.result
						uni.setStorageSync('user_id', res.result.user_id)
						uni.setStorageSync('is_vip', res.result.is_vip)
					} else {
						this.isLogin = false
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}

				})
			},
			getOpen() {
				uni.showModal({
					title: '提示',
					content: '是否登录？',
					success: (res) => {
						if (res.confirm) {
							uni.login({
								success: (res) => {
									let data = {}
									data.code = res.code
									this.$http.MiniCodeLogin(data).then((res) => {
											uni.setStorageSync('openId', res.result.openid)
											uni.setStorageSync('token', res.result.token)
											this.isLogin = true
											this.getInfo()
										})
										.catch((error) => {
											uni.showToast({
												title: "请求错误，请重试~",
												icon: "none",
												duration: 2000,
											});
										});


								}
							})
						}
					}
				})



			},
			// 验证登录
			getphonenumber(e) {
				console.log(e);
				if (e.detail.errMsg == 'getPhoneNumber:ok') {
					let data = {}
					data.openid = uni.getStorageSync('openId')
					data.iv = e.detail.iv
					data.encryptedData = e.detail.encryptedData
					uni.showLoading({
						title: '请求中',
						icon: 'none'
					})
					this.$httpRequest({
						url: 'getUserMobile'
					}, data).then(res => {
						if (res.status == 1) {
							uni.setStorageSync('phoneNumber', res.data.phoneNumber)

							let data2 = {}
							data2.openid = uni.getStorageSync('openId')

							data2.mobile = res.data.phoneNumber
							data2.distribut_code = this.form.distribut_code
							this.$httpRequest({
								url: 'login'
							}, data2).then(res2 => {
								uni.hideLoading()
								if (res2.status == 1) {
									uni.setStorageSync('user_id', res2.result.user_id)

									uni.reLaunch({
										url: '/pages/index/index'
									})
								}
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
				}


			},
			loadData() {
				this.$http.getBannerList().then((res) => {

					})
					.catch((error) => {
						uni.showToast({
							title: "请求错误，请重试~",
							icon: "none",
							duration: 2000,
						});
					});

			},
			navTo(url) {
				if (url != '') {
					uni.navigateTo({
						url: url
					})
				}


			},
			getCode() {
				uni.login({
					success: (res) => {

						this.$http.MiniCodeLogin({
								code: res.code
							}).then((res) => {
								console.log("res", res);
							})
							.catch((error) => {
								uni.showToast({
									title: "请求错误，请重试~",
									icon: "none",
									duration: 2000,
								});
							});
					}
				})
			}
		}
	}
</script>
<style>
	.u-grid{
		padding-top: 20rpx;
	}
	button::after {
		border: none;
	}

	button {
		margin: 0;
		padding: 0;
		text-align: left;
		background: #fff;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		line-height: 40rpx;
		margin-top: 5rpx;

	}

	.button-hover {
		background: #fff;
	}

	page {
		background-color: #F2F4F5;
	}

	/* 去掉背景色和内外边距 */
	button {
		margin: 0;
		padding: 0;
		background-color: inherit;
		position: static;
	}

	button:after {
		content: none;
	}

	/* 去掉边框 */
	button::after {
		border: none;
	}
</style>
<style scoped lang="scss">
	.mine-bg {
		width: 100%;
		height: 543rpx;
		background: url(/static/icons/icon11.png) no-repeat center/cover;
		position: absolute;
		top: 0;
		z-index: -1;
	}

	.avatar {
		padding: 0 33rpx;

		.avatarImage {
			width: 110rpx;
			height: 110rpx;
		}

		.login-btn {
			padding: 0rpx 30rpx;
			text-align: center;
			border: 1rpx solid #000;
			// color: #000;
			margin-left: 27rpx;
			border-radius: 15rpx;

		}

		.ava-text {
			margin-left: 27rpx;

			.nickName {
				font-family: "PingFang SC Medium";
				font-weight: 500;
				font-size: 36rpx;
				color: #111;
			}

			.acountName {
				font-family: "PingFang SC";
				font-weight: 400;
				font-size: 24rpx;
				color: #333;
			}
		}
	}

	.collect {
		margin-top: 33rpx;
		text-align: center;
		padding: 0 175rpx;

		.text1 {
			font-family: "PingFang SC Medium";
			font-weight: 500;
			font-size: 42rpx;
			color: #333;
		}

		.text2 {
			font-family: "PingFang SC";
			font-weight: 400;
			font-size: 32rpx;

			color: #333;
		}
	}

	.tool {
		width: 690rpx;
		height: 260.3rpx;
		border-radius: 23rpx;
		background: #fff;
		margin: 0 auto;
		margin-top: 33rpx;
		padding: 35rpx 30rpx;

		.name {
			font-family: "PingFang SC Bold";
			font-weight: 700;
			font-size: 32rpx;
			color: #333;
		}

		.lookAll {
			font-family: "PingFang SC";
			font-weight: 400;
			font-size: 24rpx;
			color: #a4a4a4;
		}

		&-item {
			margin-top: 44rpx;

			.grid-text {
				margin-top: 15rpx;
			}
		}
	}

	.tool2 {
		width: 690rpx;
		height: 392.3rpx;
		border-radius: 23rpx;
		background: #fff;
		margin: 0 auto;
		margin-top: 33rpx;
		padding: 35rpx 30rpx;

		.name {
			font-family: "PingFang SC Bold";
			font-weight: 700;
			font-size: 32rpx;
			color: #333;
		}


		.grid-text {
			margin-top: 15rpx;
		}

		.tool-item {

			margin-top: 0;

		}
	}
</style>