<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">地址管理</block>
		</cu-custom>

		<view class="createBox">
			<view class="list flex s-center m-between" v-for="(item,index) in list" :key="item.id"
				@click="openShow(item.id)" style="width: 100%;">
				<view  class="flex s-center" :class="item.id == 3 ? 'm-between': ''" style="width: 100%;">
					<view class="key">
						{{item.key}}
					</view>
					<view class="value flex s-center"  :class="item.id == 3 ? 'marRight' : ''">
						<view class="flex" style="margin-right: 20rpx;" v-if="item.id == 2">
							<text style="font-weight: bold;">+86</text> <u-icon name="arrow-right" style="margin-left:10rpx" size="12"></u-icon>
						</view>
						<input v-model="item.name" type="text" :disabled="item.choose != 0 && false" :placeholder="item.placeholder" style="width: 370rpx;" v-if="item.id != 5" />
					</view>
					<u-icon name="arrow-right"  v-if="item.id == 3"></u-icon>
				</view>
			</view>
			
			<view class="list flex m-between s-center" @click="choose = !choose">
				<view  class="flex m-between" style="width: 100%;">
					<view class="key">
						智能识别
					</view>
					<u-icon name="arrow-right" v-if="choose" ></u-icon>
					<u-icon name="arrow-up" v-else ></u-icon>
				</view>
				<!-- <view class="btnb" @click="zhan">
					识别
				</view> -->
				<!-- <view class="btn1" style="text-align: center;margin-top:20rpx;" @click="zhan">
					地址文本识别
				</view> -->
				<!-- <view class="btn2" style="text-align: center;margin-top:20rpx;" @click="getWXaddress">
					获取微信地址
				</view> -->
			</view>
			<view class="flex s-center" v-if="!choose">
				<textarea  name="" id="" cols="3" rows="10" placeholder="请识别地址文本，可自动识别姓名、电话和地址，如张三，13800138000，浙江省杭州市余杭" v-model="texta" style="width: 534rpx;padding-top: 6rpx;background-color: #F7F7F9;padding: 30rpx;height:180rpx"></textarea>
				<view class="" style="color: #4CADD4;margin-left:10rpx" @click="paste">
					粘贴
				</view>
			</view>
			<view class="flex m-end s-center" v-if="!choose" style="margin-top: 20rpx;">
				<view class="" style="color: #979797;margin-right:40rpx;" @click="texta = ''">
					清除
				</view>
				<view class="btnb" @click="zhan">
					识别
				</view>
			</view>
			
		</view>

		<view class="createBtn" @click="save">
			确认并保存

		</view>

		<u-picker :show="show" :columns="columns" keyName="name" @confirm="confirm" title="省份"
			:closeOnClickOverlay="true" @cancel="show = false" @close="show = false" :immediateChange="true"
			ref="uPicker" :defaultIndex="defaultIndex" @change="onchange"></u-picker>
	</view>
</template>

<script>
	import AddressParse from 'address-parse';
	export default {

		data() {
			return {
				choose:false,
				show: false,
				defaultIndex: [0, 0, 0],
				list: [{
						id: 1,
						key: '收货人姓名',
						placeholder: '请填写收货人名称',
						choose: 0,
						name: ''

					},
					{
						id: 2,
						key: '手机号码',
						placeholder: '请输入收货人手机号码',
						choose: 0,
						name: ''

					},
					{
						id: 3,
						key: '所在区域',
						placeholder: '请选择省/市/区',
						choose: 1,
						name: ''
					},
					{
						id: 4,
						key: '详细地址',
						placeholder: '请输入街道地址',
						choose: 0,
						name: ''

					}
					
				],
				id: 1,
				columns: [

				],
				province: '', //省id
				city: '', //市id
				district: '', //区id
				address_id: '',

				value: '',
				texta:'' //粘贴
			}
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
									this.list[2].name = item.name
									this.defaultIndex[0] = index
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
											this.list[2].name += item.name
											this.defaultIndex[1] = index
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
													this.list[2].name += item.name
													this.defaultIndex[2] = index
												}
											})
											
											
										}
										
										
									}
									
									
								}
								
								
							}
						}
						
						this.list[3].name = res.detailInfo
						this.list[1].name = res.telNumber
						this.list[0].name = res.userName
					}
				})
			},
			paste(){
				uni.getClipboardData({
					success: async (res) => {
						this.texta = res.data
					}
				})
			},
			// 地址文本识别
			zhan() {
				uni.getClipboardData({
					success: async (res) => {
						
						const result = AddressParse.parse(res.data)
						if (result && result.length) {
							let html = ''
							for (let key in result[0]) {
								if (result[0][key]) {
									html += key + `:` + result[0][key] + `<br/>`
								}
							}
							this.value = JSON.stringify(result[0])
							this.value = JSON.parse(this.value)
							console.log(this.value, "value");
							if (this.value.province != '') {
								console.log(this.columns, 'col');
								this.columns[0].forEach((item,index)=>{
									if(item.name == this.value.province){
										this.province = item.id
										this.list[2].name = item.name
										this.defaultIndex[0] = index
									}
								})
								const reso  = await this.RegionList(this.province)
								if(reso.status == 1){
									console.log(reso);
									this.columns[1] = reso.result
									if(this.value.city != ''){
										this.columns[1].forEach((item,index)=>{
											if(item.name == this.value.city){
												this.city = item.id
												this.list[2].name += item.name
												this.defaultIndex[1] = index
											}
										})
										
										const reso2  = await this.RegionList(this.city)
										if(reso2.status == 1){
											console.log(reso2);
											this.columns[2] = reso2.result
											if(this.value.area != ''){
												this.columns[2].forEach((item,index)=>{
													if(item.name == this.value.area){
														this.district = item.id
														this.list[2].name += item.name
														this.defaultIndex[2] = index
													}
												})
												
												
											}
											
											
										}
										
										
									}
									
									
								}
							}
							
							if (this.value.details != '') {
								console.log(this.list, 'list');
								this.list[3].name = this.value.details
							}
							if (this.value.mobile != '') {
								this.list[1].name = this.value.mobile
							}
							if (this.value.phone != '') {
								this.list[1].name = this.value.phone
							}
							if(this.value.name != ''){
								this.list[0].name = this.value.name
							}

						}
					}


				});
			},
			openShow(id) {
				this.id = id
				if (this.id == 3) {
					this.show = true

				}
			},
			confirm(e) {
				this.list[2].name = e.value[0].name + e.value[1].name + e.value[2].name
				this.province = e.value[0].id
				this.city = e.value[1].id
				this.district = e.value[2].id
				this.show = false
			},
			// 更改地址
			onchange(e) {
				const {
					picker = this.$refs.uPicker
				} = e
				console.log(e);
				if (e.columnIndex == 0) {
					let data2 = {}
					data2.region_id = e.value[0].id

					this.$http.getUserRegionList(data2).then(res2 => {
						let datas = []
						datas = (res2.result)
						// this.columns = (datas)
						picker.setColumnValues(1, datas)
						let data3 = {}
						data3.region_id = res2.result[0].id
						this.$http.getUserRegionList(data3).then(res3 => {
							datas = (res3.result)
							picker.setColumnValues(2, datas)
						})
					})
				}
				if (e.columnIndex == 1) {
					let data3 = {}
					data3.region_id = e.value[1].id
					this.$http.getUserRegionList(data3).then(res3 => {
						let datas = []
						datas = (res3.result)
						picker.setColumnValues(2, datas)
					})
				}
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
			save() {
				if (this.list[0].name == '') {
					return uni.showToast({
						title: '请输入联系人',
						icon: 'none'
					})
				}
				let reg = /^1[3456789]\d{9}$/
				if (!reg.test(this.list[1].name)) {
					return uni.showToast({
						title: '请输入正确手机号',
						icon: 'none'
					})
				}

				if (this.list[3].name == '') {
					return uni.showToast({
						title: '请详细地址',
						icon: 'none'
					})
				}
				if (this.province == '' || this.city == '' || this.district == '') {
					return uni.showToast({
						title: '请选择地区',
						icon: 'none'
					})
				}

				uni.showModal({
					title: '提示',
					content: '确认保存吗？',
					success: (res) => {
						if (res.confirm) {
							let data = {}
							if (this.type == 'add') {
								data.address_id = 0
								// data.is_default = 1
							} else {
								data.address_id = this.address_id
								// data.is_default = 0
							}

							data.consignee = this.list[0].name
							data.mobile = this.list[1].name
							data.address = this.list[3].name

							data.user_id = uni.getStorageSync('user_id')
							data.province = this.province
							data.city = this.city
							data.district = this.district
							this.$http.setUserAddress(data).then(res => {
								if (res.status == 1) {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
									setTimeout(() => {
										uni.navigateBack({
											delta: 1
										})
									}, 2000)
								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none'
									})
								}

							})

						}
					}
				})
			},
			// 回显
			UserAddressInfo(id) {
				let data = {}
				data.address_id = id
				this.$http.getUserAddressInfo(data).then(res => {
					this.province = res.result.province
					this.city = res.result.city
					this.district = res.result.district
					this.list[3].name = res.result.address
					this.list[1].name = res.result.mobile
					this.list[0].name = res.result.consignee
					this.columns.push(res.result.province_list)
					this.columns.push(res.result.city_list)
					this.columns.push(res.result.district_list)
					this.columns[0].forEach((item, index) => {
						if (item.id == this.province) {
							this.defaultIndex[0] = index
							this.list[2].name += item.name
						}
					})
					this.columns[1].forEach((item, index) => {
						if (item.id == this.city) {
							this.defaultIndex[1] = index
							this.list[2].name += item.name
						}
					})
					this.columns[2].forEach((item, index) => {
						if (item.id == this.district) {
							this.defaultIndex[2] = index
							this.list[2].name += item.name
						}
					})
				})

			}
		},

		onLoad(e) {
			this.type = e.type
			if (e.type == 'add') {
				this.UserRegionList()
			} else {
				this.UserAddressInfo(e.id)
				this.address_id = e.id
			}
		}
	}
</script>

<style scoped lang="scss">
	.createBox {
		width: 690rpx;
		// height: 974rpx;
		border-radius: 12rpx;
		background: #fff;
		margin: 0 auto;
		margin-top: 30rpx;
		padding: 20rpx 20rpx;
		box-sizing: border-box;

		.list {
			padding: 38rpx 0;
			box-sizing: border-box;
			// border-bottom: 1rpx solid #e3e3e3;

			.key {
				width: 120rpx;
				font-weight: 700;
				font-size: 28rpx;
				color: #000;
				white-space: nowrap;

			}

			.value {
				font-weight: 400;
				font-size: 26rpx;
				margin-left: 68rpx;
				input{
					height: 60rpx;
				}
			}
			.marRight{
				margin-right:60rpx;
			}
			



		}
	}
	.btnb{
		padding: 10rpx 20rpx;
		background-color:rgba(51, 98, 156, .8);
		color: #fff;
		text-align: center;
		border-radius: 8rpx;
		
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
	.btn1{
		width: 305rpx;
		height: 60rpx;
		color: #fff;
		line-height: 60rpx;
		border-radius: 45rpx;
		background: #33629C;
	}
	.btn2{
		width: 305rpx;
		height: 60rpx;
		color: #fff;
		line-height: 60rpx;
		border-radius: 45rpx;
		background: #33629C;
	}
</style>