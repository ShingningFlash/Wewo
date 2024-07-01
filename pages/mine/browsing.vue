<template>
	<view :class="isEdit ? 'actvie' :''">
		<!-- 自定义顶部 -->
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">浏览记录</block>
		</cu-custom>
		<!-- 输入框部分 -->
		<view class="district-input-box">
			<view class="district-input-warp">
				<view class="input-box">
					<u-search shape="round" :showAction="false" :clearabled="true" bgColor="#E8E8E8"
						searchIconColor="#1067C7" @search="getVisitGoodsList(0)" v-model="keyword"
						@clear="getVisitGoodsList(1)"></u-search>
				</view>
				<view class="edit" @click="isEdit  = !isEdit">
					{{isEdit == 0 ? '编辑' : '完成'}}
				</view>
			</view>
		</view>
		<view class="content-list" v-for="(item,index) in dataList" :key="index">
			<view class="title">
				{{item.name}}
			</view>
			<view class="flex m-between s-center" style="margin-top: 20rpx;" v-for="(items,indexs) in item.list" :key="indexs" @click="navTo('/pages/product/productDetail?id='+items.goods_id)">
				<view class="listCheckBox" v-if="isEdit" @click.stop="SelectId(items.isSelect,index,indexs)">

					<radio :checked="items.isSelect == 1" color="#1067C7"
						style="transform:scale(0.7);color: #1067C7;" />
				</view>

				<view class="image">
					<image :src="items.original_img" mode="" style="width: 178rpx;height: 178rpx;"></image>
				</view>
				<view class="right">
					<view class="name">
						{{items.goods_name}}
					</view>
					<view class="price">
						<text>￥</text>
						{{items.shop_price}}
					</view>
				</view>
			</view>



		</view>
		<view class="" style="width: 100%;height:120rpx">
			
		</view>
		<!-- 底部操作栏部分 -->
		<view class="btmTab" v-if="isEdit != 0">
			<view class="leftRadio"  @click="CartChangeAll">
				<radio :checked="allChoose" color='#1067C7' style="transform:scale(0.7)" />全选
			</view>
			<view class="rgtBtn" @click="CartDelete">删除</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEdit: 0,
				keyword: '',
				dataList: [],
				ids: []
			}
		},
		computed: {
			allChoose: function() {
			  if (Array.isArray(this.dataList) && this.dataList.length !== 0) {
			    return this.dataList.every(item => {
			      // 检查 'item' 是否是一个对象，并且有一个 'list' 属性，该属性是一个数组
			      return typeof item === 'object' && Array.isArray(item.list) && item.list.every(items => {
			        // 检查 'items' 是否是一个对象，并且有一个 'isSelect' 属性
			        return typeof items === 'object' && 'isSelect' in items && items.isSelect;
			      });
			    });
			  }
			
			  return false;
			}

		},
		onShow() {
			this.getVisitGoodsList()
		},
		methods: {
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
			CartChangeAll(){
				if(this.allChoose == 1){
					for (let j = 0; j < this.dataList.length; j++) {
					
						for (let i = 0; i < this.dataList[j].list.length; i++) {
					
							this.dataList[j].list[i].isSelect = 0
						}
					}
				}
				else{
					for (let j = 0; j < this.dataList.length; j++) {
					
						for (let i = 0; i < this.dataList[j].list.length; i++) {
					
							this.dataList[j].list[i].isSelect = 1
						}
					}
				}
				this.dataList = JSON.parse(JSON.stringify(this.dataList))
			},
			SelectId(isSelect, index,indexs) {
				if (isSelect == 1) {
					this.dataList[index].list[indexs].isSelect = 0
					
					this.dataList = JSON.parse(JSON.stringify(this.dataList))

				} else {
					
					
					this.dataList[index].list[indexs].isSelect = 1
					this.dataList = JSON.parse(JSON.stringify(this.dataList))

				}



				

			},
			CartDelete() {
				uni.showModal({
					title: '提示',
					content: '是否删除？',
					success: (res) => {
						if (res.confirm) {
							let data = {}
							let ids = []
							this.dataList.forEach((item, index) => {
								item.list.forEach(items => {
									if (items.isSelect == 1) {
										ids.push(items.visit_id)
									}
								})
							})

							console.log(ids);

							data.visit_id = ids.join(',')
							this.$http.delVisitGoods(data).then(res => {
								if (res.status == 1) {
									setTimeout(() => {
										uni.showToast({
											title: res.msg,
											icon: 'none',
											duration: 2000
										})
									}, 800)
									this.getVisitGoodsList()

								} else {
									uni.showToast({
										title: res.msg,
										icon: 'none',
										duration: 2000
									})
								}
							})
						}
					}
				})

			},

			// 获取浏览记录
			getVisitGoodsList() {
				let data = {}
				data.keyword = this.keyword
				this.$http.getVisitGoodsList(data).then(res => {
					if (res.status == 1) {
						
						this.dataList = res.result
						this.dataList = Object.values(this.dataList)
						
						this.dataList.forEach((item) => {
							item.list.forEach((item2) => {
								item2.isSelect = 0
							})
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						})
					}

				})

			},
		}
	}
</script>

<style lang="scss" scoped>
	// 输入框部分
	.district-input-box {

		padding: 0 30rpx;
		background-color: #fff;
		padding-bottom: 23rpx;

		.district-input-warp {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.input-box {
				width: 580rpx;
			}

			.edit {
				font-family: "PingFang SC";
				font-weight: 400;
				font-size: 24rpx;
				color: #000;
			}
		}
	}

	.active {
		padding-bottom: 120rpx;
	}

	.content-list {
		width: 690rpx;
		margin: 0 auto;
		padding: 15rpx 25rpx;
		border-radius: 12rpx;
		background: #fff;
		margin-top: 30rpx;
		box-sizing: border-box;

		.title {
			font-family: "PingFang SC SNaNpxibold";
			font-weight: 600;
			font-size: 38rpx;
			color: #111;
			margin-bottom: 25rpx;
		}

		.image {
			width: 178rpx;
			height: 178rpx;
			border-radius: 5rpx;
		}

		.right {
			width: 390rpx;

			.name {
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
				font-family: "PingFang SC Bold";
				font-weight: 700;
				font-size: 30rpx;
				color: #2a2a2a;
			}

			.price {
				text {
					font-size: 24rpx;
				}

				font-family: "DIN Bold";
				font-weight: 700;
				font-size: 36rpx;
				color: #a50a11;
			}
		}
	}

	// 底部操作栏部分
	.btmTab {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		padding: 0rpx 30rpx;
		padding-right: 0;
		background-color: #fff;
		height: 100rpx;

		.leftRadio {
			display: flex;
			align-items: center;
			font-family: "PingFang SC";
			font-weight: 400;
			font-size: 28rpx;
			text-align: center;
			color: #6e6e6e;

			radio {
				.wx-radio-input.wx-radio-input-checked {
					border: 1rpx solid #E41F2C !important;
					background-color: #E41F2C !important;
				}

				margin-right: 10rpx;
			}
		}


		.rgtBtn {
			width: 314rpx;
			height: 100%;
			background: #E5432C;
			color: #fff;
			text-align: center;
			line-height: 99rpx;
			margin-left: auto;
			font-size: 34rpx;
		}

		.rgtBtn:active {
			background-color: #eb432d;
		}
	}
</style>