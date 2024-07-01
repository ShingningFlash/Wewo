<template>
	<view>
		<cu-custom bgColor="bg-blues" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">确认详情</block>
		</cu-custom>
		<view class="box11" @click="goAddress" v-if="bb == ''">
			<view class="left_item" v-if="address != null">
				<view class="name_phone">
					<view class="name" v-if="address.consignee">
						{{address.consignee}}
					</view>
					<view class="name flex s-center" v-else>
						<u-icon name="plus-circle-fill" size="28" color="#277BDF"></u-icon>
						<text style="margin-left:20rpx">暂无默认收货地址，点击前往添加</text>
					</view>
					<view class="phone">{{address.mobile ? address.mobile : ''}}</view>
				</view>
				<view class="address">
					{{address.address ? address.address: ''}}
				</view>
			</view>

			<view class="left_item" v-else>
				<view class="name_phone flex s-center">
					<u-icon name="plus-circle-fill" size="28" color="#277BDF"></u-icon>
					<view class="name" style="margin-left:20rpx">暂无默认地址，前往添加</view>

				</view>
				<view class="address flex s-center" @click.stop="getWXaddress">
					<u-icon name="weixin-circle-fill" size="28" color="#48C057"></u-icon>
					<text style="margin-left:20rpx">一键获取微信收货地址</text>
				</view>
			</view>
			<view class="right_item">
				>
			</view>

		</view>
		<view class="box11" @click="getWXaddress" v-if="address == '' && bb == ''">
			<view class="left_item">
				<view class="name_phone">
					<view class="name flex s-center">
						<u-icon name="weixin-circle-fill" size="28" color="#48C057"></u-icon>
						<text style="margin-left:20rpx">一键获取微信地址</text>
					</view>
					<view class="phone"></view>
				</view>
				<view class="address">

				</view>
			</view>
			<view class="right_item">
				>
			</view>
		</view>


		<view class="box2">
			<view class="box22" v-for="(item,index) in visibleData" :key="index">

				<u--image :showLoading="true" :src="item.original_img" width="178rpx" height="178rpx">
				</u--image>
				<view class="right_item">
					<view class="name">
						<view class="title">
							{{item.goods_name}}
						</view>
						<view class="num">
							x{{item.goods_num}}
						</view>
					</view>
					<view class="guige">
						{{item.spec_key_name}}
					</view>
					<view class="price">
						<text>￥</text>{{type == 'buynow' ?item.goods_price :item.goods_price}}
					</view>
				</view>

			</view>
			<view class="box23" v-if="shouldShowToggleBtn" @click="toggleDisplay">
				{{ isExpanded ? "收起" : "展开" }}
				<u-icon name="arrow-down" v-if="!isExpanded"></u-icon>
				<u-icon name="arrow-up" v-else></u-icon>
			</view>

		</view>

		<view class="box3">
			<!-- <view class="top">
				<view class="name">购买服务</view>
				<view class="fuwu">不支持7天无理由退货</view>
			</view> -->
			<view class="top" style="padding-top: 20rpx;">
				<view class="name">邮费</view>
				<view class="fuwu" v-if="infoList.goods_fee != 0">￥{{infoList.goods_fee}}</view>
				<view class="fuwu" v-else>
					包邮
				</view>
			</view>
			<view class="top" style="font-size: 28rpx;font-weight: 400;padding-top:20rpx" v-if="bb == ''">
				<view class="name">订单备注</view>
				<input class="fuwu" placeholder="请填写您的备注内容" v-model="user_note" />
			</view>
			<view
				style="display: flex;justify-content: flex-end;font-size: 28rpx;font-weight: 400;align-items: center;padding-top: 30rpx;">
				<text style="color: #A2A2A2;margin-right: 10rpx;">共{{visibleData.length}}件</text> <text>总计：</text><text
					style="color: #A50A11;font-size: 40rpx;"><text
						style="font-size: 32rpx;">￥</text>{{infoList.allprices}}</text>
			</view>
		</view>

		<view class="bottom" v-if="bb == ''">
			<view class="item1">
				<view class="orderCode">
					支付方式
				</view>
				<view class="orderCodes">

				</view>
			</view>
			<u-radio-group shape="circle" activeColor="red" v-model="current" iconPlacement="right" placement="column"
				@change="changeType">
				<!-- <view class="item2" v-for="(item,index) in Data" :key="index" :class="current == index ? 'act' : ''"
					@click="changeType(index)">	
					<view class="flex-row s-center m-between">
						<text>{{item}}</text>
						<u-radio></u-radio>
					</view>	
				</view> -->
				<block v-for="(item,index) in Data" :key="index">
					<view style="border-top: 1rpx solid #ccc; height: 25rpx;margin-top: 25rpx;"></view>
					<u-radio :label="item" :name="index"></u-radio>
				</block>
			</u-radio-group>

		</view>

		<view class="footer" v-if="bb == ''">
			<view class="left">
				<text class="text1">需付：</text><text class="text2" v-if="type == 'cart'">{{infoList.allprices}}元</text>
				<text class="text2" v-else>{{infoList.goods_frice}}元</text>
			</view>
			<button class="btn " @click="CreatOrderInfo" v-if="pay_code == 'weixin' && bb == ''">
				立即支付
			</button>
			<button class="btn " open-type="share" v-if="pay_code == 'behalf'">
				找人代付
			</button>

		</view>
	</view>
</template>

<script>
	const adapayPlugin = requirePlugin("Adapay");
	export default {
		data() {
			return {
				Data: ['普通支付', '找人代付'],
				current: 0,
				address: {},
				isExpanded: false,
				infoList: [],
				toList: [],
				type: 'buynow',
				item_id: 0, //规格id
				goods_num: 0, //商品数量
				goods_id: 0, //商品id
				status: 1,
				user_note: '',
				columns: [],
				province: '',
				city: '',
				district: '',
				pay_code: 'weixin',
				bb: '',
				order_id: null,
				payStatus: false
			}
		},
		onShareAppMessage: async function() {
			let order_id = this.order_id
			if (order_id) {
				return {
					title: '请你帮我付一下',
					path: 'pages/index/index?item_id=' + this.item_id + '&goods_num=' + this.goods_num +
						'&goods_id=' + this.goods_id + '&bb=dai' + '&order_id=' + order_id
				};
			}
			if (this.address != null && this.address != '' && this.address != 'null') {

				let data = {}
				data.goods_id = this.goods_id * 1
				data.item_id = this.item_id
				data.goods_num = this.goods_num
				data.type = this.type
				data.pay_code = this.pay_code
				data.address_id = this.address.address_id
				// data.action = 'submit_order'
				data.user_note = this.user_note
				data.ship_type = 1
				try {
					let res = await this.$http.setCreatOrderInfo(data)
					if (res.status == 1) {

						let orderid = res.result.order.order_id
						this.order_id = orderid
						console.log(res, 'res');

						// 执行转发
						return {
							title: '请你帮我付一下',
							path: 'pages/index/index?item_id=' + this.item_id + '&goods_num=' + this
								.goods_num + '&goods_id=' + this.goods_id + '&bb=dai' + '&order_id=' + orderid
						};

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				} catch (error) {
					uni.showToast({
						title: '请求失败',
						icon: 'none'
					});
				}
			} else {
				uni.showModal({
					title: '提示',
					content: '当前尚未绑定收货地址，是否前往？',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/mine/address/address'
							})
						}
					}
				})
			}







		},
		computed: {

			shouldShowToggleBtn: function() {
				return this.toList.length > 2;
			},
			visibleData: function() {
				if (this.toList.length <= 2) {
					return this.toList;
				}
				if (this.isExpanded) {
					return this.toList;
				}
				return this.toList.slice(0, 2);
			}
		},
		onLoad(e) {

			this.UserRegionList()

			console.log('onload');
			if (e.type == 'cart') {
				this.type = 'cart'
				console.log("购物车进来");
				this.SettleAccounts()
			} else {
				this.type = 'buynow'
				this.item_id = e.item_id
				this.goods_num = e.goods_num * 1
				this.goods_id = e.goods_id
				this.GoodsBuyNow()
			}
			if (!uni.getStorageSync('token')) {
				return uni.showModal({
					title: '提示',
					content: '请先前往登录',
					success: (res) => {
						if (res.confirm) {
							uni.switchTab({
								url: '/pages/mine/mine'
							})
						}
					}
				})
			}
			if (e.bb) {
				this.type = 'buynow'
				this.item_id = e.item_id
				this.goods_num = e.goods_num * 1
				this.goods_id = e.goods_id
				this.order_id = e.order_id
				this.bb = e.bb
				console.log("bb", this.bb);
				console.log("bb", this.order_id);
				this.GoodsBuyNow()
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				setTimeout(() => {
					uni.hideLoading()

					uni.showModal({
						title: '提示',
						content: '你将帮ta进行支付购买商品',
						success: (res) => {
							if (res.confirm) {
								let obh = {
									order_id: this.order_id
								}
								this.$http.behalfPay(obh).then(resd => {
									if (resd.status == 1) {
										let orderid = this.order_id
										let datas = {
											order_id: orderid,
											order_type: 1,
											user_id: uni.getStorageSync('user_id'),
											openid: uni.getStorageSync('openId')
											// openid: uni.getStorageSync('openid')

										}
										this.$http.MiniPayOrder(datas).then(res2 => {
											console.log(res2, "res2");
											if (res2.status) {
												if (res2.status == 1) {
													this.$utils.msg(res.msg)
													if (res2.payinfo) {
														if (res2.payinfo.data) {
															let results = res2.payinfo
																.data
															uni.navigateToMiniProgram({
																appId: results.wx_app_id,
																path: results.miniapp_path,
																success: (res) => {
																	this.payStatus = true
																}
															})
															// adapayPlugin.requestPay(
															// 	results, this
															// 	.paySuccess, this
															// 	.payError)
														} else {
															uni.showToast({
																title: res2
																	.payinfo
																	.msg,
																icon: 'none',
																duration: 2000
															})
														}
													}




												}
											} else {
												let regx = res2.replace(
													/https:\/\/page\.adapay\.tech\/v1\/wxpay\/createOrder/,
													'')

												let result = JSON.parse(regx)
												if (result.status == 1) {
													if (result.payinfo) {
														if (result.payinfo.data) {
															let results = result
																.payinfo
																.data
															uni.navigateToMiniProgram({
																appId: results.wx_app_id,
																path: results.miniapp_path,
																success: (res) => {
																	this.payStatus = true
																}
															})
															// adapayPlugin.requestPay(
															// 	results, this
															// 	.paySuccess, this
															// 	.payError)
														} else {
															uni.showToast({
																title: result
																	.payinfo
																	.msg,
																icon: 'none',
																duration: 2000
															})
														}
													}
												}
											}

										})
									} else {
										uni.showToast({
											title: resd.msg,
											icon: 'none'
										})
									}
								})
							}
						}
					})
				}, 2500)

			}

		},
		onShow() {
			console.log('onshow');
			if (this.type == 'cart') {
				this.SettleAccounts()
			} else {
				this.GoodsBuyNow()
			}
			// 跳转后查看订单是否支付完成，完成则跳转订单界面。因为跳转另外的小程序支付，没有直接的支付回调
			if (this.payStatus == true) {
				uni.showLoading({
					title:'加载中',
					mask:true
				})
				setTimeout(()=>{
					let data = {}
					data.order_id = this.order_id
					this.$http.getUserOrderInfo(data).then(res => {
						uni.hideLoading()
						if (res.status == 1) {
							if(res.result.pay_status !== 0){
								uni.navigateTo({
									url: '/pages/order/order?type=0'
								})
							}
							else{
								this.$utils.msg('支付失败')
							}
							
						}
					})
				},3000)
				
				
			}
		},
		methods: {
			doShare() {
				// 获取存储在页面数据中的 order_id
				let order_id = this.order_id;

				// 执行转发
				return {
					title: '请你帮我付一下',
					path: 'pages/index/index?item_id=' + this.item_id + '&goods_num=' + this
						.goods_num +
						'&goods_id=' + this.goods_id + '&bb=dai' + '&order_id=' + order_id
				};
			},
			changeType(index) {
				console.log(index);
				this.current = index
				if (index == 0) {
					this.pay_code = 'weixin'
				} else {
					this.pay_code = 'behalf'
				}
			},
			getWXaddress() {
				uni.chooseAddress({
					success: async (res) => {
						console.log(res);
						if (res.provinceName != '') {

							this.columns[0].forEach((item, index) => {
								if (item.name == res.provinceName) {
									this.province = item.id

								}
							})
							const reso = await this.RegionList(this.province)
							if (reso.status == 1) {
								console.log(reso);
								this.columns[1] = reso.result
								if (res.cityName != '') {
									this.columns[1].forEach((item, index) => {
										if (item.name == res.cityName) {
											this.city = item.id


										}
									})

									const reso2 = await this.RegionList(this.city)
									if (reso2.status == 1) {
										console.log(reso2);
										this.columns[2] = reso2.result
										if (res.countyName != '') {
											this.columns[2].forEach((item, index) => {
												if (item.name == res.countyName) {
													this.district = item.id
													let par = {}
													par.address_id = 0
													par.consignee = res.userName
													par.mobile = res.telNumber
													par.address = res.detailInfo

													par.user_id = uni.getStorageSync(
														'user_id')
													par.province = this.province
													par.city = this.city
													par.district = this.district
													uni.showLoading({
														title: '处理中',
														mask: true
													})
													this.$http.setUserAddress(par).then(
														res => {
															uni.hideLoading()
															if (res.status == 1) {
																uni.showToast({
																	title: res.msg,
																	icon: 'none'
																})
																setTimeout(() => {
																	this.UserAddressList()
																}, 2000)
															} else {
																uni.showToast({
																	title: res
																		.msg,
																	icon: 'none'
																})
															}

														})

												}
											})


										}


									}


								}


							}
						}



					}
				})
			},
			async RegionList(id) {
				return new Promise((resolve, reject) => {
					let data = {};
					data.region_id = id;

					this.$http.getUserRegionList(data)
						.then(res => {
							// 在这里处理 res 数据，如果有需要的话
							resolve(res);
						})
						.catch(error => {
							// 在这里处理请求失败的情况，如果有需要的话
							reject(error);
						});
				});
			},
			// 地址
			UserRegionList(ids) {
				let data = {}
				data.region_id = 0
				this.$http.getUserRegionList(data).then(res => {
					let datas = []
					datas.push(res.result)
					this.columns = (datas)
					let data2 = {}
					data2.region_id = res.result[0].id

					this.$http.getUserRegionList(data2).then(res2 => {
						datas.push(res2.result)
						this.columns = (datas)
						let data3 = {}
						data3.region_id = res2.result[0].id
						this.$http.getUserRegionList(data3).then(res3 => {
							datas.push(res3.result)
							this.columns = (datas)
						})
					})
				})

			},
			toggleDisplay() {
				this.isExpanded = !this.isExpanded;
			},


			async GoodsBuyNow() {
				let data = {}
				data.goods_id = this.goods_id
				data.item_id = this.item_id
				data.goods_num = this.goods_num
				// this.$utils.showLoading()
				this.$http.getGoodsBuyNow(data).then(res => {
					if (res.status == 1) {
						// this.$utils.hideLoading()
						this.infoList = res.result
						this.address = res.result.address
						this.toList = res.result.goodslist
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})

			},
			goAddress() {
				uni.navigateTo({
					url: '/pages/mine/address/address'
				})
			},

			SettleAccounts() {
				let data = {}
				// data.goods_id = this.goods_id
				// data.item_id = this.item_id
				// data.goods_num = this.goods_num

				this.$http.getSettleAccounts(data).then(res => {
					if (res.status == 1) {
						this.infoList = res.result
						this.address = res.result.address
						this.toList = res.result.goodslist
					} else {
						uni.showModal({
							title: '提示',
							content: res.msg,
							showCancel: false,
							success: (res) => {
								if (res.confirm) {
									uni.navigateBack({
										delta: 1
									})
								}
							}
						})

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
					uni.redirectTo({
						url: '/pages/order/order?type=0'
					})
				}, 1000)
				// uni.removeStorageSync('addressObj')

			},
			payError(err) {
				console.log(err);
				uni.showToast({
					title: res.errMsg,
					icon: 'none'
				})
			},
			CreatOrderInfo() {
				uni.showLoading({
					title:'正在创建订单..',
					mask:true
				})
				if (this.address != null && this.address != '' && this.address != 'null') {

					let data = {}
					data.goods_id = this.goods_id * 1
					data.item_id = this.item_id
					data.goods_num = this.goods_num
					data.type = this.type
					data.pay_code = this.pay_code
					data.address_id = this.address.address_id
					// data.action = 'submit_order'
					data.user_note = this.user_note
					data.ship_type = 1

					this.$http.setCreatOrderInfo(data).then(res => {
						uni.hideLoading()
						uni.showLoading({
							title:'请在请求支付..',
							mask:true
						})
						if (res.status == 1) {

							let orderid = res.result.order.order_id
							this.order_id = orderid
							let datas = {
								order_id: orderid,
								order_type: 1,
								user_id: uni.getStorageSync('user_id'),
								openid: uni.getStorageSync('openId')
								// openid: uni.getStorageSync('openid')
							}
							if (this.pay_code == 'weixin') {
								this.$http.MiniPayOrder(datas).then(res2 => {
									uni.hideLoading()
									if (res2.status) {
										if (res2.status == 1) {
											if (res2.payinfo.data) {
												let results = res2.payinfo.data
												uni.navigateToMiniProgram({
													appId: results.wx_app_id,
													path: results.miniapp_path,
													success: (res) => {
														this.payStatus = true
													}
												})

												// adapayPlugin.requestPay(results, this
												// 	.paySuccess, this
												// 	.payError)
											} else {
												uni.showToast({
													title: res2.payinfo.msg,
													icon: 'none',
													duration: 2000
												})
											}



										}
									} else {
										let regx = res2.replace(
											/https:\/\/page\.adapay\.tech\/v1\/wxpay\/createOrder/,
											'')

										let result = JSON.parse(regx)
										if (result.status == 1) {
											if (result.payinfo.data) {
												let results = result.payinfo.data

												uni.navigateToMiniProgram({
													appId: results.wx_app_id,
													path: results.miniapp_path,
													success: (res) => {
														this.payStatus = true
													}
												})

												// adapayPlugin.requestPay(results, this
												// 	.paySuccess, this
												// 	.payError)
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
							} else {

							}



						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '当前尚未绑定收货地址，是否前往？',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/mine/address/address'
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.box11 {
		width: 690rpx;
		height: 151rpx;
		border-radius: 12rpx;
		background: #fff;
		padding: 30rpx;
		box-sizing: border-box;
		margin: 0 auto;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;

		.left_item {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.name_phone {
				display: flex;
				align-items: center;

				.name {
					font-weight: 700;
					font-size: 30rpx;
					color: #000;
				}

				.phone {
					font-weight: 400;
					font-size: 26rpx;
					color: #919191;
					margin-left: 15rpx;
				}
			}

			.address {
				font-weight: 400;
				font-size: 26rpx;
				color: #919191;
			}
		}

		&:before {
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			height: 2px;
			background: repeating-linear-gradient(-45deg, #ff6c6c, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0,
					#1989fa 45%, transparent 0, transparent 50%);
			background-size: 78px;
			content: "";
		}
	}

	.footer {
		width: 750rpx;
		height: 123rpx;
		background: #fff;
		box-shadow: 0 -3rpx 4rpx rgba(204, 204, 204, 0.07);
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;

		.left {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 436rpx;
			font-family: "PingFang SC";

			.text1 {
				color: rgba(47, 47, 47, 1);
				font-size: 30rpx;
				font-weight: 400;
				letter-spacing: 0;
			}

			.text2 {
				color: #A50A11;
				font-size: 38rpx;
				font-weight: 500;
				letter-spacing: 0;
			}
		}

		.btn {
			width: 314rpx;
			height: 123rpx;
			// background: url('https://ltbwgs.ydlweb.com/public/images/index_bg.png') no-repeat center/cover;
			font-weight: 400;
			font-size: 30rpx;
			line-height: 123rpx;
			text-align: center;
			color: #fff;
			background-color: #33629D;
		}
	}

	.bottom {
		width: 690rpx;

		border-radius: 12rpx;
		background: #fff;
		margin: 0 auto;
		padding: 30rpx;
		box-sizing: border-box;
		margin-top: 20rpx;

		.item1 {
			display: flex;
			justify-content: space-between;

			.orderCode {
				font-weight: 700;
				font-size: 28rpx;
				color: #000;
			}

			.orderCodes {
				font-weight: 400;
				font-size: 28rpx;
				color: #000;
			}
		}

		.act {
			color: #33629D;
		}

		.item2 {
			display: flex;
			flex-direction: column;
			// align-items: center;

			padding-top: 20rpx;
			border-top: 1rpx solid #ccc;
			margin-top: 20rpx;

			.text1 {
				color: rgba(162, 162, 162, 1);
				font-size: 28rpx;
				font-weight: 400;
			}

			.text2 {
				color: rgba(0, 0, 0, 1);
				font-size: 28rpx;
				font-weight: 400;
				margin-left: 10rpx;
			}

			.text3 {
				color: rgba(226, 25, 43, 1);
				font-size: 40rpx;
				font-weight: 500;
				margin-left: 10rpx;
			}
		}
	}

	.bg_blue {
		background-color: #FD7B26;
		width: 100%;
		height: 151rpx;
		border-bottom-left-radius: 120rpx;
		position: absolute;
		top: 0;
		z-index: -1;
	}

	.box1 {
		width: 690rpx;
		height: 151rpx;
		border-radius: 12rpx;
		background: #fff;
		padding: 30rpx;
		box-sizing: border-box;
		margin: 0 auto;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left_item {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.name_phone {
				display: flex;
				align-items: center;

				.name {
					font-weight: 700;
					font-size: 30rpx;
					color: #000;
				}

				.phone {
					font-weight: 400;
					font-size: 26rpx;
					color: #919191;
					margin-left: 15rpx;
				}
			}

			.address {
				font-weight: 400;
				font-size: 26rpx;
				color: #919191;
			}
		}
	}

	.box2 {
		width: 690rpx;

		border-radius: 12rpx;
		background: #fff;
		margin: 0 auto;
	}

	.box23 {
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;
		font-weight: 400;
		font-size: 24rpx;
		color: #858585;
		padding-bottom: 25rpx;
		border-radius: 12rpx;
	}

	.box22 {
		width: 690rpx;

		border-radius: 12rpx;
		background: #fff;
		margin: 0 auto;
		margin-top: 20rpx;
		padding: 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;

		.right_item {
			width: 438rpx;
			display: flex;
			flex-direction: column;
			height: 178rpx;
			justify-content: space-between;

			.name {
				display: flex;
				justify-content: space-between;

				.title {
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
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.price {
				font-weight: 700;
				font-size: 36rpx;
				color: #A50A11;

				text {
					color: #A50A11;
					font-size: 24rpx;
					font-weight: 400;

				}
			}

		}
	}

	.box3 {
		width: 690rpx;
		// height: 476rpx;
		border-radius: 12rpx;
		background: #fff;
		padding: 30rpx;
		box-sizing: border-box;
		margin: 0 auto;
		margin-top: 20rpx;

		.top {
			display: flex;
			align-items: center;
			padding-bottom: 30rpx;
			border-bottom: 1rpx solid #dcdcdc;

			.name {
				font-weight: 700;
				font-size: 28rpx;
				color: #000;
			}

			.fuwu {
				font-weight: 400;
				font-size: 26rpx;
				color: #a2a2a2;
				margin-left: 30rpx;
			}
		}


	}

	.catbox {
		display: flex;
		flex-wrap: wrap;
		margin-top: 10rpx;

		.catelist {
			margin-right: 20rpx;
			display: flex;

			text {
				font-weight: 400;
				font-size: 26rpx;
				color: #000;
			}
		}


		.quan {
			width: 35rpx;
			height: 35rpx;
			background: #fff;
			border: 1rpx solid #707070;
			border-radius: 50%;
			margin-right: 10rpx;
		}

		.active {
			// background-color: #ED1932 !important;
			border: 8rpx solid #f71;
			// border-color:1rpx solid  #f71!important;
			background-clip: content-box !important;
			// padding: 6rpx !important;
			box-sizing: border-box;
		}
	}

	//radio 自定义样式
	// .u-radio-group {
	// 	border-top: 1rpx solid #dadbde;
	// }
	// .u-border-bottom {
	// 	padding-bottom: 20rpx !important;
	// }
	// .u-border-bottom:last-child {
	// 	border-bottom: none !important;
	// }
</style>