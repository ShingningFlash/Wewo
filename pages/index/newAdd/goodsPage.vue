<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">商品列表</block>
		</cu-custom>

		<view class="list-box">
			<view class="list-warp">
				<view class="list-item" v-for="(item,index) in goodsList" :key="index"
					@click="navTo('/pages/product/productDetail?id='+item.goods_id)">
					<view class="top-img">
						<image :src="item.original_img" mode="" mode="aspectFit"></image>
					</view>
					<view class="middle-title">
						{{item.goods_name}}
					</view>
					<view class="bottom-price">
						<view class="left" >
							<text>￥</text>{{item.market_price}}
						</view>
						<!-- <view class="left" v-else>
							<text>￥</text>{{item.shop_price}}
						</view> -->

						<view class="right flex m-center s-center">
							<image src="/static/icons/icon27.png" mode=""></image>
						</view>
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
				pageTitle: '商品',
				goodsList: [],
				page: 1,
				type: 1,
				id: null,
				tehui:null
			}
		},
		onLoad(e) {
			console.log(e);
			if (e.id) {
				this.id = e.id
				this.type = 1
				this.getGoodsList(e.id, 1)
			}
			if (e.typeId) {
				this.id = e.typeId
				this.type = 2
				this.getGoodsList(e.typeId, 2)
			}
			if (e.keywords) {
				this.type = 3
				this.getGoodsList(e.keywords, 3)
			}
			if (e.tehui) {
				this.tehui = e.tehui
				this.getGoods(2)
			}

		},
		onReachBottom() {
			this.page++
			if(this.tehui == true || this.tehui == 'true'){
				this.getGoods(2)
			}
			else{
				this.getGoodsList(this.id, this, type)
			}
			


		},
		methods: {
			// 商品列表
			getGoods(int) {
				let data = {}
				data.type = int // 1 普通商品 2特价商品
				this.$http.getGoodsList(data).then((res) => {
						this.goodsList = res.result.rows
					})
					.catch((error) => {
						uni.showToast({
							title: "请求错误，请重试~",
							icon: "none",
							duration: 2000,
						});
					});
			},
			getGoodsList(id, type) {
				let data = {}
				data.page = this.page
				if (type == 1) {
					data.cat_id_2 = id
				} else if (type == 2) {
					data.cat_id = id
				} else {
					data.keywords = id
				}

				this.$http.getGoodsConditionList(data).then(res => {
					if (res.status == 1) {
						this.goodsList = res.result

					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						})
					}

				})

			},
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			// 秒杀
			getSeckillGoods() {
				let data = {}
				data.page = this.page
				this.$httpRequest({
					url: 'getSeckillGoods'
				}, data).then(res => {
					if (res.status == 1) {
						if (this.page == 1) {
							this.goodsList = res.goodslist
						} else {
							this.goodsList = this.goodsList.concat(res.goodslist)
						}


					}
				})
			},
			// 日常
			getDailyGoods() {
				let data = {}
				data.page = this.page
				this.$httpRequest({
					url: 'getDailyGoods'
				}, data).then(res => {
					if (res.status == 1) {
						if (this.page == 1) {
							this.goodsList = res.goodslist
						} else {
							this.goodsList = this.goodsList.concat(res.goodslist)
						}


					}
				})
			},
			// 定制
			getCustomizedGoods() {
				let data = {}
				data.page = this.page
				this.$httpRequest({
					url: 'getCustomizedGoods'
				}, data).then(res => {
					if (res.status == 1) {
						if (this.page == 1) {
							this.goodsList = res.goodslist
						} else {
							this.goodsList = this.goodsList.concat(res.goodslist)
						}


					}
				})
			},
			// 品牌
			getBrandGoods() {
				let data = {}
				data.page = this.page
				this.$httpRequest({
					url: 'getBrandGoods'
				}, data).then(res => {
					if (res.status == 1) {
						if (this.page == 1) {
							this.goodsList = res.goodslist
						} else {
							this.goodsList = this.goodsList.concat(res.goodslist)
						}


					}
				})
			},
			// 积分/礼品
			getGiftGoods() {
				let data = {}
				data.page = this.page
				this.$httpRequest({
					url: 'getGiftGoods'
				}, data).then(res => {
					if (res.status == 1) {
						if (this.page == 1) {
							this.goodsList = res.goodslist
						} else {
							this.goodsList = this.goodsList.concat(res.goodslist)
						}


					}
				})
			},
			// 商品列表
			CateGoods(id) {
				let data = {}
				data.page = this.page
				data.cat_id_2 = id
				this.$httpRequest({
					url: 'CateGoods'
				}, data).then(res => {
					if (res.status == 1) {
						if (this.page == 1) {
							this.goodsList = res.goodslist
						} else {
							this.goodsList = this.goodsList.concat(res.goodslist)
						}


					}
				})
			}
		}

	}
</script>

<style scoped lang="scss">
	.list-box {
		padding: 0 35rpx;
		box-sizing: border-box;

		.list-warp {
			display: grid;
			gap: 30rpx;
			grid-template-columns: repeat(2, 1fr);

			.list-item {
				margin-top: 36rpx;
				background-color: #FFFFFF;
				border-radius: 10rpx;

				.top-img {
					width: 330rpx;
					height: 322rpx;
					// border-top-left-radius: 10rpx;
					// border-top-right-radius: 10rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.middle-title {
					width: 330rpx;
					padding: 16rpx 14rpx 0;
					font-family: "PingFang SC Bold";
					font-weight: 700;
					font-size: 28rpx;
					text-align: left;
					color: #373737;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.bottom-price {
					width: 330rpx;
					padding: 16rpx 14rpx 22rpx;
					display: flex;
					justify-content: space-between;

					.left {
						font-family: "PingFang SC Bold";
						font-weight: 700;
						font-size: 28rpx;
						text-align: left;
						color: #ff000c;

						text {
							font-size: 22rpx;
						}
					}

					.right {
						width: 44rpx;
						height: 44rpx;
						background-color: #1067C7;
						border-radius: 50%;

						image {
							width: 20rpx;
							height: 20rpx;
						}
					}
				}
			}
		}
	}
</style>