<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">聚会活动详情</block>
		</cu-custom>
		
		<view class="topBox">
			<image :src="partListDetail.cover_img"></image>
			<view class="detailText">
				<view class="top flex m-between s-center">
					<view class="leftItem">
						<view class="title">
							{{partListDetail.name}}
						</view>
						<view class="startTime flex s-center">
							<text class="cuIcon-time"></text>
							 <text class="texts">开始时间：{{partListDetail.start_time}}</text>
						</view>
						<!-- <view class="endTime flex s-center">
							<text class="cuIcon-time"></text>
							<text class="texts">结束时间：{{partListDetail.endTime}}</text>
						</view> -->
						<view class="type flex s-center">
							<text class="cuIcon-apps"></text>
							 <text class="texts">聚会类型：{{partListDetail.type}}</text>
						</view>
						<view class="flex s-center">
							<text class="cuIcon-people"></text>
							<text class="texts">聚会人数：{{partListDetail.num}}人</text>
						</view>
						<!-- <view class="flex s-center">
							<image src="/static/icons/icon34.png" mode=""></image>
							<text class="texts">{{partListDetail.address}}</text>
						</view> -->
					</view>
					<!-- <view class="rightItem">
						<image :src="partListDetail.qrCode"></image>
						<text>{{partListDetail.code}}</text>
					</view> -->
				</view>
				<view class="btns flex m-between">
					<button open-type="share" class="inviteBtn" @click="invite">
						邀请聚友
					</button>
					<view class="callBtn" @click="call(partListDetail.contact_phone)">
						电话联系
					</view>
				</view>
			</view>
		</view>
		
		<view class="bottomBox">
			<view class="topItem flex s-center">
				<view class="shu">
					
				</view>
				<view class="title">
					已报名的聚友
				</view>
			</view>
			<view class="listItem flex m-between s-center" v-for="(item,index) in ActivityApplicationList" :key="index">
				<view class="listLeft flex">
					<image class="head" :src="item.head_pic"></image>
					<view class="headRight flex-col m-between">
						<view class="flex s-center">
							{{item.name}}
							<image v-if="item.sex == '男'" class="man" src="/static/icons/icon36.png" mode=""></image>
							<image v-else class="fman" src="/static/icons/icon37.png" mode=""></image>
						</view>
						<view class="phone">
							<image class="call" src="/static/icons/icon35.png" mode=""></image>
							{{item.phone}}
						</view>
					</view>
				</view>
				<view class="listRight flex-col m-between s-end">
					<view class="time">
						{{item.add_time}}
					</view>
					<view class="callBtn" @click="call(item.phones)">
						拨打电话
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<style>
	page{
		background-color: #F1F1F1;
	}
</style>
<script>
	export default {
		onShareAppMessage() {
			return {
				title: this.partListDetail.name,
				imageUrl:this.partListDetail.cover_img
			}
		},
		data() {
			return {
				partListDetail:{}, //活动详情
				ActivityApplicationList:[] ,//已报名人员列表
				page:1,
				activity_id:0 //活动id
			}
		},
		onLoad(e){
			if(e.id){
				this.getActivityInfo(e.id)
				this.activity_id = e.id
				this.getActivityApplicationList()
			}
		},
		methods: {
			// 邀请
			invite(){},
			// 拨打电话
			call(phone){
				uni.makePhoneCall({
					phoneNumber:phone
				})
			},
			// 活动详情
			getActivityInfo(id){
				let data = {}
				data.activity_id = id
				this.$httpRequest({url:'getActivityInfo'},data).then(res=>{
					if(res.status == 1){
						this.partListDetail = res.result
						
					}
				})
			},
			// 报名人员列表
			getActivityApplicationList(){
				let data = {}
				data.activity_id = this.activity_id
				data.page = this.page
				this.$httpRequest({url:'getActivityApplicationList'},data).then(res=>{
					if(this.page == 1){
						this.ActivityApplicationList = res.result.rows
					}
					else{
						this.ActivityApplicationList = this.ActivityList.contact(res.result.rows)
					}
				})
			}
			
		},
		onReachBottom() {
			this.page++
			this.getActivityApplicationList()
		}
	}
</script>

<style lang="scss" scoped>
	.topBox{
		image{
			width: 100%;
			height: 343rpx;
		}
		.detailText{
			padding:30rpx;
			box-sizing:border-box;
			background-color: #fff;
			border-radius: 15rpx;
			position: relative;
			top: -30rpx;
			.top{
				.leftItem{
					image{
						width: 24rpx;
						height: 28rpx;
					}
					.title{
						font-weight: 700;
						font-size: 32rpx;
						margin-bottom:20rpx;
					}
					text{
						color:#686868;
						font-weight: 400;
						font-size: 24rpx;
						line-height: 40rpx;
					}
					.texts{
						margin-left: 6.5rpx;
					}
				}
				.rightItem{
					width: 188rpx;
					height: 100%;
					text-align: center;
					image{
						width: 188rpx;
						height: 188rpx;
						margin-bottom: 15rpx;
					}
					text{
						font-weight: 400;
						font-size: 26rpx;
						line-height: 34.8rpx;
						
						
					}
				}
			}
			
			.btns{
				margin-top: 30rpx;
				.inviteBtn,.callBtn{
					width: 332rpx;
					height: 73rpx;
					border-radius: 36.5rpx;
					background: linear-gradient(180.00deg, #ee2533 0%, #ce0e1b 100%);
					text-align: center;
					font-weight: 400;
					font-size: 27rpx;
					color: #fff;
					line-height: 73rpx;
					&:active{
						background: lighten($color: #ee2533, $amount: 10%);
					}
				}
				.callBtn{
					background: linear-gradient(180.00deg, #ffa800 0%, #f70 100%);
					&:active{
						background: lighten($color: #ffa800, $amount: 10%);
					}
				}
			}
		}
	}
	
	.bottomBox{
		padding:30rpx;
		box-sizing: border-box;
		border-radius: 15px 15px 0 0;
		background: #fff;
		.topItem{
			.shu{
				width: 13rpx;
				height: 33rpx;
				border-radius: 6.5rpx;
				background: linear-gradient(180.00deg, #ed2533 0%, #ce0e1b 100%);
			}
			.title{
				font-weight: 700;
				font-size: 30rpx;
				color: #000;
				margin-left: 16rpx;
			}
		}
		
		.listItem{
			margin-top: 40rpx;
			border-bottom: 1rpx solid #E6E6E6;
			padding-bottom:36rpx;
			box-sizing: border-box;
			.listLeft{
				.head{
					width:97rpx;
					height: 97rpx;
					border-radius: 50%;
				}
				.headRight{
					margin-left:25rpx;
				}
				.flex{
					font-weight: 700;
					font-size: 30rpx;
					color: #000;
					.man{
						width: 23rpx;
						height: 23rpx;
						margin-left: 10rpx;
					}
					.fman{
						width: 18rpx;
						height: 24rpx;
						margin-left: 10rpx;
					}
				}
				.phone{
					font-weight: 400;
					font-size: 24rpx;
					color: #808080;
					.call{
						width: 14rpx;
						height: 23rpx;
						margin-right: 10rpx;
					}
				}
			}
			.listRight{
				height: 97rpx;
				.time{
					font-weight: 400;
					font-size: 24rpx;
					text-align: right;
					color: #808080;
				}
				.callBtn{
					width: 139rpx;
					height: 40rpx;
					border-radius: 20rpx;
					background: #de1d2a;
					text-align: center;
					line-height: 40rpx;
					font-weight: 400;
					font-size: 22rpx;
					color: #fff;
					&:active{
						background: lighten($color: #de1d2a, $amount: 10%);
					}
				}
			}
			
			
		}
	}
	
</style>
