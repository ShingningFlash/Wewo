<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">商品收藏</block>
		</cu-custom>
		<!-- 输入框部分 -->
		<view class="district-input-box">
			<view class="district-input-warp">
				<view class="input-box">
					<u-search shape="round" :showAction="false" :clearabled="true" bgColor="#E8E8E8"
						searchIconColor="#1067C7" @search="getCollectGoodsList(0)" v-model="keyword" @clear="getCollectGoodsList(1)" ></u-search>
				</view>
			</view>
		</view>
		<!-- 推荐产品列表部分 -->
		<view class="product-list-box">
			<view class="product-list-warp">
				<!-- <view class="product-list-top-box">
					<view class="title">
						推荐商品
					</view>
					<view class="line"></view>
				</view> -->
				<view class="list-box" >
					<view class="list-warp" >
						<view class="list-item" v-for="(item,index) in goodList" :key="index"  @click="navTo('/pages/product/productDetail?id='+item.goods_id)" @longpress="HandleCollectGoods(item.goods_id,index)">
							<view class="top-img">
								<image :src="item.original_img" mode="aspectFit"></image>
							</view>
							<view class="middle-title">
								{{item.goods_name}}
							</view>
							<view class="middle-mark">
								{{item.goods_remark}}
							</view>
							<view class="bottom-price">
								<view class="flex s-center">
									<view class="left">
										<text>￥</text>15
									</view>
									<view class="mid">
										<text>￥</text>35
									</view>
								</view>
								<view class="right flex m-center s-center">
									<image src="/static/icons/icon27.png" mode=""></image>
								</view>
							</view>
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
				keyword:'',
				page:1,
				goodList:[]
			}
		},
		onLoad() {
			this.getCollectGoodsList()
		},
		onReachBottom() {
			this.page++
			this.getCollectGoodsList()
		},
		methods: {
			// 收藏
			HandleCollectGoods(goods_id,index) {
				uni.showModal({
					title:'提示',
					content:'是否取消收藏？',
					success: (res) => {
						if(res.confirm){
							let data = {}
							data.goods_id = goods_id
							
							data.status = 0
							
							this.$http.setGoodsCollect(data)
								.then(res => {
									if (res.status == 1) {
										this.goodList.splice(index,1)
										
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
				})
				
			},
			getCollectGoodsList(){
				let data = {}
				data.keyword = this.keyword
				data.page = this.page
				this.$http.getCollectGoodsList(data).then(res => {
					if (res.status == 1) {
						this.goodList = res.result.rows
						
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						})
					}
				
				})
			},
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
			
		}
	}
</script>
<style>
	page{
		background-color: #fff;
	}
</style>
<style scoped lang="scss">
	// 输入框部分
	.district-input-box {
		
		padding: 0 30rpx;
	
		.district-input-warp {
			display: flex;
			justify-content: space-evenly;
			align-items: center;
	
			.input-box {
				flex: 1;
			}
		}
	}
	
	
// 推荐产品列表部分
	.product-list-box {
		.product-list-warp {
			padding: 0rpx 30rpx;
			padding-bottom: 38rpx;

			.product-list-top-box {
				display: flex;
				flex-direction: column;
				align-items: center;


				.title {
					padding-bottom: 8rpx;
					font-family: "PingFang SC Heavy";
					font-weight: 900;
					font-size: 32rpx;
					line-height: 50rpx;
					text-align: left;
					color: #000;
				}

				.line {
					width: 51rpx;
					height: 9rpx;
					border-radius: 4.5rpx;
					background: linear-gradient(180.00deg, #c41d29 0%, #f02635 100%);
				}
			}

			.list-box {
				.list-warp {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;

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
						.middle-mark{
							font-family: "PingFang SC";
							font-weight: 400;
							font-size: 20rpx;
							padding: 0 14rpx;
							
							color: #bfbfbf;
						}

						.bottom-price {
							width: 330rpx;
							padding: 16rpx 14rpx 22rpx;
							display: flex;
							justify-content: space-between;
							align-items: baseline;
							.mid{
								font-family: "PingFang SC Medium";
								font-weight: 500;
								font-size: 18rpx;
								color: #b1b1b1;
								text-decoration: line-through;
								margin-left:10rpx;
							}
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
								background: #0360c9;
								border-radius: 50%;
								image {
									width:25rpx;
									height: 25rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
