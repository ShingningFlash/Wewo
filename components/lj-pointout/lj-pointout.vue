<template>
	<view class="pointout" :style="{top:verificationHeight(),background:backColor}" :class="isShow?'':'hidcls'">
		<view class="pleasetitle">{{title}}</view>
		<image class="closeimg" :src="imgSrc" mode="" @tap="closep"></image>
		<view class="pleaseposi" :style="{background:backColor}"></view>
	</view>
</template>

<script>
	export default {
		props:{
			title:{
				type: String,
				default: '点击···添加到我的小程序,下次使用更方便'
			},
			isStatusbar:{ // 是否存在状态栏
				type: Boolean,
				default: false
			},
			backColor:{
				type: String,
				default: '#dfdfdf'
			}
		},
		data() {
			return {
				isShow: true,
				imgSrc:`data:image/png;base64,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`
			}
		},
		mounted(){
			setTimeout(()=>{
				this.isShow = false
			},6*1000)
		},
		methods: {
			verificationHeight(){
				if(this.isStatusbar){
					return  6 +'px'
				}else{
					return this.getHeight().headerHeight + 6 +'px'
				}
			},
			closep(){
				this.isShow = false;
			},
			getHeight(){
				let heiObj = {
					statusBarHeight: 0, //状态栏高度，单位：px
					titleBarHeight: 0, //标题栏高度，单位：px 胶囊按钮
					headerHeight:0 , //页面头部高度，单位：px
				}
				//1.得到 状态栏高度，单位：px
				heiObj.statusBarHeight = uni.getSystemInfoSync().statusBarHeight; //手机状态栏的高度
				//仅在 小程序 平台存在
				//#ifdef MP
				//2.计算 标题栏高度，单位：px，计算公式：小胶囊高度 + (顶部距离 - 状态栏高度) * 2
			    heiObj.titleBarHeight = (uni.getMenuButtonBoundingClientRect().top - heiObj.statusBarHeight) * 2 +
				 uni.getMenuButtonBoundingClientRect().height;
				 console.log(uni.getMenuButtonBoundingClientRect())
				heiObj.cachetD = uni.getMenuButtonBoundingClientRect().left + uni.getMenuButtonBoundingClientRect().width/3
				//#endif
			   //3.计算 页面头部高度，单位：px，计算公式：导航栏高度 + 状态栏高度
			   heiObj.headerHeight = heiObj.statusBarHeight + heiObj.titleBarHeight;
			   return heiObj
			}
		}
	}
</script>

<style lang="scss" scoped>
.pointout{
	position: fixed;
	right: 30rpx;
	z-index: 999;
	display: flex;
	// justify-content: flex-end;
	align-items: center;
	opacity: 0.99;
	animation: opacity .9s linear infinite;
	padding: 10rpx 20rpx;
	box-sizing: border-box;
	border-radius: 16rpx;
	.pleasetitle{
		z-index: 2;
		max-width: 500rpx;
		font-size: 30rpx;
	}
	.closeimg{
		width: 36rpx;
		height: 36rpx;
		margin-left: 12rpx;
	}
	.pleaseposi{
		position: absolute;
		right: 95rpx;
		top: -12rpx;
		width: 20rpx;
		height: 20rpx;
		background: #dfdfdf;
		transform: rotate(45deg);
		
	}
}
.hidcls{
	opacity: 0;
	display: none;
}
</style>