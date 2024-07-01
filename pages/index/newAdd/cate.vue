<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-gradual-wineRed" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">{{pageTitle}}</block>
		</cu-custom>
		<!-- <view class="search">

			<view class="address_item">
				<u-search searchIconColor="#A5ABB7" placeholder="请输入关键字" v-model="keyword" :showAction="false">
				</u-search>
			</view>
		</view> -->

		<view class="brand_content">
			<!-- 左侧分类 -->
			<view class="left_cate">
				<scroll-view scroll-y="true" :style="'height:'+clentHeight+'px'">
					<view class="item_cate" :class="current == index ? 'active' : ''" v-for="(item,index) in cateList"
						:key="index" @click="changeTab(index)">
						{{item.name}}
					</view>
				</scroll-view>

			</view>
			<!-- 右侧内容 -->

			<scroll-view class="right_content" scroll-y="true" :style="'height:'+clentHeight+'px'">
				<view class="box">
					<image :showLoading="true" :src="infoList.image" style="width:570rpx;height: 165rpx;">
					</image>
				</view>
				<view class="box2">
					<view class="item" v-for="(item,index) in infoList.son" :key="index" @click="goZhuanqu(item.id)">
						<image  :src="item.image" 
							style="border: 1rpx solid #EBEBEB;">
						</image>
						<view class="name">
							{{item.name}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				clentHeight: 0,
				current: 0,
				cateList: [],
				infoList: {},
				pageTitle:'商城商品',
				type:3
			}
		},
		onLoad(e) {
			this.type = e.type
			if(e.type == 3){
				this.GoodscCateList()
				
			}
			if(e.type == 7){
				
				this.getGiftCateList()
				this.pageTitle = '礼品区'
			}
			
		},
		methods: {
			goZhuanqu(id){
				uni.navigateTo({
					url:'/pages/index/newAdd/goodsPage?type='+ this.type+'&id='+id
				})
			},
			changeTab(index) {
				this.current = index
				this.infoList = this.cateList[index]
			},
			// 获取头部高度
			getClientHeight() {
				const res = uni.getSystemInfoSync();
				const system = res.platform;
				if (system === 'iso') {
					return 44 + res.statusBarHeight;
				} else if (system === 'android') {
					return 48 + res.statusBarHeight;
				} else {
					return 0;
				}

			},
			GoodscCateList() {
				this.$httpRequest({
					url: 'GoodscCateList'
				}, '').then(res => {
					if (res.status == 1) {
						this.cateList = res.result
						this.infoList = res.result[0]


					}
				})
			},
			getGiftCateList(){
				let data ={}
				data.type = 1
				this.$httpRequest({
					url: 'getGiftCateList'
				}, data).then(res => {
					if (res.status == 1) {
						this.cateList = res.result
						this.infoList = res.result[0]
				
				
					}
				})
			}
		},
		onReady() {
			// 获取可视高度
			uni.getSystemInfo({
				success: (res) => {
					// 可视区域高度 减去头部高度  
					this.clentHeight = res.windowHeight - this.getClientHeight();
				}
			})
		}
	}
</script>

<style scoped lang="scss">
	// 搜索
	.search {
		display: flex;
		justify-content: space-between;
		padding: 0rpx 30rpx;
		background: rgb(212,18,31);
		padding-bottom: 26rpx;
		padding-top: 26rpx;
		

		.address_item {
			width: 690rpx;
			height: 78rpx;
			border-radius: 39rpx;
			background: #efefef;
			display: flex;
			align-items: center;
		}
	}

	.brand_content {
		display: flex;
		justify-content: space-between;

		// 左侧分类
		.left_cate {
			display: flex;
			flex-direction: column;
			width: 180rpx;
			background-color: #F1F5FD;

			.item_cate {
				padding: 30rpx 40rpx;
				box-sizing: border-box;
				font-size: 24rpx;
				color: #AFB9C5;

			}

			.active {
				background-color: #fff;
				color: #FD7B26;
				position: relative;

				&::after {
					content: " ";
					position: absolute;
					transform: translateY(-50%);
					width: 10rpx;
					height: 36px;
					border-radius: 0 6rpx 6rpx 0;
					right: 0;
					// top: 50%;
					background-color: #fff;
					// -webkit-transform-origin: 0 0;
					transform-origin: 0 0;
					-webkit-transform: scaleY(0.5);
					transform: scaleY(0.5);



				}
			}

		}

		// 右侧内容
		.right_content {
			width: 570rpx;
			display: flex;
			flex-wrap: wrap;
			box-sizing: border-box;
			padding: 0rpx 30rpx;

			.item {
				// float: left;
				// width: 130rpx;
				padding: 0 20rpx;
				margin-top: 30rpx;


				.name {
					font-size: 26rpx;
					color: #2a2a2a;
					margin-top: 20rpx;
					text-align: center;
				}
			}

			.box2 {
				display: grid;
				grid-template-columns: repeat(3,1fr);
				image{
					width:130rpx;
					height: 130rpx;
				}
			}

			.box {

				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 30rpx;


				.title {
					font-weight: 700;
					font-size: 30rpx;
					color: #2c2f46;
				}

				.jj {
					font-weight: 400;
					font-size: 24rpx;
					color: #a4a4a4;
					overflow: hidden;
					/* 超出一行文字自动隐藏 */
					text-overflow: ellipsis;
					/*文字隐藏后添加省略号*/
					white-space: nowrap;
					margin-top: 12rpx;
				}
			}

		}
	}
</style>