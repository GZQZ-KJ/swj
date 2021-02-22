import React, { Component } from 'react'
import {
    View,
    Text,
    StatusBar,
    Image,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
} from 'react-native'
import Toast from '../../../utils/api/Toast'
import ToastTwo from '../../../components/ToastTwo'
import axios from '../../../utils/api/request'
import { PRODUCT_INFO, PRODUCT_CANCEL } from '../../../utils/api/pathMap'
import { inject, observer } from 'mobx-react'
@inject('rootStore')
@observer
/**
 * 这是产品详情页
 * 跳转到   卖方取消挂卖 页面 
 */
export default class home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: this.props.rootStore.token,
            changeDetail: true,  //控制锁定后弹出的模块
            clockTime: '', //锁定时记录的日期时间
            num: '6', //默认为1 倒计时确定付款时间
            data: [],
            remain: '',
            cancelTime: '',
        }
        this.time = null
    }
    _goDetail = async () => {
        let { sellNss } = this.props.route.params
        let url = PRODUCT_CANCEL.replace('{sp_id}', this.props.route.params.id)
        await axios.put(url, {}, {
            headers: {
                "token": this.state.token
            }
        }).then(r => {
            if (r.data.code === 1) {
                let nss = this.props.rootStore.nss + (+sellNss)
                let lockNss = this.props.rootStore.lockNss - (+sellNss)
                this.props.rootStore.setNss(nss, lockNss)
                this.setState({
                    changeDetail: false,
                    cancelTime: r.data.result.cancel_time
                })
            }
            else {
                Toast.message(r.data.message, 1000, 'center')
            }

        }).catch(e => console.log('[确认取消挂卖]', e))
    }
    //页面展示初始化数据
    getProductInfo = async () => {
        //加载数据
        var url = PRODUCT_INFO.replace('{sp_id}', this.props.route.params.id)
        await axios.get(url, {
            headers: {
                token: this.state.token
            }
        }).then(r => {
            if (r.data.code === 1) {
                this.setState({
                    data: r.data.result,
                    cancelTime: r.data.result.cancel_time
                })
                this.onFn()
            } else {
                Toast.message(r.data.message, 1000, 'center')
            }
        }).catch(e => console.log('[获取该订单信息]', e))
    }
    // 下架倒计时
    onFn = () => {
        let { data } = this.state
        this.time = setInterval(() => {
            let targetTime = data.sale_expire_time
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
        this.getProductInfo()
    }
    componentWillUnmount() {
        clearInterval(this.time)
    }
    render() {
        const { data } = this.state
        var finish = this.props.route.params.finish || ''
        return (
            <>
                <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
                <View style={styles.arroWrap}>
                    {
                        finish !== '' ? <></> : 
                        <>
                        <TouchableOpacity
                            style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }}
                            onPress={() => {
                                this.props.navigation.navigate("Tabbar")
                            }}> <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
                            </TouchableOpacity>
                            <Text style={styles.title}>产品详情</Text>
                            </>
                    }
                    {
                        finish !== '' ? 
                        <View style={styles.finishst}>
                       <Text style={styles.titlest}>产品详情</Text> 
                        <TouchableOpacity
                        style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => {
                            this.props.navigation.navigate("Tabbar")
                        }}> 
                        <Text>完成</Text>
                        </TouchableOpacity>
                        </View>
                        : <></>
                    }
                </View>
                {
                    this.state.changeDetail ?
                        <></> :
                        <View style={styles.changeMk}>
                            <View style={styles.showMk}>
                                <Text style={styles.showTex}>您已取消挂卖</Text>
                            </View>
                        </View>
                }
                <View style={styles.wrap}>
                    <View style={styles.wrapper}>
                        <View style={styles.head}>
                            <TouchableOpacity style={styles.myHead} onPress={() => {
                                this.props.navigation.navigate("Tabbar")
                            }}>
                                {
                                    data.avater_url !== '' ?
                                        <Image style={styles.headImg} source={{ uri: data.avater_url }}></Image> :
                                        <Image style={styles.headImg} source={require('../../../assets/icons/tou1.png')}></Image>
                                }
                            </TouchableOpacity>
                            <View>
                                <Text style={styles.headName}>{data.user_name}</Text>
                                {/* <Text style={styles.orderNum}>订单编号：1782563716</Text> */}
                            </View>
                        </View>
                        <View style={styles.orderDetailWrap}>
                            <View>
                                <Text style={styles.oNum}>NSS: {data.value}</Text>
                                {
                                    this.state.changeDetail ?
                                        <Text style={styles.unTime}>下架倒计时:{this.state.remain}</Text>
                                        : <></>
                                }
                            </View>
                            <View style={styles.allMoney}>
                                <Text style={styles.youMoney}>￥:{data.price}</Text>
                                <Text style={styles.money}>总价:{data.sum_count}</Text>
                            </View>
                        </View>

                        <View style={styles.msgDetail}>
                            <View style={styles.msgHead}>
                                <Text style={styles.msgTitle}>收款信息</Text>
                            </View>
                            <View style={styles.msgBody}>
                                <Text style={styles.msgContent}>收款人姓名</Text>
                                <Text style={styles.msgTex}>{data.account_name}</Text>
                            </View>
                            <View style={styles.msgBody}>
                                <Text style={styles.msgContent}>卡号</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ color: '#5A5D66' }}>{data.account_no}</Text>

                                </View>
                            </View>
                            <View style={styles.msgBody}>
                                <Text style={styles.msgContent}>银行</Text>
                                <Text style={styles.msgTex}>{data.full_name}</Text>
                            </View>
                            <View style={styles.msgFoot}>
                                <Text style={styles.msgContent}>金额</Text>
                                <Text style={styles.msgMoney}>{data.sum_count}</Text>
                            </View>
                        </View>

                        <View>
                            <View style={styles.showTime}>
                                {
                                    !!this.state.cancelTime ? <Text style={styles.fbT}>取消挂卖时间：{data.created_time}</Text> : <></>
                                }
                                <Text style={styles.fbT}>发布时间：{data.created_time}</Text>
                            </View>

                        </View>
                    </View>
                    {
                        this.state.changeDetail ?
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
                            </TouchableHighlight> :
                            <></>
                    }

                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    arroWrap: {
        height: 44,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    finishst:{
        height:'100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        width:'100%',
       justifyContent:'flex-end'
    },
    arrow: {
        width: 11.82,
        height: 22,
    },
    title: {
        marginLeft: 100,
        color: '#2B2D33',
        fontSize: 18,
        fontWeight: "500",
    },
    titlest:{
        marginRight: 100,
        color: '#2B2D33',
        fontSize: 18,
        fontWeight: "500",
    },
    wrap: {
        paddingLeft: 16
    },
    wrapper: {
        width: 343,
        height: 190,
        marginTop: 8,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowColor: '#565A66',
        elevation: 2,
        shadowOpacity: 0.12,
        shadowRadius: 2,
        marginLeft: 6,
        paddingRight: 12
    },
    head: {
        height: 84,
        width: 319,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F3F7',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
    },
    changeMk: {
        height: 44,
        backgroundColor: '#A6B8E0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    showMk: {
        position: 'absolute',
        left: 0,
        width: '100%',
        height: 44,
        paddingTop: 8,
        paddingBottom: 7,
        paddingLeft: 16,
        paddingRight: 19,
        justifyContent: 'center',
        alignItems: 'center',
    },
    showTex: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 15
    },
    myHead: {
        width: 51,
        height: 51,
        marginRight: 12
    },
    headImg: {
        width: '100%',
        height: '100%',
        borderRadius: 60
    },
    headName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2B2D33'
    },
    orderNum: {
        color: '#8D9099',
        marginTop: 4,
        fontSize: 12,
    },
    orderDetailWrap: {
        flexDirection: 'row',
        height: 105,
        marginLeft: 12,
        justifyContent: 'space-between'
    },
    oNum: {
        marginTop: 24,
        fontWeight: '500',
        fontSize: 18,
        color: '#2B2D33'
    },
    unTime: {
        marginTop: 12,
        fontSize: 14,
        fontWeight: '400',
        color: '#5A5D66'
    },
    allMoney: {
        alignItems: 'flex-end',
    },
    youMoney: {
        marginTop: 24,
        color: '#FE5564',
        fontSize: 18,
        fontWeight: 'bold'
    },
    money: {
        marginTop: 12,
        color: '#5A5D66',
        fontSize: 14,
        fontWeight: '400'
    },
    cTime: {
        flexDirection: 'row',
        width: 343,
        height: 44,
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowColor: '#565A66',
        shadowOpacity: 12,
        elevation: 2,
        shadowRadius: 2,
        borderRadius: 8,
        marginTop: 12,
        alignItems: 'center'
    },
    fbT: {
        marginTop: 16,
        marginLeft: 12,
        color: '#5A5D66',
        fontSize: 14
    },
    touchHig: {
        width: 343,
        height: 44,
        borderRadius: 8,
        borderColor: '#3D72E4',
        borderWidth: 1,
        overflow: 'hidden',
        marginTop: 400,
        marginLeft: 8,
    },
    showTime: {
        width: 343,
        marginTop: 12,
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowColor: '#565A66',
        shadowOpacity: 12,
        shadowRadius: 2,
        borderRadius: 8,
        elevation: 2,
        justifyContent: 'center',
        paddingBottom: 20,
    },
    msgDetail: {
        width: 343,
        height: 220,
        marginTop: 12,
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowColor: '#565A66',
        shadowOpacity: 12,
        shadowRadius: 2,
        elevation: 2,
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center'
    },
    msgHead: {
        height: 44,
        width: 343,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    msgTitle: {
        fontFamily: 'PingFang SC',
        fontWeight: '500',
        color: '#2B2D33',
        fontSize: 16,
    },
    msgBody: {
        height: 43,
        width: 319,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#F2F3F7',
    },
    msgContent: {
        fontFamily: "PingFang SC",
        fontWeight: '400',
        color: '#8D9099',
        fontSize: 14
    },
    msgTex: {
        fontFamily: 'PingFang SC',
        fontWeight: '400',
        color: '#5A5D66',
        fontSize: 14
    },
    msgMoney: {
        fontFamily: 'PingFang SC',
        fontWeight: '500',
        color: '#FE5564',
        fontSize: 14
    },
    msgFoot: {
        height: 44,
        width: 319,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',

    }
})