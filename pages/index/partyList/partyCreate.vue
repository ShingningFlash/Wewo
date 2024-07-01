<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">创建活动</block>
		</cu-custom>
		<view class="createBox">
			<view class="list flex s-center m-between" v-for="(item,index) in list" :key="item.id"
				@click="openShow(item.id)">
				<view class="flex s-center">
					<view class="key">
						{{item.key}}
					</view>
					<view class="value">
						<input v-if="item.choose == 0 || item.choose == 1" v-model="item.name" type="text" :disabled="item.choose != 0"
							:placeholder="item.placeholder">
							<input v-else  type="text" :disabled="item.choose != 0"
								:placeholder="item.placeholder">
					</view>
				</view>
				<view class="upload bg-gradual-wineRed" v-if="item.choose == 2 && uploadUrl == ''" @click="upload">
					上传图片
				</view>
				<view class="upload flex m-around" v-if="item.choose == 2 && uploadUrl != ''">
					<view class="preview bg-gradual-wineRed" @click="perview">
						预览
					</view>
					<view class="change bg-gradual-wineRed" @click="upload">
						更换
					</view>
				</view>
				<image v-if="item.choose ==1" src="/static/icons/icon38.png" mode=""></image>
			</view>

		</view>
		<view class="createBtn bg-gradual-wineRed" @click="create">
			确认创建
		</view>
		<!-- 聚会类型 -->
		<u-picker :immediateChange="true" :show="show" :columns="columns" @cancel="show = false"
			@confirm="confirm" :defaultIndex="[0]" keyName="label"></u-picker>
		<!-- 时间 -->
		<u-datetime-picker ref="datetimePicker" :show="showdate" v-model="nowTime" mode="date" :formatter="formatter"
			@cancel="showdate = false" @confirm="confirmdate"></u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				showdate: false,
				nowTime: Number(new Date()),
				columns: [
					
				],
				list: [{
						id: 1,
						key: '聚会名称',
						placeholder: '请填写聚会名称',
						choose: 0,
						name: ''

					},
					{
						id: 2,
						key: '聚会类型',
						placeholder: '请填写聚会类型',
						choose: 1,
						name: ''
					},
					{
						id: 3,
						key: '聚会人数',
						placeholder: '请填写聚会人数',
						choose: 0,
						name: ''
					},
					{
						id: 4,
						key: '开始时间',
						placeholder: '请选择开始时间',
						choose: 1,
						name: ''
					},
					// {
					// 	id: 5,
					// 	key: '结束时间',
					// 	placeholder: '请选择结束时间',
					// 	choose: 1,
					// 	name: ''
					// },
					// {
					// 	id: 5,
					// 	key: '聚会地址',
					// 	placeholder: '请填写聚会地址',
					// 	choose: 0,
					// 	name: ''
					// },
					{
						id: 5,
						key: '聚会封面',
						placeholder: '点击上传图片',
						choose: 2,
						name: ''
					},
					{
						id: 6,
						key: '联系人',
						placeholder: '请填写您的姓名',
						choose: 0,
						name: ''
					},
					{
						id: 7,
						key: '联系电话',
						placeholder: '请填写联系电话',
						choose: 0,
						name: ''
					}
				],
				uploadUrl: '',
				id: 1,
				type:''
			}

		},
		onReady() {
			// 微信小程序需要用此写法
			this.$refs.datetimePicker.setFormatter(this.formatter)
		},
		methods: {
			// 格式时间
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				return value
			},

			// 打开聚会类型弹窗
			openShow(id) {
				this.id = id
				if (id == 2) {
					this.show = true
					this.getActivityType()
				} else if (id == 4) {
					this.showdate = true
				}

			},
			// 确认时间
			confirmdate(e) {
				console.log(e);
				var date = new Date(e.value);
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let D = date.getDate() + ' ';
				this.list[this.id - 1].name = Y + M + D
				this.showdate = false

			},


			confirm(e) {
				this.list[this.id - 1].name = e.value[0].label
				this.type = e.value[0].value
				this.show = false
			},
			// 创建活动
			create() {
				if (this.list[0].name == '') {
					return uni.showToast({
						title: '请填写聚会名称',
						icon: 'none'
					})
				}
				if (this.list[1].name == '') {
					return uni.showToast({
						title: '请填写聚会类型',
						icon: 'none'
					})
				}
				if (this.list[2].name == '') {
					return uni.showToast({
						title: '请填写聚会人数',
						icon: 'none'
					})
				}
				if (this.list[3].name == '') {
					return uni.showToast({
						title: '请选择开始时间',
						icon: 'none'
					})
				}
				if (this.list[4].name == '') {
					return uni.showToast({
						title: '请先上传图片',
						icon: 'none'
					})
				}
				if (this.list[5].name == '') {
					return uni.showToast({
						title: '请填写您的姓名',
						icon: 'none'
					})
				}
				if (this.list[6].name == '') {
					return uni.showToast({
						title: '请填写联系电话',
						icon: 'none'
					})
				}
				uni.showModal({
					title: '提示',
					content: '是否确认创建活动?',
					success: (res) => {
						if (res.confirm) {
							let data = {}
							data.name = this.list[0].name
							data.type = this.type
							data.num = this.list[2].name
							data.start_time = this.list[3].name
							data.cover_img = this.list[4].name
							data.contact_name = this.list[5].name
							data.contact_phone = this.list[6].name
							this.$httpRequest({
								url: 'setActivity'
							}, data).then(res => {

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
			// 上传图片
			upload() {
				var that = this
				uni.chooseImage({
					count: 1,
					success: (res) => {
						console.log(res);
						if (res.errMsg == "chooseImage:ok") {
							this.uploadUrl = res.tempFilePaths[0]
							uni.uploadFile({
								url: 'https://jlx.ydlweb.com/mini/ApiConnect/uploadImg',
								filePath: res.tempFilePaths[0],
								name: 'file',
								header:{
									token:uni.getStorageSync('tokens')
								},
								formData: {
									'file': res.tempFiles
								},
								success(res2) {
									if (JSON.parse(res2.data).status == 1) {
										that.uploadUrl = (JSON.parse(res2.data).result.url_img)
										that.list[4].name = (JSON.parse(res2.data).result.url_img)
										uni.showToast({
											title: '上传成功',
											icon: 'none'
										})
									} else {
										uni.showToast({
											title: JSON.parse(res2.data).msg,
											icon: "none",
											duration: 2000
										});
									}
								}
							});
							
						}
					}
				})
			},
			// 预览图片
			perview() {
				uni.previewImage({
					urls: [this.uploadUrl]
				})

			},
			// 获取活动类型
			getActivityType(){
				this.columns = []
				this.$httpRequest({
					url: 'getActivityType'
				}).then(res => {
					if (res.status == 1) {
						let data = []
						data = res.result
						this.columns.push(data)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})
			}
		},

	}
</script>
<style>
	page {
		background-color: #EFEFEF;
	}
</style>
<style scoped lang="scss">
	.createBox {
		width: 690rpx;
		// height: 974rpx;
		border-radius: 12rpx;
		background: #fff;
		margin: 0 auto;
		margin-top: 30rpx;
		padding: 40rpx 20rpx;
		box-sizing: border-box;

		.list {
			padding: 38rpx 0;
			box-sizing: border-box;
			border-bottom: 1rpx solid #e3e3e3;

			.key {
				width: 120rpx;
				font-weight: 700;
				font-size: 28rpx;
				color: #000;

			}

			.value {
				font-weight: 400;
				font-size: 26rpx;
				margin-left: 36rpx;
			}

			image {
				width: 10rpx;
				height: 17rpx;
			}

			.upload {
				width: 183rpx;
				height: 53rpx;
				border-radius: 26.5rpx;
				line-height: 53rpx;
				text-align: center;
				font-weight: 400;
				font-size: 26rpx;
				color: #fff;

				&:active {
					background: lighten($color: #f02635, $amount: 10%);
				}

				.preview {
					border-radius: 16.5rpx;
					padding: 0 10rpx;
				}

				.change {
					border-radius: 16.5rpx;
					padding: 0 10rpx;
				}
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
		bottom: 45rpx;
		left: 50%;
		transform: translateX(-50%);

		&:active {
			background: lighten($color: #f02635, $amount: 10%)
		}
	}
</style>