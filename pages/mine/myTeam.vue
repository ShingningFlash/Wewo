<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-blues"  :isBack="true">
			<block slot="backText"></block>
			<block slot="content">我的粉丝</block>
		</cu-custom>

		<view class="search">
			<u-search placeholder="请输入关键字" v-model="keyword" :showAction="false" searchIconColor="#FA4B43" bgColor="#fff" placeholderColor="#959595"></u-search>
		</view>
		
		<view class="box">
			<view class="item flex m-between" v-for="(item,index) in  menberList" :key="index">
				<view class="flex ">
					<image class="image" :src="item.head_pic"></image>
					<view class="flex flex-col m-center">
						<view class="name">
							{{item.nickname}}
						</view>
						<view class="phone">
							<image src="/static/icons/phone.svg" mode=""></image>
							{{item.mobile}}
						</view>
					</view>
				</view>
				<view class="flex flex-col m-center">
					<view class="time">
						{{item.reg_time}}
					</view>
					<!-- <view class="level">
						{{item.lastLevel}}
					</view> -->
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
				menberList:[{
					name:'闪光万岁',
					img:'/static/images/tx.png',
					phone:15088164854,
					add_time:'2023-08-31 10:55:00',
					lastLevel:'上级：呱呱'
				},
				{
					name:'闪光万岁',
					img:'/static/images/tx.png',
					phone:15088164854,
					add_time:'2023-08-31 10:55:00',
					lastLevel:'上级：呱呱'
				}],
				page:1
			}
		},
		onLoad(){
			this.getMineTeam()
		},
		onReachBottom() {
			this.page++
			this.getMineTeam()
		},
		methods: {
			getMineTeam(){
				let data = {}
				data.keyword = this.keyword
				data.lay = 1
				data.type = 1
				data.page = this.page
				this.$http.getMineTeam(data).then(res=>{
					if(res.status == 1){
						if(this.page == 1){
							this.menberList = res.result.rows
						}
						else{
							this.menberList = this.menberList.concat(res.result.rows)
						}
						
					}
					else{
						
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
					
				})
			}
		}
	}
</script>
<style>
	page{
		background-color: #EBEBEB;
	}
</style>
<style lang="scss" scoped>
	.search{
		background: linear-gradient(90deg, #33629C 0%, #316099 100%);
		padding: 15rpx 30rpx;
	}
	.box{
		margin-top: 20rpx;
		.item{
			width: 690rpx;
			height: 145rpx;
			border-radius: 12rpx;
			background: #fff;
			margin:0 auto;
			padding: 28rpx 22rpx;
			box-sizing: border-box;
			margin-bottom:30rpx;
			.name{
				font-family: "PingFang SC Bold";
				font-weight: 700;
				font-size: 28rpx;
				color: #2a2a2a;
			}
			
			.image{
				width: 87rpx;
				height: 87rpx;
				border-radius: 50%;
				margin-right:17rpx;
			}
			.phone{
				font-family: "PingFang SC";
				font-weight: 400;
				font-size: 24rpx;
				color: #9c9c9c;
				margin-top: 10rpx;
				image{
					width: 14rpx;
					height: 23rpx;
					margin-right: 5rpx;
				}
			}
			.time{
				font-family: "PingFang SC";
				font-weight: 400;
				font-size: 22rpx;

				color: #9c9c9c;
			}
			.level{
				margin-top:10rpx;
				font-family: "PingFang SC";
				font-weight: 400;
				font-size: 22rpx;
				text-align: right;
				color: #9c9c9c;
			}
		}
	}

</style>
