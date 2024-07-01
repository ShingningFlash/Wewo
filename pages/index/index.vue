<template>
	<view class="mains">
		<!-- 背景 -->
		<view class="top-background-round">

		</view>
		<!-- 搜索 -->
		<view class="search flex s-center">

			<image src="/static/icons/svg1.svg" class="image"></image>
			<input type="text" placeholder="搜索关键词" v-model="keywords" @confirm="search">

			<view class="search-btn" @click="search">
				搜索
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="swiperStyle">

			<swiper :autoplay="swiperAutoplay" @change="swiperChange" style="border-radius: 15rpx;height:327rpx">
				<swiper-item v-for="(item, index) in list1" :key="index" style="height: 327rpx;">
					<view v-if="isImage(item.ad_code)" @click="indexCates(index)" style="border-radius: 15rpx;height:327rpx;">
						<u--image :showLoading="true" :src="item.ad_code" width="100%" height="327rpx" radius="15rpx"></u--image>
						<!-- <image :src="item.ad_code" mode="aspectFill" style="width: 100%; height:327rpx;border-radius: 15rpx;"></image> -->
					</view>
					<view v-else-if="isVideo(item.ad_code)" style="border-radius: 15rpx;height: 327rpx;">
						<video :src="item.ad_code" controls="true" style="width: 100%; height:327rpx;border-radius: 15rpx;"
							ref="video0" id="video0"  @ended="videoEnded" @play="videoPlay" @pause="videoPause"></video>
					</view>
				</swiper-item>
			</swiper>
			<!-- <u-swiper :list="list1" radius="15rpx" height="327rpx" keyName="ad_code" @click="indexCates"
				@playEnded="playEnded" :current="currentPage"></u-swiper> -->
		</view>
		<!-- 分类导航栏 -->
		<view class="content">
			<u-grid :border="false" :col="4">
				<u-grid-item v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex"
					@click="navTo('/pages/index/newAdd/goodsPage?typeId='+baseListItem.id)">
					<!--  -->
					<image style="width: 120rpx;height: 120rpx;margin-top:24rpx;;border-radius: 24rpx;"
						:src="baseListItem.image != false ? baseListItem.image : '/static/icons/icon8.png'"></image>
					<text class="grid-text">{{baseListItem.name}}</text>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="content2 flex m-between s-center">
			<view class="item1">
				<view class="flex s-center">
					<view class="box1">
						微沃特惠
					</view>
					<view class="box2">
						限时特惠
					</view>
				</view>
				<view class="flex m-between">
					<view class="flex-col s-center m-center" v-if="tejia.length > 0"
						@click="navTo('/pages/index/newAdd/goodsPage?tehui=true')">
						<image :src="tejia[0].original_img" style="width:120rpx;height:127rpx;"></image>
						<view class="" style="text-align: center;color:#DB0000;font-size: 26rpx;margin-top: 10rpx;">
							{{tejia[0].market_price}}
						</view>
					</view>
					<view class="flex-col s-center m-center" v-if="tejia.length > 1"
						@click="navTo('/pages/index/newAdd/goodsPage?tehui=true')">
						<image :src="tejia[1].original_img" style="width:120rpx;height:127rpx;"></image>
						<view class="" style="text-align: center;color:#DB0000;font-size: 26rpx;margin-top: 10rpx;">
							<text style="font-size: 20rpx;">￥</text>{{tejia[1].market_price}}
						</view>
					</view>
				</view>
			</view>
			<view class="item2" @click="getChannelsLiveInfo">
				<view class="flex s-center">
					<view class="box1">
						微沃直播
					</view>
					<view class="box2">
						边看边买
					</view>
				</view>
				<view class="flex m-between">
					<view class="flex-col s-center m-center">
						<image src="/static/images/image5.png" style="width:165rpx;height:154rpx;"></image>
						<!-- <view class="" style="text-align: center;color:#DB0000;font-size: 26rpx;margin-top: 10rpx;">
								{{tejia[2].market_price}}
							</view> -->
					</view>
					<view class="flex-col s-center m-center">
						<image :src="config.uni_app_web_api_url +'/public/static/images/image4.png'" style="width:150rpx;height:190rpx;"></image>
						<!-- <view class="" style="text-align: center;color:#DB0000;font-size: 26rpx;margin-top: 10rpx;">
								<text style="font-size: 20rpx;">￥</text>{{tejia[3].market_price}}
							</view> -->
					</view>
				</view>

			</view>


		</view>
		<view class="content3 flex m-between " v-if="AdList != ''">
			<image :src="config.uni_app_web_api_url+ AdList[0].position_style" class="images"></image>
			<image :src="config.uni_app_web_api_url+ AdList[1].position_style" class="images"></image>
		</view>

		<view class="tabs flex s-center">
			<view class="tabs-item" v-for="(item,index) in tabList" :key="index"
				:class="currentTab == index ? 'active' : ''" @click="change(index)">
				{{item.name}}
			</view>
		</view>

		<view class="content4 flex flex-wrap m-between">
			<view class="list" @click="navTo('/pages/product/productDetail?id='+item.goods_id)"
				v-for="(item,index) in goodsList" :key="index">
				<image :src="item.original_img" mode="aspectFit"></image>
				<view class="box-c">
					<view class="title">
						{{item.goods_name}}
					</view>
					<view class="buyNum">
						{{item.sales_sum}}人购买
					</view>
					<view class="flex">
						<view class="price">
							￥{{item.market_price}}
						</view>
						<view class="buyBtn">
							去购买
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { uni_app_web_api_url} from '@/common/config.js'
	import config from "@/common/config";
	export default {
		data() {
			return {
				uni_app_web_api_url,
				swiperAutoplay: true,
				autoplayTimer: null,
				currentIndex: 0,
				current: 0,
				tabList: [{
					name: '最新发布'
				}, {
					name: '推荐商品'
				}],
				tejia: [],
				keywords: '',
				config: config,
				list1: [],
				AdList: [],
				goodsList: [],
				baseList: [],
				currentPage: 0,
				currentTab: 0,


				// 是否静音
				muted: true,
				// 轮播图索引
				tabIndex: 0,

				// 是否显示面板指示点
				indicatorDots: false,
				// 自动播放 必要
				autoplay: true,
				//默认 每张停留时间 必要
				default_interval: 5000,
				// 每张停留时间 必要
				interval: 5000,
				// 切换过程所需时间 必要
				duration: 500
			}
		},

		onReachBottom() {

		},
		onShareAppMessage() {
			
		},
		onShareTimeline() {
			
		},
		onShow() {
			this.getGoodsIndexCat()
			this.getGoodsLists()
			this.loadData()
			this.getPosition()
		},
		onLoad(e) {
			this.getGoodsList(1, 2)
			// this.getGoodsList(2,1)

			console.log('我是首页')
			if (e.lou == 1) {
				uni.navigateTo({
					url: '/pages/product/productDetail?id=' + e.id
				})

			}
			if (e.bb) {
				uni.navigateTo({
					url: '/pages/product/confirmOrder?item_id=' + e.item_id + '&goods_num=' + e
						.goods_num +
						'&goods_id=' + e.goods_id + '&bb=dai' + '&order_id=' + e.order_id
				})
			}


			this.getInfo()
			if (e.scene) {
				e.scene = decodeURIComponent(e.scene)
				var arr = e.scene.split('=')

				console.log(arr[1], "1");
				this.loginEvent(arr[1])

			} else if (e.user_id && e.user_id != '' && e.user_id !=
				null && e.user_id != undefined) {

				console.log(arr[1], "2");
				this.loginEvent(arr[1])

			}
		},
		methods: {



			// 判读是否图片
			isImage(url) {
				return url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.jpeg');
			},
			// 判读是否视频
			isVideo(url) {
				return url.endsWith('.mp4') || url.endsWith('.mov') || url.endsWith('.avi');
			},
			
			videoPlay(){
				this.swiperAutoplay = false;
			},
			videoPause(){},
			videoEnded() {
				this.swiperAutoplay = true; // 恢复自动轮播
				this.currentIndex++;
				// Ensure currentIndex does not exceed the number of items
				if (this.currentIndex >= this.list1.length) {
					this.currentIndex = 0;
				}
			},
			swiperChange(e) {
				// Handle swiper change event if needed
				this.currentIndex = e.detail.current;
				uni.createVideoContext('video0', this).stop()
				
				
			},
			change(index) {
				this.currentTab = index
				if (index == 0) {
					this.getGoodsList(1, 2)
				} else {
					this.getGoodsList(2, 2)
				}
			},
			getChannelsLiveInfo() {
				uni.openChannelsLive({
					finderUserName: 'sphQQaDUUuFcsbl',
					success(res) {
						console.log(res, res);
					},
					fail(err) {
						console.log(err, 'err');
					}
				})


			},
			getInfo() {
				this.$http.getUserInfo().then(res => {
					if (res.status == 1) {
						uni.setStorageSync('is_vip', res.result.is_vip)
					} else {

						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}

				})
			},
			
			
			indexCates(e) {
				console.log(e);

				if (this.list1[e].media_type == 3) {
					uni.navigateTo({
						url: '/pages/product/productDetail?id=' + this.list1[e].ad_link
					})
				}
			},
			search() {
				uni.navigateTo({
					url: '/pages/index/newAdd/goodsPage?keywords=' + this.keywords
				})
			},
			async loginEvent(user_id) {
				uni.login({
					success: (res) => {
						let data = {}
						data.code = res.code
						this.$http.MiniCodeLogin(data).then((result) => {
							if (result.status == 1) {
								uni.setStorageSync('openId', result.result.openid)
								uni.setStorageSync('token', result.result.token)
								let datas = {
									user_id: user_id
								}
								this.$http.ScanCode(datas).then(res2 => {
									if (res2.status == 1) {
										uni.showToast({
											title: res2.msg,
											icon: 'none',
											duration: 2000
										})
									}
								})
							}
						})
					}
				})
			},
			//广告图
			getPosition() {

				this.$http.getPosition().then((res) => {
						this.AdList = res.result
					})
					.catch((error) => {
						uni.showToast({
							title: "请求错误，请重试~",
							icon: "none",
							duration: 2000,
						});
					});
			},


			getGoodsLists(int, type) {
				let data = {}

				data.type = 2 // 1 普通商品 2特价商品
				this.$http.getGoodsList(data).then((res) => {

						this.tejia = res.result.rows


					})
					.catch((error) => {
						uni.showToast({
							title: "请求错误，请重试~",
							icon: "none",
							duration: 2000,
						});
					});
			},

			// 商品列表
			getGoodsList(int, type) {
				let data = {}
				if (int == 2) {
					data.is_recommend = 1
				} else {
					data.is_new = 1
				}
				data.type = 1 // 1 普通商品 2特价商品
				this.$http.getGoodsList(data).then((res) => {
						if (type == 1) {
							if (int == 1) {
								this.goodsList = res.result.rows
							} else {
								this.tejia = res.result.rows
							}
						} else {
							this.goodsList = res.result.rows
						}

					})
					.catch((error) => {
						uni.showToast({
							title: "请求错误，请重试~",
							icon: "none",
							duration: 2000,
						});
					});
			},
			// 首页分类
			getGoodsIndexCat() {
				this.$http.getGoodsIndexCat().then((res) => {
						this.baseList = res.result
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
				uni.navigateTo({
					url: url
				})
			},
			confirm(e) {

				console.log(e);
			},
			loadData() {
				this.$http.getAdList().then((res) => {
						this.list1 = res.result
					})
					.catch((error) => {
						uni.showToast({
							title: "请求错误，请重试~",
							icon: "none",
							duration: 2000,
						});
					});

			},
		}
	}
</script>
<style>
	page {
		background-color: #F6F6F6;
	}
</style>
<style scoped lang="scss">
	.search {
		width: 520rpx;
		height: 67rpx;
		border-radius: 33.5rpx;
		background: #fff;
		margin-left: 30rpx;
		margin-top: 95rpx;
		position: relative;
		padding-left: 36rpx;

		input {
			margin-left: 25.55rpx;
		}

		.image {
			width: 31.45rpx;
			height: 31.45rpx;
		}

		.search-btn {
			width: 111rpx;
			height: 47rpx;
			border-radius: 23.5rpx;
			background: linear-gradient(90.00deg, #577dac 0%, #a3c9f8 100%);
			position: absolute;
			right: 27rpx;
			top: 50%;
			transform: translateY(-50%);
			text-align: center;
			font-family: "PingFang SC";
			font-weight: 400;
			font-size: 26rpx;
			color: #fff;
			line-height: 47rpx;

			&:active {
				background: lighten($color: #577dac, $amount: 10%);
			}
		}
	}

	.swiperStyle {
		width: 690rpx;
		margin: 0 auto;
		margin-top: 44rpx;
		height:327rpx;
	}

	.content {
		width: 690rpx;
		// height: 330rpx;
		border-radius: 15rpx;
		background: rgba(51, 98, 165, .4);
		margin: 20rpx auto;
		padding: 15rpx;



		.grid-text {
			font-family: "PingFang SC";
			font-weight: 400;
			font-size: 24rpx;
			color: #fff;
			margin-top: 8rpx;
		}
	}

	.content2 {
		width: 690rpx;
		height: 279rpx;
		border-radius: 15rpx;
		background: #fff;
		margin: 0 auto;
		padding: 24rpx;
		box-sizing: border-box;

		.item1 {
			.box1 {
				font-family: "PingFang SC Medium";
				font-weight: 500;
				font-size: 36rpx;
				color: #111;
			}

			.box2 {
				width: 117rpx;
				height: 37rpx;
				background: url(/static/icons/icon9.png) no-repeat center/cover;
				font-family: "PingFang SC";
				font-weight: 400;
				font-size: 22rpx;
				color: #fff;
				text-align: center;
				margin-left: 24rpx;
				line-height: 37rpx;
			}
		}

		.item2 {
			.box1 {
				font-family: "PingFang SC Medium";
				font-weight: 500;
				font-size: 36rpx;
				color: #111;
			}

			.box2 {
				width: 137rpx;
				height: 37rpx;
				background: url(/static/icons/icon10.png) no-repeat center/cover;
				font-family: "PingFang SC";
				font-weight: 400;
				font-size: 22rpx;
				color: #fff;
				text-align: center;
				margin-left: 24rpx;
				line-height: 37rpx;
			}
		}
	}

	.content3 {
		width: 690rpx;
		margin: 0 auto;
		margin-top: 20rpx;

		.images {
			width: 336rpx;
			height: 490rpx;
			border-radius: 15rpx;
			background: #fff;
			border: 1rpx solid #707070;
		}
	}

	.content4 {
		width: 690rpx;
		margin: 0 auto;
		margin-top: 20rpx;

		.list {
			width: 336rpx;
			height: 490rpx;
			border-radius: 15rpx;
			background: #fff;
			margin-top: 20rpx;

			image {
				width: 100%;
				height: 315rpx;
				border-radius: 15rpx 15rpx 0 0;
			}

			.box-c {
				padding: 10rpx 20rpx;
				box-sizing: border-box;

				.title {
					display: -webkit-box;
					-webkit-line-clamp: 1;
					-webkit-box-orient: vertical;
					overflow: hidden;
					font-family: "PingFang SC";
					font-weight: 400;
					font-size: 28rpx;
					color: #333;
				}

				.buyNum {
					font-family: "PingFang SC";
					font-weight: 400;
					font-size: 20rpx;
					color: #ff652b;
				}

				.price {
					width: 197rpx;
					height: 51rpx;
					border-radius: 5rpx 0 0 5px;
					background: #ff652b;
					color: #ffffff;
					font-size: 32rpx;
					font-weight: 500;
					letter-spacing: 0;
					padding-left: 15rpx;
					box-sizing: border-box;
					line-height: 51rpx;

					text {
						font-size: 22rpx;
					}
				}

				.buyBtn {
					width: 118rpx;
					height: 51rpx;
					border-radius: 5rpx;
					background: linear-gradient(90.00deg, #ffe18e 0%, #ffbe3b 100%);
					font-family: "PingFang SC";
					font-weight: 400;
					font-size: 24rpx;
					text-align: center;
					color: #ff652b;
					line-height: 51rpx;
				}
			}

		}

	}

	.tabs {
		width: 690rpx;
		margin: 0 auto;
		margin-top: 20rpx;

		&-item {
			padding: 10rpx 20rpx;
			color: #000;
			border-radius: 24rpx;
		}

		.active {
			background-color: rgb(252, 231, 16);
		}
	}


	.tab-view {
		width: 750rpx;
		height: 300rpx;




		.swiper-item {
			display: flex;
			width: 750rpx;
			height: 300rpx;
			align-items: center;
			justify-content: center;
		}

		.swiper-img,
		.swiper-video,
		.swiper-rectangle {
			flex: 1;
			width: 750rpx;
			height: 300rpx;
		}

	}
</style>