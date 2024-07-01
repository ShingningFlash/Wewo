<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">我的订单</block>
		</cu-custom>
		
		<view class="tab">
			<u-tabs activeStyle="font-size: 28rpx;font-family: PingFang SC;font-weight: 700;color:#000" inactiveStyle="font-weight: 400;color:#000;font-size:28rpx" lineWidth="28" lineHeight="4"
			:list="list1"  itemStyle="padding-left: 18px; padding-right: 15px; height: 44px;" lineColor="#33629C" :activeStyle="{color:'#33629C'}" :current="current" @change="change"></u-tabs>
		</view>
		
		<view class="box1" v-for="(item,index) in orderList" :key="index" v-if="orderList && orderList.length != 0">
			<!-- <view class="status flex s-center m-between">
				<view class="flex s-center">
					<image class="image" src="/static/images/shopIcon.png"></image>
					<view class="shopName">
						{{item.shop_name}}
					</view>
				</view>
				<view class="statusName">
					{{item.order_status_name}}
				</view>
			</view> -->
			<view class="top" style="" v-for="(items,indexs) in item.goods_list" :key="indexs" @click="navTo('/pages/order/orderDetail?id='+item.order_id)">
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
						<text class="text">￥</text>{{items.goods_price}} 
						<!-- <text class="priceD">￥{{items.goods_price}}</text> -->
					</view>
					<view class="price" v-if="type == 6">
						<text class="text">￥</text>{{items.final_price}} 
						<!-- <text class="priceD">￥{{items.goods_price}}</text> -->
					</view>
				</view>
			</view>
			<view class="list">
				<view class="list_item">
					<view class="head">订单编号</view>
					<view class="code" style="font-weight: 600;">{{item.order_sn}}</view>
				</view>
				<view class="list_item">
					<view class="head">订单状态</view>
					<view class="code" style="font-weight: 600;">{{item.typename}}</view>
				</view>
				<view class="list_item">
					<view class="head">订单日期</view>
					<view class="code">{{item.add_time}}</view>
				</view>
			</view>
			<!--  -->
			<view class="lineinfo">
				共{{item.goods_list.length}}件商品
				  
				<text class="text1">总计：</text>
				<text class="text2" v-if="type != 6 "><text>￥</text>{{item.order_amount}}</text>
				<text class="text2" v-if="type == 6 "><text>￥</text>{{item.refund_money}}</text>
			</view>
			<view class="btns">
				<view class="btn_one" v-if="item.type >= 3 && item.type < 5"
					@click="lookwuliu(item)">
					查看物流</view>
					<view class="btn_one" v-if="item.type == 5 && item.order_status == 3"
						@click="removeOrder(item.order_id)">
						删除订单</view>
				
				<view class="btn_one" @click="cancelOrder(item.order_id)" v-if="item.type == 1">取消订单</view>
				<view class="btn_two" v-if="item.type == 1" @click="paynow(item.order_id)">
					立即支付
				</view>
				<view class="btn_one" v-if="item.type >= 2 && item.type < 4" @click="goEx(item)">申请售后</view>
				<navigator url="/pages/order/ReturnList" class="btn_two"  v-if="item.type == 6" >查看进度</navigator>
				<view class="btn_two" @click="getShippingData(item.order_id)" v-if="item.type == 3">确认收货</view>
				<!-- <view class="btn_two" @click="GoEvaluate(item)" v-if="item.type == 4">去评价</view> -->
			</view>
		
		</view>
	</view>
</template>

<script>
	const adapayPlugin = requirePlugin("Adapay");
	export default {
		data() {
			return {
				list1: [{
					name: '全部',
				}, {
					name: '待付款',
				}, {
					name: '待发货'
				}, {
					name: '已发货'
				}, {
					name: '已完成'
				}, {
					name: '已退款'
				}
				],
				orderList:[
				],
				type:1,
				page:1,
				current:0
			}
		},
		onLoad(e) {
			this.type = e.type
			if(this.type == 6){
				this.current = 5
				this.getGoodsCatLsit()
			}
			else{
				this.current = this.type
				this.getGoodsCatLsit()
			}
			
			
		},
		onReachBottom(){
			this.page++
			this.getGoodsCatLsit()
		},
		
		methods: {
			lookwuliu(data){
				uni.navigateTo({
					url: '/pages/order/logistics?data=' + JSON.stringify(data)
				})
			},
			paySuccess(res){
				console.log(res);
				
					uni.showToast({
						title: '支付成功',
						icon: 'none'
					})
					setTimeout(() => {
						this.getGoodsCatLsit()
					}, 1000)
					// uni.removeStorageSync('addressObj')
				
			},
			payError(err){
				console.log(err);
				uni.showToast({
					title: '支付失败',
					icon: 'none'
				})
			},
			paynow(id){
				let orderid = id
				let datas = {
					order_id: orderid,
					order_type:1,
					user_id:uni.getStorageSync('user_id'),
					openid:uni.getStorageSync('openId')
					// openid: uni.getStorageSync('openid')
								
				}
				
				this.$http.MiniPayOrder(datas).then(res2 => {
					
					if(res2.status){
						if (res2.status == 1) {
							if(res2.payinfo.data){
								let results = res2.payinfo.data
								uni.navigateToMiniProgram({
									appId:results.wx_app_id,
									path:results.miniapp_path
								})
								
								
								// adapayPlugin.requestPay(results,this.paySuccess, this.payError)
							}
							else{
								uni.showToast({
									title:res2.payinfo.msg,
									icon:'none',
									duration:2000
								})
							}
							
							
							
						} 
					}
					else{
						let regx = res2.replace(/https:\/\/page\.adapay\.tech\/v1\/wxpay\/createOrder/, '')
						
						let result = JSON.parse(regx)
						if (result.status == 1) {
							if(result.payinfo.data){
								let results = result.payinfo.data
								
								
								
								uni.navigateToMiniProgram({
									appId:results.wx_app_id,
									path:results.miniapp_path
								})
							}
							else{
								uni.showToast({
									title:result.payinfo.msg,
									icon:'none',
									duration:2000
								})
							}
							
							
							
						} 
					}
					
					
					
								
				})
			},
			getShippingData(id){
				uni.showModal({
					title:'提示',
					content:'是否确认收货？',
					success: (res) => {
						if(res.confirm){
							let data = { }
							data.order_id = id
							this.$http.setUserOrderAffirm(data).then(res=>{
								if(res.status == 1){
									uni.showToast({
										title:res.msg,
										icon:'none'
									})
									setTimeout(()=>{
										this.page = 1
										this.getGoodsCatLsit()
									},800)
								}
								
							})
						}
					}
				})
			},
			// 订单详情
			goDetail(id){
				uni.navigateTo({
					url: '/pages/order/orderDetail?id=' + id
				})
			},
			// 退换
			goEx(data){
				uni.navigateTo({
					url: '/pages/order/exchange?data=' + JSON.stringify(data)
				})
			},
			change(e){
				console.log(e);
				
				if(e.index == 5){
					this.current = 0
					uni.navigateTo({
						url:'/pages/order/ReturnList'
					})
				}
				else{
					this.current = e.index
					this.type = this.current
					console.log(this.type);
					this.page = 1
					this.getGoodsCatLsit()
				}
				
				
			},
			removeOrder(id){
				uni.showModal({
					title:'提示',
					content:'是否删除订单？',
					success: (res) => {
						if(res.confirm){
							let data = { }
							data.order_id = id
							this.$http.setUserOrderDel(data).then(res=>{
								if(res.status == 1){
									uni.showToast({
										title:res.msg,
										icon:'none'
									})
									setTimeout(()=>{
										this.page = 1
										this.getGoodsCatLsit()
									},800)
								}
								
							})
						}
					}
				})
			},
			cancelOrder(id){
				uni.showModal({
					title:'提示',
					content:'是否取消订单？',
					success: (res) => {
						if(res.confirm){
							let data = { }
							data.order_id = id
							this.$http.setAllOrderOut(data).then(res=>{
								if(res.status == 1){
									uni.showToast({
										title:res.msg,
										icon:'none'
									})
									setTimeout(()=>{
										this.page = 1
										this.getGoodsCatLsit()
									},800)
								}
								
							})
						}
					}
				})
			},
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
			
			getGoodsCatLsit(){
				let data ={}
				data.type = this.type
				data.page = this.page
				this.$http.getorder(data).then(res=>{
					if(res.status == 1){
						if(this.page == 1){
							this.orderList = res.result.rows
						}
						else{
							this.orderList = this.orderList.concat(res.result.rows)
						}
						
					}
					
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
.box1 {
		width: 690rpx;
		// height: 708rpx;
		border-radius: 12rpx;
		background: #fff;
		margin: 0 auto;
		margin-top: 30rpx;
		padding:25rpx 25rpx 25rpx 25rpx ;
		box-sizing: border-box;
		.status{
			.image{
				width:36rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
			.shopName{
				font-family: "PingFang SC Heavy";
				font-weight: 900;
				font-size: 30rpx;
				text-align: center;
				color: #000;
			}
			.statusName{
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
				text{
					font-size: 26rpx;
				}
			}
		}

		.btns {
			display: flex;
			justify-content: flex-end;
			margin-top: 40rpx;
			gap:20rpx;
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
				&:active{
					background:lighten($color: #000000, $amount: 90%);
				}
			}

			.btn_two {
				width: 189rpx;
				height: 60rpx;
				border-radius: 30rpx;
				background: #33629C;
				line-height: 60rpx;
				text-align: center;
				font-size: 26rpx;
				color: #fff;
				font-weight: 700;
				&:active{
					background:lighten($color: #33629C, $amount: 10%)
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
				.priceD{
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
