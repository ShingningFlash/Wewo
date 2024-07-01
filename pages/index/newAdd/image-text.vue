<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">{{pageTitle}}</block>
		</cu-custom>
		
		<view class="list">
			<view class="list-item flex" v-for="(sama,index) in dataList" :key="index" @click="navTo('/pages/mine/systemNotice/noticeDetail?id='+sama.article_id)">
				<view class="images">
					<image style="width: 100%;height: 100%;" :src="sama.thumb" mode=""></image>
				</view>
				<view class="right flex flex-col m-between">
					<view class="title">{{sama.title}}</view>
					<view class="disc">
						{{sama.description}}
					</view>
					<view class="time">
						{{sama.time}}
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
				pageTitle:'图文',
				page:1,
				dataList:[]
			}
		},
		onLoad(e){
			if(e.type==6){
				this.getArticles()
			}
		},
		methods: {
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
			// 商家联盟
			getArticles(){
				let data ={}
				this.$httpRequest({
					url: 'getArticles'
				}, data).then(res => {
					if (res.status == 1) {
						if (this.page == 1) {
							this.dataList = res.result
						} else {
							this.dataList = this.dataList.concat(res.result)
						}
				
				
					}
				})
			}
		}
	}
</script>
<style>
	page{
		background-color: #f5f5f5;
	}
</style>
<style lang="scss" scoped>
.list{
	.list-item{
		width: 690rpx;
		// height: 180rpx;
		border-radius: 12rpx;
		background-color: #fff;
		margin: 0 auto;
		margin-top: 20rpx;
		padding: 20rpx;
		box-sizing: border-box;
		.images{
			width: 150rpx;
			height: 150rpx;
			
		}
		.right{
			margin-left:20rpx;
			width:500rpx;
			.title{
				font-weight: bold;
				font-size: 28rpx;
			}
			.disc{
				display: -webkit-box;
				  -webkit-box-orient: vertical;
				  -webkit-line-clamp: 2;
				  overflow: hidden;
				  font-size: 24rpx;
				  color: #a1a1a1;
			}
			.time{
				
				  
				  font-size: 24rpx;
				  color: #a1a1a1;
			}
		}
	}
}
</style>
