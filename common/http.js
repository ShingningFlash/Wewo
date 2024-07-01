import request from './request'

// 登录
export function MiniCodeLogin(params) {
    return new Promise((resolve, reject) => {
        request.post("/mini/User/MiniCodeLogin", params).then((result)=>{
            resolve(result);
        }).catch((error)=>{
            reject(error);
        });
    });
}

// 获取地区
export function getAdaRegionList(params) {
    return new Promise((resolve, reject) => {
        request.post("/mini/User/getAdaRegionList", params).then((result)=>{
            resolve(result);
        }).catch((error)=>{
            reject(error);
        });
    });
}

// 获取银行卡代码
export function getAdaBankList(params) {
    return new Promise((resolve, reject) => {
        request.post("/mini/User/getAdaBankList", params).then((result)=>{
            resolve(result);
        }).catch((error)=>{
            reject(error);
        });
    });
}
// 我的结算卡

export function getMyBank(params) {
    return new Promise((resolve, reject) => {
        request.post("/mini/User/getMyBank", params).then((result)=>{
            resolve(result);
        }).catch((error)=>{
            reject(error);
        });
    });
}
// 绑定结算卡
export function setBankApply(params) {
    return new Promise((resolve, reject) => {
        request.post("/mini/User/setBankApply", params).then((result)=>{
            resolve(result);
        }).catch((error)=>{
            reject(error);
        });
    });
}
// 商品收藏
export function setGoodsCollect(params) {
    return new Promise((resolve, reject) => {
        request.post("/mini/Goods/setGoodsCollect", params).then((result)=>{
            resolve(result);
        }).catch((error)=>{
            reject(error);
        });
    });
}
// 售后列表

export function getReturnList(params) {
    return new Promise((resolve, reject) => {
        request.post("/mini/Order/getReturnList", params).then((result)=>{
            resolve(result);
        }).catch((error)=>{
            reject(error);
        });
    });
}
// 售后详情

export function getUserRefundOrderInfo(params) {
    return new Promise((resolve, reject) => {
        request.post("/mini/Order/getUserRefundOrderInfo", params).then((result)=>{
            resolve(result);
        }).catch((error)=>{
            reject(error);
        });
    });
}
// 扫码
export function ScanCode(params) {
    return new Promise((resolve, reject) => {
        request.post("/mini/User/scanCode", params).then((result)=>{
            resolve(result);
        }).catch((error)=>{
            reject(error);
        });
    });
}
// 默认地址
export function UserAddressDefault(params) {
    return new Promise((resolve, reject) => {
        request.post("/mini/User/UserAddressDefault", params).then((result)=>{
            resolve(result);
        }).catch((error)=>{
            reject(error);
        });
    });
}
// 轮播图
export function getAdList(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Index/getAdList", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 首页分类
export function getGoodsIndexCat(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Index/getGoodsIndexCat", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 商品列表
export function getGoodsList(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Index/getGoodsList", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 商品详情

export function getGoodsInfo(params) {
    return new Promise((resolve, reject)=>{
        request.post("/Mini/Goods/getGoodsInfo", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 商品规格
export function getGoodsSpec(params) {
    return new Promise((resolve, reject)=>{
        request.post("/Mini/Goods/getGoodsSpec", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 首页广告图Index/getPosition
export function getPosition(params) {
    return new Promise((resolve, reject)=>{
        request.post("/Mini/Index/getPosition", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 个人资料
export function getUserInfo(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/User/getUserInfo", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 修改个人资料

export function setHandleUserInfo(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/User/setHandleUserInfo", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 浏览记录

export function getVisitGoodsList(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/user/getVisitGoodsList", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 删除浏览记录

export function delVisitGoods(params) {
    return new Promise((resolve, reject)=>{
        request.post("/Mini/User/delVisitGoods", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}


// 商品收藏列表
export function getCollectGoodsList(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/user/getCollectGoodsList", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 商品分类
export function getGoodsCatLsit(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Goods/getGoodsCatLsit", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 分类商品
export function getGoodsConditionList(params) {
    return new Promise((resolve, reject)=>{
        request.post("/Mini/Goods/getGoodsConditionList", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 分销管理

export function distributeCenter(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/User/distributeCenter", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 邀请分享

export function getSharePoster(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/User/getSharePoster", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 我的粉丝
export function getMineTeam(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/User/getMineTeam", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 分销订单
export function getRebateList(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/User/getRebateList", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 佣金提现
export function setwithdrawApply(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/User/setwithdrawApply", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 提现记录
export function getWithdrawLog(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/User/getWithdrawLog", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 地址列表
export function getUserAddressList(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/User/getUserAddressList", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 地址详情
export function getUserAddressInfo(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/User/getUserAddressInfo", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 新增修改地址
export function setUserAddress(params) {
    return new Promise((resolve, reject)=>{
        request.post("/Mini/User/setUserAddress", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 下拉地区
export function getUserRegionList(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/User/getUserRegionList", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 关于我们
export function getAboutUs(params) {
    return new Promise((resolve, reject)=>{
        request.post("/Mini/User/getAboutUs", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 意见反馈

export function setHandleFeedback(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/User/setHandleFeedback", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 
export function getComInfo(params) {
    return new Promise((resolve, reject)=>{
        request.post("/Mini/ApiConnect/getComInfo", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 删除地址
export function setUserAddressDelete(params) {
    return new Promise((resolve, reject)=>{
        request.post("/Mini/User/setUserAddressDelete", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 购物车
export function getCartAllList(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Goods/getCartAllList", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 加入购物车
export function setAddCart(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Goods/setAddCart", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 删除购物车
export function setCartDelete(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Goods/setCartDelete", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 购物车全选
export function setCartChangeAll(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Goods/setCartChangeAll", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 购物车+-选择
export function setCartChangeInfo(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Goods/setCartChangeInfo", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 创建订单

export function setCreatOrderInfo(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Goods/setCreatOrderInfo", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 支付
export function MiniPayOrder(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Order/MiniPayOrder", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 立即购买详情
export function getGoodsBuyNow(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Goods/getGoodsBuyNow", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 购物车进入结算
export function getSettleAccounts(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Goods/getSettleAccounts", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 订单列表

export function getorder(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Order/getGoodsCatLsit", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 退货原因
export function getSelectOpts(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/User/getSelectOpts", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 提交售后

export function setHandleOrderRefund(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Order/setHandleOrderRefund", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 确认收货
export function setUserOrderAffirm(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Order/setUserOrderAffirm", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 取消订单

export function setAllOrderOut(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Order/setAllOrderOut", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 订单详情
export function getUserOrderInfo(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Order/getUserOrderInfo", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 删除订单
export function setUserOrderDel(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Order/setUserOrderDel", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
/**
 * 删除售后订单
 * @param {Object} params
 */
export function delUserRefund(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/order/delUserRefund", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
/**
 * 售后商品寄回
 * @param {Object} params
 */

export function setRefundSendBack(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Order/setRefundSendBack", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}
// 查看物流

export function getWuliu(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Order/getShippingData", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

/**
 * 我的页面获取/user/getOrderNum
 * @param {Object} params
 */
export function getOrderNum(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/user/getOrderNum", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}



// 代付确认
export function behalfPay(params) {
    return new Promise((resolve, reject)=>{
        request.post("/mini/Order/behalfPay", params).then((result)=>{
            resolve(result)
        }).catch(err=>{
            reject(err)
        });
    });
}

// 如果说比较懒，或者是不想这么麻烦，也可直接用这两个，调用的时候第一个参数换成接口地址即可
export function httpGet(url, params) {
  return new Promise((resolve, reject)=>{
      request.get(url, params).then((result)=>{
          resolve(result)
      }).catch(err=>{
          reject(err)
      });
  });
}




export function httpPost(url, params) {
  return new Promise((resolve, reject)=>{
      request.post(url, params).then((result)=>{
          resolve(result)
      }).catch(err=>{
          reject(err)
      });
  });
}



