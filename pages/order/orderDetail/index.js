import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    StatusBar,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Platform
} from 'react-native'
import ToastTwo from '../../../components/ToastTwo'
import OrderHeader from './orderHeader'
import OrderPerson from './orderPerson'
import OrderBuyer from './orderBuyer'
import OrderDetail from './orderDetail'
import OrderTime from './orderTime'
import { pxToPt } from "../../../utils/styleKits"
import { PRODUCT_RECEIVE, ORDERS_INFO, PRODUCT_SALEINFO, ORDERS_CANCEL, ORDERS_PAY, PRODUCT_CANCEL } from '../../../utils/api/pathMap'
import axios from '../../../utils/api/request'
import { NavigationContext } from '@react-navigation/native'
import { inject, observer } from 'mobx-react'
import Toast from '../../../utils/api/Toast'
@inject('rootStore')
@observer

export default class orderDetail extends Component {
    static contextType = NavigationContext
    constructor(props) {
        super(props)
        this.state = {
            status: this.props.route.params.status,
            id: this.props.route.params.id,
            token: this.props.rootStore.token,
            activeTop: this.props.route.params.activeTop,
            cancelTime: '',
            data: {}
        }
    }
    //订单详情<左>
    getOrderDetail = async () => {
        let { id, token } = this.state
        let url = ORDERS_INFO.replace('{so_id}', id)
        console.log('[详情Url]',url)
        await axios.get(url, {
            headers: {
                "token": token
            }
        }).then(r => {
            if (r.data.code === 1) {
                console.log('[订单详情(左)]', r.data.result)
                this.setState({
                    data: r.data.result
                })
            } else {
                Toast.message(r.data.message, 2000, 'center')
            }
        }).catch(e => console.log(e))
    }
    //挂卖详情<右>
    getProductSaleInfo = async () => {
        let { id, token, status } = this.state
        let url = PRODUCT_SALEINFO.replace('{sp_id}', id) + `/${status}`
        await axios.get(url, {
            headers: {
                "token": token
            }
        }).then(r => {
            if (r.data.code === 1) {
                console.log('[挂卖详情(右)]', r.data.result)
                this.setState({
                    data: r.data.result
                })
            } else {
                Toast.message(r.data.message, 2000, 'center')
            }
        }).catch(e => console.log(e))
    }
    componentDidMount() {
        if (this.state.activeTop === 1) {
            this.getOrderDetail()
        } else {
            this.getProductSaleInfo()
        }

    }
    //未到账 跳去仲裁
    arbitration = () => {
        let { id, status, activeTop } = this.state
        let { so_order } = this.state.data
        this.context.navigate('SubmiArbitration', { id: id, status: status, orderNum: so_order, activeTop: activeTop })
    }
    //确认收款
    enterPay = async () => {
        let { id, token } = this.state
        var url = PRODUCT_RECEIVE.replace('{sp_id}', id)
        await axios.put(url, {}, {
            headers: {
                "token": token
            }
        })
            .then(r => {
                //成功 做些什么好
                if (r.data.code === 1) {
                    this.props.rootStore.delete1Order(id)
                    this.props.rootStore.axiosNss()
                    Toast.message(r.data.message, 2000, 'center')
                    this.props.navigation.navigate("Tabbar")
                } else {
                    Toast.message(r.data.message, 2000, 'center')
                }
            })
            .catch(e => console.log(e))
    }

    //确认付款
    _Enter = async () => {
        let { id, token } = this.state
        let url = ORDERS_PAY.replace('{so_id}', id)
        await axios.put(url, {}, {
            headers: {
                "token": token
            }
        }).then(r => {
            clearInterval(this.time)
            if (r.data.code === 1) {
                this.props.rootStore.delete2Order(id)
                this.props.rootStore.axiosNss()
                Toast.message(r.data.message, 1000, 'center')
                this.getOrderDetail()
            }
            else {
                Toast.message(r.data.message, 1000, 'center')

            }
        }).catch(e => console.log('[确认付款]', e))
    }

    //取消锁定
    _Cancel = async () => {
        let { id, token } = this.state
        let url = ORDERS_CANCEL.replace('{so_id}', id)
        await axios.put(url, {}, {
            headers: {
                "token": token
            }
        }).then(r => {
            if (r.data.code === 1) {
                this.props.rootStore.deleteOrder(id)
                this.props.rootStore.axiosProductList()
                Toast.message(r.data.message, 2000, 'center')
                this.getOrderDetail()
            }
            else {
                Toast.message(r.data.message, 1000, 'center')

            }
        }).catch(e => console.log('[取消锁定]', e))
    }
    showMsg = () => {
        let { status, time_list, value } = this.state.data
        console.log('详情头部信息', time_list)
        if (this.state.activeTop === 1) {  //订单状态
            switch (status) {
                case 1:
                    return <Text style={{ color: '#fff', fontSize: 15, fontWeight: '500' }}>订单已锁定,请在规定时间内付款</Text>
                    break;
                case 2:
                    return `您已付款，请等待卖家确认收款`
                    break;
                case 3:
                    return `${time_list.remark}`
                    break;
                case 4:
                    if(time_list.remark === '您已确认到账，订单已完成') return `卖家已确认收款，恭喜你获得${value}NSS币`
                    if(time_list.remark === '您未在规定时间内确认到账，订单已自动完成') return `订单自动完成，恭喜你获得${value}NSS币`
                    if(time_list.remark === '后台审判，交易完成') return `审判完成，恭喜你获得${value}NSS币`
                    break;
                case 5:
                    return `${time_list.remark}`
                    break;
                case 6:
                    return `${time_list.remark}`
                    break;
            }
        } else {  //挂卖状态
            switch (status) {
                case 1:
                    return `${time_list.remark}`
                    break;
                case 2:
                    return `等待买家付款`
                    break;
                case 3:
                    return `请卖家确认收款`
                    break;
                case 4:
                    return `${time_list.remark}`
                    break;
                case 5:
                    return `${time_list.remark}`
                    break;
                case 6:
                    if (time_list.remark === null) return `超时未支付，订单自动取消`
                    return `${time_list.remark}`
                    break;
            }
        }

    }


    //取消发布
    _goDetail = async () => {
        let { nss, lockNss } = this.props.rootStore
        let url = PRODUCT_CANCEL.replace('{sp_id}', this.state.id)
        await axios.put(url, {}, {
            headers: {
                "token": this.state.token
            }
        }).then(r => {
            if (r.data.code === 1) {
                let { value } = this.state.data
                let cNss = nss + value
                let clockNss = lockNss - value
                this.props.rootStore.setNss(cNss, clockNss)
                this.props.rootStore.delete1Order(this.state.id)
                this.props.rootStore.deleteProduct(this.state.id)

                Toast.message(r.data.message, 1500, 'center')
                this.setState({
                    changeDetail: false,
                    cancelTime: r.data.result.cancel_time
                })
                this.props.navigation.goBack()
            }
            else {
                Toast.message(r.data.message, 1000, 'center')
            }

        }).catch(e => console.log('[确认取消挂卖]', e))
    }
    render() {
        let {
            bank_account_name,
            bank_account_no,
            bank_full_name,
            button,
            buy_avater_url,
            buy_user_id,
            buy_user_name,
            price,
            sale_user_id,
            sale_avater_url,
            sale_user_name,
            so_id,
            sp_id,
            so_order,
            status,
            status_str,
            sum_count,
            time_list,
            user_name,
            value,
        } = this.state.data
        if (time_list === undefined) return (<></>)
        return (
            <>
                {
          Platform.OS === 'ios' ? <View style={{marginTop:pxToPt(28)}}></View> : <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
        }
                <View style={styles.arroWrap}>
                    <TouchableOpacity
                        style={{ width: pxToPt(60),  height: pxToPt(44),paddingLeft:pxToPt(16), justifyContent: 'center' }}
                        onPress={() => {
                            this.props.navigation.navigate('Tabbar')
                        }}>
                        <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
                    </TouchableOpacity>
                    <Text style={styles.title}>产品详情</Text>
                </View>
                {/* 头部提示信息 */}
                {
                    <OrderHeader msg={this.showMsg} />
                }
                <SafeAreaView style={styles.container}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.scrollView}>
                        <View style={styles.wrap}>
                            {/* 订单信息 */}
                            {
                                this.state.activeTop === 1 ?
                                    <>
                                        <OrderPerson
                                            avaterUrl={sale_avater_url}
                                            soOrder={so_order}
                                            myuserName={sale_user_name}
                                            statusStr={status_str}
                                            value={value}
                                            sumCount={sum_count}
                                            timeList={time_list}
                                            price={price}
                                            status={status}
                                            activeTop={this.state.activeTop}
                                        />

                                        {/* 买方信息 */}
                                        {
                                            status === 3 || status === 2 || status === 4 && this.state.activeTop === 0 ?
                                                <OrderBuyer
                                                    avaterUrl={buy_avater_url}
                                                    userName={buy_user_name}
                                                /> : <></>
                                        }
                                        {/* 收款人信息 */}
                                        <OrderDetail
                                            bankAccountName={bank_account_name}
                                            bankAccountNo={bank_account_no}
                                            bankFullName={bank_full_name}
                                            sumCount={sum_count}
                                        />
                                        {/* 时间 */}
                                        <OrderTime timeList={time_list} />
                                    </>
                                    :
                                    // 卖方
                                    <>
                                        <OrderPerson
                                            avaterUrl={sale_avater_url}
                                            soOrder={so_order}
                                            myuserName={sale_user_name}
                                            statusStr={status_str}
                                            value={value}
                                            sumCount={sum_count}
                                            timeList={time_list}
                                            price={price}
                                            status={status}
                                            activeTop={this.state.activeTop}
                                        />

                                        {/* 买方信息 */}
                                        {
                                            status === 3 || status === 2 || status === 4 ?
                                                <OrderBuyer
                                                    avaterUrl={buy_avater_url}
                                                    userName={buy_user_name}
                                                /> : <></>
                                        }


                                        {/* 收款人信息 */}
                                        <OrderDetail
                                            bankAccountName={bank_account_name}
                                            bankAccountNo={bank_account_no}
                                            bankFullName={bank_full_name}
                                            sumCount={sum_count}
                                        />
                                        {/* 时间 */}
                                        <OrderTime timeList={time_list} />
                                    </>
                            }
                            <View style={styles.touchbot}>
                                {
                                    status === 1 && this.state.activeTop === 1 ?
                                        <>
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
                                        </>
                                        : null
                                }
                            </View>
                            {/* 取消发布 */}
                            {
                                this.state.activeTop === 0 && status === 1 ?
                                    <>
                                        <TouchableHighlight
                                            underlayColor="#abcdef"
                                            style={styles.touchHig}>
                                            <ToastTwo
                                                zbtnF={'取消挂卖'}
                                                showTex={'请确认是否取消挂卖'}
                                                zbtnBC={'#fff'}
                                                zbtnBoC={'#3D72E4'}
                                                qbtnBC={'#fff'}
                                                qbtnF={'否'}
                                                qbtnFC={'#3D72E4'}
                                                ebtnF={'是'}
                                                onYes={this._goDetail}
                                            ></ToastTwo>
                                        </TouchableHighlight>
                                    </> : <></>
                            }
                        </View>
                    </ScrollView>
                </SafeAreaView>
                {/* 按钮 */}
                <View style={styles.fiexbot}>
                    {
                        this.state.activeTop === 0 && status === 3 && this.state.cancelTime === '' ?
                            <>
                                <TouchableHighlight
                                    underlayColor="#A6B8E0"
                                    style={{ ...styles.cancelClo, borderColor: '#FE5564', }}
                                    onPress={this.arbitration}>
                                    <Text style={{ color: '#FE5564' }}>
                                        未到账
                                     </Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    underlayColor="#A6B8E0"
                                    style={styles.enterPay}
                                    onPress={this.enterPay}>
                                    <Text style={{ color: '#fff' }}>
                                        确认收款
                                     </Text>

                                </TouchableHighlight>
                            </> : <></>
                    }
                </View>
            </>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA'
    },
    scrollView: {
        backgroundColor: '#F8F9FA',
        paddingBottom: pxToPt(60)
    },
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
        marginLeft: pxToPt(92),
        color: '#2B2D33',
        fontSize: pxToPt(18),
        fontWeight: "500",
        fontFamily: 'PingFang SC'
    },
    wrap: {
        alignItems: 'center',
        marginBottom: pxToPt(20)
    },


    //未到账 && 确认收款
    touchbot: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: pxToPt(8)
    },
    fiexbot: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: pxToPt(6),
        backgroundColor: '#fff',
        paddingBottom: pxToPt(17),
        paddingTop: pxToPt(4)

    },
    cancelClo: {
        width: pxToPt(143),
        height: pxToPt(44),
        borderRadius: pxToPt(8),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderColor: '#3D72E4',
        borderWidth: pxToPt(1),
        overflow: 'hidden',
    }, enterPay: {
        width: pxToPt(188),
        height: pxToPt(44),
        marginLeft: pxToPt(18),
        borderWidth: pxToPt(1),
        borderColor: '#3D72E4',
        borderRadius: pxToPt(8),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3D72E4',
        overflow: 'hidden'
    },
    touchHig: {
        width:pxToPt(343),
        height: pxToPt(44),
        borderRadius: pxToPt(8),
        borderColor: '#3D72E4',
        borderWidth: pxToPt(1),
        overflow: 'hidden',
        marginLeft: pxToPt(8),
        marginTop: pxToPt(40)
    },
    cTime: {
        width: pxToPt(343),
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowColor: '#565A66',
        shadowOpacity: 0.12,
        elevation: 2,
        shadowRadius: 2,
        borderRadius: 8,
        marginLeft: pxToPt(8),
        paddingBottom: pxToPt(20),
        marginBottom:pxToPt(12)
    },
    fbT: {
        paddingTop: pxToPt(16),
        paddingLeft: pxToPt(12),
        color: '#5A5D66',
        fontSize: 14
    },
})