<template>
	<view>
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">我的银行卡</block>
		</cu-custom>
		<view class="list" @click="navTo('/pages/mine/bindAcount?edit=1&data='+JSON.stringify(listData))">
			<view class="name flex m-between">
				<view class="">
					{{listData.card_name}}
				</view>
				<view class="" style="margin-top:10rpx">
					{{currentCardName}}
				</view>
			</view>
			<view class="card" style="margin-top:10rpx">
				{{listData.card_id | formatBankCard}}
			</view>
			<view class="time" style="margin-top:10rpx">
				{{listData.add_time}}
			</view>
		</view>
		<u-button :customStyle="submitStyle" @click="navTo('/pages/mine/bindAcount?add=1')">添加银行卡</u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentCardName: '',
				listData: [],
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
			}
		},
		onShow() {
			this.getMyBank()
		},
		filters: {
			formatBankCard(value) {
				if (!value) return '';
				return value.replace(/\D/g, "").replace(/(.{4})(?=\d)/g, "$1 ");
			}
		},
		methods: {
			navTo(url) {
				uni.navigateTo({
					url: url
				})
			},
			getAdaBankList() {
				this.$http.getAdaBankList().then(res => {
					if (res.status == 1) {
						let data = res.result



						data.forEach(item => {
							if (item.code == this.listData.bank_code) {
								this.currentCardName = item.name
							}
						})


					}
				})
			},
			getMyBank() {
				this.$http.getMyBank().then(res => {
					if (res.status == 1) {
						this.listData = res.result
						this.getAdaBankList()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.list {
		width: 690rpx;
		padding: 25rpx;
		background-color: rgba(1, 139, 116, 1);
		border-radius: 15rpx;
		margin: 0 auto;
		margin-top: 20rpx;

		.name {
			color: #fff;
			font-size: 26rpx;
		}

		.card {
			color: #e1e1e1;
			font-size: 26rpx;
		}

		.time {
			color: #c7c7c7;
			font-size: 22rpx;
		}
	}
</style>