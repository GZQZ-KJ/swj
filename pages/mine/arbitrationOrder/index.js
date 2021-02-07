import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'
import { NavigationContext } from '@react-navigation/native'
import { inject, observer } from 'mobx-react'
@inject('rootStore')
@observer
// @observer
export default class arbitrationIng extends Component {
    static contextType = NavigationContext
    constructor(props) {
        super(props)
        this.state = {
            data: [], //订单列表
            status: 1,  //状态  进行中  ||  结束
            page: 1,
            pageSize: 10,
            token: this.props.rootStore.token,
        }
    }
    goArbitrationMsg = () => {
        let { item } = this.props
        this.context.navigate('ArbitrationMsg', {id:item.so_id,status:item.status})
    }
    render() {
        let { item } = this.props
        return (
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={styles.arbing} onPress={this.goArbitrationMsg}>
                    <View style={styles.arbPer}>
                        <View style={styles.arbHead}>
                            {
                                item.sale_avater_url ?
                                    <Image style={styles.arbIcon} source={{ uri: item.sale_avater_url }}></Image> :
                                    <Image style={styles.arbIcon} source={require('../../../assets/icons/tou1.png')}></Image>
                            }

                            <Text syle={styles.arbName}>{item.sale_user_name}</Text>
                        </View>
                        {
                            item.status === 1 ?
                                <>
                                    <Text style={{ ...styles.arbTex, color: '#3D72E4' }}>{item.status_str}</Text>
                                </> : item.status === 2 ?
                                    <>
                                        <Text style={{ ...styles.arbTex, color: '#FE5564' }}>{item.status_str}</Text>
                                    </> : item.status === 3 ?
                                        <>
                                            <Text style={{ ...styles.arbTex, color: '#3D72E4' }}>{item.result_str}</Text>
                                        </> : item.status === 4 ?
                                            <>
                                                <Text style={{ ...styles.arbTex, color: '#FE5564' }}>{item.status_str}</Text>
                                            </> : <></>
                        }
                    </View>
                    <View style={styles.arbBody}>
                        <View>
                            <Text style={{ color: '#2B2D33', fontWeight: '500', fontSize: 16 }}>NSS:{item.value}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ color: '#FE5564', marginBottom: 8, fontWeight: 'bold', fontSize: 16 }}>￥:{item.price}</Text>
                            <Text style={{ color: '#5A5D66', fontSize: 14, fontWeight: '400' }}>总价:{item.sum_count}</Text>
                        </View>
                    </View>
                    <Text style={{ paddingTop: 16, borderTopWidth: 1, borderColor: '#F2F3F7' }}>
                        {
                            item.status === 1 ?
                                <>
                                    <Text style={{ ...styles.arbMsg, marginRight: 8 }}>{item.time_list.buy_arbitration_time}</Text>
                                    <Text style={styles.arbMsg}> 您对该订单提出仲裁，请等待管理员审核</Text>
                                </> : item.status === 2 ?
                                    <>
                                        <Text style={{ ...styles.arbMsg, marginRight: 8 }}>{item.time_list.arbitration_finish_time}</Text>
                                        {
                                            item.text_switch ?
                                                <>
                                                    <Text style={styles.arbMsg}> 您已上传证据，请等待管理员审核</Text>
                                                </> :
                                                <>
                                                    <Text style={styles.arbMsg}> 卖家对此订单提出仲裁，请上传您的证据，以便管理员及时验证发聩</Text>
                                                </>
                                        }
                                    </> : <Text  style={styles.arbMsg}>已结束</Text>
                        }
                        <></>
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    arbing: {
        backgroundColor: '#fff',
        width: 343,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 13,
        paddingBottom: 16,
        borderRadius: 8,
        shadowOffset: { width: 0, height: 1 },
        shadowColor: '#565A66',
        elevation: 2,
        shadowRadius: 2,
        marginBottom: 12,
        marginTop: 12
    },
    arbPer: {
        borderBottomColor: '#F2F3F7',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    arbHead: {
        flexDirection: 'row',
        width: 100,
        paddingBottom: 13,
        alignItems: 'center'
    },
    arbIcon: {
        width: 26,
        height: 26,
        marginRight: 8,
        borderRadius: 13
    },
    arbName: {
        color: '#2B2D33',
        fontSize: 14,
        fontWeight: '500'
    },
    arbTex: {
        fontSize: 12,
        fontWeight: '400'
    },
    arbBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingBottom: 16,
    },
    arbMsg: {
        color: '#5A5D66',
        fontWeight: '400',
        fontSize: 12,
    }
})