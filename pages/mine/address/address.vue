<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">地址管理</block>
		</cu-custom>

		<view class="list flex m-between s-center" v-for="(item,index) in dataList" :key="index" @longpress="dell(item.address_id,index)">
			<view class="listLeft flex-col">
				<view class="flex s-center">
					<view class="name">{{item.consignee}}</view>
					<view class="phone">{{item.mobile}}</view>
				</view>
				<view class="address">
					{{item.province}}{{item.city}}{{item.district}}{{item.address}}
				</view>
				<view class="flex s-center" style="margin-top: 10rpx;">
					<image style="width:35rpx;height: 35rpx;margin-right: 10rpx;" v-if="item.is_default == 1" src="/static/icons/icon30.png" mode=""></image>
					<image style="width:35rpx;height: 35rpx;margin-right: 10rpx;" v-else src="/static/icons/icon29.png" mode="" @click="UserAddressDefault(item.address_id,index)"></image>设为默认地址
				</view>
			</view>
			<view class="listRight" @click="navTo('/pages/mine/address/addressDetail?type=edit'+'&id='+item.address_id)">
				<image src="/static/icons/icon28.png" mode=""></image>
			</view>
		</view>
		<view class="createBtn" @click="getWXaddress" style="bottom:200rpx">
			一键获取微信地址
		</view>
		<view class="createBtn" @click="navTo('/pages/mine/address/addressDetail?type=add')">
			新增地址
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
				columns:[],
				province:'',
				city:'',
				district:''
				
				
			}
		},
		onShow() {
			this.UserAddressList()
			
		},
		onLoad() {
			this.UserRegionList()
		},
		methods: {
			getWXaddress(){
				uni.chooseAddress({
					success: async (res) => {
						console.log(res);
						if (res.provinceName != '') {
							
							this.columns[0].forEach((item,index)=>{
								if(item.name == res.provinceName){
									this.province = item.id
									
								}
							})
							const reso  = await this.RegionList(this.province)
							if(reso.status == 1){
								console.log(reso);
								this.columns[1] = reso.result
								if(res.cityName != ''){
									this.columns[1].forEach((item,index)=>{
										if(item.name == res.cityName){
											this.city = item.id
											
											
										}
									})
									
									const reso2  = await this.RegionList(this.city)
									if(reso2.status == 1){
										console.log(reso2);
										this.columns[2] = reso2.result
										if(res.countyName != ''){
											this.columns[2].forEach((item,index)=>{
												if(item.name == res.countyName){
													this.district = item.id
													let par = {}
													par.address_id = 0
													par.consignee = res.userName
													par.mobile = res.telNumber
													par.address = res.detailInfo
													
													par.user_id = uni.getStorageSync('user_id')
													par.province = this.province
													par.city = this.city
													par.district = this.district
													uni.showLoading({
														title:'处理中',
														mask:true
													})
													this.$http.setUserAddress(par).then(res => {
														uni.hideLoading()
														if (res.status == 1) {
															uni.showToast({
																title: res.msg,
																icon: 'none'
															})
															setTimeout(() => {
																this.UserAddressList()
															}, 2000)
														} else {
															uni.showToast({
																title: res.msg,
																icon: 'none'
															})
														}
													
													})
													
												}
											})
											
											
										}
										
										
									}
									
									
								}
								
								
							}
						}
						
						
						
					}
				})
			},
			async RegionList(id) {
			  return new Promise((resolve, reject) => {
			    let data = {};
			    data.region_id = id;
			
			    this.$http.getUserRegionList(data)
			      .then(res => {
			        // 在这里处理 res 数据，如果有需要的话
			        resolve(res);
			      })
			      .catch(error => {
			        // 在这里处理请求失败的情况，如果有需要的话
			        reject(error);
			      });
			  });
			},
			// 地址
			 UserRegionList(ids) {
				let data = {}
				data.region_id = 0
				this.$http.getUserRegionList(data).then(res => {
					let datas = []
					datas.push(res.result)
					this.columns = (datas)
					let data2 = {}
					data2.region_id = res.result[0].id
			
					this.$http.getUserRegionList(data2).then(res2 => {
						datas.push(res2.result)
						this.columns = (datas)
						let data3 = {}
						data3.region_id = res2.result[0].id
						this.$http.getUserRegionList(data3).then(res3 => {
							datas.push(res3.result)
							this.columns = (datas)
						})
					})
				})
			
			},
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			UserAddressList() {
				this.$http.getUserAddressList().then(res => {
					if(res.status == 1){
						this.dataList = res.result.rows
					}
				})
				
			},
			dell(id,index){
				uni.showModal({
					title:'提示',
					content:'是否删除地址？',
					success: (res) => {
						if(res.confirm){
							let data = {}
							data.address_id = id
							this.$http.setUserAddressDelete(data).then(res => {
								if(res.status == 1){
									uni.showToast({
										title:res.msg,
										icon:'none'
									})
									this.dataList.splice(index,1)
									
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
				})
				
			},
			// 设置默认地址
			UserAddressDefault(id,index){
				let data = {}
				data.address_id = id
				
				uni.showLoading({
					title:'请求中',
					mask:true
				})
				this.$http.UserAddressDefault(data).then(res => {
					uni.hideLoading()
					if(res.status == 1){
						this.dataList.forEach(item=>{
							item.is_default = 0
						})
						this.dataList[index].is_default = 1
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
					else{
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
					}
				})
				
			},
		}
	}
</script>
<style>
	page {
		background-color: #EFEFEF;
	}
</style>
<style lang="scss" scoped>
	.list {
		width: 690rpx;
		border-radius: 12rpx;
		background: #fff;
		margin: 0 auto;
		margin-top: 30rpx;
		padding: 30rpx 35rpx;
		box-sizing: border-box;

		.listLeft {
			width: 525rpx;

			.name {
				font-weight: 700;
				font-size: 30rpx;
				color: #000;
			}

			.phone {
				font-weight: 400;
				font-size: 26rpx;
				color: #919191;
				margin-left: 14rpx;
			}

			.address {
				font-weight: 400;
				font-size: 26rpx;
				color: #919191;
				margin-top: 14rpx;
			}
		}

		.listRight {
			width: 35rpx;
			height: 34rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.createBtn {
		width: 690rpx;
		height: 90rpx;
		text-align: center;
		line-height: 90rpx;
		font-weight: 400;
		font-size: 30rpx;
		color: #fff;
		border-radius: 45rpx;
		position: fixed;
		z-index: 2;
		bottom: 90rpx;
		left: 50%;
		transform: translateX(-50%);
		box-shadow: 0 17px 40px #68686838;
		background: #33629C;
		&:active {
			background: lighten($color: #33629C, $amount: 10%)
		}
	}
</style>