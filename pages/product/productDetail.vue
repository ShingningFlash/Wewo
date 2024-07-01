<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">商品详情</block>
		</cu-custom>
		
		<swiper :autoplay="swiperAutoplay" @change="swiperChange" style="border-radius: 15rpx;height: 1000rpx;">
			<swiper-item v-for="(item, index) in list1" :key="index">
				<view v-if="isImage(item)">
					<image :src="item" mode="aspectFit" style="width: 100%; height:1000rpx;"></image>
				</view>
				<view v-else-if="isVideo(item)">
					<video :src="item" controls="true" style="width: 100%; height:1000rpx;"
						ref="video0"  @ended="videoEnded" @play="videoPlay" @pause="videoPause"></video>
				</view>
			</swiper-item>
		</swiper>
		
		<!-- 详情x -->
		<view class="box1 ">
			<view class="left ">
				<view class="csss">
					{{range.goods_name}}
				</view>
				<view class="">
					<text>库存：{{filter_spec_goods_price_stock}}</text>
					<text style="margin-left: 50rpx;">
						销量：{{range.sales_sum}}</text>
				</view>
			</view>

			<view class="right">
				<view class="price">
					<text>￥</text>{{filter_spec_goods_price_cost}}
				</view>
				<view class="sale" v-if="is_vip != 0 && range.is_special == 0">
					佣金：{{range.commission}}
				</view>
			</view>
		</view>
		<view class="detail_x">
			{{range.goods_remark}}
		</view>
		<!-- 规格 -->
		<!-- <view class="detail_a" style="padding-right: 45rpx;">
			<view class="item" v-for="(item,index) in filter_spec" :key="index">
				<view class="" style="white-space: nowrap;">
					{{item.name}}
				</view>
				<view class="" style="display: flex;flex-wrap: wrap;">
					<view class="item_box" v-for="(items,indexs) in item.item" :key="indexs"
						:class="items.isIndex ? 'active' :''" @click="choose(index,indexs)">
						{{items.item}}
					</view>
				</view>
			</view>
			<view class="item" style="margin-top: 20rpx">
				<view class="">
					数量
				</view>
				<view class="" style="margin-left: 30rpx;">
					<u-number-box v-model="value">
						<view class="minus" slot="minus">
							<u-icon name="minus" size="12"></u-icon>
						</view>
						<text slot="input" style="width: 50rpx;text-align: center;" class="input">{{value}}</text>
						<view class="plus" slot="plus">
							<u-icon name="plus" color="#FFFFFF" size="12"></u-icon>
						</view>
					</u-number-box>
				</view>
			</view>
		</view> -->
		<!-- 服务说明 -->
		<view class="flex m-between s-center" style="background-color: #fff;padding-right: 45rpx;" v-if="range.parameter_sm != ''">
			<scroll-view :scroll-x="true" class="parameter_sm">
				<view class="flex flex-col s-center item" v-for="(item, index) in range.parameter_sm" :key="index">
					<image :src="item.icon" style="width: 60rpx;height: 60rpx;"></image>
					<view class="" style="color: rgb(81,81,81);font-size: 22rpx;margin-top: 5rpx;">
						{{item.title}}
					</view>
					<view class="" style="font-weight: bold;margin-top: 8rpx;">
						{{item.content}}
					</view>
				</view>

			</scroll-view>
			<u-icon name="arrow-right"></u-icon>
		</view>

		<view class="carry flex ">
			<image src="/static/icons/icon34.png" style="width: 50rpx;height: 45rpx;margin-right:30rpx"></image>
			<view class="">
				<view class="">
					<text style="font-weight: bold;font-size: 28rpx;">{{range.province}}{{range.city}}</text>
					<text style="margin-left:30rpx;">快递：{{range.is_free_shipping == 1 ? '包邮' : range.ship_num}}</text>
				</view>

				<view class="" style="margin-top:10rpx">
					{{range.goods_status}}, 现在付款, {{range.send_time}}
				</view>
			</view>

		</view>

		<!-- <view class="pinjia">
			<view class="top">
				<view class="top_left">
					用户评价（{{pinlunList.count}}）
				</view>
				<view class="top_right">
					<text>96%</text>好评
				</view>
			</view>
			<view class="list">
				<u-scroll-list :indicator="false">
					<view class="scrll_list" style="margin-right: 30rpx;" v-for="(item,index) in pinlunList.commentList"
						:key="index">
						<view class="box1">
							<view class="box1-1">
								<u--image :showLoading="true" :src="item.head_pic ? item.head_pic:''" width="55rpx"
									height="55rpx" shape="circle"></u--image>
								<view class="" style="margin-left: 15rpx;">
									<view class="name">{{item.username}}</view>
									<view class="rate">
										<u-rate :count="5" v-model="item.goods_rank" :readonly="true" size="15"
											activeColor="#E78313">
										</u-rate>
									</view>
								</view>
							</view>
							<view class="box1-2">
								{{item.content}}
							</view>
						</view>
						<view class="box2">
							<u--image :showLoading="true" :src="item.img[0]" width="206rpx" height="206rpx">
							</u--image>
						</view>
					</view>

				</u-scroll-list>
			</view>

			<view class="btn_look" @click="lookPinlun">
				查看全部评论
			</view>
		</view> -->
		<!-- 服务 -->
		<view class="detail_a" @click="show = !show">

			<view class="item" style="margin-top: 20rpx;justify-content: space-between;">
				<view class="flex">
					<u-icon name="heart" size="28" ></u-icon>
					<view class="flex flex-col" style="width: 460rpx;margin-left: 30rpx;">
						<view class="" style="display: flex;align-items: center;margin-top: 15rpx;"
							v-for="(item,index) in range.service_sm" :key="index">
							<text style="font-weight: 400;">{{item.title}}</text>
						</view>
					
					</view>
				</view>
				<view class="">
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>

		</view>



		<!-- <view class="detail_y">
			<view class="title">
				规格参数
			</view>
			<view class="y_title" v-for="(item,index) in guigecanshu" :key="index">

				<view class="left">{{item.title}}</view>
				<view class="right">{{item.content}}</view>
			</view>


			<view class="btn" @click="lookpara">
				查看全部参数
			</view>

		</view> -->
		<u-parse :content="range.goods_content" :lazyLoad="true"></u-parse>
		<!-- <movable-area scale-area>
			
			<movable-view direction="vertical" :scale="true" scale-min="1" scale-max="3" style="width:750rpx;"
				:style="{height:autoHeight+'px'}" :inertia="true">

				<view class="mov" style="width:750rpx;box-sizing: border-box;">
					<rich-text  :nodes="range.goods_content"></rich-text>

				</view>
			</movable-view>

		</movable-area> -->
		<!-- 服务弹出层 -->
		<u-popup :show="show" @open="open" @close="show = false" round="10">
			<view class="pop">
				<view class="login_register">
					<view class="tab" v-for="(item,index) in tabList" :key="index"
						:class="currents == index ? 'active': ''" @click="change(index)">
						{{item}}
					</view>
				</view>
				<view class="item"
					style="margin-top: 20rpx;align-items: baseline;display: flex;margin-bottom: 20rpx;flex-direction: column;">
					<view class="" style="margin-left: 30rpx;" v-for="(item,index) in range.service_sm" :key="index">
						<view class="" style="display: flex;align-items: center;margin-top:10rpx;">
							
							<text style="font-size: 26rpx;font-weight: 400;">{{item.title}}</text>
						</view>
						<view class=""
							style="font-weight: 400;font-size: 26rpx;line-height: 40rpx;color: #929292;margin-top: 10rpx;">
							{{item.content}}
						</view>
					</view>

				</view>
				<view class="btns" @click="show = !show">
					我知道了
				</view>
			</view>
		</u-popup>

		<!-- 点击购买、加入购物车弹窗 -->
		<u-popup :show="show1" @open="open" @close="show1 = false" round="10">
			<view class="add">
				<view class="" style="height:185rpx">

				</view>
				<view class="item" style="border-bottom: 1rpx solid #ccc;padding-bottom: 30rpx;width: 100%;">
					<u--image :showLoading="true" :src="currentImage" width="226rpx" height="226rpx"
						@click="pre"></u--image>
					<view class="" style="margin-left: 30rpx;">
						<view class="prcie">
							<text class="text1">￥</text>{{filter_spec_goods_price_cost}}<text class="text2"
								style="margin-left: 10rpx;text-decoration: line-through;">￥{{filter_spec_goods_price}}</text>
						</view>
						<view class="sale_stock">
							销量：{{range.sales_sum}} 库存：{{filter_spec_goods_price_stock}}

						</view>
					</view>
				</view>
				<view class="" style="margin-left: 30rpx;" v-for="(item,index) in filter_spec" :key="index">
					<view class="" style="white-space: nowrap;font-size: 30rpx;font-weight: 700;margin-top: 47rpx;">
						{{item.name}}
					</view>
					<view class="" style="display: flex;flex-wrap: wrap;margin-top: 30rpx;">

						<view class="flex" style="flex-wrap: wrap">


							<view class="item_box" v-for="(items,indexs) in item.item" :key="indexs"
								:class="items.isIndex? 'active' :''" @click="choose(index,indexs)" v-if="!items.img">

								{{items.item}}

							</view>

							<view class="flex s-center" v-else
								style="text-align: center;margin-right: 10rpx;margin-top: 10rpx;padding: 10rpx 20rpx;background-color: #efefef;border-radius: 12rpx;"
								@click="choose(index,indexs,items.img)" :class="items.isIndex? 'actived' :''">
								<image :src="items.img" style="width: 45rpx;height: 45rpx;"
									v-if="items.img && items.img != ''"></image>
								<view class="" style="margin-left:10rpx">
									{{items.item}}
								</view>
							</view>

						</view>

					</view>
				</view>
				<view class="box" style="margin-top: 20rpx">
					<view class="">
						数量
					</view>
					<view class="" style="margin-left: 30rpx;">
						<u-number-box v-model="value">
							<view class="minus" slot="minus">
								<u-icon name="minus" size="12"></u-icon>
							</view>
							<text slot="input" style="width: 50px;text-align: center;" class="input">{{value}}</text>
							<view class="plus" slot="plus">
								<u-icon name="plus" color="#FFFFFF" size="12"></u-icon>
							</view>
						</u-number-box>
					</view>
				</view>
				<view class="btn" style="margin-top: 30rpx;margin-left: 30rpx;background: #33629C;" @click="addCart">
					加入购物车
				</view>
				<view class="btn" style="margin-top: 30rpx;margin-left: 30rpx;background-color: #C10808;"
					@click="verifyOrder">
					立即购买
				</view>
			</view>
		</u-popup>
		<view class="" style="width: 100%;height:150rpx;">

		</view>

		<!-- 底部栏 -->
		<view class="footer">

			<button open-type="share" class="footer_item" v-if="is_vip != 0">
				<image style="width: 40rpx;height: 32rpx;" src="/static/icons/icon33.png" mode=""></image>
				<view class="text">
					分享
				</view>
			</button>



			<view class="footer_item" @click="HandleCollectGoods">
				<image style="width: 40rpx;height: 38rpx;" src="/static/icons/icon32.png" mode=""
					v-if="range.is_collect == 1"></image>
				<image style="width: 40rpx;height: 38rpx;" src="/static/icons/icon31.png" mode="" v-else></image>
				<view class="text" style="height:30rpx;">
					收藏
				</view>
			</view>
			<view class="footer_item" @click="navTo('/pages/cart/cart')">
				<image style="width: 35rpx;height: 35rpx;" src="/static/icons/icon25.png" mode=""></image>
				<view class="text" style="height:30rpx;">
					购物车
				</view>
			</view>
			<view class="flex s-center" style="gap: 15rpx;">
				<view class="footer_btn1" @tap="addCart">
					加入购物车
				</view>
				<view class="footer_btn2" @tap="show1 = !show1">
					立即购买
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		refs: {
			image: null,
		},
		data() {
			return {
				swiperAutoplay: true,
				autoplayTimer: null,
				currentIndex: 0,
				currentImage: '',
				is_vip: 0,
				list1: [

				],
				currentPage: 0,
				currents: 0,
				pinlunList: [],
				range: [],
				guigeList: [],
				spec_obj: [], // 商品规格组合起来的详情信息
				level: 0,
				current: 0,
				show: false,
				show1: false,
				value: 1,
				filter_spec: [],
				specList: [],
				test: [],
				filter_spec_id: [],
				filter_spec_goods_price: 0,
				filter_spec_goods_price_cost: 0,
				filter_spec_goods_price_sale: 0,
				fuwuList: [],
				guigecanshu: [],
				filter_spec_goods_price_stock: 0,
				goods_id: '',
				fuwuList2: [],
				tabList: ['服务说明'],
				pinlunList: {},
				autoHeight: 0,

			}
		},
		onShareAppMessage() {
			return {
				title: this.range.goods_name,
				path: '/pages/index/index?id=' + this.goods_id + '&lou=1',
				imageUrl: this.list1[0]
			}
		},
		onShareTimeline() {
			return {
				title: this.range.goods_name,
				path: '/pages/index/index?id=' + this.goods_id + '&lou=1',
				imageUrl: this.list1[0]
			}
		},
		onLoad(e) {
			if (uni.getStorageSync('is_vip')) {
				this.is_vip = uni.getStorageSync('is_vip')
			}
			if (e.id) {
				this.goods_id = e.id
				// this.getTrueGoodsComment(e.id)
				// this.ServiceExplain(e.id)
				// getServiceExplain(1)
				let data = {}
				data.goods_id = e.id


				this.$http.getGoodsInfo(data).then((res) => {
						if (res.status == 1) {
							res.result.goods_content = this.textRach(res.result.goods_content)
							this.range = res.result
							let that = this
							// this.$nextTick(() => {
							// 	setTimeout(function() {
							// 		uni.createSelectorQuery().select('.mov').boundingClientRect(
							// 			function(rect) {
							// 				// rect.height即为目标元素的高度
							// 				console.log(rect.height, "gaodu");
							// 				that.autoHeight = rect.height

							// 			}).exec();

							// 	}, 1500);

							// })

							this.list1 = res.result.goods_images
							if (res.result.video_url != false && res.result.video_url != '') {
								this.list1.unshift(res.result.video_url)
							}

							this.Goodspec(e.id)
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
					.catch((error) => {

						uni.showToast({
							title: "请求错误，请重试~",
							icon: "none",
							duration: 2000,
						});
					});



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
				console.log('Current index:', this.currentIndex);
			},
			pre() {
				uni.previewImage({
					urls: [this.currentImage]
				})
			},
			changeS(e){
				console.log(e);
				this.$nextTick(() => {
					if(this.currentPage != 0){
						if (this.currentPage == this.list1.length - 1) {
							this.currentPage = 0
						} else {
							this.currentPage += 1
						}
					}
					
				})
			},
			playEnded() {
				this.$nextTick(() => {
					if (this.currentPage == this.list1.length - 1) {
						this.currentPage = 0
					} else {
						this.currentPage += 1
					}
				})
				//this.stopVideo(this.currents)
			},
			navTo(url) {
				uni.switchTab({
					url: url
				})
			},
			lookPinlun() {
				uni.navigateTo({
					url: '/pages/productDetail/evaluate?id=' + this.goods_id
				})
			},
			// 评论
			getTrueGoodsComment(id) {
				console.log("到这");
				let data = {}
				data.goods_id = id
				this.$httpRequest({
					url: 'TrueGoodsComment'
				}, data).then(res => {
					if (res.status == 1) {
						this.pinlunList = res
					}
				})
			},
			// 服务
			ServiceExplain(id) {

				let data = {}
				data.goods_id = id
				this.$httpRequest({
					url: 'ServiceExplain'
				}, data).then(res => {
					if (res.status == 1) {
						this.fuwuList2 = res.result
					}
				})
			},
			Goodspec(id) {
				var that = this
				let data = {}
				data.goods_id = id


				this.$http.getGoodsSpec(data).then((res) => {
					if (res.status == 1) {
						this.test = res.result.spec_goods_price
						this.specList = []
						this.filter_spec = res.result.goods_speca

						this.test = Object.values(this.test)
						console.log(that.filter_spec);
						that.filter_spec.forEach((item) => {
							item.item.forEach((items, index) => {
								if (index == 0) {
									items.isIndex = true

								} else {
									items.isIndex = false
								}


							})
						})
						this.choose(0, 0)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})


			},
			change(e) {
				this.currents = e
			},
			TrueGoodsComment() {

			},
			back() {
				uni.navigateBack()
			},
			changegui(e) {
				this.current = e
			},
			open() {},
			// 立即购买
			verifyOrder(merch_id) {
				if (this.filter_spec_goods_price_stock == 0) {
					return uni.showToast({
						title: '商品库存不足',
						icon: 'none',
						duration: 2000
					})
				}
				if (!uni.getStorageSync('token')) {
					uni.showModal({
						title: '提示',
						content: '当前未登录，是否前往登录？',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/mine/mine'
								})
							}
						}
					})
				} else {

					let specKey = this.filter_spec_id.join('_')
					uni.navigateTo({
						url: '/pages/product/confirmOrder?item_id=' + specKey + '&goods_num=' +
							this.value +
							'&goods_id=' + this.goods_id + "&merch_id=" + this.range.merch_id
					})
				}
			},
			// 匹配价格和库存
			choose(index, indexs, img) {
				if (img) {
					this.currentImage = img
				}

				this.filter_spec.forEach((item, idx) => {
					if (index == idx) {
						item.item.forEach((items, idxs) => {
							if (idxs == indexs) {
								// specList.value.splice(index, 1, items.id)
								// console.log(specList.value, "添加后");
								items.isIndex = true
							} else {
								items.isIndex = false
							}
						})
					}
				})
				const selectedItemId = this.filter_spec
					.map(obj => obj.item) // 把每个item取出来
					.flat() // 将数组平展为单个数组
					.filter(item => item.isIndex) // 过滤选择的item
					.map(item => item.id); // 获取每个 选择项的id 

				const result = this.test.reduce((acc, obj) => {
					const keyIds = obj.key.split('_'); // 把key值剔除_ 转变为数组

					const itemIdsToMatch = keyIds.map(id => parseInt(id)); //  把id 转变成 整数类型
					const matchingIds = keyIds.filter((id, index) => id == selectedItemId[index]); // 匹配每一项是否一致
					if (matchingIds.length === itemIdsToMatch.length) { // 如果一致时return 出去
						acc.push(obj);
						return acc;
					}
					return acc;
				}, []);

				result.forEach((item) => {
					this.filter_spec_id = item.key.split('_')
					this.filter_spec_goods_price = item.scribe_price
					this.filter_spec_goods_price_cost = item.price
					this.filter_spec_goods_price_sale = item.sales_sum
					this.filter_spec_goods_price_stock = item.store_count
					this.currentImage = item.spec_img
					console.log(item.store_count, "库存");

				})
				console.log(result, 'result');
				console.log(this.filter_spec_id, 2);
				this.filter_spec = JSON.stringify(this.filter_spec)
				this.filter_spec = JSON.parse(this.filter_spec)

			},
			textRach(textArea) {
				let text = textArea
					.replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/gi, '<p')
					.replace(
						/<p>/gi,
						'<p style="font-size: 15px; line-height: 25px;">'
					)
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)/gi, '<img style="width: 100%;display:block" $1')
				return text
			},
			// 加入收藏
			addCart() {
				if (this.filter_spec_goods_price_stock == 0) {
					return uni.showToast({
						title: '商品库存不足',
						icon: 'none',
						duration: 2000
					})
				}
				if (!uni.getStorageSync('token')) {
					uni.showModal({
						title: '提示',
						content: '当前未登录，是否前往登录？',
						success: (res) => {
							if (res.confirm) {
								uni.navigateTo({
									url: '/pages/mine/mine'
								})
							}
						}
					})
				} else {

					let specKey = this.filter_spec_id.join('_')


					let data = {}
					data.goods_id = this.goods_id * 1
					data.item_id = specKey
					data.goods_num = this.value

					this.$http.setAddCart(data).then(res => {
						if (res.status == 1) {
							uni.showToast({
								title: res.msg
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
			// 收藏
			HandleCollectGoods() {
				let data = {}
				data.goods_id = this.goods_id
				if (this.range.is_collect == 1) {
					data.status = 0
				} else {
					data.status = 1
				}
				this.$http.setGoodsCollect(data)
					.then(res => {
						if (res.status == 1) {
							this.range.is_collect = data.status
							uni.showToast({
								title: res.msg
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none'
							})
						}
					})
			}


		}
	}
</script>

<style lang="scss" scoped>
	.minus {
		width: 22px;
		height: 22px;
		border-width: 1px;
		border-color: #DBDBDB;
		border-style: solid;
		border-top-left-radius: 100px;
		border-top-right-radius: 100px;
		border-bottom-left-radius: 100px;
		border-bottom-right-radius: 100px;
		@include flex;
		justify-content: center;
		align-items: center;
	}

	.input {
		padding: 0 10px;
	}

	.plus {
		width: 22px;
		height: 22px;
		background-color: #356AAA;
		border-radius: 50%;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
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

	/* 背景图片 */
	.index_bg {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
	}

	.list {
		background-color: #fff;

		.scrll_list {
			border: 1rpx solid #d4d4d4;
			border-radius: 12rpx;
			width: 626rpx;
			height: 253rpx;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			background-color: #fff;
		}

		.box1 {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.box1-1 {
				display: flex;

				.name {
					font-weight: 400;
					font-size: 20rpx;
					color: #000;
				}


			}

			.box1-2 {
				display: flex;
				flex-direction: column;
				width: 306rpx;
				font-weight: 400;
				font-size: 24rpx;
				color: #000;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			.box2 {}
		}


	}




	// 弹窗
	.login_register {
		display: flex;
		color: #fff;
		align-items: center;
		justify-content: space-evenly;

		.tab {
			font-family: "SourceHanSansCN-Medium ";
			font-weight: 700;
			font-size: 30rpx;
			letter-spacing: 0.04rpx;
			line-height: 74.4rpx;
			color: #000;

		}

		.active {
			position: relative;
			color: #000000;

			&::after {
				content: " ";
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 0rpx;
				width: 62rpx;
				height: 9rpx;
				left: 0;
				right: 0;

				margin: auto;
				background-color: #E01E2C;
				-webkit-transform-origin: 0 0;
				transform-origin: 0 0;
				-webkit-transform: scaleY(0.5);
				transform: scaleY(0.5);
			}
		}
	}

	.pop {
		padding: 0 30rpx;
		box-sizing: border-box;
		min-height: 70vh;
		position: relative;
	}

	.btn {
		width: 690rpx;
		height: 90rpx;
		border-radius: 45rpx;
		background: #fd7b26;
		line-height: 90rpx;
		text-align: center;
		font-weight: 400;
		font-size: 30rpx;
		color: #fff;

		margin-top: 30rpx;
	}

	.btns {
		width: 690rpx;
		height: 82rpx;
		border-radius: 35rpx;
		background: #33629C;
		line-height: 82rpx;
		text-align: center;
		font-weight: 400;
		font-size: 30rpx;
		color: #fff;
		position: absolute;
		bottom:0rpx;
		left:50%;
		transform: translateX(-50%);
	}

	// 状态栏和导航栏高度
	.nav_bg_g {
		display: flex;
		// padding: 0 30rpx;
		box-sizing: border-box;
		background: transparent;
		text-align: left;
		align-items: flex-end;
		padding-bottom: 15rpx;
		// justify-content: center;
		width: 100%;
		font-family: "PingFang SC Bold";
		font-weight: bold;
		font-size: 36rpx;
		color: #fff;
		position: fixed;
		z-index: 3;

	}

	.box1 {
		display: flex;

		.left {
			width: 561rpx;
			// height: 123rpx;
			background: #356AAA;
			// display: flex;
			flex-wrap: wrap;
			padding: 30rpx 20rpx;
			box-sizing: border-box;
			align-items: center;
			// justify-content: center;.
			font-weight: 700;
			font-size: 30rpx;
			color: #fff;

			.csss {
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
			}

			text {
				font-family: "PingFang SC Medium";
				font-weight: 500;
				font-size: 20rpx;
				text-align: left;
				color: #fff;
				opacity: 0.75;
			}
		}

		.right {
			width: 189rpx;
			// height: 123rpx;
			background-color: #73A0F7;
			// background: url('/static/icon/shop_price.png') no-repeat center/cover;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.price {
				font-family: "DIN Bold";
				font-weight: 700;
				font-size: 38rpx;
				color: #FFEE00;

				text {
					font-weight: 700;
					font-size: 26px;
					font-size: 26rpx;
					color: #FFEE00;
				}
			}

			.sale {
				font-family: "PingFang SC Medium";
				font-weight: bold;
				font-size: 26rpx;
				color: #FF0000;
				margin-top: 5rpx;

			}
		}
	}

	// 详情1
	.detail_x {
		box-sizing: border-box;
		padding: 30rpx;
		background-color: #fff;
		font-weight: 400;
		font-size: 24rpx;
		line-height: 50rpx;
		color: #9b9b9b;


	}

	.add {
		width: 690rpx;
		position: relative;
		padding-bottom: 40rpx;

		.box {
			display: flex;
			margin-left: 30rpx;
			align-items: center;
			justify-content: space-between;
			border-top: 1rpx solod #ccc;
			padding-top: 20rpx;
		}

		.item {
			display: flex;
			align-items: center;
			position: absolute;

			top: -45rpx;
			margin-left: 30rpx;

		}

		.item_box {
			// width: 144rpx;
			// height: 58rpx;
			padding: 5rpx 20rpx;
			background-color: #EFEFEF;
			border-radius: 8rpx;
			margin-right: 10rpx;
			// line-height: 58rpx;
			text-align: center;
			margin-top: 10rpx;
			color: #2A2A2A;
			font-family: "PingFang SC Medium";
			font-weight: 500;
			font-size: 28rpx;

		}

		.active {
			background: #356AAA;
			color: #fff;

		}

		.actived {
			border: 2rpx solid #ff0000;
			color: #ff0000;
			background: rgba(255, 0, 0, 0.6);
		}
	}

	.detail_a {
		background-color: #fff;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		margin-top: 20rpx;

		.item {
			display: flex;
			align-items: center;
			
		}

		.item_box {
			// width: 162rpx;
			// height: 64rpx;
			padding: 5rpx 15rpx;
			border-radius: 32rpx;
			background: #fff;
			border: 2rpx solid #356AAA;
			// line-height: 64rpx;
			text-align: center;
			margin-left: 30rpx;
			color: #356AAA;
			font-weight: 500;
			font-size: 28rpx;
			margin-top: 10rpx;

		}

		.active {
			background: #356AAA;
			color: #fff;

		}
	}

	.detail_y {
		box-sizing: border-box;
		padding: 30rpx;
		background-color: #fff;
		margin-top: 30rpx;

		.title {
			font-weight: 700;
			font-size: 30rpx;
			color: #000;
		}

		.y_title {
			display: flex;
			font-weight: 400;
			font-size: 26rpx;
			margin-top: 25rpx;

			.left {
				color: #434343;
				white-space: nowrap;
			}

			.right {
				color: #000000;
				margin-left: 54rpx;
			}
		}

		.btn {
			width: 303rpx;
			height: 75rpx;
			margin: 0 auto;
			border-radius: 37.5rpx;
			background: #fff;
			border: 1rpx solid #707070;
			line-height: 75rpx;
			font-weight: 400;
			font-size: 28rpx;
			text-align: center;
			color: #000;
			margin-top: 55rpx;
		}


	}

	.pinjia {
		padding: 40rpx 30rpx;
		box-sizing: border-box;
		background-color: #fff;
		margin-top: 30rpx;

		.btn_look {
			width: 303rpx;
			height: 75rpx;
			border-radius: 37.5rpx;
			background: #fff;
			border: 1rpx solid #707070;
			line-height: 75rpx;
			text-align: center;
			margin: 0rpx auto;
			margin-top: 30rpx;
			font-weight: 400;
			font-size: 28rpx;
			color: #000;
		}

		.top {
			display: flex;
			justify-content: space-between;
			margin-bottom: 30rpx;

			.top_left {
				font-weight: 700;
				font-size: 30rpx;
				color: #000;
			}

			.top_right {
				text {
					color: rgba(255, 0, 0, 1);
					font-weight: 400;
				}

				color: rgba(0, 0, 0, 1);
				font-size: 24rpx;
				font-weight: 400;
				letter-spacing: 0;


			}
		}
	}

	// 底部
	.footer {
		width: 100%;
		height: 150rpx;
		padding: 30rpx;
		background-color: #fff;
		box-shadow: 0 3rpx 12rpx rgba(0, 0, 0, 0.16);
		position: fixed;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		gap: 40rpx;

		.footer_item {
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-color: #fff;


			&::after {
				border: none;
			}

			.text {
				font-weight: 400;
				font-size: 20rpx;
				color: #616161;
				margin-top: 5rpx;
				font-family: "PingFang SC";
				white-space: nowrap;

			}

		}

		.footer_btn1 {
			width: 220rpx;
			height: 80rpx;
			border-radius: 40rpx;
			background: #33629C;
			text-align: center;
			line-height: 80rpx;
			color: #fff;
			;

		}

		.footer_btn2 {
			width: 204rpx;
			height: 80rpx;
			border-radius: 40rpx;
			background: #C10808;
			text-align: center;
			line-height: 80rpx;
			color: #fff;

		}
	}

	.parameter_sm {
		white-space: nowrap;
		/* 滚动必须加的属性 */
		width: 670rpx;
		background-color: #fff;
		padding: 20rpx 45rpx;

		.item {
			display: inline-flex;
			margin-right: 100rpx;
		}

		.item:last-child {
			margin-right: 0rpx;
		}
	}

	.carry {
		padding: 20rpx 30rpx;
		background-color: #fff;
	}
</style>