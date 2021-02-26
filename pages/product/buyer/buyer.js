import React, { Component } from 'react'
import {
    View,
    Text,
    StatusBar,
    Image,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native'
import MyToast from '../../../utils/MyToast'
import TouchLingth from '../../../utils/TouchLinght'
import ToastTwo from '../../../components/ToastTwo'
import { pxToPt } from "../../../utils/styleKits";
import Clipboard from '@react-native-community/clipboard'
import axios from '../../../utils/api/request'
import { PRODUCT_INFO, PRODUCT_LOCKING, ORDERS_PAY, ORDERS_CANCEL, ORDERS_INFO } from '../../../utils/api/pathMap'
import { inject } from 'mobx-react'
import Toast from '../../../utils/api/Toast'
@inject('rootStore')
/**
 * 这是产品详情页
 */
export default class home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            token: this.props.rootStore.token,
            showModal: true,  //控制锁定成功弹窗
            changeDetail: true,  //控制锁定后弹出的模块
            changeHeadO: true,   //控制 锁定后的 头部信息
            showBtn: true, // 是否隐藏btn
            data: [],
            remain: 0,  //定时器返回的数字
            dataLock: {},
            num: 1,
            dataPay: {},
            dataCancel: {},
            soId: ''
        }
        this.time = null
    }

    copyBankNum = () => {
        //复制银行卡号 Clipboard   this.state.bankNum
        Toast.message('Copy Success', 2000, 'bottom')
        Clipboard.setString(bankNum)
    }
    //获取锁定后的订单详情
    getUserInfo = async () => {
        var url = PRODUCT_LOCKING.replace('{sp_id}', this.props.route.params.id)
        await axios.put(url, {}, {
            headers: {
                "token": this.state.token
            }
        }).then(r => {
            if (r.data.code === 1) {
                this.setState({
                    dataLock: r.data.result
                })
            }
            else {
                Toast.message(r.data.message, 2000, 'center')
                return
            }
        }).catch(e => console.log(e))
    }
    //打勾 锁定弹窗
    showMo = async () => {
        var url = PRODUCT_LOCKING.replace('{sp_id}', this.props.route.params.id)
        await axios.put(url, {}, {
            headers: {
                "token": this.state.token
            }
        }).then(r => {
            if (r.data.code === 1) {
                console.log('[锁定后的数据]',r.data.result)
                this.props.rootStore.deleteProduct(this.props.route.params.id)
                this.props.rootStore.productStorage(this.props.route.params.id)
                clearInterval(this.time)
                //mobx数据删除锁定那条
                this.setState({
                    showModal: false,
                })
                setTimeout(() => {
                    this.setState({
                        dataLock: r.data.result,
                        showModal: true,
                        changeDetail: false,
                        changeHeadO: false,
                        num: 2,
                        soId: r.data.result.so_id,
                    })
                    this.onFn() 
                }, 0);
            }
            else {
                Toast.message(r.data.message, 2000, 'center')
                return
            }
        }).catch(e => console.log(e))
    }
    //确认付款 发送请求
    _Enter = async () => {
        var url = ORDERS_PAY.replace('{so_id}', this.state.soId)
        await axios.put(url, {}, {
            headers: {
                "token": this.state.token
            }
        }).then(r => {
            console.log('[产品付款成功]', r.data.result)
            if (r.data.code === 1) {
                this.props.rootStore.deleteProduct(this.props.route.params.id)
                this.props.rootStore.axiosNss()
                this.setState({
                    dataPay: r.data.result,
                    showBtn: false,
                    num: 5
                })
            }else {
                Toast.message(r.data.message, 2000, 'center')
                return
            }
        })
            .catch(e => console.log(e))
    }
    //获取订单详情
    getOrderInfo = async () => {
        clearInterval(this.time)
        var url = ORDERS_INFO.replace('{so_id}', this.state.soId)
        await axios.get(url, {
            headers: {
                token: this.state.token
            }
        }).then(r => {
            if (r.data.code === 1) {
                this.setState({
                    data: r.data.result
                })
            } else {
                Toast.message(r.data.message, 2000, 'center')
            }
        }).catch(e => console.log(e))
    }
    //取消锁定 发送请求
    _Cancel = async () => {
        //调用取消锁定API
        var url = ORDERS_CANCEL.replace('{so_id}', this.state.soId)
        await axios.put(url, {}, {
            headers: {
                "token": this.state.token
            }
        }).then(r => {
            if (r.data.code === 1) {
                //取消锁定后，把缓存的给列表
                this.props.rootStore.pStorage2productList()
                clearInterval(this.time)
                this.getOrderInfo()
                this.setState({
                    dataCancel: r.data.result,
                    showBtn: false,
                    num: 4
                })
            }
            else {
                //取消锁定失败
                Toast.message(r.data.message, 2000, 'center')
                return
            }
        }).catch(e => console.log(e))

        // setTimeout(() => {
        // this.props.navigation.navigate('Tabbar')
        // }, 1000)

    }
    //获取订单详情
    getProductInfo = async () => {
        clearInterval(this.time)
        var url = PRODUCT_INFO.replace('{sp_id}', this.props.route.params.id)
        await axios.get(url, {
            headers: {
                token: this.state.token
            }
        }).then(r => {
            console.log('success返回取消锁定订单详情', r.data.result)
            if (r.data.code === 1) {
                this.setState({
                    data: r.data.result
                })
                this.onFn()
            }else {
                Toast.message(r.data.message, 2000, 'center')
            }
        }).catch(e => console.log(e))
    }
    //锁定时间
    //下架倒计时
    onFn = () => {
        this.time ? clearInterval(this.time) : null
        let { data, dataLock, dataPay } = this.state

        let countTime = data.sale_expire_time
        !!dataPay && !!dataPay.collection_expire_time ?
            countTime = dataPay.collection_expire_time :
            !!dataLock.pay_expire_time && dataLock.pay_expire_time !== undefined ?
                countTime = dataLock.pay_expire_time :
                countTime
        this.time = setInterval(() => {
            let targetTime = countTime
            const now = Math.round(new Date())
            targetTime = targetTime.substring(0, 19)
            targetTime = targetTime.replace(/-/g, '/')
            const Target = new Date(targetTime).getTime()
            let reduces = Target - now
            if (reduces <= 0) {
                clearInterval(this.time)
                this.setState({
                    remain: 0
                })
            } else {
                reduces -= 1000
                const days = parseInt(reduces / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
                const hours = parseInt(reduces / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
                const minutes = parseInt(reduces / 1000 / 60 % 60, 10);//计算剩余的分钟 
                const seconds = parseInt(reduces / 1000 % 60, 10);//计算剩余的秒数
                const t = `${days}天${hours}时${minutes}分${seconds}秒`
                this.setState({
                    remain: t
                })
            }
        }, 1000)
    }
    componentDidMount() {
        //获取数据
        this.getProductInfo()
    }
    componentWillUnmount() {
        clearInterval(this.time)
    }
    //锁定时间戳 转北京时间 
    dataLock = (dataLock) => {
        let timestamp = dataLock.lock_time * 1000
        var date = new Date(timestamp);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;

        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    }
    //控制头部信息
    controlHeadMsg = (num) => {
        let { remain } = this.state
        switch (num) {
            case 1:
                return ''
                break;
            case 2:
                return `订单已锁定,请在${remain}小时内进行付款`
                break
            case 3:
                return `您未在规定时间内付款，订单已取消`
                break
            case 4:
                return `您已取消锁定该订单`
                break
            case 5:
                return `您已付款，等待卖家确认收款`
                break
        }
    }
    render() {
        const { data, dataLock, num, dataPay } = this.state
        const result = this.controlHeadMsg(num)
        return (
            <View style={{ flex: 1 }}>
               <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
                <View style={styles.arroWrap}>
                    <TouchableOpacity 
          style={{ width: pxToPt(60), height: pxToPt(60), alignItems: 'center', justifyContent: 'center' }} 
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
                    </TouchableOpacity>
                    <Text style={styles.title}>产品详情</Text>
                </View>
                {
                    this.state.changeHeadO ?
                        <></> :
                        <View style={styles.changeMk}>
                            <View style={styles.showMk}>
                                <Text style={styles.showTex}>{result}</Text>
                            </View>
                        </View>
                }
                <View style={styles.wrap}>
                    <View style={styles.wrapper}>
                        <View style={styles.head}>
                            <View style={styles.myHead}>
                                {
                                    !!data.sale_avater_url ? <Image style={styles.headImg} source={{ uri: data.sale_avater_url }}></Image> :
                                        data.avater_url ?
                                            <Image style={styles.headImg} source={{ uri: data.avater_url }}></Image> :
                                            <Image style={styles.headImg} source={require('../../../assets/icons/tou1.png')}></Image>
                                }
                            </View>
                            <View>
                                {
                                    num === 4 ? <Text style={styles.headName}>{data.sale_user_name}</Text> :
                                        <Text style={styles.headName}>{data.user_name}</Text>
                                }
                                {
                                    !!dataLock.order_no && num !== 4 ? <Text style={styles.orderNum}>订单编号：{dataLock.order_no}</Text> : <></>
                                }
                            </View>
                        </View>
                        <View style={styles.orderDetailWrap}>
                            <View>
                                <Text style={styles.oNum}>NSS: {data.value}</Text>
                                {
                                    num === 5 ? <Text style={styles.unTime}>卖家确认倒计时:{this.state.remain}</Text> :
                                        num === 4 ? <></> :
                                            dataLock.pay_expire_time !== undefined ?
                                                <Text style={styles.unTime}>付款倒计时:{this.state.remain}</Text> :
                                                <Text style={styles.unTime}>下架倒计时:{this.state.remain}</Text>
                                }
                            </View>
                            <View style={styles.allMoney}>
                                <Text style={styles.youMoney}>￥:{data.price}</Text>
                                <Text style={styles.money}>总价:{data.sum_count}</Text>
                            </View>
                        </View>
                        {
                            this.state.changeDetail ?
                                <></> :
                                <View style={styles.msgDetail}>
                                    <View style={styles.msgHead}>
                                        <Text style={styles.msgTitle}>收款信息</Text>
                                    </View>
                                    <View style={styles.msgBody}>
                                        <Text style={styles.msgContent}>收款人姓名</Text>
                                        {
                                            num === 4 ? <Text style={styles.msgTex}>{data.bank_account_name}</Text> : <Text style={styles.msgTex}>{data.account_name}</Text>
                                        }

                                    </View>
                                    <View style={styles.msgBody}>
                                        <Text style={styles.msgContent}>卡号</Text>

                                        <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                                            alert(123)
                                        }}>
                                            {
                                                num === 4 ?
                                                    <Text style={{ color: '#3D72E4', paddingRight: pxToPt(8) }}>{data.bank_account_no}</Text> :
                                                    <Text style={{ color: '#3D72E4', paddingRight: pxToPt(8) }}>{data.account_no}</Text>
                                            }
                                            <View style={styles.copyWrap}>
                                                <Text style={styles.copyTex}>复制</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.msgBody}>
                                        <Text style={styles.msgContent}>银行</Text>
                                        {
                                            num === 4 ?
                                                <Text style={styles.msgTex}>{data.bank_full_name}</Text>
                                                :
                                                <Text style={styles.msgTex}>{data.full_name}</Text>
                                        }
                                    </View>
                                    <View style={styles.msgFoot}>
                                        <Text style={styles.msgContent}>金额</Text>
                                        <Text style={styles.msgMoney}>{data.sum_count}</Text>
                                    </View>
                                </View>
                        }
                        <View>
                            <View style={styles.showTime}>
                                {
                                    num === 5 ?
                                        <Text style={styles.fbT}>确认付款时间：{dataPay.pay_time}</Text> :
                                        <></>
                                }
                                {
                                    num === 3 ?
                                        <Text style={styles.fbT}>订单取消时间：X-X-X x:x:x</Text> :
                                        <></>
                                }
                                {
                                    data.time_list !== undefined && num === 4 ?
                                        <Text style={styles.fbT}>取消锁定时间：{data.time_list.cancel_time}</Text> :
                                        <></>
                                }
                                {
                                    dataLock.lock_time === undefined ? <></> :
                                        <Text style={styles.fbT}>锁定时间：{this.dataLock(dataLock)}</Text>
                                }
                                {
                                    data.time_list !== undefined && num === 4 ?
                                        <Text style={styles.fbT}>发布时间：{data.time_list.created_time}</Text>
                                        :
                                        <Text style={styles.fbT}>发布时间：{data.created_time}</Text>
                                }

                            </View>
                        </View>
                    </View>
                    {this.state.showModal ? <></> : <MyToast ></MyToast>}
                    {
                        this.state.changeDetail ?
                            <TouchableHighlight
                                underlayColor="#abcdef"
                                style={styles.touchHig}
                                onPress={this.showMo}>
                                <TouchLingth touchTex={'立即锁定'}></TouchLingth>
                            </TouchableHighlight>
                            : this.state.showBtn ?
                                <View style={styles.touchbot}>
                                    <View style={styles.cancelClo}>
                                        <ToastTwo
                                            onCancel={this._Cancel}
                                            showTex={'请确定是否取消锁定'}
                                            zbtnBC={'#fff'}
                                            zbtnF={'取消锁定'}
                                            zbtnFC={'#3D72E4'}
                                            zbtnBoC={'#3D72E4'}
                                            qbtnBC={'#fff'}
                                            qbtnF={'否'}
                                            qbtnFC={'#3D72E4'}
                                            ebtnF={'是'}
                                        ></ToastTwo>
                                    </View>
                                    <View style={styles.enterPay}>
                                        <ToastTwo
                                            onEnter={this._Enter}
                                            showTex={'请确认您已打款，并保留截图，否则卖家会提出仲裁，情况属实，将永久冻结账号。'}
                                            zbtnFC={'#fff'}
                                            zbtnF={'确认付款'}
                                            ebtnFC={'#3D72E4'}
                                            ebtnBC={'#fff'}
                                        ></ToastTwo>
                                    </View>
                                </View> : <></>
                    }

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    arroWrap: {
        height: pxToPt(44),
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    arrow: {
        width: pxToPt(11.82),
        height: pxToPt(22),
    },
    title: {
        marginLeft: pxToPt(100),
        color: '#2B2D33',
        fontSize: pxToPt(18),
        fontWeight: "500",
        fontFamily: 'PingFang SC'
    },
    wrap: {
        alignItems: 'center'
    },
    wrapper: {
        width: pxToPt(343),
        height: pxToPt(190),
        marginTop: pxToPt(8),
        borderRadius: pxToPt(8),
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowColor: '#565A66',
        elevation: 2,
        shadowOpacity: 0.12,
        shadowRadius: pxToPt(2),
        paddingRight: pxToPt(8),
    },
    changeMk: {
        height: pxToPt(44),
        backgroundColor: '#A6B8E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    showMk: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: pxToPt(44),
        paddingTop: pxToPt(8),
        paddingBottom: pxToPt(7),
        paddingLeft: pxToPt(16),
        paddingRight: pxToPt(19),
        justifyContent: 'center',
        alignItems: 'center',
    },
    showTex: {
        color: '#fff',
        fontWeight: '500',
        fontSize: pxToPt(15)
    },
    head: {
        height: pxToPt(84),
        width: pxToPt(319),
        borderBottomWidth: pxToPt(1),
        borderBottomColor: '#F2F3F7',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: pxToPt(12),
    },
    myHead: {
        width:pxToPt(51),
        height: pxToPt(51),
        marginRight:pxToPt(12)
    },
    headImg: {
        width: '100%',
        height: '100%',
        borderRadius: pxToPt(60),
    },
    headName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2B2D33'
    },
    orderDetailWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: pxToPt(105),
        marginLeft: pxToPt(12),
    },
    oNum: {
        marginTop: pxToPt(24),
        fontWeight: '500',
        fontSize: pxToPt(18),
        color: '#2B2D33'
    },
    unTime: {
        marginTop: pxToPt(12),
        fontSize: pxToPt(14),
        fontWeight: '400',
        color: '#5A5D66'
    },
    allMoney: {
        alignItems: 'flex-end',
        // marginLeft: 48,
    },
    youMoney: {
        marginTop: pxToPt(24),
        color: '#FE5564',
        fontSize: pxToPt(18),
        fontWeight: 'bold'
    },
    money: {
        marginTop: pxToPt(12),
        color: '#5A5D66',
        fontSize: pxToPt(14),
        fontWeight: '400'
    },
    cTime: {
        flexDirection: 'row',
        width: pxToPt(343),
        height: pxToPt(44),
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowColor: '#565A66',
        shadowOpacity: 0.12,
        elevation: 2,
        shadowRadius:pxToPt(2),
        borderRadius: pxToPt(8),
        marginTop: pxToPt(12),
        alignItems: 'center'
    },
    fbT: {
        marginTop: pxToPt(16),
        marginLeft: pxToPt(12),
        color: '#5A5D66',
        fontSize:pxToPt(14)
    },
    touchHig: {
        width: pxToPt(343),
        height: pxToPt(44),
        backgroundColor: '#3D72E4',
        borderRadius: pxToPt(8),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:pxToPt(350),
        marginLeft:pxToPt(8),
    },
    touchbot: {
        width: pxToPt(343),
        height:pxToPt(44),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: pxToPt(360),
        paddingLeft: pxToPt(6),
    },
    cancelClo: {
        width: pxToPt(143),
        height: pxToPt(44),
        borderWidth: pxToPt(1),
        borderColor: '#3D72E4',
        borderRadius: pxToPt(8),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginRight: pxToPt(8),
        overflow: 'hidden'

    },
    cancelTex: {
        color: '#3D72E4',
        fontSize: pxToPt(15),
        fontWeight: '500'
    },
    enterPay: {
        width: pxToPt(188),
        height: pxToPt(44),
        borderWidth: pxToPt(1),
        borderColor: '#3D72E4',
        borderRadius: pxToPt(8),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginRight: pxToPt(16),
        overflow: 'hidden'
    },
    enterTex: {
        color: '#fff',
        fontSize:pxToPt(15),
        fontWeight: '500'
    },
    showTime: {
        width: pxToPt(343),
        marginTop: pxToPt(12),
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowColor: '#565A66',
        shadowOpacity: 0.12,
        shadowRadius: pxToPt(2),
        borderRadius: pxToPt(8),
        elevation: 2,
        justifyContent: 'center',
        paddingBottom: pxToPt(20),
    },
    msgDetail: {
        width: pxToPt(343),
        height:pxToPt(220),
        marginTop: pxToPt(12),
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowColor: '#565A66',
        shadowOpacity: 0.12,
        shadowRadius: pxToPt(2),
        elevation: 2,
        borderRadius: pxToPt(8),
        overflow: 'hidden',
        alignItems: 'center'
    },
    msgHead: {
        height: pxToPt(44),
        width:pxToPt(343),
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    msgTitle: {
        fontFamily: 'PingFang SC',
        fontWeight: '500',
        color: '#2B2D33',
        fontSize: pxToPt(16),
    },
    msgBody: {
        height: pxToPt(43),
        width: pxToPt(319),
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: pxToPt(1),
        borderBottomColor: '#F2F3F7',
    },
    msgContent: {
        fontFamily: "PingFang SC",
        fontWeight: '400',
        color: '#8D9099',
        fontSize: pxToPt(14)
    },
    msgTex: {
        fontFamily: 'PingFang SC',
        fontWeight: '400',
        color: '#5A5D66',
        fontSize: pxToPt(14)
    },
    copyWrap: {
        width: pxToPt(36),
        height: pxToPt(18),
        borderColor: '#3D72E4',
        borderRadius: pxToPt(15),
        borderWidth: pxToPt(1),
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    copyTex: {
        color: '#3D72E4',
        fontSize: pxToPt(11),
        fontWeight: '500',
        fontFamily: 'PingFang SC'
    },
    msgMoney: {
        fontFamily: 'PingFang SC',
        fontWeight: '500',
        color: '#FE5564',
        fontSize: pxToPt(14)
    },
    msgFoot: {
        height: pxToPt(44),
        width: pxToPt(319),
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    orderNum: {
        color: '#8D9099',
        marginTop: pxToPt(4),
        fontSize: pxToPt(12),
    },
})