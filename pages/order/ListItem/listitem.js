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
import { NavigationContext } from '@react-navigation/native'
import { PRODUCT_RECEIVE, ORDERS_PAY, ORDERS_LIST } from '../../../utils/api/pathMap'
import axios from '../../../utils/api/request'
import { inject, observer } from 'mobx-react'
import Toast from '../../../utils/api/Toast'
@inject('rootStore')
@observer


export default class listitem extends Component {
    static contextType = NavigationContext
    constructor(props) {
        super(props)
        this.state = {
            activeTop: this.props.activeTop,  //左为 1
            token: this.props.rootStore.token,
            soId: this.props.item.so_id === undefined ? '' : this.props.item.so_id,
            spId: this.props.item.sp_id === undefined ? '' : this.props.item.sp_id,
            status: this.props.status
        }
    }
    //订单列表右上的时间
    getStutasTime = (status, st) => {
        let { activeTop } = this.state
        // console.log('[activeTop]', activeTop)
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
                    return `卖家未确认，订单自动完成`
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
                    // return <ListTime remark={`下架倒计时`} countTime={st.sale_expire_time !== undefined ? st.sale_expire_time : '2021-1-24 20:20:20'} />
                    break;
                case 2:   //被锁定 
                    // return <ListTime remark={st.remark} countTime={st.pay_expire_time !== undefined ? st.pay_expire_time : '2021-1-24 20:20:20'} />
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
    onEnter = async () => {
        let { soId } = this.state
        var url = ORDERS_PAY.replace('{so_id}', soId)
        console.log('[付款的id--------------------------->]',soId)
        await axios.put(url, {}, {
            headers: {
                "token": this.state.token
            }
        })
            .then(r => {
                //成功 做些什么好
                console.log('订单列表付款了', r.data)
                if (r.data.code === 1) {
                    this.props.rootStore.delete1Order(soId)
                    Toast.message(r.data.message, 1000, 'center')
                }
                else {
                    Toast.message(r.data.message, 2000, 'center')

                }
            })
            .catch(e => console.log('[买家确认付款]', e))
    }

    //卖家确认收款
    onMakeCollect = async () => {
        let { spId } = this.state
        var url = PRODUCT_RECEIVE.replace('{sp_id}', spId)
        console.log('[list卖家确认收款]', spId)
        await axios.put(url, {}, {
            headers: {
                "token": this.state.token
            }
        })
            .then(r => {
                //成功 做些什么好
                if (r.data.code === 1) {
                this.props.rootStore.delete2Order(spId)
                    Toast.message(r.data.message, 1000, 'center')
                } else {
                    Toast.message(r.data.message, 2000, 'center')
                }
            })
            .catch(e => console.log('[卖家确认付款]', e))
    }
    render() {
        let { item, activeTop,status } = this.props
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
                                    <Image style={{ width: 26, height: 26, borderRadius: 13 }} source={{ uri: item.avater_url }}></Image>
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
        marginTop: 9,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 12,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        elevation: 10,
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowColor: '#565A66',
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    content: {
        paddingTop: 13,
        paddingRight: 12,
        paddingBottom: 16,
        paddingLeft: 12
    },
    title: {
        marginLeft: 19,
        marginBottom: 3,
        height: 21,
        lineHeight: 21,
        fontSize: 15,
        color: '#8D9099'
    },
    upper: {
        paddingBottom: 13,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#F2F3F7'
    },
    lf: {
        alignItems: 'center'
    },
    avatar: {
        height: 26,
        width: 26
    },
    name: {
        marginLeft: 8,
        height: 20,
        lineHeight: 20,
        fontSize: 14,
        color: '#2B2D33'
    },
    rt: {
        alignItems: 'center'
    },
    mid: {
        paddingTop: 16,
        paddingBottom: 8,
        justifyContent: 'space-between',
    },
    midNum: {
        // height: 22,
        lineHeight: 22,
        fontSize: 16,
        color: '#2B2D33'
    },
    midPri: {
        // height: 22,
        lineHeight: 22,
        fontSize: 16,
        color: '#FE5564'
    },
    btm: {
        alignItems: 'center'
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 32,
        borderRadius: 4,
        overflow: 'hidden',
        backgroundColor: '#3D72E4',
        width: 71
    },
    btmtxt: {
        height: 20,
        lineHeight: 20,
        fontSize: 14,
        color: '#5A5D66'
    },
    btnTxt: {
        fontSize: 12,
        color: '#FFFFFF',
        height: '100%',
        width: '100%'
    }
})
