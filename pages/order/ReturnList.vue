<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">退款/售后</block>
		</cu-custom>
		<view class="tab flex">
			<view class="tab-item" :class="current == index ? 'active' : ''" v-for="(item,index) in tabList"
				:key="index" @click="changeTab(index)">
				{{item}}
			</view>
		</view>

		<view class="list" v-for="(item,index) in orderList" :key="index">
			<view class="flex" v-for="(items,indexs) in item.goods_list" :key="indexs">
				<image :src="items.original_img" style="width: 178rpx;height: 178rpx;"></image>
				<view class="" style="margin-left:23rpx;width:450rpx;">
					<view class="name flex m-between s-center">
						<view class="" style="width: 360rpx;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;overflow: hidden;">
							{{items.goods_name}}
						</view>
						<view class="">
							x{{items.goods_num}}
						</view>
					</view>
					<view class="guige">
						属性：{{items.spec_key_name}}
					</view>
					<view class="price flex m-between s-center">
						<text class="text1">￥{{items.final_price}}</text><text class="text2">{{item.status_name}}</text>
					</view>
				</view>
			</view>
			<view class="mid flex m-end" >
				<view>实付:￥{{item.order_amount}}</view> 
				<view style="margin-left:43rpx">
					退款金额:
					<text>￥{{item.order_amount}}</text>
				</view>
			</view>
			<view class="btns flex m-end">
				
				<view class="btn1" @click="delUserRefund(item.id)" v-if="item.status == 5">
					删除售后单
				</view>
				
				<navigator :url="'/pages/order/ReturnListDetail?id='+item.id"  class="btn2">
					售后详情
				</navigator>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				tabList: ['全部', '待处理'],
				page: 1,
				orderList: [],
				type: 0, //0:全部 1:待处理
			}
		},
		onLoad() {
			this.getReturnList()
		},
		onReachBottom() {
			this.page++
			this.getReturnList()
		},
		methods: {
			changeTab(index) {
				this.current = index
				this.type = index
				this.getReturnList()
			},
			delUserRefund(id){
				uni.showModal({
					title:'提示',
					content:'是否删除当前订单？',
					success: (res) => {
						if(res.confirm){
							this.$http.delUserRefund({order_id:id}).then(res=>{
								if(res.status == 1){
									this.$utils.msg(res.msg)
									setTimeout(()=>{
										this.page = 1
										this.getReturnList()
									},1500)
								}
								else{
									this.$utils.msg(res.result.trace)
								}
							})
						}
					}
				})
			},
			getReturnList() {
				let data = {}
				data.type = this.type
				data.page = this.page
				this.$http.getReturnList(data).then(res => {
					if (res.status == 1) {
						if (this.page == 1) {
							this.orderList = res.result.rows
						} else {
							this.orderList = this.orderList.concat(res.result.rows)
						}

					}

				})
			},

		}
	}
</script>

<style lang="scss">
	.tab {
		padding: 0 30rpx;
		width: 100%;
		background-color: #fff;

		.tab-item {
			font-family: "PingFang SC";
			font-weight: 400;
			font-size: 34rpx;
			color: #333;


			padding: 15rpx 20rpx;


		}

		.active {
			color: #a50a11;
			position: relative;

			&::after {
				content: '';
				width: 68rpx;
				height: 6rpx;
				border-radius: 3rpx;
				background: #a50a11;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				bottom: 0;
			}
		}
	}

	.list {
		width: 690rpx;
		// height: 443rpx;
		border-radius: 12rpx;
		background: #fff;
		margin: 0 auto;
		margin-top:30rpx;
		padding: 25rpx;
		.name{
			font-family: "PingFang SC Bold";
			font-weight: 700;
			font-size: 30rpx;
			color: #2a2a2a;
		}
		.guige{
			font-family: "PingFang SC";
			font-weight: 400;
			font-size: 26rpx;
			color: #bebebe;
		}
		.price{
			.text1{
				font-family: "DIN Bold";
				font-weight: 700;
				font-size: 36rpx;
				line-height: 43px;
				color: #a50a11;
			}
			.text2{
				font-family: "PingFang SC";
				font-weight: 400;
				font-size: 30rpx;
				color: #a50a11;
			}
		}
		
		.mid{
			margin-top:53rpx;
			font-family: "PingFang SC Bold";
			font-weight: 700;
			font-size: 28rpx;
			text-align: right;
			color: #000;
			text{
				color:#A50A11
			}
		}
		.btns{
			margin-top:55rpx;
			.btn1{
				width: 193rpx;
				height: 65rpx;
				border-radius: 5rpx;
				background: #fff;
				border: 1rpx solid #707070;
				font-family: "PingFang SC";
				font-weight: 400;
				font-size: 32rpx;
				line-height: 65rpx;
				text-align: center;
				color: #333;
			}
			.btn2{
				width: 168rpx;
				height: 65rpx;
				border-radius: 5rpx;
				background: #fff;
				border: 1rpx solid #707070;
				font-family: "PingFang SC";
				font-weight: 400;
				font-size: 32rpx;
				line-height: 65rpx;
				text-align: center;
				color: #333;
				margin-left:22rpx;
			}
		}
		
	}
</style>