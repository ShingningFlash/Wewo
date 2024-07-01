<template>
	<view class="container">
		<form @submit="formSubmit">
			<view class='addAddress'>
				<view class="pad30">
					<view class='address_val acea-row row-middle borderRadius15'>
						<textarea v-model="addressValue" auto-height
						 placeholder="粘贴地址信息，自动拆分姓名、电话和地址" placeholder-class='placeholder' style="width:100%;" 
						 @blur="identify()" @confirm="identify()"/>
					</view>
				</view>
				<view class="pad30 mt-22">
					<view class='list borderRadius15'>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>姓名</view>
							<input type='text' placeholder='请输入姓名' name='real_name' :value="userAddress.real_name"
								placeholder-class='placeholder'></input>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>联系电话</view>
							<input type='number' placeholder='请输入联系电话' name="phone" :value='userAddress.phone'
								placeholder-class='placeholder' pattern="\d*"></input>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>所在地区</view>
							<view class="address acea-row row-between">
								<input type='text' placeholder='请填写具体地址' name='region' placeholder-class='placeholder'
									:value='userAddress.region' class="detail"></input>
							</view>
						</view>
						<view class='item acea-row row-between-wrapper'>
							<view class='name'>详细地址</view>
							<view class="address">
								<input type='text' placeholder='请填写具体地址' name='detail' placeholder-class='placeholder'
									:value='userAddress.detail' class="detail"></input>
							</view>
						</view>
					</view>
				</view>
				<button class='keepBnt bg-color' form-type="submit">立即保存</button>
			</view>
		</form>
	</view>
</template>
<script>
	import AddressParse from './zh-address-parse.min.js'
	export default {
		data() {
			return {
				userAddress: {
					real_name:"",
					phone:"",
					region:"",
					detail:"",
				}, //地址详情
				addressValue:""
			}
		},
		components:{
			
		},
		onLoad(){
			
		},
		methods: {
			identify(){
				const options = {
				  type: 0, // 哪种方式解析，0：正则，1：树查找
				  textFilter: [], // 预清洗的字段
				  nameMaxLength: 4, // 查找最大的中文名字长度
				}
				// type参数0表示使用正则解析，1表示采用树查找, textFilter地址预清洗过滤字段。
				if(!!this.addressValue){
					const parseResult = AddressParse(this.addressValue, options)
					// console.log(parseResult);
					this.userAddress.real_name = parseResult.name;
					this.userAddress.phone = parseResult.phone;
					this.userAddress.detail = parseResult.detail;
					this.userAddress.region = parseResult.province + '/' + parseResult.city + '/' + parseResult.area;
				}
			},
			formSubmit(){
				this.$emit('addressConfirm',this.userAddress)
			}
		},
	}
</script>
<style>
	.container{
		background-color: #f5f5f5;
		height: 100vh;
		padding-top:30rpx;
	}
	
	.pad30 {
		padding: 0 30rpx
	}
	
	.p_center {
		text-align: center;
	}
	
	.acea-row {
		display: flex;
	}
	.row-middle {
		align-items: center
	}
	.row-between-wrapper {
		align-items: center;
		justify-content: space-between
	}
	.borderRadius15 {
		border-radius: 15rpx !important;
	}
	.fontcolor{
		color: var(--view-theme);
	}
	.addAddress .list {
		background-color: #fff;
	}
	
	.addAddress .list .item {
		padding: 30rpx;
		border-top: 1rpx solid #eee;
		position: relative;
	}
	
	.addAddress .list .item .detail{
		width: 368rpx;
	}
	
	.addAddress .list .item .location{
		position: absolute;
		right: 46rpx;
		top: 50%;
		margin-top: -40rpx!important;
		font-size: 24rpx;
		text-align: center;
	}
	
	.addAddress .list .item .icon-dizhi{
		 font-size: 36rpx!important;
	}
	
	.addAddress .list .item .name {
		width: 195rpx;
		font-size: 30rpx;
		color: #333;
	}
	
	.addAddress .list .item .address {
		flex: 1;
	}
	
	.addAddress .list .item .address .addressCon{
		width: 360rpx;
	}
	
	.addAddress .list .item .address .addressCon .tip{
		font-size: 21rpx;
		margin-top: 4rpx;
	}
	
	.addAddress .list .item input {
		// width: 475rpx;
		flex: 1;
		font-size: 30rpx;
	}
	
	.placeholder {
		color: #ccc;
	}
	
	.addAddress .list .item .picker {
		width: 430rpx;
		font-size: 30rpx;
	}
	
	.addAddress .list .item .iconfont {
		font-size: 30rpx;
		margin-top: 4rpx;
	}
	
	.addAddress .default {
		padding: 0 30rpx;
		height: 90rpx;
		background-color: #fff;
	}
	
	.addAddress .default checkbox {
		margin-right: 15rpx;
	}
	
	.addAddress .keepBnt {
		width: 690rpx;
		height: 86rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 86rpx;
		margin: 50rpx auto;
		font-size: 32rpx;
		color: #fff;
	}
	
	
	.mt-22{
		margin-top: 22rpx;
	}
	.bg-color {
		background-color: #dd524d;
	}
	.address_val{
		padding: 10rpx 30rpx;
		min-height: 90rpx;
		background-color: #fff;
	}
</style>
