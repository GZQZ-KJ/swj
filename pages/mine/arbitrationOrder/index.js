import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'
import { pxToPt } from "../../../utils/styleKits";
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
        this.context.navigate('ArbitrationMsg', { id: item.so_id, status: item.status })
    }
    render() {
        let { item } = this.props
        return (
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.arbing} onPress={this.goArbitrationMsg}>
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
                            <Text style={{ color: '#2B2D33', fontWeight: '500', fontSize: pxToPt(16) }}>NSS:{item.value}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={{ color: '#FE5564', marginBottom: pxToPt(8), fontWeight: 'bold', fontSize: pxToPt(16) }}>￥:{item.price}</Text>
                            <Text style={{ color: '#5A5D66', fontSize: pxToPt(14), fontWeight: '400' }}>总价:{item.sum_count}</Text>
                        </View>
                    </View>

                    {
                        item.status === 1 ?
                            <>
                                <Text style={{ paddingTop: pxToPt(17), borderTopWidth: pxToPt(1), borderColor: '#F2F3F7' }}>
                                    <Text style={{ ...styles.arbMsg, marginRight: pxToPt(8) }}>{item.time_list.buy_arbitration_time}</Text>
                                    <Text style={styles.arbMsg}> 您对该订单提出仲裁，请等待管理员审核</Text>
                                </Text>
                            </> : item.status === 2 ?
                                <>
                                    <Text style={{ ...styles.arbMsg, marginRight: pxToPt(8) }}>{item.time_list.arbitration_finish_time}</Text>
                                    {
                                        item.text_switch ?
                                            <>
                                                <Text style={styles.arbMsg}> 您已上传证据，请等待管理员审核</Text>
                                            </> :
                                            <>
                                                <Text style={styles.arbMsg}> 卖家对此订单提出仲裁，请上传您的证据，以便管理员及时验证发聩</Text>
                                            </>
                                    }
                                </> : <></>
                    }
                    <></>

                </TouchableOpacity>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    arbing: {
        backgroundColor: '#fff',
        width: pxToPt(343),
        paddingLeft: pxToPt(12),
        paddingRight: pxToPt(12),
        paddingTop: pxToPt(12),
        paddingBottom: pxToPt(16),
        borderRadius: pxToPt(8),
        shadowOffset: { width: pxToPt(0), height: pxToPt(1) },
        shadowColor: '#565A66',
        elevation: pxToPt(2),
        shadowRadius: pxToPt(2),
        marginBottom: pxToPt(12),
        marginTop: pxToPt(8)
    },
    arbPer: {
        borderBottomColor: '#F2F3F7',
        borderBottomWidth: pxToPt(1),
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    arbHead: {
        flexDirection: 'row',
        width: pxToPt(100),
        paddingBottom: pxToPt(13),
        alignItems: 'center'
    },
    arbIcon: {
        width: pxToPt(26),
        height: pxToPt(26),
        marginRight: pxToPt(8),
        borderRadius: pxToPt(13)
    },
    arbName: {
        color: '#2B2D33',
        fontSize: pxToPt(14),
        fontWeight: '500'
    },
    arbTex: {
        fontSize: pxToPt(12),
        fontWeight: '400',
        marginTop: pxToPt(6)
    },
    arbBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: pxToPt(16),
        // paddingBottom: pxToPt(16),
    },
    arbMsg: {
        color: '#5A5D66',
        fontWeight: '400',
        fontSize: pxToPt(12),
    }
})