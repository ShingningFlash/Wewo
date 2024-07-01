<template>
	<view >
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">关于我们</block>
		</cu-custom>
		
		<view class="content">
			<image class="img" :src="result.thumb" mode=""></image>
			<view class="title">
				{{result.title}}
			</view>
			<view class="time">
				{{result.add_time}}
			</view>
			<view class="text" v-html="result.content">
				
			</view>
			
			<view class="contactTitle flex s-center">
				<view class="shu">
					
				</view>
				联系方式
				
			</view>
			<view class="contacts">
				<view>联系电话：{{data.telephone}}</view>
				<view>公司传真：{{data.company_fax}}</view>
				<view>电子邮箱：{{data.e_mail}}</view>
				<view>公司地址：{{data.com_address}}</view>
			</view>
			<view class="map">
				<map style="width: 100%; height: 100%;" :latitude="data.lng" :longitude="data.lat" >
				</map>
			</view>
			<view class="btns flex m-end">
				<view class="backBtn" @click="back">
					返回
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				result:{},
				data:{
					telephone:'',
					company_fax:'',
					e_mail:'',
					com_address:'',
					lat:'',
					lng:''
				}
			}
		},
		methods: {
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			getAboutUs(){
				
				this.$http.getAboutUs().then(res=>{
					if(res.status == 1){
						if(res.result.content != ''){
							res.result.content = this.textRach(res.result.content)
						}
						this.result = res.result
					}
				})
			},
			getComInfo(){
				this.$http.getComInfo().then(res=>{
					if(res.status == 1){
						
						this.data = res.result
					}
				})
			},
			textRach(textArea) {
				let text = textArea
					.replace(/<p([\s\w"=\/\.:;]+)((?:(style="[^"]+")))/gi, '<p')
					.replace(
						/<p>/gi,
						'<p style="font-size: 15px; line-height: 25px;">'
					)
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(height="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(width="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(style="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)((?:(alt="[^"]+")))/gi, '<img$1')
					.replace(/<img([\s\w"-=\/\.:;]+)/gi, '<img style="max-width: 100%;display:block" $1')
				return text
			},
		},
		onLoad(e) {
			this.getAboutUs()
			this.getComInfo()
		}
	}
</script>
<style>
	page{
		background-color: #EFEFEF;
	}
</style>
<style lang="scss" scoped>
.content{
	padding-bottom:30rpx;
	
	box-sizing:border-box;
	background-color: #fff;
	width: 690rpx;
	margin: 0 auto;
	margin-top: 30rpx;
	.img{
		height: 460rpx;
		width: 100%;
		
	}
	.title{
		padding:0rpx 30rpx;
		font-weight: 700;
		font-size: 32rpx;
		text-align: center;
		color: #000;
		margin-top: 30rpx;
	}
	.time{
		padding:0rpx 30rpx;
		font-weight: 400;
		font-size: 24rpx;
		text-align: center;
		color: #747474;
		margin-top:10rpx;
	}
	.text{
		padding:0rpx 30rpx;
		margin-top: 20rpx;
	}
	.contactTitle{
		padding:0rpx 30rpx;
		font-weight: 700;
		font-size: 30rpx;
		color: #373737;
		margin-top: 37rpx;
		.shu{
			width: 12rpx;
			height: 32rpx;
			border-radius: 6rpx;
			background: #398b7f;
			margin-right: 14rpx;
		}
	}
	.contacts{
		padding:0rpx 30rpx;
		font-family: "PingFang SC";
		font-weight: 400;
		font-size: 28rpx;
		line-height: 50rpx;
		color: #373737;
		margin-top: 25rpx;
	}
	.map{
		padding:0rpx 30rpx;
		width:100%;
		height: 335.72rpx;
		margin-top:33rpx;
	}
	.btns{
		padding:0rpx 30rpx;
		margin-top: 45rpx;
		.backBtn{
			width: 166rpx;
			height: 66rpx;
			border-radius: 10rpx;
			background: linear-gradient(180.00deg, #33629C 0%,#376baa 100%);
			line-height: 66rpx;
			text-align: center;
			font-weight: 400;
			font-size: 28rpx;
			color: #fff;
		}
	}
	
}
</style>
