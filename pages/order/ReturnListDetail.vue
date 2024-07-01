<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">售后详情</block>
		</cu-custom>
		<view class="detail">
			<view class="box1">
				退款信息
			</view>
			<view class="box2 flex" v-for="(item,index) in refund.goods_list" :key="index">
				<image :src="item.original_img" style="width: 178rpx;height: 178rpx;"></image>
				<view class="" style="margin-left:23rpx">
					<view class="name">
						{{item.goods_name}}
					</view>
					<view class="guige">
						属性：{{item.spec_key_name}}
					</view>
				</view>
			</view>
			<view class="box3">
				<view class="key">
					退款原因
				</view>
				<view class="value">
					{{refund.reason}}
				</view>
			</view>
			<view class="box3">
				<view class="key">
					退款金额
				</view>
				<view class="value">
					{{refund.order_amount}}
				</view>
			</view>
			
			<view class="box3">
				<view class="key">
					申请时间
				</view>
				<view class="value">
					{{refund.add_time}}
				</view>
			</view>
			<view class="box3">
				<view class="key">
					退款编号
				</view>
				<view class="value">
					{{refund.order_sn}}
				</view>
			</view>
			<view class="box3" v-if="refund.status == 1 || refund.status == 2">
				<view class="key">
					退货地址
				</view>
				<view class="value">
					{{refund.address}}
				</view>
			</view>
		</view>
		<view class="detail" v-if="refund.status == 1">
			<view class="box1">
				售后商品寄回
			</view>
			
			<view class="box3">
				<view class="key">
					快递单号
				</view>
				<view class="value">
					<input type="text" placeholder="请填写快递单号" v-model="return_no" />
				</view>
			</view>
			<view class="box3">
				<view class="key">
					快递公司名称
				</view>
				<view class="value">
					
					<input type="text" placeholder="请填写快递公司名称" v-model="return_name" />
				</view>
			</view>
			<u-notice-bar :text="text1"></u-notice-bar>
			
			
		</view>
		<view class="btn" @click="post" v-if="refund.status == 1">
			提交申请
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refund:{},
				return_name:'',
				return_no:'',
				text1:'温馨提示：不接受到付的快递！'
				
			}
		},
		onLoad(e){
			if(e.id){
				this.getUserRefundOrderInfo(e.id)
			}
		},
		
		methods: {
			post(){
				uni.showModal({
					title:'提示',
					content:'是否提交？',
					success: (res) => {
						if(res.confirm){
							if(this.return_no == ''){
								return this.$utils.msg('请填写快递单号')
							}
							if(this.return_name == ''){
								return this.$utils.msg('请填写快递公司名称')
							}
							let data = {
								order_id:this.refund.order_id,
								return_no:this.return_no,
								return_name:this.return_name
							}
							this.$http.setRefundSendBack(data).then(res=>{
								if(res.status == 1){
									this.$utils.msg(res.msg)
									setTimeout(()=>{
										uni.navigateBack()
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
			getUserRefundOrderInfo(id){
				let data = {}
				data.id = id
				this.$http.getUserRefundOrderInfo(data).then(res=>{
					if(res.status  == 1){
						this.refund = res.result
					}
				})
			},
		}
	}
</script>

<style lang="scss">
.detail{
	width: 690rpx;
	// height: 608rpx;
	border-radius: 12rpx;
	background: #fff;
	margin: 0 auto;
	margin-top:30rpx;
	padding:18rpx 24rpx;
	.box1{
		font-family: "PingFang SC Medium";
		font-weight: 500;
		font-size: 34rpx;
		color: #333;
	}
	.box2{
		margin-top:21rpx;
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
			margin-top:10rpx;
		}
	}
	
	.box3{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top:23rpx;
		.key{
			font-family: "PingFang SC";
			font-weight: 400;
			font-size: 26rpx;
			color: #333;
		}
		.value{
			font-family: "PingFang SC";
			font-weight: 400;
			font-size: 26rpx;
			color: #999;
		}
	}
}
</style>
