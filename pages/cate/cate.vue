<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="false">
			<block slot="backText"></block>
			<block slot="content">分类</block>
		</cu-custom>
		<view class="search-gray">
			<u-search placeholder="请输入关键字" v-model="keyword" :showAction="false" searchIconColor="#33629C" bgColor="#E8E8E8" @search="search"></u-search>
		</view>
		<view class="box flex">
			<scroll-view class="left-nav " :style="{height:windowHeight + 'px'}" scroll-y> 
				<view class="nav-item" v-for="(item,index) in cateList" :key="index" :class="current == index ? 'activeItem' : ''" @click="changeNav(index)">
					{{item.name}}
				</view>
				
			</scroll-view>
			<scroll-view class="right-cate" :style="{height:windowHeight + 'px'}" scroll-y="true">
				<view class="ob">
					<view  v-for="(item,index) in children" :key="index" @click="navTo('/pages/index/newAdd/goodsPage?id='+item.id)" >
						<view class="cate-item">
							<view class="title">
								{{item.name}}
							</view>
							<image :src="item.image" mode="aspectFit"></image>
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
				windowHeight:0,
				keyword:'',
				current:0,
				cateList:[{
					name:'全部好物'
				},
				{
					name:'手机'
				},
				{
					name:'大家电'
				}],
				children:[],
				update:true
			};
		},
		onReady() {
			const systemInfo = uni.getSystemInfoSync();
			this.windowHeight = systemInfo.windowHeight - 88 -33;
			
		},
		onReachBottom() {   
			
		},
		onShow() {
			if(this.update){
				this.getGoodsCatLsit()
				this.current = 0
			}
			else{
				this.update = true
			}
			
		},
		onLoad() {
			

		},
		methods: {
			search(){
				uni.navigateTo({
					url:'/pages/index/newAdd/goodsPage?keywords='+this.keyword
				})
			},
			navTo(url) {
				this.update = false
				uni.navigateTo({
					url: url
				})
			},
			changeNav(index){
				this.current = index
				if(this.cateList[index].children){
					this.children = this.cateList[index].children
				}
				else{
					this.children = []
				}
				
			},
			
			getGoodsCatLsit(){
				let data = {}
				data.parent_id = 2
				this.$http.getGoodsCatLsit(data).then(res => {
					if (res.status == 1) {
						this.cateList = res.result
						if(this.cateList){
							if(this.cateList[0].children){
								this.children = this.cateList[0].children
							}
							
						}
						
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						})
					}
				
				})
			},



		},
	}
</script>
<style>
	page{
		background-color: #fff;
	}
</style>
<style lang="scss">
	.search-gray{
		width: 690rpx;
		height: 67rpx;
		border-radius: 33.5rpx;
		background: #e8e8e8;
		margin: 0 auto;
		
	}
	.box{
		.left-nav{
			width: 206rpx;
			background-color: #F5F5F5;
			.nav-item{
				padding:25rpx 47rpx;
				font-family: "PingFang SC Bold";
				font-weight: 700;
				font-size: 28rpx;
				text-align: center;
				color: #787878;
				transition: all .8s;
			}
			.activeItem{
				color: #33629c;
				position: relative;
				
				&::after{
					content: '';
					position: absolute;
					width: 8rpx;
					height: 45rpx;
					border-radius: 4rpx;
					background: #33629c;
					right:0;
					top:50%;
					transform: translateY(-50%);
				}
			}
		}
		
		.right-cate{
			
			width:544rpx;
			
			.ob{
				display: grid;
				grid-template-columns: repeat(2,1fr);
				padding:30rpx;
				box-sizing: border-box;
				gap: 25rpx;
			}
			.cate-item{
				
				width: 227rpx;
				height: 299rpx;
				border-radius: 10rpx;
				background: #efefef;
				padding:30rpx;
				.title{
					font-family: "PingFang SC Medium";
					font-weight: 500;
					font-size: 30rpx;
					color: #333;
				}
				image{
					width: 100%;
					height: 200rpx;
				}
			}
		}
	}
</style>