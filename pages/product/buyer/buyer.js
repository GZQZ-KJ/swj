import React, { Component } from 'react'
import {
    View,
    Text,
    StatusBar,
    Image,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    ScrollView,
    SafeAreaView
} from 'react-native'
import MyToast from '../../../utils/MyToast'
import TouchLingth from '../../../utils/TouchLinght'
import ToastTwo from '../../../components/ToastTwo'
import { pxToPt } from "../../../utils/styleKits";
import Clipboard from '@react-native-community/clipboard'
import axios from '../../../utils/api/request'
import { NavigationContext } from '@react-navigation/native'
import { PRODUCT_INFO, PRODUCT_LOCKING, ORDERS_PAY, ORDERS_CANCEL, ORDERS_INFO } from '../../../utils/api/pathMap'
import { inject, observer } from 'mobx-react'
import Toast from '../../../utils/api/Toast'
@inject('rootStore')
@observer
/**
 * 这是产品详情页
 */
export default class home extends Component {
    static contextType = NavigationContext
    constructor(props) {
        super(props)
        this.state = {
            token: this.props.rootStore.token,
            showModal: true,  //控制锁定成功弹窗
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
    //打勾 锁定弹窗
    showMo = async () => {
        var url = PRODUCT_LOCKING.replace('{sp_id}', this.props.route.params.id)
        await axios.put(url, {}, {
            headers: {
                "token": this.state.token
            }
        }).then(r => {
            if (r.data.code === 1) {
                this.props.rootStore.deleteProduct(this.props.route.params.id)
                this.props.rootStore.productStorage(this.props.route.params.id)
                clearInterval(this.time)
                //mobx数据删除锁定那条
                this.setState({
                    showModal: false,
                })
                setTimeout(() => {
                    this.setState({
                        showModal: true,
                    })
                    this.context.navigate("OrderDetail", { id: r.data.result.so_id, activeTop: 1 })
                }, 2000);
            }
            else {
                Toast.message(r.data.message, 2000, 'center')
                return
            }
        }).catch(e => console.log(e))
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
            } else {
                Toast.message(r.data.message, 2000, 'center')
            }
        }).catch(e => console.log(e))
    }
    //锁定时间
    //下架倒计时
    onFn = () => {
        this.time ? clearInterval(this.time) : null
        let { data} = this.state

        let countTime = data.sale_expire_time
        this.time = setInterval(() => {
            let targetTime = countTime
            const now = Math.round(new Date())
            targetTime = targetTime.substring(0, 19)
            targetTime = targetTime.replace(/-/g, '/')
            const Target = Date.parse(new Date(targetTime))

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
    render() {
        const { data, dataLock, num, } = this.state
        return (
            <>
                <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>

                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
                        <View style={styles.arroWrap}>
                            <TouchableOpacity
                                style={{ width: pxToPt(60), height: pxToPt(44), paddingLeft: pxToPt(16), justifyContent: 'center' }}
                                onPress={() => {
                                    this.props.navigation.goBack()
                                }}>
                                <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
                            </TouchableOpacity>
                            <Text style={styles.title}>产品详情</Text>
                        </View>
                        {this.state.showModal ? <></> : <MyToast ></MyToast>}
                        <ScrollView style={styles.wrap}>
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
                            
                                <View>
                                    <View style={styles.showTime}>

                                        {
                                            data.time_list !== undefined && num === 4 ?
                                                <Text style={styles.fbT}>发布时间：{data.time_list.created_time}</Text>
                                                :
                                                <Text style={styles.fbT}>发布时间：{data.created_time}</Text>
                                        }

                                    </View>
                                </View>
                            </View>
                            <TouchableHighlight
                                underlayColor="#abcdef"
                                style={styles.touchHig}
                                onPress={this.showMo}>
                                <TouchLingth touchTex={'立即锁定'}></TouchLingth>
                            </TouchableHighlight>


                        </ScrollView>
                    </View>
                </SafeAreaView>
            </>
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
        marginLeft: pxToPt(92),
        color: '#2B2D33',
        fontSize: pxToPt(18),
        fontWeight: "500",
    },
    wrap: {
        paddingLeft: pxToPt(16),
        zIndex: 1,
        paddingBottom: pxToPt(16)
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
        width: pxToPt(51),
        height: pxToPt(51),
        marginRight: pxToPt(12)
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
        shadowRadius: pxToPt(2),
        borderRadius: pxToPt(8),
        marginTop: pxToPt(12),
        alignItems: 'center'
    },
    fbT: {
        marginTop: pxToPt(16),
        marginLeft: pxToPt(12),
        color: '#5A5D66',
        fontSize: pxToPt(14)
    },
    touchHig: {
        width: pxToPt(343),
        height: pxToPt(44),
        backgroundColor: '#3D72E4',
        borderRadius: pxToPt(8),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: pxToPt(350),
        marginLeft: pxToPt(8),
    },
    touchbot: {
        width: pxToPt(343),
        height: pxToPt(44),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: pxToPt(348),
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
        fontSize: pxToPt(15),
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
        height: pxToPt(220),
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
        width: pxToPt(343),
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