/**
 * 接口基地址
 */
export const BASE_URI = "http://192.168.68.221:30006";

/**
 *  登录 获取验证码  
 */
export const ACCOUNT_LOGIN = '/login/index';// 登录  
/**
 *  新用户信息注册
 */
export const ACCOUNT_REGIEST = '/login/register'; // 新用户信息注册
/**
 *  检查验证码
 */
export const ACCOUNT_SENDCODE = '/login/sendCode';// 检查验证码
/**
 * 忘记密码
 */
export const ACCOUNT_CHANGEPASSWORD = '/login/changePassword'//忘记密码



/**
 * 银行卡列表
 */
export const BANKS_BANKLIST = '/banks/index';  //银行卡列表
/**
 * 我的银行卡列表
 */
export const BANKS_GETMYBANKS = '/banks/getMyBanks';  //我的银行卡列表
/**
 * 新增银行卡
 */
export const BANKS_ADDBANK = '/banks/addbank'   //新增银行卡
/**
 * 删除银行卡
 */
export const BANKS_DELETEBANK = '/banks/deleteBank/{bank_card_id}' //删除银行卡 /{bank_card_id}



/**
 * 首页
 */
export const HOME_DATALIST = '/index/index'; // 数据列表
/**
 * 播报
 */
export const HOME_GETBROADCAST= '/index/getBroadcast'; // 播报
/**
 * 实时刷新
 */
export const INDEX_REFRESH = '/index/refresh'


/**
 * 订单
 */
export const ORDERS_TAG = '/orders/tag'; // 订单列表导航栏
/**
 * 订单列表
 */
export const ORDERS_LIST = '/orders/index'; // 订单列表
/**
 * 订单详情
 */
export const ORDERS_INFO = '/orders/info/{so_id}'; // 订单详情  /{so_id}
/**
 * 确定付款
 */
export const ORDERS_PAY = '/orders/pay/{so_id}'; // 确定已付款 /{so_id}put
/**
 * 确定取消
 */
export const ORDERS_CANCEL = '/orders/cancel/{so_id}'; // 确定取消 /{so_id}put
/**
 * 仲裁订单列表
 */
export const ORDERS_ARBITRATIONLIST = '/orders/arbitrationList'// 仲裁订单列表
/**
 * 仲裁详情
 */
export const ORDERS_ARBITRATIONINFO = '/orders/arbitrationInfo/{so_id}';// 仲裁信息 /{so_id}
/**
 * 被仲裁申诉
 */
export const ORDERS_ARBITRATION = '/orders/arbitration/{so_id}'; // 被仲裁申诉 /{so_id}put



/**
 * 产品
 */
export const PRODUCT_INDEX = '/product/index'  //产品列表
/**
 * 产品详情
 */
export const PRODUCT_INFO = '/product/info/{sp_id}'  //产品详情
/**
 * 锁定产品
 */
export const PRODUCT_LOCKING = '/product/locking/{sp_id}' //锁定产品put
/**
 * 挂卖列表导航栏
 */
export const PRODUCT_TAG = '/product/tag'  //挂卖列表导航栏
/**
 * 挂卖列表
 */
export const PRODUCT_SALELIST = '/product/saleList'  //挂卖列表
/**
 * 挂卖详情
 */
export const PRODUCT_SALEINFO = '/product/saleInfo/{sp_id}'  //挂卖详情
/**
 * 取消挂卖
 */
export const PRODUCT_CANCEL = '/product/cancel/{sp_id}'  //取消挂卖put
/**
 * 收到账款
 */
export const PRODUCT_RECEIVE = '/product/receive/{sp_id}' //收到账款put
/**
 * 挂卖产品
 */
export const PRODUCT_SALEPRODUCT = '/product/saleProduct' //挂卖产品
/**
 * 获取单价
 */
export const PRODUCT_GETPRICE = '/product/getPrice'  //获取单价
/**
 * 发起仲裁
 */
export const PRODUCT_ARBITRATION = '/product/arbitration/{sp_id}'//发起仲裁put



/**
 * 设置
 */
export const SETTING_LOGOUT = '/setting/logout'; // 退出登录put



/**
 *  分享
 */
export const SHARE_PAGE = '/share/index';   // 分享页
/**
 *  获取二维码
 */
export const SHARE_GETQRCODE = '/share/getQRCode';   // 获取二维码
/**
 * 二维码信息
 */
export const SHARE_INFO = '/share/info/{qr_user_id}'; //二维码信息 /{qr_user_id}
/**
 *  绑定用户
 */
export const SHARE_BIND = '/share/bind'; // 绑定用户 put
/**
 *  受益人数纪录
 */
export const SHARE_INCOMELIST = '/share/incomeList'; // 收益人数记录



/**
 *  上传
 */
export const UPLOAD_PIC = '/upload/index'; // 上传图片



/**
 * 用户
 */
export const USER_INDEX = '/user/index'; //用户首页
/**
 * 用户账户记录
 */
export const USER_ACCOUNTLOG = '/user/accountLog'; //用户账户记录
/**
 * 用户修改
 */
export const USER_SAVE = '/user/save';  //用户修改put
