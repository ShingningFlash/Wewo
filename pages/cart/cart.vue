<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-blues" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">购物车</block>
		</cu-custom>
		<!-- 蓝色背景 -->
		<view class="background"></view>
		<!-- 管理商品部分 -->
		<view class="edit" @click="delShowFun">
			<view class="editIcon">
				<image src="/static/icons/icon17.png"></image>
			</view>
			<view class="text">管理商品</view>
		</view>
		<!-- 购物车商品列表部分 -->
		<view class="list" v-if="cartList != ''">
			<view class="listBox" v-for="(item,index) in cartList" :key="index" >
				<view class="listCheckBox" @click="CartChangeInfo(item.id,item.selected,item.goods_num,index,'choose')">
					<radio :checked="item.selected == 1" color="#E41F2C" style="transform:scale(0.7)" />
				</view>
				<view class="listCtn">
					<image :src="item.original_img"></image>
				</view>
				<view class="listRgt">
					<view class="listRgtName">{{item.goods_name}}</view>
					<view class="listRgtNum">{{item.spec_key_name}}</view>
					<view class="listBtm">
						<view class="btmLeft">
							<view class="goods-price">
								<text class="text1">￥</text><text class="text2">{{item.market_price}}</text>
							</view>
						</view>
						<view class="btmRgt">
							<view :class="item.goods_num == 1 ? 'active subtract':'subtract'" @click="CartChangeInfo(item.id,item.selected,item.goods_num,index,'sub')">-</view>
							<view class="num">{{item.goods_num}}</view>
							<view class="add" @click="CartChangeInfo(item.id,item.selected,item.goods_num,index,'add')">+</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 列表为空 -->
			<!-- <u-empty mode="car" icon="http://cdn.uviewui.com/uview/empty/car.png">
			</u-empty> -->
		</view>
		<view class="null-box"></view>

		<!-- 底部操作栏部分 -->
		<view class="btmTab">
			<view class="leftRadio" @click="CartChangeAll">
				<radio :checked="allChoose" color='#1067C7' style="transform:scale(0.7)"  />全选
			</view>
			<view class="ctnNum" v-if="!delShow">
				<text class="text1">合计：</text>
				<text class="text2">¥</text>
				<text class="text3">{{allprice}}</text>
			</view>
			<view class="rgtBtn" v-if="!delShow" @click="goPay">结算（{{cartList.length}}）</view>
			<view class="rgtBtn" v-if="delShow" @click="CartDelete">删除</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				delShow: false, // 删除单选框按钮标识
				cartList:[] ,//购物车列表
				allprice:0
			};
		},
		computed:{
			allChoose:function(){
				if(this.cartList != ''){
					return this.cartList.every(item => item.selected)
				}
				
			},
			
			
		},
		
		methods: {
			// 全选
			CartChangeAll(){
				let data= {}
				if(this.allChoose){
					data.is_select = 0
				}
				else{
					data.is_select = 1
				}
				this.$http.setCartChangeAll(data).then(res => {
					if (res.status == 1) {
						
						this.cartList.forEach(item => item.selected = data.is_select)
						this.allprice = res.result.allprice
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			// 删除
			CartDelete(){
				
				let ids = []
				this.cartList.forEach((item=>{
					if(item.selected == 1){
						ids.push(item.id)
					}
				}))
				ids = ids.join(',')
				uni.showModal({
					title: '提示',
					content: '是否移除选中商品出购物车？',
					success: (res) => {
						if (res.confirm) {
							if(ids.length != 0){
								let data = {}
								data.ids = ids
								this.$http.setCartDelete(data).then(res => {
									if (res.status == 1) {
										uni.showToast({
											title:res.msg,
											icon:'none'
										})
										setTimeout(()=>{
											this.CartAllList()
										},1000)
										
									} else {
										uni.showToast({
											title: res.msg,
											icon: 'none'
										})
									}
								})
								
							}
							else{
								uni.showToast({
									title:'请选择要删除的商品',
									icon:'none'
								})
							}
						}
					}
				})
			},
			// 管理商品按钮事件
			delShowFun() {
				this.delShow = !this.delShow
			},
			// 购物车列表
			CartAllList(){
				this.$http.getCartAllList().then(res => {
					if (res.status == 1) {
						if(res.result.rows.length != 0){
							this.cartList = res.result.rows[0]
							this.allprice = res.result.allprice
						}
						else{
							this.cartList = res.result.rows
							this.allprice = res.result.allprice
						}
						
					} 
					else if(res.status == 0){
						this.cartList = res.result.rows
						this.allprice = res.result.allprice
					}
					else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			},
			
			// 去支付
			goPay(){
				if (!uni.getStorageSync('user_id')) {
					uni.showModal({
						title: '提示',
						content: '当前未登录，是否前往登录？',
						success: (res) => {
							if (res.confirm) {
								uni.switchTab({
									url: '/pages/mine/mine'
								})
							}
						}
					})
				}
				else{
					if(this.allprice != 0){
						uni.navigateTo({
							url:'/pages/product/confirmOrder?type=cart'
						})
					}
					else{
						uni.showToast({
							title: '请选择商品',
							icon: 'none'
						})
					}
				}
			},
			// 更改数量 或者选中，不选中
			CartChangeInfo(rec_id,is_select,goods_number,index,type){
				uni.showLoading({
					title:'请求中',
					mask:true
				})
				let data = {}
				data.rec_id = rec_id
				if(type =='sub' ){
					if(goods_number == 1){
						uni.hideLoading()
						let ids = []
						
						ids.push(rec_id)
							
						
						ids = ids.join(',')
						return uni.showModal({
							title: '提示',
							content: '是否移除选中商品出购物车？',
							success: (res) => {
								if (res.confirm) {
									if(ids.length != 0){
										let data = {}
										data.ids = ids
										this.$http.setCartDelete(data).then(res => {
											if (res.status == 1) {
												uni.showToast({
													title:res.msg,
													icon:'none'
												})
												setTimeout(()=>{
													this.CartAllList()
												},1000)
												
											} else {
												uni.showToast({
													title: res.msg,
													icon: 'none'
												})
											}
										})
										
									}
									else{
										uni.showToast({
											title:'请选择要删除的商品',
											icon:'none'
										})
									}
								}
							}
						})
					}
					else{
						data.goods_number = goods_number-1
						this.cartList[index].goods_num = goods_number-1
					}
					data.is_select = is_select
				}
				else if(type =='add'){
					data.goods_number = goods_number+1
					this.cartList[index].goods_num = goods_number+1
					data.is_select = is_select
				}
				else{
					if(is_select == 1){
						data.is_select = 0
						
					}
					else{
						data.is_select = 1
					}
					this.cartList[index].selected = data.is_select
					data.goods_number = goods_number
					
				}
				
				this.cartList = JSON.parse(JSON.stringify(this.cartList))
				this.$http.setCartChangeInfo(data).then(res => {
					uni.hideLoading()
					if (res.status == 1) {
						this.allprice = res.result.allprice
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			}
		},
		onShow() {
			this.CartAllList()
		}
	}
</script>

<style lang="scss">
	// 蓝色背景
	.background {
		position: fixed;
		width: 100%;
		height: 200rpx;
		z-index: -1;
		background: #33629C;
	}

	// 管理商品部分
	.edit {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0 20rpx;
		margin: 20rpx 0;

		.editIcon {
			width: 28rpx;
			height: 28rpx;
			margin-right: 20rpx;

			image {
				height: 100%;
				width: 100%;
				vertical-align: super;
			}
		}

		.text {
			color: #ffffff;
			font-size: 26rpx
		}
	}

	// 购物车商品列表部分
	.list {
		background-color: #fff;
		margin: 0 30rpx 30rpx;
		border-radius: 15rpx;
		padding: 30rpx 30rpx;

		.listBox {
			display: flex;
			align-items: center;
			margin-top: 50rpx;

			.listCheckBox {
				radio {
					.wx-radio-input.wx-radio-input-checked {
						border: 1rpx solid #E41F2C !important;
						background-color: #E41F2C !important;
					}
				}
			}

			.listCtn {
				width: 144rpx;
				height: 144rpx;
				margin-left: 20rpx;

				image {
					border-radius: 10rpx;
					height: 100%;
					width: 100%;
				}
			}

			.listRgt {
				margin-left: 20rpx;
				flex: 1;

				.listRgtName {
					font-family: "PingFang SC Bold";
					font-weight: 700;
					font-size: 28rpx;
					text-align: left;
					color: #000;

					display: -webkit-box !important;
					overflow: hidden;
					text-overflow: ellipsis;
					word-break: break-all;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical !important;
				}

				.listRgtNum {
					font-family: "PingFang SC";
					font-weight: 400;
					font-size: 22rpx;
					text-align: left;
					color: #acacac;
					margin-top: 10rpx;
				}

				.listBtm {
					display: flex;
					align-items: center;
					margin-top: 16rpx;

					.btmLeft {
						flex: 1;


						.goods-price {
							font-family: "PingFang SC";
							text-align: left;
							color: #a50a11;

							.text1 {
								font-weight: 500;
								font-size: 22rpx;
							}

							.text2 {
								font-weight: 700;
								font-size: 32rpx;
							}
						}
					}

					.btmRgt {
						display: flex;
						align-items: center;

						.add {
							background-color: #1067C7;
							border-radius: 50%;
							width: 36rpx;
							height: 36rpx;
							color: #fff;
							display: flex;
							align-items: center;
							justify-content: center;
						}

						.subtract {
							background-color: #1067C7;
							border-radius: 50%;
							width: 36rpx;
							height: 36rpx;
							color: #fff;
							display: flex;
							align-items: center;
							justify-content: center;
						}

						.active {
							background-color: #DEDEDE !important;
						}

						.num {
							width: 60rpx;
							text-align: center;
							font-size: 32rpx;
						}
					}
				}
			}
		}

		.listBox:nth-child(1) {
			margin-top: 0;
		}
	}

	.null-box {
		height: 100rpx;
	}

	// 底部操作栏部分
	.btmTab {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		padding: 0rpx 30rpx;
		background-color: #fff;
		height: 100rpx;

		.leftRadio {
			display: flex;
			align-items: center;
			font-family: "PingFang SC";
			font-weight: 400;
			font-size: 28rpx;
			text-align: center;
			color: #6e6e6e;

			radio {
				.wx-radio-input.wx-radio-input-checked {
					border: 1rpx solid #E41F2C !important;
					background-color: #E41F2C !important;
				}

				margin-right: 10rpx;
			}
		}

		.ctnNum {
			display: flex;
			align-items: center;
			margin-left: 40rpx;
			font-family: "PingFang SC";
			text-align: center;

			.text1 {
				font-weight: 400;
				font-size: 28rpx;
				color: #000;
			}

			.text2 {
				padding-right: 6rpx;
				font-weight: 400;
				font-size: 28rpx;
				color: #a50a11;
			}

			.text3 {
				font-weight: 700;
				font-size: 40rpx;
				color: #a50a11;
			}
		}

		.rgtBtn {
			width: 200rpx;
			padding: 15rpx 0;
			background: linear-gradient(180.00deg, #1067C7 0%, #106cce 100%);
			color: #fff;
			text-align: center;
			border-radius: 50rpx;
			margin-left: auto;
		}

		.rgtBtn:active {
			background-color: #80d5d2;
		}
	}
</style>