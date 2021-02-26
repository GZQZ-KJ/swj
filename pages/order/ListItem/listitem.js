import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'
import ListTime from './listTime'
import basicStyle from '../../../components/styles/basic/index'
import ToastTwo from '../../../components/ToastTwo'
import Toast from '../../../utils/api/Toast'
import axios from '../../../utils/api/request'
import {pxToPt} from '../../../utils/styleKits'
import { NavigationContext } from '@react-navigation/native'
import { PRODUCT_RECEIVE, ORDERS_PAY, ORDERS_LIST } from '../../../utils/api/pathMap'
import { inject, observer } from 'mobx-react'
@inject('rootStore')
@observer


export default class listitem extends Component {
    static contextType = NavigationContext
    constructor(props) {
        super(props)
        this.state = {
            token: this.props.rootStore.token,
            soId: this.props.item.so_id === undefined ? '' : this.props.item.so_id,
            spId: this.props.item.sp_id === undefined ? '' : this.props.item.sp_id,
            status: this.props.status
        }
    }
    //订单列表右上的时间
    getStutasTime = (status, st) => {
        let { activeTop } = this.props
        if (activeTop === 1) { //买
            switch (status) {
                case 0:
                    return null
                    break;
                case 1:   //倒计时 
                    return <ListTime remark={st.remark} countTime={st.pay_expire_time !== undefined ? st.pay_expire_time : '2021-1-24 20:20:20'} />
                    break;
                case 2:
                    return <ListTime remark={st.remark} countTime={st.collection_expire_time !== undefined ? st.collection_expire_time : new Date()} />
                    break;
                case 3:
                    return null
                    break;
                case 4:
                    if (st.remark === '您已确认到账，订单已完成') return `订单已完成`
                    if (st.remark === '您未在规定时间内确认到账，订单已自动完成') return `订单已自动完成`
                    return `${st.remark}`
                    break;
                case 5:
                    return `被仲裁中`
                    break;
                case 6:
                    return `${st.remark}`
                    break;
            }
        } else {
            switch (status) {//卖
                case 0:
                    return null
                    break;
                case 1:   //挂卖中  下架倒计时
                    return <ListTime remark={`下架倒计时`} countTime={st.sale_expire_time !== undefined ? st.sale_expire_time : '2021-1-24 20:20:20'} />
                    break;
                case 2:   //被锁定 
                    return <ListTime remark={st.remark} countTime={st.pay_expire_time !== undefined ? st.pay_expire_time : '2021-1-24 20:20:20'} />
                    break;
                case 3:   //待确定  确认收款倒计时
                    return <ListTime remark={st.remark} countTime={st.collection_expire_time !== undefined ? st.collection_expire_time : '2021-1-24 20:20:20'} />
                    break;
                case 4:
                    if (st.remark === '您未在规定时间内确认到账，订单已自动完成') return `系统已自动完成该订单`
                    return `${st.remark}`
                    break;
                case 5:
                    return `仲裁中`
                    break;
                case 6:
                    return `${st.remark}`
                    break;
            }
        }
    }

    //买家确认付款
    onEnter = async (id = this.state.soId) => {
        var url = ORDERS_PAY.replace('{so_id}', id)
        console.log(url, '[确认付款url]', id)
        await axios.put(url, {}, {
            headers: {
                "token": this.state.token
            }
        })
            .then(r => {
                //成功 做些什么好
                console.log('订单列表付款了', r.data)
                if (r.data.code === 1) {
                    this.props.rootStore.delete2Order(id)
                    this.props.rootStore.axiosNss()
                    Toast.message(r.data.message, 1000, 'center')
                }
                else {
                    Toast.message(r.data.message, 2000, 'center')

                }
            })
            .catch(e => console.log('[买家确认付款]', e))
    }

    //卖家确认收款
    onMakeCollect = async (id = this.state.spId) => {
        var url = PRODUCT_RECEIVE.replace('{sp_id}', id)
        console.log(url, '[确认收款url]')
        await axios.put(url, {}, {
            headers: {
                "token": this.state.token
            }
        })
            .then(r => {
                //成功 做些什么好
                console.log('收款结果', r.data.result)
                if (r.data.code === 1) {
                    this.props.rootStore.delete1Order(id)
                    this.props.rootStore.axiosNss()
                    Toast.message(r.data.message, 1000, 'center')
                } else {
                    Toast.message(r.data.message, 2000, 'center')
                }
            })
            .catch(e => console.log('[卖家确认收款]', e))
    }
    render() {
        let { item, activeTop, status } = this.props
        return (
            <TouchableOpacity style={styles.container} onPress={() => {
                if (activeTop === 1) {
                    this.context.navigate("OrderDetail", { id: item.so_id, status: item.status, activeTop: activeTop })
                } else {
                    this.context.navigate("OrderDetail", { id: item.sp_id, status: item.status, activeTop: activeTop })
                }
            }}>
                <View style={styles.content}>
                    <View style={[styles.upper, basicStyle.flexRow]}>
                        <View style={[styles.lf, basicStyle.flexRow]}>
                            {
                                item.avater_url !== '' ?
                                    <Image style={{ width: pxToPt(26), height: pxToPt(26), borderRadius: pxToPt(13) }} source={{ uri: item.avater_url }}></Image>
                                    : <Image source={require('../../../assets/icons/avatar/tou2.png')}></Image>
                            }
                            <Text style={styles.name}>{item.user_name}</Text>
                        </View>
                        <View style={[styles.rt, basicStyle.flexRow]}>
                            <Text> {this.getStutasTime(item.status, item.time_list)}</Text>
                        </View>
                    </View>

                    <View style={[styles.mid, basicStyle.flexRow]}>
                        <Text style={styles.midNum}>NSS: {item.value}</Text>
                        <Text style={styles.midPri}>￥{item.price}</Text>
                    </View>

                    <View style={[styles.btm, item.status === 1 && activeTop === 1 || item.status === 3 && activeTop === 0 ?
                        { justifyContent: 'space-between' } :
                        { justifyContent: 'flex-end' }, basicStyle.flexRow,]}>
                        <Text style={styles.btmtxt}>总价: {item.sum_count}</Text>
                        {
                            activeTop === 1 && item.status === 1 ?
                                (<TouchableOpacity style={styles.btn} activeOpacity={.8}
                                ><ToastTwo style={styles.btnTxt}
                                    onEnter={this.onEnter}
                                    id={item.so_id}
                                    zbtnF={'确认付款'}
                                    zbtnFC={'#fff'}
                                    showTex={'请确认您已打款，并保留截图，否则卖家会提出仲裁，情况属实，将永久冻结账号'}
                                    ebtnBC={'#fff'}
                                    ebtnFC={'#3D72E4'}
                                    />
                                </TouchableOpacity>) : activeTop === 0 && item.status === 3 ?
                                    (<TouchableOpacity style={styles.btn} activeOpacity={.8}
                                    ><ToastTwo style={styles.btnTxt}
                                        onMakeCollect={this.onMakeCollect}
                                        id={item.sp_id}
                                        zbtnF={'确认收款'}
                                        zbtnFC={'#fff'}
                                        showTex={'请确认您已打款，并保留截图，否则卖家会提出仲裁，情况属实，将永久冻结账号'}
                                        ebtnBC={'#fff'}
                                        ebtnFC={'#3D72E4'}
                                        />
                                    </TouchableOpacity>) : null
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: pxToPt(16),
        marginRight: pxToPt(16),
        marginBottom: pxToPt(12),
        borderRadius: pxToPt(8),
        backgroundColor: '#FFFFFF',
        elevation: pxToPt(4),
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowColor: '#565A66',
        shadowOpacity: 0.12,
        shadowRadius: pxToPt(2),
    },
    content: {
        paddingTop: pxToPt(13),
        paddingRight: pxToPt(12),
        paddingBottom: pxToPt(16),
        paddingLeft: pxToPt(12)
    },
    title: {
        marginLeft: pxToPt(19),
        marginBottom: pxToPt(3),
        height: pxToPt(21),
        lineHeight: pxToPt(21),
        fontSize: pxToPt(15),
        color: '#8D9099'
    },
    upper: {
        paddingBottom: pxToPt(13),
        justifyContent: 'space-between',
        borderBottomWidth: pxToPt(1),
        borderBottomColor: '#F2F3F7'
    },
    lf: {
        alignItems: 'center'
    },
    avatar: {
        height: pxToPt(26),
        width: pxToPt(26)
    },
    name: {
        marginLeft: pxToPt(8),
        height: pxToPt(20),
        lineHeight: pxToPt(20),
        fontSize:pxToPt(14),
        color: '#2B2D33'
    },
    rt: {
        alignItems: 'center'
    },
    mid: {
        paddingTop: pxToPt(16),
        paddingBottom: pxToPt(8),
        justifyContent: 'space-between',
    },
    midNum: {
        // height: 22,
        lineHeight: pxToPt(22),
        fontSize: pxToPt(16),
        color: '#2B2D33'
    },
    midPri: {
        // height: 22,
        fontWeight: '700',
        lineHeight: pxToPt(22),
        fontSize: pxToPt(16),
        color: '#FE5564'
    },
    btm: {
        alignItems: 'center'
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: pxToPt(32),
        borderRadius: pxToPt(8),
        overflow: 'hidden',
        backgroundColor: '#3D72E4',
        width: pxToPt(71)
    },
    btmtxt: {
        height: pxToPt(20),
        lineHeight: pxToPt(20),
        fontSize:pxToPt(14),
        color: '#5A5D66'
    },
    btnTxt: {
        fontSize: pxToPt(12),
        color: '#FFFFFF',
        height: '100%',
        width: '100%'
    }
})
