<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-blues" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">商品列表</block>
		</cu-custom>
		<view class="search">
		
			<view class="address_item">
				<u-search searchIconColor="#1067C7" placeholder="请输入关键字" v-model="keyword" :showAction="false"
					@search="getCateGoods">
				</u-search>
			</view>
		
		</view>
		
		<view class="fenlei">
			<view class="" @click="all">
				全部
			</view>
			<view class="" style="display: flex;align-items: center;" @click="goCate">
				<text>新品</text>
					
			</view>
			<view class="" style="display: flex;align-items: center;" @click="clickUp1">
				<text>销量</text>
				<view class="main">
					<span class="arrUp" :style="{ 'border-bottom-color': color11 }"></span>
					<span class="arrDown" :style="{ 'border-top-color': color22 }"></span>
				</view>
			</view>
			<view class="" style="display: flex;align-items: center;" @click="clickUp">
				<text>价格</text>
				<view class="main">
					<span class="arrUp" :style="{ 'border-bottom-color': color1 }"></span>
					<span class="arrDown" :style="{ 'border-top-color': color2 }"></span>
				</view>
			</view>
			
		
		</view>
		<view class="prolist">
			<view style="margin-top: 20rpx;width:330rpx;" v-for="(item,index) in infoList" :key="index"
				@click="goproDetail(item.goods_id)">
				<u--image :showLoading="true" :src="item.original_img" width="330rpx" height="330rpx">
				</u--image>
				<view class="name">
					{{item.goods_name}}
				</view>
				<view class="mark">
					{{item.goods_remark}}
				</view>
				<view class="price">
					<view class="">
						￥{{item.shop_price}} <text>销量：{{item.sales_sum}}</text>
					</view>
					<view class="yuan">
						<u--image :showLoading="true" src="/static/icon/carts.png" width="20rpx" height="20rpx">
						</u--image>
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
				color1:"#1067C7",
				color2:"#ffffff",
				color11:"#1067C7",
				color22 : "#ffffff",
				infoList:[]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>

	// 搜索
	.search {
		display: flex;
		justify-content: space-between;
		padding: 0 30rpx;
		background-color: #316099;
		.address_item {
			width: 690rpx;
			height: 78rpx;
			border-radius: 39rpx;
			background: #efefef;
			display: flex;
			align-items: center;
		}

		.yuan {
			width: 67rpx;
			height: 67rpx;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
			background: #fff;
		}
	}

	.fenlei {
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: #fff;
		// margin-top: 20rpx;
		padding-top: 20rpx;
		background-color: #316099;
		padding-bottom: 20rpx;

		.main {
			display: flex;
			flex-direction: column;
			margin-left: 5rpx;
		}

		.arrUp {
			width: 0;
			height: 0;
			border-right: 5px solid transparent;
			border-left: 5px solid transparent;
			border-bottom: 5px solid gray;
			cursor: pointer;
		}

		.arrDown {
			width: 0;
			height: 0;
			margin-top: 2px;
			border-right: 5px solid transparent;
			border-left: 5px solid transparent;
			border-top: 5px solid gray;
			cursor: pointer;
		}
	}


	.prolist {
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-top: 20rpx;

		.name {
			font-weight: 700;
			font-size: 28rpx;
			color: #373737;
			margin-top: 10rpx;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}

		.mark {
			font-weight: 400;
			font-size: 20rpx;
			color: #bfbfbf;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin-top: 4rpx;
		}

		.price {
			font-weight: 500;
			font-size: 28rpx;
			color: #f00;
			margin-top: 10rpx;
			display: flex;
			justify-content: space-between;

			.yuan {
				width: 40rpx;
				height: 40rpx;
				background: #A50A11;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			text {
				font-weight: 500;
				font-size: 18rpx;
				color: #e2e2e2;
				margin-left: 22rpx;
				// text-decoration: line-through;
			}
		}
	}
</style>
