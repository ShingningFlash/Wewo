<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">聚会活动列表</block>
		</cu-custom>
		<view class="part">
			<view class="part_list" v-for="(item,index) in ActivityList" :key="index">
				<view class="top flex ">
					<image :src="item.cover_img"></image>
					<view class="top_right flex-col m-between">
						<view class="title">
							{{item.name}}
						</view>
						<view class="startTime">
							开始时间：{{item.start_time}}
						</view>
						<view class="joinNum">
							
							参加人数：{{item.num}}人
						</view>
						<view class="btns flex">
							<view class="joinBtn" @click="navTo('/pages/index/partyList/partySignUp?id='+item.id)">聚会报名</view>
							<view class="detailBtn" @click="navTo('/pages/index/partyList/partyDetail?id='+item.id)">
								查看详情
							</view>
						</view>
					</view>
				</view>
				<view class="bottom">
					<!-- <view class="endTime">
						结束时间：{{item.endTime}}
						
					</view> -->
					<view class="contacts">
						联系人：{{item.contact_name}} {{item.contact_phone}})
						
					</view>
					<!-- <view class="activityAddress">
						活动地址：{{item.contact_phone}}
					</view> -->
				</view>
			</view>
		</view>
		
		<view class="createBtn bg-gradual-wineRed" @click="navTo('/pages/index/partyList/partyCreate')">
			创建活动
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ActivityList:[
					
				],
				page:1
			}
		},
		onShow(){
			this.getActivityList()
		},
		methods: {
			// 获取活动列表
			getActivityList(){
				uni.showLoading({
					title:'请求中',
					mask:true
				})
				let data = {}
				 data.p= this.page
				this.$httpRequest({url:'getActivityList'},data).then(res=>{
					uni.hideLoading()
					if(res.status == 1){
						if(this.page == 1){
							this.ActivityList = res.result.rows
						}
						else{
							this.ActivityList = this.ActivityList.contact(res.result.rows)
						}
						
					}
				})
			},
			// 路由跳转
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
		},
		onReachBottom() {
			this.page++
			this.getActivityList()
		}
	}
</script>
<style>
	page{
		background-color: #EFEFEF;
	}
</style>
<style scoped lang="scss">
.part{
	padding-bottom: 150rpx;
}
.part_list{
	width: 690rpx;
	border-radius: 10rpx;
	background: #fff;
	margin: 0 auto;
	margin-top:30rpx;
	padding:22rpx;
	box-sizing: border-box;
	
	image{
		width: 232rpx;
		height: 198rpx;
	}
	.top{
		padding-bottom: 30rpx;
		border-bottom: 1rpx solid #c5c5c5;
		.top_right{
			margin-left: 26rpx;
			.title{
				font-weight: 700;
				font-size: 32rpx;
				color: #000;
				line-height: 48rpx;
			}
			.startTime,.joinNum{
				font-weight: 400;
				font-size: 24rpx;
				color: #747474;
				line-height: 40rpx;
			}
			.btns{
				.joinBtn,.detailBtn{
					width: 183rpx;
					height: 53rpx;
					border-radius: 26.5rpx;
					background: linear-gradient(180.00deg, #ee2836 0%, #c70c18 100%);
					line-height: 53rpx;
					text-align: center;
					font-weight: 400;
					font-size: 26rpx;
					color: #fff;
					&:active{
						background: lighten($color: #ee2836, $amount: 10%)
					}
				}
				.detailBtn{
					margin-left:20rpx;
					background: linear-gradient(180.00deg, #eeac28 0%, #ff6a11 100%);
					&:active{
						background: lighten($color: #eeac28, $amount: 10%)
					}
				}
			}
			
		}
	}
	.bottom{
		margin-top: 20rpx;
		.endTime,.contacts,.activityAddress{
			font-weight: 400;
			font-size: 26rpx;
			line-height: 40rpx;
			color: #747474;
		}
	}
	
}
.createBtn{
		width: 690rpx;
		height:90rpx; 
		text-align: center;
		line-height: 90rpx;
		font-weight: 400;
		font-size: 30rpx;
		color: #fff;
		border-radius: 45rpx;
		position: fixed;
		z-index: 2;
		bottom: 45rpx;
		left:50%;
		transform: translateX(-50%);
		&:active{
			background: lighten($color: #f02635, $amount: 10%)
		}
	}
</style>
