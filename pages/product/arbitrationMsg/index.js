import React, { Component } from 'react'
import {
    StatusBar,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import ArbiHeader from './arbiHeader'
import ArbiPerson from './arbiPerson'
import Arbibuyer from './arbibuyer'
import ArbiDetail from './arbiDetail'
import ArbiTime from './arbiTime'
import ArbiPicmsg from './arbiPicmsg'
import { NavigationContext } from '@react-navigation/native'
import axios from '../../../utils/api/request'
import { ORDERS_ARBITRATIONINFO } from '../../../utils/api/pathMap'
import { inject, observer } from 'mobx-react'
import Toast from '../../../utils/api/Toast'
@inject('rootStore')
@observer
/**
 * 买家仲裁信息页面
 */
export default class arbitration extends Component {
    static contextType = NavigationContext
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.route.params.id,   //订单id
            status: this.props.route.params.status,
            token: this.props.rootStore.token,
            data: {}
        }
    }
    goArbiFb = () => {
        //跳转去仲裁反馈页面
        let { so_order, status } = this.state.data
        let activeTop = 1 //默认是买家
        this.context.navigate('SubmiArbitration', { id: this.state.id, status: status, token: this.state.token, orderNum: so_order, activeTop: activeTop })
    }

    //获取仲裁详情
    getArbitrationInfo = async () => {
        let { id, token } = this.state
        let url = ORDERS_ARBITRATIONINFO.replace('{so_id}', id)
        await axios.get(url, {
            headers: {
                "token": token
            }
        }).then(r => {
            console.log('[Product 仲裁详情]', r.data.result)
            if (r.data.code === 1) {
                this.setState({
                    data: r.data.result
                })
            }else {
                  Toast.message(r.data.message,1000,'center')
              }
              

        }).catch(e => console.log('[仲裁详情]',e))
    }
    componentDidMount() {
        this.getArbitrationInfo()

    }

    render() {
        let {
            buy_avater_url,
            bank_account_name,
            bank_account_no,
            bank_full_name,
            buy_arbitration,
            buy_images,
            buy_user_id,
            buy_user_name,
            price,
            sale_arbitration,
            sale_images,
            sale_avater_url,
            sale_user_id,
            sale_user_name,
            so_id,
            so_order,
            status,
            result_str,
            status_str,
            sum_count,
            time_list,
            value
        } = this.state.data
        if (time_list === undefined) return (<></>)
        return (
            <>
                <StatusBar backgroundColor="#fff" barStyle={'dark-content'}></StatusBar>
                <View style={styles.arroWrap}>
                    <TouchableOpacity
          style={{ width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }} 
                    onPress={() => {
                        this.props.navigation.goBack()
                    }}>
                        <Image style={styles.arrow} source={require('../../../assets/icons/backx.png')}></Image>
                    </TouchableOpacity>
                    <Text style={styles.title}>产品详情</Text>
                </View>
                <ArbiHeader
                    statusStr={status_str}
                    saleImages={sale_images}
                    buyImages={buy_images}
                />
                <SafeAreaView style={styles.container}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        style={styles.scrollView}>
                        <View style={styles.wrap}>
                            <ArbiPerson
                                avaterUrl={sale_avater_url}
                                userName={sale_user_name}
                                soOrder={so_order}
                                status={status}
                                statusStr={status_str}
                                value={value}
                                price={price}
                                sumCount={sum_count}
                            />
                            {
                                status === 1 ?
                                    <Arbibuyer
                                        avaterUrl={buy_avater_url}
                                        userName={buy_user_name}
                                    /> : <></>
                            }
                            <ArbiDetail
                                bankName={bank_account_name}
                                bankNo={bank_account_no}
                                sumCount={sum_count}
                                bankFullName={bank_full_name}
                            />
                            {
                                status === 3 && result_str !== undefined && result_str === '交易完成' ? <View style={styles.successWrap}>
                                    <Text style={{ color: '#fff', fontSize: 15 }}>
                                        {result_str}
                                    </Text>
                                </View> : status === 3 && result_str !== undefined && result_str === '交易取消' ?
                                        <View style={styles.tesWrap}>
                                            <Text style={{ color: '#fff', fontSize: 15 }}>
                                                {result_str}
                                            </Text>
                                        </View> : <></>
                            }
                            <ArbiTime
                                timeList={time_list}
                            />
                            <ArbiPicmsg
                                buyImages={buy_images}
                                saleImages={sale_images}
                                saleArbitration={sale_arbitration}
                                buyArbitration={buy_arbitration}
                            />
                            {
                                status === 1 || status === 3? <></> : !!buy_arbitration ? <></> :
                                    <TouchableOpacity style={styles.submitArb} onPress={this.goArbiFb}>
                                        <Text style={styles.sumbitTex}>仲裁反馈</Text>
                                    </TouchableOpacity>
                            }
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        backgroundColor: '#F8F9FA',
    },
    arroWrap: {
        height: 44,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff'
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
        fontFamily: 'PingFang SC'
    },
    wrap: {
        paddingLeft: 16
    },
    submitArb: {
        width: 343,
        height: 44,
        backgroundColor: '#3D72E4',
        marginTop: 20,
        marginLeft: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 36
    },
    successWrap: {
        width: 343,
        height: 44,
        borderRadius: 8,
        marginLeft: 8,
        backgroundColor: '#3D72E4',
        shadowOffset: { width: 0, height: 4 },
        shadowColor: '#565A66',
        shadowOpacity: 12,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tesWrap: {
        width: 343,
        height: 44,
        borderRadius: 8,
        marginLeft: 8,
        backgroundColor: '#FE5564',
        shadowOffset: { width: 0, height: 4 },
        shadowColor: '#565A66',
        shadowOpacity: 12,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sumbitTex: {
        color: '#fff',
        fontFamily: 'PingFang SC',
        fontWeight: '500',
        fontSize: 15
    },
})