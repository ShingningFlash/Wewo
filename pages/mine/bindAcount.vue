<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">绑定银行卡</block>
		</cu-custom>
		<view class="form">
			<view class="form-bind">绑定提现账户</view>

			<u-form labelWidth="0" :model="form" :rules="rules" ref="uForm">
				<u-form-item>
					<view class="form-bind" style="margin-bottom: 20rpx;">类型</view>
					<u-radio-group v-model="type" placement="column" @change="groupChange">
						<u-radio :customStyle="{marginBottom: '8px'}" v-for="(item, index) in filteredRadiolist"
							:key="index" :label="item.name" :name="item.name">
						</u-radio>

					</u-radio-group>
					<!-- <u-input placeholder="请输入账号" clearable v-model="form.number"></u-input> -->
				</u-form-item>
				<u-form-item prop="card_id">
					<u-input placeholder="请输入银行卡号" clearable v-model="form.card_id"></u-input>
				</u-form-item>
				<u-form-item prop="card_name">
					<u-input placeholder="请输入开户名" clearable v-model="form.card_name"></u-input>
				</u-form-item>

				<u-form-item prop="bank_code" @click="show = true" v-if="type == '对公'">
					<u-input placeholder="请选择所属银行卡" clearable v-model="form.bank_code_name" disabled></u-input>
				</u-form-item>
				<u-form-item prop="prov_code" @click="show2 = true" v-if="type == '对公'">
					<u-input placeholder="请选择所属省份" clearable v-model="form.prov_code_name" disabled></u-input>
				</u-form-item>
				<u-form-item prop="area_code" @click="show3 = true" v-if="type == '对公'">
					<u-input placeholder="请选择所属地区" clearable v-model="form.area_code_name" disabled></u-input>
				</u-form-item>

			</u-form>
		</view>
		<u-button :customStyle="submitStyle" @click="submit">提交</u-button>
		<u-picker :show="show" :columns="columns" keyName="name" :immediateChange="true" @confirm="confirm"
			@cancel="show = false"></u-picker>
		<u-picker :show="show2" :columns="columns2" keyName="name" :immediateChange="true" @confirm="confirm2"
			@cancel="show2 = false"></u-picker>
		<u-picker :show="show3" :columns="columns3" keyName="name" :immediateChange="true" @confirm="confirm3"
			@cancel="show3 = false"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_vip: 0,
				card: '',
				show: false,
				show2: false,
				show3: false,
				columns3: [],
				columns2: [],
				columns: [],
				type: '对公',
				radiolist1: [{
						name: '对公',
						value: 1,
						disabled: false
					},
					{
						name: '对私',
						value: 2,
						disabled: false
					}

				],
				submitStyle: {
					width: '690rpx',
					height: '90rpx',
					textAlign: 'center',
					lineHeight: '90rpx',
					fontWeight: 400,
					fontSize: '30rpx',
					color: '#fff',
					borderRadius: '45rpx',
					position: 'fixed',
					zIndex: 2,
					bottom: '90rpx',
					left: '50%',
					transform: 'translateX(-50%)',
					boxShadow: '0 17px 40px #68686838',
					background: '#33629C'


				},
				form: {
					type: 1, //类型 1对公 2对私
					card_id: '', //银行卡号
					card_name: '', //开户名
					bank_code: '', //所属银行卡 类型为1必填
					bank_code_name: '',
					prov_code: '', //所属省份 类型为1必填
					prov_code_name: '',
					area_code: '', //所属地区 类型为1必填
					area_code_name: ''
				},
				edit: 0,
				rules: {
					account_name: {
						required: true,
						message: '请输入开户名',
						trigger: ['change', 'blur']
					},
					bank: {
						required: true,
						message: '请输入开户行',
						trigger: ['change', 'blur']
					},
					number: {
						required: true,
						message: '请输入账号',
						trigger: ['change', 'blur']
					},
					phone: [{
							required: true,
							message: '请输入银行卡预留手机号',
							trigger: ['change', 'blur']
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value);
							},
							message: '手机号不正确',
							trigger: ['change', 'blur']
						}
					]
				}
			};
		},
		computed: {
			filteredRadiolist() {
				if (this.is_vip === 3) {
					this.type = '对私'
					this.form.type = 2
					return this.radiolist1.filter(item => item.name === '对私');
				} else {
					return this.radiolist1;
				}

			}
		},
		onLoad(e) {
			if (uni.getStorageSync('is_vip')) {
				this.is_vip = uni.getStorageSync('is_vip')
			}
			if (e.edit) {
				this.edit = e.edit
				console.log(JSON.parse(e.data));
				let data = JSON.parse(e.data)
				this.form.id = data.id
				this.card = data.card_id
				this.form.type = data.type
				this.form.card_name = data.card_name
				this.form.card_id = data.card_id
				this.form.bank_code = data.bank_code
				this.form.area_code = data.area_code
				this.form.prov_code = data.prov_code
				if (data.type == 1) {
					this.type = '对公'
				} else {
					this.type = '对私'
				}
			}
			this.getAdaBankList()
			this.getAdaRegionList(0)

			// seeWithdrawal().then((res) => {
			// 	if (res.data) {
			// 		this.form = res.data;
			// 	}
			// });
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			confirm(e) {
				this.show = false
				this.form.bank_code = e.value[0].code
				this.form.bank_code_name = e.value[0].name
			},
			confirm2(e) {
				this.show2 = false
				this.form.prov_code = e.value[0].code
				this.form.prov_code_name = e.value[0].name
				this.getAdaRegionList2(e.value[0].id)
			},
			confirm3(e) {
				this.show3 = false
				this.form.area_code = e.value[0].code
				this.form.area_code_name = e.value[0].name

			},
			getAdaBankList() {
				this.$http.getAdaBankList().then(res => {
					if (res.status == 1) {
						let data = []
						data.push(res.result)
						this.columns = data
						if (this.edit == 1) {
							this.columns[0].forEach(item => {
								if (item.code == this.form.bank_code) {
									this.form.bank_code_name = item.name
								}
							})
						}

					}
				})
			},
			getUserRegionList() {
				let data = {}
				data.region_id = 0
				this.$http.getUserRegionList(data).then(res => {
					if (res.status == 1) {
						let data = []
						data.push(res.result)
						this.columns2 = data
						this.getAdaRegionList(data[0].id)
					}
				})
			},
			getAdaRegionList(id) {
				let data = {}
				data.parent_id = id
				this.$http.getAdaRegionList(data).then(res => {
					if (res.status == 1) {
						let datad = []
						datad.push(res.result)
						let pa_id = ''
						this.columns2 = datad

						if (this.edit == 1) {
							uni.showLoading({
								title: '处理中',
								mask: true
							})
							this.columns2[0].forEach(item => {
								if (item.code == this.form.prov_code) {
									pa_id = item.id
									this.form.prov_code_name = item.name
								}
							})
							uni.hideLoading()
						}
						let datas = {

						}
						if (this.edit == 1) {
							datas.parent_id = pa_id
						} else {
							datas.parent_id = datad[0][0].id
						}


						this.$http.getAdaRegionList(datas).then(resd => {
							if (resd.status == 1) {
								let datadd = []
								datadd.push(resd.result)
								this.columns3 = datadd

								if (this.edit == 1) {
									uni.showLoading({
										title: '处理中',
										mask: true
									})
									this.columns3[0].forEach(item => {
										if (item.code == this.form.area_code) {
											this.form.area_code_name = item.name
										}
									})
									uni.hideLoading()
								}
							}
						})
					}
				})
			},
			getAdaRegionList2(id) {


				let datas = {

				}
				datas.parent_id = id

				this.$http.getAdaRegionList(datas).then(resd => {
					if (resd.status == 1) {
						let datadd = []
						datadd.push(resd.result)
						this.columns3 = datadd

					}
				})


			},


			groupChange(e) {
				console.log(e);
			},
			submit() {
				this.$refs.uForm
					.validate()
					.then(() => {
						console.log('校验通过');
						if (this.edit == 1) {
							if (this.card == this.form.card_id) {
								return uni.showToast({
									title: '只有卡号更改才可修改',
									icon: 'none',
									duration: 2000
								})
							}
						}
						uni.showLoading({
							title: '处理中',
							mask: true
						});

						let obj = this.form
						if (this.type == '对公') {
							obj.type = 1
						} else {
							obj.type = 2
						}
						delete obj.area_code_name
						delete obj.bank_code_name
						delete obj.prov_code_name
						this.$http.setBankApply(obj).then(res => {
							uni.$u.toast(res.msg);
							if (res.status == 1) {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									});
								}, 1500);
							}


						})

					})
					.catch(() => {
						uni.$u.toast('请完善信息');
					});
			}
		}
	};
</script>

<style>
	page {
		background: #f5f5f5;
	}
</style>
<style lang="scss">
	.form {
		border-radius: 12rpx;
		background: #fff;
		margin: 30rpx;
		padding: 56rpx 38rpx 43rpx 37rpx;
	}
</style>