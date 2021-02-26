import { observable, action, makeObservable } from "mobx";
import axios from '../api/request'
import { PRODUCT_INDEX, ORDERS_LIST,USER_INDEX } from '../api/pathMap'
class RootStore {
    constructor() {
        makeObservable(this)
    }
    // 手机号码
    @observable email = "";
    // token
    @observable token = "";
    //name 
    @observable name = "";
    //phoneNum
    @observable phoneNum = "";
    //头像
    @observable avaUrl = "";
    //NSS币
    @observable nss = 0;
    //锁定余额
    @observable lockNss = 0;

    //存版本号 和 是否更新版本
    @observable appVersion = '';
    @observable isUpdate = '';
    //是否有未处理的仲裁订单
    @observable newArb = ''

    //线路
    @observable activeCDN = 1;

    //设置仓库
    @action setUserInfo(email, token,) {
        this.email = email;
        this.token = token;
    }
    @action setAvaUrl(avaUrl) {
        this.avaUrl = avaUrl
    }
    @action setPNInfo(avaUrl, phoneNum, name) {
        this.phoneNum = phoneNum;
        this.name = name;
        this.avaUrl = avaUrl
    }

    @action setVersion(appVersion, isUpdate,newArb) {
        this.appVersion = appVersion;
        this.isUpdate = isUpdate;
        this.newArb = newArb
    }

    @action setNss(nss, lockNss) {
        this.nss = nss;
        this.lockNss = lockNss;
    }

    @action async axiosNss() {
        await axios.get(USER_INDEX, {
            headers: {
              "Content-Type": "application/json",
              "token": rootStore.token
            }
          }).then(r => {
            if(r.data.code === 1) {
              console.log('[远程NSs我的]',r.data.result)
            this.nss = r.data.result.nss_balance,
            this.lockNss = r.data.result.locked_nss_balance
            }else {
              Toast.message(r.data.message,2000,'center')
            }
          }).catch(e => console.log('[远程我的]', e))
    }

    @action setActiveCDN(activeCDN) {
        this.activeCDN = activeCDN
    }

    // 清除信息 退出
    @action clearUserInfo() {
        this.email = "";
        this.token = "";
        this.nss = "";
        this.lockNss = "";
        this.phoneNum = "";
        this.name = "";
        this.avaUrl = ""
    }

    @action clearActiveCDN() {
        this.activeCDN = 1
    }
    @action clearNewArb() {
        this.newArb = ''
    }
   
    //清除rn-tab-navigation角标
    @action clearcir() {
        this.isUpdate = '',
        this.newArb = ''
    }


    ////产品列表
    @observable productList = []
    @observable productLocalStorage = []


    @action setProductList(arr) {
        this.productList = arr
    }

    @action async axiosProductList() {
        var url = PRODUCT_INDEX + `?page=1`
        await axios.get(url, {
            headers: {
                "token": this.token
            }
        }).then(r => {
            console.log('mobx 请求成功返回', r.data)
            if (r.data.code === 1) {
                //产品列表存到mobx中
                this.productList = r.data.result.list
                return
            }
            else if (r.data.code === -1) {
                Toast.message(r.data.message, 6000, 'center')
                this.props.navigation.navigate("Login")
            }
            else {
                Toast.message(r.data.message, 2000, 'center')
                return
            }
        })
            .catch(e => console.log(e))
    }

    //滚动条添加数据
    @action setProdectScroll(arr) {
        this.productList = [...this.productList, ...arr]
    }
    //增加一个产品
    @action addProduct() {
        console.log('mobx添加的数据', this.productLocalStorage)
        this.productList = [...this.productList, ...this.productLocalStorage]
    }

    //列表删除 某一个产品id
    @action deleteProduct(spId) {
        this.productList = this.productList.filter(ele => {
            return ele.sp_id !== spId
        })
    }
    //列表缓存一个产品
    @action productStorage(spId) {
        this.productLocalStorage = this.productList.filter(ele => {
            return ele.sp_id === spId
        })
    }

    //缓存取出来给产品列表渲染
    @action pStorage2productList() {
        this.productList = [...this.productList,...this.productLocalStorage]
    }

    //订单列表
    @observable orderList = []

    @action setOrderList(arr) {
        this.orderList = arr
    }

    @action async axiosOrderList() {
        console.log('[进去mobx挂卖列表请求了]')
        var url = ORDERS_LIST + `?page=1`
        await axios.get(url, {
            headers: {
                "token": rootStore.token
            }
        }).then(r => {
            if (r.data.code === 1) {
                //订单列表存到mobx中
                console.log('mobx请求', r.data.result.list)
                this.ProductList = r.data.result.list
                return
            }
            else if (r.data.code === -1) {
                Toast.message(r.data.message, 6000, 'center')
                this.props.navigation.navigate("Login")
            }
            else {
                Toast.message(r.data.message, 2000, 'center')
                return
            }
        })
            .catch(e => console.log(e))
    }
    //滚动条添加数据
    @action setOrderScroll(arr) {
        this.orderList = [...this.orderList, ...arr]
    }

    //发布增加一个订单
    @action addOrder() {
        this.orderList = [...this.orderList]
    }

    //挂卖列表删除 某一个订单id
    @action delete1Order(Id) {
        for(let i = 0; i < this.orderList.length; i ++ ) {
            if(this.orderList[i].sp_id === Id){
                this.orderList.splice(i,1);
            }
        }
    }

    //订单列表删除 某一个订单id
    @action delete2Order(Id) {
        for(let i = 0; i < this.orderList.length; i ++ ) {
            if(this.orderList[i].so_id === Id){
                this.orderList.splice(i,1);
            }
        }
    }
}

export default new RootStore();